import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";

type GameLinkProps = {
  href: string;
  children: React.ReactNode;
};

const GameLink = ({ href, children }: GameLinkProps) => {
  return (
    <Link href={href} className="text-xl font-medium">
      {children}
    </Link>
  );
};

export default function Home() {
  return (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="py-12 text-center text-2xl font-bold">Pick a game</h1>
        <div className="flex justify-center gap-12">
          <GameLink href="/oot">Ocarina of Time</GameLink>
          <GameLink href="/mm">Majora's Mask</GameLink>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
