interface ClubInfo {
  clubName: string;
  category: string;
  events: string[];
}

export default function Club({ info }: { info: ClubInfo }) {
  return (
    <div className="bg-white text-black p-5 border drop-shadow-sm h-auto w-auto">
      <div className="flex gap-3 items-center pr-20">
        <div className="h-10 w-10 bg-pink-50 rounded-[50%] border"></div>
        <div>
          <p className="text-2xl">{info.clubName}</p>
          <p className="text-sm">
            <em>{info.category}</em>
          </p>
        </div>
      </div>
      <div className="text-sm">
        <p>Coming up:</p>
        {info.events.map((event, i) => (
          <p key={i}>{event}</p>
        ))}
      </div>
    </div>
  );
}
