export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <div className="h-[62vh] bg-[#0c1b2e] animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-20 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-20 bg-gray-200 rounded-xl animate-pulse" />
            </div>
            <div className="h-40 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="w-80 hidden lg:block">
            <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
