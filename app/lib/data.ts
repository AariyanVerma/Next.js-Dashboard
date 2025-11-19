import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from 'next/cache';

// ---------- Types ----------
// app/lib/data.ts

export type Revenue = {
  id: number;
  month: string;
  revenue: number;
};



export type LatestInvoice = {
  id: number;
  amount: number;
  customer: string;
  email: string;
};

// ---------- Data functions ----------

// 1) Revenue for chart
export async function fetchRevenue(): Promise<Revenue[]> {
     noStore();
  const result = await sql<Revenue>`
    SELECT id, month, revenue
    FROM revenue
    ORDER BY id;
  `;
  return result.rows;
}

// 2) Latest invoices list
export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  const result = await sql<LatestInvoice>`
    SELECT
      invoices.id,
      invoices.amount,
      customers.name  AS customer,
      customers.email AS email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5;
  `;
  return result.rows;
}

// 3) Summary cards
export async function fetchCardData() {
  const paidResult = await sql<{ total: number | null }>`
    SELECT SUM(amount) AS total FROM invoices WHERE status = 'paid';
  `;
  const pendingResult = await sql<{ total: number | null }>`
    SELECT SUM(amount) AS total FROM invoices WHERE status = 'pending';
  `;
  const invoiceCountResult = await sql<{ count: number | null }>`
    SELECT COUNT(*) AS count FROM invoices;
  `;
  const customerCountResult = await sql<{ count: number | null }>`
    SELECT COUNT(*) AS count FROM customers;
  `;

  const paid = paidResult.rows[0];
  const pending = pendingResult.rows[0];
  const invoiceCount = invoiceCountResult.rows[0];
  const customerCount = customerCountResult.rows[0];

  return {
    collectedTotal: Number(paid?.total ?? 0),
    pendingTotal: Number(pending?.total ?? 0),
    numberOfInvoices: Number(invoiceCount?.count ?? 0),
    numberOfCustomers: Number(customerCount?.count ?? 0),
  };
}
