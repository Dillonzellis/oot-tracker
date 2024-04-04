import { Item } from "@/components/item";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getItemsByGame } from "@/db/queries";

export default async function Home() {
  const data = await getItemsByGame(1);

  return (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="scroll-m-20 pt-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          OOT Tracker
        </h1>
        <div className="flex gap-x-4">
          {data.map((item) => (
            <Item key={item.itemId} item={item} />
          ))}
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
