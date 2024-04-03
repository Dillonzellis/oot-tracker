import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="border-b py-4">
      <MaxWidthWrapper className="">
        <div className="flex items-center justify-between">
          <Link href="/">TrackerHub</Link>
          <UserButton />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
