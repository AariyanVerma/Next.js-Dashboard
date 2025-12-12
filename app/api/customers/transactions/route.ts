import { NextResponse } from "next/server";
import { fetchCustomerTransactions } from "@/app/lib/data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status") as 'paid' | 'pending' | null;

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const transactions = await fetchCustomerTransactions(
      email,
      status || undefined
    );

    if (!Array.isArray(transactions)) {
      return NextResponse.json([]);
    }

    return NextResponse.json(transactions);
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json([]);
  }
}

