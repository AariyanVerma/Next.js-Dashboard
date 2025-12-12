import {
  fetchFilteredCustomers,
  fetchCustomersPages,
  fetchRevenueTotals,
} from "@/app/lib/data";
import CustomersTable from "@/app/ui/Customers/table";
import CustomersPagination from "@/app/ui/Customers/pagination";
import CustomersSearch from "@/app/ui/Customers/search";
import CustomersDateFilter from "@/app/ui/Customers/date-filter";

type CustomersPageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    date?: string;
  }> | {
    query?: string;
    page?: string;
    date?: string;
  };
};

export const dynamic = "force-dynamic";

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  try {
    const params = searchParams instanceof Promise ? await searchParams : (searchParams || {});
    const query = params.query ?? "";
    const currentPage = Number(params.page ?? "1");
    const dateFilter = params.date;

        const [customers, totalPages, revenueTotals] = await Promise.all([
          fetchFilteredCustomers(query, currentPage, dateFilter),
          fetchCustomersPages(query, dateFilter),
          fetchRevenueTotals(),
        ]);

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>

      <section className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-sm w-full">
          <CustomersSearch placeholder="Search customers..." />
        </div>
        <CustomersDateFilter />
      </section>
            <section className="mt-6 space-y-4">
              <CustomersTable 
                customers={customers} 
                showDate={!!dateFilter}
                revenueTotals={revenueTotals}
              />
              <CustomersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
          dateFilter={dateFilter}
        />
      </section>
    </>
  );
  } catch (error) {
    console.error('Error loading customers:', error);
    return (
      <>
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-800">
            Error loading customers. Please try again.
          </p>
          <p className="mt-2 text-xs text-red-600">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </>
    );
  }
}

