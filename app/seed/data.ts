import { sql } from '@vercel/postgres';

export type RevenuePoint = {
  month: string;
  revenue: number;
};

export async function fetchRevenue(): Promise<RevenuePoint[]> {
  const result = await sql<RevenuePoint>`
    SELECT month, revenue
    FROM revenue
    ORDER BY month;
  `;
  return result.rows;
}

export type LatestInvoice = {
  id: string;
  customer: string;
  email: string;
  amount: number;
};

export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  const result = await sql<LatestInvoice>`
    SELECT id, amount, customers.name AS customer, customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5;
  `;
  return result.rows;
}

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

