"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white shadow-md">
        <div className="h-7 bg-usc-cardinal-red"></div>
        
        <div className="px-9 py-6">
          <h1 className="text-gray-900 text-2xl font-bold text-center mb-9">
            Welcome! Please sign in to continue.
          </h1>
          <form>
            <div className="mb-6">
              <label className="text-gray-700 text-lg font-medium mb-2">
                USC NetID
              </label>
              <input
                id="netId"
                type="text"
                className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-usc-cardinal-red text-gray-700"
                required
              />
            </div>
            <div className="mb-6">
              <label className="text-gray-700 text-lg font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-usc-cardinal-red text-gray-700"
                required
              />
            </div>
            
            <Link href="/">
              <button
                type="submit"
                className="text-white w-full py-3 bg-usc-cardinal-red font-medium rounded-md"
              >
                Sign in
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
