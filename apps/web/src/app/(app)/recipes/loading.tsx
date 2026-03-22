import Skeleton from "react-loading-skeleton";

export default function RecipesLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8">
      <div className="space-y-3">
        <Skeleton height={36} width={240} borderRadius={12} />
        <Skeleton height={28} width={180} borderRadius={999} />
      </div>
      <Skeleton height={44} borderRadius={999} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} height={280} borderRadius={16} />
        ))}
      </div>
    </div>
  );
}
