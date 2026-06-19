import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white dark:bg-gray-900">
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-[600px]">{children}</div>
      </div>
    </div>
  );
}
