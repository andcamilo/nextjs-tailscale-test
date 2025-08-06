import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-4">Next.js + Drizzle Demo</h1>
          <p className="text-lg text-gray-600 mb-6">
            Connected to PostgreSQL database with user and post management
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/users"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Manage Users
          </Link>
          <Link
            href="/posts"
            className="rounded-full border border-solid border-blue-600 text-blue-600 transition-colors flex items-center justify-center hover:bg-blue-50 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
          >
            Manage Posts
          </Link>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/users"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="Users icon"
            width={16}
            height={16}
          />
          Users
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/posts"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Posts icon"
            width={16}
            height={16}
          />
          Posts
        </Link>
      </footer>
    </div>
  );
}
