# Frontend Module Architecture — Examples

Patterns are taken from the Collections module and generalized. These snippets illustrate **how to think** about each layer and flow (entity, mapper, API hook, Screen/View, list, form, modal). Folder and file names are examples only; what matters is the separation of responsibilities and the contracts between layers.

---

## Entity (domain)

- No getter for full raw entity/props; only per-field getters and domain methods.

```ts
// domain/entity/thing.entity.ts
interface ThingEntityProps {
  thing: Thing;       // from @cookmate/domain
  count: number;      // from API, mapped in mapper
}

export class ThingEntity extends Entity<ThingEntityProps> {
  static create(props: ThingEntityProps): ThingEntity {
    return new ThingEntity(props, new UniqueEntityID(props.thing.id));
  }
  get id(): string { return this._id.toString(); }
  get name(): string { return this.props.thing.name; }
  get count(): number { return this.props.count; }
  isOwned(userId: string): boolean { return ThingPolicies.isOwner(this.props.thing.ownerId, userId); }
}
```

---

## Mapper (application)

- Single `toDomain`; no redundant `?? null` for fields already `string | null` in API types.

```ts
// application/thing.mapper.ts
type ThingData = GetThings200["data"][number];

export const ThingMapper = {
  toDomain(data: ThingData): ThingEntity {
    return ThingEntity.create({
      thing: {
        id: data.id,
        name: data.name,
        description: data.description,  // not data.description ?? null
        ownerId: data.ownerId,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      count: data.count,
    });
  },
};
```

---

## API mutation hook (callbacks, no toasts)

- Options: `onSuccess?`, `onError?(error)`.
- In mutation: invalidate, then call `options.onSuccess?.()` / `options.onError?.(error)`.
- Expose `mutate(id: string)` if generated hook uses `mutate({ id })`.

```ts
// api/useDeleteThing.ts
type UseDeleteThingOptions = {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
};

export function useDeleteThing(options: UseDeleteThingOptions = {}) {
  const queryClient = useQueryClient();
  const deleteThing = useDeleteThingsThingid({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: getThingsQueryKey() });
        options.onSuccess?.();
      },
      onError: (error) => options.onError?.(error as ApiError),
    },
  });
  return {
    ...deleteThing,
    mutate: (thingId: string) => deleteThing.mutate({ thingId }),
  };
}
```

---

## UI: modal hook wires toasts to API callbacks

- Modal hook uses mutation with `onSuccess` / `onError` and shows toasts there.
- Delete handler signature: `(id: string) => void`; list passes `entity.id`.

```ts
// ui/hooks/useModuleManageModal.ts
const { things, isLoading } = useThings({ whereRole: "OWNER" });
const deleteThing = useDeleteThing({
  onSuccess: () => toast.success(t(msg`Thing deleted`)),
  onError: (error) => toast.error(getUserFacingErrorMessage(t, error)),
});
const handleDelete = (thingId: string) => deleteThing.mutate(thingId);
return { things, isLoading, handleDelete, ... };
```

---

## UI: Screen (orchestration) → View (presentation)

- Screen: form hook + toasts + callbacks; passes props to View.
- View: props only; form/error typed from hook return type.

```ts
// ui/create/CreateThingScreen.tsx
export function CreateThingScreen({ onBack }: { onBack: () => void }) {
  const { t } = useLingui();
  const { form, isSubmitting, error } = useCreateThingForm({
    onSuccess: () => { toast.success(t(msg`Thing created`)); onBack(); },
    onError: (err) => toast.error(getUserFacingErrorMessage(t, err)),
  });
  return <CreateThingView form={form} isSubmitting={isSubmitting} error={error} onBack={onBack} />;
}
```

```ts
// ui/create/CreateThingView.tsx
interface CreateThingViewProps {
  form: ReturnType<typeof useCreateThingForm>["form"];
  isSubmitting: boolean;
  error: ReturnType<typeof useCreateThingForm>["error"];
  onBack: () => void;
}
export function CreateThingView({ form, isSubmitting, error, onBack }: CreateThingViewProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <ModalViewLayout title={t`Create Thing`} description={t`...`} onBack={onBack} disabled={isSubmitting}>
      <Form form={form}>...</Form>
    </ModalViewLayout>
  );
}
```

---

## UI: List view (props-only, inline skeleton)

- Single loading prop: `isLoading`.
- Skeleton inline; structure mirrors list/card layout.
- `onDelete(id: string)`; item calls `onDelete(thing.id)`.

```ts
// ui/list/ModuleListView.tsx
interface ModuleListViewProps {
  things: ThingEntity[];
  isLoading: boolean;
  onCreate: () => void;
  onDelete: (thingId: string) => void;
  isDeleting?: boolean;
}
export function ModuleListView({ things, isLoading, onCreate, onDelete, isDeleting }: ModuleListViewProps) {
  if (isLoading) return <div className="...">{/* inline skeleton mirroring list */}</div>;
  if (things.length === 0) return <EmptyState />;
  return (
    <div>
      {things.map((thing) => (
        <ThingListItem key={thing.id} thing={thing} onDelete={onDelete} isDeleting={isDeleting} />
      ))}
    </div>
  );
}
```

```ts
// ui/list/ThingListItem.tsx
onConfirm={() => onDelete(thing.id)}
```

---

## Form default values (inline, no exported constant)

- Inline in `useForm` with `satisfies InputType`.
- Nullable field: `description: null as string | null` if needed for validator type alignment.

```ts
// ui/hooks/useCreateThingForm.ts
const form = useForm({
  defaultValues: {
    name: "",
    description: null as string | null,
  } satisfies CreateThingInput,
  validators: { onChange: createThingSchema },
  onSubmit: ({ value }) => mutation.mutate(value),
});
```

---

## Modal container (no cleanup effect)

- Content mounted only when `open`; state resets on unmount. No `useEffect` cleanup.

```tsx
// ui/ModuleManageModal.tsx
{open && <ModuleManageModalContent />}
```
