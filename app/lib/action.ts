"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const FormSchema = z.object({
  id: z.string(),

  customerId: z
    .string()
    .min(1, { message: "Please select a customer." }),

  amount: z.coerce
    .number()
    .gt(0, { message: "Amount must be greater than 0." }),

  status: z.enum(["pending", "paid"]),

  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};


export async function createInvoice(
  prevState: State,
  formData: FormData
): Promise<State> {
  const raw = {
    customerId: formData.get("customerId"),
    amount: Number(formData.get("amount")),
    status: formData.get("status"),
  };

  const parsed = CreateInvoice.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      errors: {
        customerId: flat.fieldErrors.customerId,
        amount: flat.fieldErrors.amount,
        status: flat.fieldErrors.status,
      },
      message: "Please correct the errors below.",
    };
  }

  const { customerId, amount, status } = parsed.data;

  const id = crypto.randomUUID(); 
  const date = new Date().toISOString().split("T")[0];
  const amountInCents = Math.round(amount * 100);

  try {
    await sql`
      INSERT INTO invoices (id, customer_id, amount, status, date)
      VALUES (${id}, ${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.error("DB error while creating invoice:", error);
    return {
      message: "Database Error: Failed to create invoice.",
    };
  }

  revalidatePath("/invoices");
  redirect("/invoices");
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const raw = {
    customerId: formData.get("customerId"),
    amount: Number(formData.get("amount")),
    status: formData.get("status"),
  };

  const parsed = UpdateInvoice.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      errors: {
        customerId: flat.fieldErrors.customerId,
        amount: flat.fieldErrors.amount,
        status: flat.fieldErrors.status,
      },
      message: "Please correct the errors below.",
    };
  }

  const { customerId, amount, status } = parsed.data;

  const amountInCents = Math.round(amount * 100);
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId},
          amount = ${amountInCents},
          status = ${status},
          date = ${date}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("DB error while updating invoice:", error);
    return {
      message: "Database Error: Failed to update invoice.",
    };
  }

  revalidatePath("/invoices");
  redirect("/invoices");
}

export async function deleteInvoice(id: string): Promise<void> {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.error("Database Error (deleteInvoice):", error);
    throw new Error("Database Error: Failed to delete invoice.");
  }

  revalidatePath("/invoices");
}
