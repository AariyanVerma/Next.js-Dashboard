import Link from "next/link";
import NavLinks from "./nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-20 items-center justify-center border-b border-gray-200 bg-blue-600">
        <span className="text-2xl font-semibold text-white">Chefora</span>
      </div>

      <div className="flex-1 px-4 py-6">
        <NavLinks />
      </div>

      <div className="border-t border-gray-200 px-4 py-4">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          <PowerIcon className="h-5 w-5" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}
