import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 relative">
     
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-pink-300 opacity-30 blur-2xl rounded-full"></div>

      <SignIn redirectUrl="/dashboard" />
    </div>
  );
}
