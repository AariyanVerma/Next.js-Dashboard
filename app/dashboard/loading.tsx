export default function DashboardLoading() {
  return (
    <main className="px-8 py-8 space-y-8">
      <div className="h-7 w-40 rounded-md bg-gray-200 animate-pulse" />

      <section className="mt-2 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6"
          >
            <div className="h-4 w-24 rounded-md bg-gray-200 animate-pulse" />
            <div className="mt-4 h-6 w-32 rounded-md bg-gray-200 animate-pulse" />
          </div>
        ))}
      </section>
      <section className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 rounded-md bg-gray-200 animate-pulse" />
            <div className="h-3 w-20 rounded-md bg-gray-100 animate-pulse" />
          </div>

          <div className="mt-6 h-40 rounded-xl bg-gray-100 animate-pulse" />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-4">
          <div className="h-4 w-32 rounded-md bg-gray-200 animate-pulse" />

          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
            >
              <div className="space-y-2">
                <div className="h-3 w-28 rounded-md bg-gray-200 animate-pulse" />
                <div className="h-3 w-40 rounded-md bg-gray-100 animate-pulse" />
              </div>
              <div className="h-3 w-10 rounded-md bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
