import React from "react";

function Loader() {
  return (
    <div className="w-full h-max rounded-2xl shadow dark:shadow-amber-50 px-5 py-4 animate-pulse">
      {/* Image placeholder — same structure as Image */}
      <div className="w-auto max-h-40 mx-auto mb-3">
        <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-md" />
      </div>

      {/* Spacer (py-3) */}
      <div className="py-3" />

      {/* Category + Rating */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-5 w-[110px] bg-blue-200 dark:bg-blue-900 rounded-sm" />
        <div className="h-5 w-[70px] bg-gray-200 dark:bg-gray-600 rounded-sm" />
      </div>

      {/* Price */}
      <div className="py-2">
        <div className="h-4 w-[80px] bg-gray-300 dark:bg-gray-600 rounded" />
      </div>

      {/* Title */}
      <div className="h-6 w-3/4 bg-gray-400 dark:bg-gray-500 rounded mb-4" />

      {/* Button */}
      <div className="h-8 w-[110px] rounded shadow dark:shadow-white bg-gray-300 dark:bg-zinc-800" />
    </div>
  );
}

export { Loader };

export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
    </div>
  );
}
