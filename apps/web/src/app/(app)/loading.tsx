import Skeleton from "react-loading-skeleton";

export default function AppLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      <Skeleton height={40} width={200} borderRadius={12} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} height={220} borderRadius={16} />
        ))}
      </div>
    </div>
  );
}
