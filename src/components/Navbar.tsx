import Link from "next/link";

export function Navbar({ signedIn }: { signedIn: boolean }) {
  return (
    <nav className="flex w-full flex-row items-center justify-between p-4">
      <h1 className="text-2xl uppercase tracking-widest">
        <Link href="/">CleanSweep</Link>
      </h1>
      <ul className="flex w-full flex-row flex-wrap items-center justify-end gap-x-8 text-xl">
        <li>
          <Link href="/pickups">Pickups</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/leaderboard">Leaderboard</Link>
        </li>
        {signedIn ? (
          <li
            dangerouslySetInnerHTML={{
              __html: `<a href="/profile"><svg style="width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></a>`,
            }}
          />
        ) : (
          <Link href="/signup" className="rounded-lg bg-blue-500 p-2">
            Get Started
          </Link>
        )}
      </ul>
    </nav>
  );
}
