import { type ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-gray-200 p-4">
      <h2 className="text-lg mb-4 text-gray-800">Product Details</h2>
      {children}
    </div>
  );
}
