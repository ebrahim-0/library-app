"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6 w-[320px] sm:w-[450px]">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <div>
          Role: <span className="font-bold">{session?.user?._doc?.role}</span>
        </div>
        <button onClick={() => signOut()} className="red_btn mt-3">
          Log Out
        </button>
      </div>
    </div>
  );
}
