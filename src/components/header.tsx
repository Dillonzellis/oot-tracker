import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="border-b py-4">
      <MaxWidthWrapper className="">
        <div className="flex items-center justify-between">
          <Link href="/">TrackerHub</Link>

          {/* TODO: use clerk components for loading and signin/signout */}
          <UserButton />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
