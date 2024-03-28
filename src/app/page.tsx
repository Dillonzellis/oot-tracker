import { Item } from "@/components/item";
import dekuStick from "/public/deku-stick.png";
import fairyOcarina from "/public/fairy-ocarina.png";
import ocarinaTime from "/public/ocarina-time.png";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Home() {
  return (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="scroll-m-20 pt-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          OOT Tracker
        </h1>
        <div className="flex gap-x-4">
          <Item imgSrc={dekuStick} />
          <Item imgSrc={fairyOcarina} />
          <Item imgSrc={ocarinaTime} />
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
