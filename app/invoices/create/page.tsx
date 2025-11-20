import CreateInvoiceForm from '@/app/ui/Invoices/create-form';
import Breadcrumbs from '@/app/ui/Invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export const dynamic = 'force-dynamic';

export default async function CreateInvoicePage() {
  const customers = await fetchCustomers();

  return (
    <main className="px-8 py-8">
      <div className="flex flex-col gap-2">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/invoices' },
            {
              label: 'Create Invoice',
              href: '/invoices/create',
              active: true,
            },
          ]}
        />
        <h1 className="text-2xl font-semibold text-gray-900">
          Create Invoice
        </h1>
      </div>

      <CreateInvoiceForm customers={customers} />
    </main>
  );
}
