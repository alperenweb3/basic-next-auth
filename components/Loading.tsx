'use client';
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    </div>
  );
}
