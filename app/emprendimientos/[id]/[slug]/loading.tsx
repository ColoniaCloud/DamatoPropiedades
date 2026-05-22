export default function Loading() {
  return (
    <div className="min-h-screen pt-20 bg-[#fafbfc]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-20 bg-gray-200 rounded-xl animate-pulse" />
          </div>
          <div className="w-80 hidden lg:block">
            <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
