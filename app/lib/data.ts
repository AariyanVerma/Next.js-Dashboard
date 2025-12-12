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

export type Customer = {
  id: string;
  name: string;
  email: string;
};

export async function fetchCustomers(): Promise<Customer[]> {
  const result = await sql<Customer>`
    SELECT id, name, email
    FROM customers
    ORDER BY name ASC
  `;
  return result.rows;
}

export type CustomerWithStats = {
  id: string;
  name: string;
  email: string;
  image_url: string | null;
  status: 'paid' | 'pending' | null;
  total_invoices: number;
  total_amount: number;
  date: string | null;
};

export type CustomerTransaction = {
  id: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  invoice_id: string;
  amount: number;
  status: 'paid' | 'pending';
  date: string;
};

const CUSTOMERS_PER_PAGE = 16;

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number,
  dateFilter?: string,
): Promise<CustomerWithStats[]> {
  noStore();
  const offset = (currentPage - 1) * CUSTOMERS_PER_PAGE;

  if (dateFilter) {
    const result = await sql<CustomerWithStats>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        NULL::text AS image_url,
        invoices.status::text AS status,
        COUNT(*)::int AS total_invoices,
        COALESCE(SUM(invoices.amount), 0)::int AS total_amount,
        invoices.date::text AS date
      FROM customers
      INNER JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        (customers.name ILIKE ${"%" + query + "%"}
        OR customers.email ILIKE ${"%" + query + "%"})
        AND invoices.date::text = ${dateFilter}
        AND invoices.status IN ('paid', 'pending')
      GROUP BY customers.id, customers.name, customers.email, invoices.status, invoices.date
      HAVING COUNT(*) > 0
      ORDER BY customers.name ASC, invoices.status ASC, invoices.date DESC
      LIMIT ${CUSTOMERS_PER_PAGE}
      OFFSET ${offset};
    `;
    return result.rows;
  }

  const result = await sql<CustomerWithStats>`
    SELECT
      MIN(customers.id) AS id,
      MIN(customers.name) AS name,
      customers.email,
      NULL::text AS image_url,
      invoices.status::text AS status,
      COUNT(*)::int AS total_invoices,
      COALESCE(SUM(invoices.amount), 0)::int AS total_amount,
      NULL::text AS date
    FROM customers
    INNER JOIN invoices ON customers.id = invoices.customer_id
    WHERE
      (customers.name ILIKE ${"%" + query + "%"}
      OR customers.email ILIKE ${"%" + query + "%"})
      AND invoices.status IN ('paid', 'pending')
    GROUP BY customers.email, invoices.status
    HAVING COUNT(*) > 0
    ORDER BY MIN(customers.name) ASC, 
      CASE WHEN invoices.status = 'paid' THEN 1 
           WHEN invoices.status = 'pending' THEN 2 
           ELSE 3 END
    LIMIT ${CUSTOMERS_PER_PAGE}
    OFFSET ${offset};
  `;

  return result.rows;
}

export async function fetchCustomersPages(query: string, dateFilter?: string): Promise<number> {
  noStore();
  
  if (dateFilter) {
    const result = await sql`
      SELECT COUNT(DISTINCT customers.id)::int AS count
      FROM customers
      INNER JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        (customers.name ILIKE ${"%" + query + "%"}
        OR customers.email ILIKE ${"%" + query + "%"})
        AND invoices.date::text = ${dateFilter};
    `;
    const total = result.rows[0]?.count ?? 0;
    return Math.max(1, Math.ceil(total / CUSTOMERS_PER_PAGE));
  }

  const result = await sql`
    SELECT COUNT(*)::int AS count
    FROM (
      SELECT customers.email, invoices.status
      FROM customers
      INNER JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        (customers.name ILIKE ${"%" + query + "%"}
        OR customers.email ILIKE ${"%" + query + "%"})
        AND invoices.status IN ('paid', 'pending')
      GROUP BY customers.email, invoices.status
    ) AS grouped;
  `;

  const total = result.rows[0]?.count ?? 0;
  return Math.max(1, Math.ceil(total / CUSTOMERS_PER_PAGE));
}

export async function fetchCustomerTransactions(
  customerEmail: string,
  status?: 'paid' | 'pending',
): Promise<CustomerTransaction[]> {
  noStore();
  
  try {
    let query;
    if (status) {
      query = sql<CustomerTransaction>`
        SELECT
          customers.id::text AS id,
          customers.id::text AS customer_id,
          customers.name AS customer_name,
          customers.email AS customer_email,
          invoices.id::text AS invoice_id,
          invoices.amount,
          invoices.status::text AS status,
          invoices.date::text AS date
        FROM customers
        INNER JOIN invoices ON customers.id = invoices.customer_id
        WHERE
          customers.email = ${customerEmail}
          AND invoices.status = ${status}
        ORDER BY invoices.date DESC, invoices.id DESC;
      `;
    } else {
      query = sql<CustomerTransaction>`
        SELECT
          customers.id::text AS id,
          customers.id::text AS customer_id,
          customers.name AS customer_name,
          customers.email AS customer_email,
          invoices.id::text AS invoice_id,
          invoices.amount,
          invoices.status::text AS status,
          invoices.date::text AS date
        FROM customers
        INNER JOIN invoices ON customers.id = invoices.customer_id
        WHERE
          customers.email = ${customerEmail}
        ORDER BY invoices.date DESC, invoices.id DESC;
      `;
    }
    
    const result = await query;
    return result.rows;
  } catch (error) {
    console.error('Error in fetchCustomerTransactions:', error);
    return [];
  }
}

export type RevenueTotals = {
  totalPaid: number;
  totalPending: number;
  totalPaidInvoices: number;
  totalPendingInvoices: number;
};

export async function fetchRevenueTotals(): Promise<RevenueTotals> {
  noStore();
  
  try {
    const result = await sql<{
      status: string;
      total_amount: number;
      total_invoices: number;
    }>`
      SELECT
        invoices.status::text AS status,
        COALESCE(SUM(invoices.amount), 0)::int AS total_amount,
        COUNT(*)::int AS total_invoices
      FROM invoices
      WHERE invoices.status IN ('paid', 'pending')
      GROUP BY invoices.status;
    `;
    
    const paidRow = result.rows.find(r => r.status === 'paid');
    const pendingRow = result.rows.find(r => r.status === 'pending');
    
    return {
      totalPaid: paidRow?.total_amount ?? 0,
      totalPending: pendingRow?.total_amount ?? 0,
      totalPaidInvoices: paidRow?.total_invoices ?? 0,
      totalPendingInvoices: pendingRow?.total_invoices ?? 0,
    };
  } catch (error) {
    console.error('Error in fetchRevenueTotals:', error);
    return {
      totalPaid: 0,
      totalPending: 0,
      totalPaidInvoices: 0,
      totalPendingInvoices: 0,
    };
  }
}