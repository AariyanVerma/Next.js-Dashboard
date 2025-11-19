type Props = {
  status: "paid" | "pending";
};

export default function InvoiceStatus({ status }: Props) {
  const isPaid = status === "paid";

  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
        (isPaid
          ? "bg-green-50 text-green-700"
          : "bg-yellow-50 text-yellow-700")
      }
    >
      <span
        className={
          "mr-1 h-1.5 w-1.5 rounded-full " +
          (isPaid ? "bg-green-500" : "bg-yellow-500")
        }
      />
      {isPaid ? "Paid" : "Pending"}
    </span>
  );
}
