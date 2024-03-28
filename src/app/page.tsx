import { Item } from "@/components/item";
import dekuStick from "/public/deku-stick.png";
import fairyOcarina from "/public/fairy-ocarina.png";
import ocarinaTime from "/public/ocarina-time.png";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getItems } from "../../db/queries";

export default async function Home() {
  const data = await getItems();

  return (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="scroll-m-20 pt-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          OOT Tracker
        </h1>
        {/* <div className="flex gap-x-4"> */}
        {/*   <Item imgSrc={dekuStick} /> */}
        {/*   <Item imgSrc={fairyOcarina} /> */}
        {/*   <Item imgSrc={ocarinaTime} /> */}
        <Item imgSrc={data[0].imageSrc} active={data[0].active} />
        {/* </div> */}
        {JSON.stringify(data[0].title)}
      </MaxWidthWrapper>
    </main>
  );
}
