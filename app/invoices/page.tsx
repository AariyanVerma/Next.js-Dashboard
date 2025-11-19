import {
  fetchFilteredInvoices,
  fetchInvoicesPages,
} from "@/app/lib/data";
import InvoicesTable from "@/app/ui/Invoices/table";
import InvoicesPagination from "@/app/ui/Invoices/pagination";
import InvoicesSearch from "@/app/ui/Invoices/search";

type InvoicesPageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export const dynamic = "force-dynamic";

export default async function InvoicesPage({
  searchParams = {},
}: InvoicesPageProps) {
  const query = searchParams.query ?? "";
  const currentPage = Number(searchParams.page ?? "1");

  const [invoices, totalPages] = await Promise.all([
    fetchFilteredInvoices(query, currentPage),
    fetchInvoicesPages(query),
  ]);

  return (
    <main className="px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>

      <section className="mt-6 flex items-center justify-between gap-4">
        <div className="w-full max-w-xs">
          <InvoicesSearch placeholder="Search invoices…" />
        </div>
      </section>
      <section className="mt-6 space-y-4">
        <InvoicesTable invoices={invoices} />
        <InvoicesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      </section>
    </main>
  );
}
