import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-xl font-bold mb-4">Work Not Found</h2>
      <p className="mb-4">The requested work could not be found.</p>
      <Link href="/works" className="underline">
        Return to Works
      </Link>
    </div>
  );
} 