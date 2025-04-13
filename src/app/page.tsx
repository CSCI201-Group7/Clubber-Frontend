import Image from "next/image";
import Club from "./components/club";

export default function Home() {
  const clubs = [
    {
      clubName: "Association of Indian Students",
      category: "Cultural",
      events: ["First GM", "Second GM"],
    },
    {
      clubName: "Chabad Jewish Student Center at USC",
      category: "Cultural",
      events: ["First GM", "Second GM"],
    },
    {
      clubName: "Hermanas Unidas de USC",
      category: "Cultural",
      events: ["First GM", "Second GM"],
    },
    {
      clubName: "Haute Magazine",
      category: "Art",
      events: ["First GM", "Photoshoot Day"],
    },
    {
      clubName: "advocaSC",
      category: "Social Justice",
      events: ["First GM", "Photoshoot Day"],
    },
  ];

  return (
    <div className="flex font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-2">
        {clubs.map((club, i) => {
          return <Club info={club} key={i} />;
        })}
      </div>
    </div>
  );
}
