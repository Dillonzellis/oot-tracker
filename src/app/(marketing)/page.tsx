import Link from "next/link";
import { Loader } from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import MaxWidthWrapper from "@/components/max-width-wrapper";

export default async function MarketingHome() {
  return (
    <main>
      <MaxWidthWrapper>
        <div className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center gap-8">
          <h1 className="text-center text-3xl text-white">
            Welcome to the Game Library
          </h1>
          <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
            <ClerkLoading>
              <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton
                  mode="modal"
                  afterSignInUrl="/games"
                  afterSignUpUrl="/games"
                >
                  <Button size="lg" variant="secondary" className="w-full">
                    Get Started
                  </Button>
                </SignUpButton>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/games"
                  afterSignUpUrl="/games"
                >
                  <Button size="lg" variant="outline" className="w-full">
                    I already have an account
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full"
                  asChild
                >
                  <Link href="/games">Continue Current Randomizer</Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
