export default function UserCardSkeleton() {
  return (
    <div className="flex items-center cursor-pointer px-3 py-2 border-t border-gray-200">
      <div className="w-12 h-12 rounded-full mr-3 bg-gray-200 animate-pulse"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-4/4"></div>
      </div>
    </div>
  );
}
