import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from 'next/cache';
const INVOICES_PER_PAGE = 8;

export type InvoiceWithCustomer = {
  id: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  date: string;
  status: "paid" | "pending";
};
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

export async function fetchRevenue(): Promise<Revenue[]> {
     noStore();
  const result = await sql<Revenue>`
    SELECT id, month, revenue
    FROM revenue
    ORDER BY id;
  `;
  return result.rows;
}

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
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
): Promise<InvoiceWithCustomer[]> {
  const offset = (currentPage - 1) * INVOICES_PER_PAGE;

  const result = await sql<InvoiceWithCustomer>`
    SELECT
      invoices.id,
      invoices.amount,
      invoices.status,
      invoices.date,
      customers.name   AS customer_name,
      customers.email  AS customer_email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${"%" + query + "%"}
      OR customers.email ILIKE ${"%" + query + "%"}
      OR invoices.id::text ILIKE ${"%" + query + "%"}
    ORDER BY invoices.date DESC
    LIMIT ${INVOICES_PER_PAGE}
    OFFSET ${offset};
  `;

  return result.rows;
}

export async function fetchInvoicesPages(query: string): Promise<number> {
  const result = await sql`
    SELECT COUNT(*)::int AS count
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${"%" + query + "%"}
      OR customers.email ILIKE ${"%" + query + "%"}
      OR invoices.id::text ILIKE ${"%" + query + "%"};
  `;

  const total = result.rows[0]?.count ?? 0;
  return Math.max(1, Math.ceil(total / INVOICES_PER_PAGE));
}
