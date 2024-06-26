import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="border-b py-4">
      <MaxWidthWrapper className="">
        <div className="flex items-center justify-between">
          <div className="space-x-4">
            <Link href="/">TrackerHub</Link>
            <Link href="/games">Games</Link>
          </div>
          <UserButton />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
