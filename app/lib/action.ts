'use server';

import { sql } from '@vercel/postgres'; 
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createInvoice(formData: FormData) {
  const customerId = formData.get('customerId') as string;
  const amountRaw = formData.get('amount') as string;
  const status = formData.get('status') as 'pending' | 'paid';
  if (!customerId || !amountRaw || !status) {
    throw new Error('Missing required fields');
  }
  const amount = Math.round(Number(amountRaw) * 100); 
  const date = new Date().toISOString().split('T')[0]; 
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status}, ${date})
  `;
  revalidatePath('/invoices');
  redirect('/invoices');
}
