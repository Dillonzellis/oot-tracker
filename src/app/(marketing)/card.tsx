import Image from "next/image";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
};

export const Card = ({ title, id, imageSrc, onClick }: Props) => {
  return (
    <div className="" onClick={() => onClick(id)}>
      <Image src={imageSrc} alt="mascot" width={150} height={150} />
      <p className="text-center text-2xl font-bold">{title}</p>
    </div>
  );
};
