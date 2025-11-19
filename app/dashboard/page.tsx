import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from "@/app/lib/data";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { Card } from "@/app/ui/dashboard/cards";
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  return (
    <main className="px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <section className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={cardData.collectedTotal} type="collected" />
        <Card title="Pending" value={cardData.pendingTotal} type="pending" />
        <Card
          title="Total Invoices"
          value={cardData.numberOfInvoices}
          type="invoices"
        />
        <Card
          title="Total Customers"
          value={cardData.numberOfCustomers}
          type="customers"
        />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart revenue={revenue} />
        </div>
        <LatestInvoices invoices={latestInvoices} />
      </section>
    </main>
  );
}
