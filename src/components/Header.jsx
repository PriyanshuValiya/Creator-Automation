import React from 'react';
import { SignInButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <h2 className="text-xl font-bold">Creator Automation</h2>
      <SignInButton  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" />
    </div>
  );
}