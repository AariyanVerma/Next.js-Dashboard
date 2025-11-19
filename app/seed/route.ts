import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    // Create tables if not exist
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES customers(id),
        amount INTEGER,
        status VARCHAR(255),
        date DATE
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS revenue (
        id SERIAL PRIMARY KEY,
        month VARCHAR(255),
        revenue INTEGER
      );
    `;

    // Insert sample customers
    await sql`
      INSERT INTO customers (name, email) VALUES
      ('Alice Johnson', 'alice@example.com'),
      ('Bob Smith', 'bob@example.com'),
      ('Charlie Rose', 'charlie@example.com')
    ON CONFLICT DO NOTHING;
    `;

    // Insert sample invoices
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES
      (1, 500, 'paid', '2023-01-10'),
      (2, 150, 'pending', '2023-02-05'),
      (3, 800, 'paid', '2023-02-20')
    ON CONFLICT DO NOTHING;
    `;

    // Insert sample revenue
    await sql`
      INSERT INTO revenue (month, revenue)
      VALUES
      ('January', 5000),
      ('February', 7000),
      ('March', 8000)
    ON CONFLICT DO NOTHING;
    `;

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
