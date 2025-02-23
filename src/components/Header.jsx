import React from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full py-4 px-8 bg-white shadow-sm border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
        Creator Automation
      </h2>
      <div className="flex gap-4">
        <SignInButton className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition shadow-md" />
        <SignUpButton className="px-6 py-2 bg-white text-black border border-black rounded-full font-medium hover:bg-gray-100 transition shadow-md" />
      </div>
    </header>
  );
}
