"use client";

// import { useEffect, useState } from "react";
interface ClubInfo {
  clubName: string;
  category: string;
  events: string[];
}

export default function ClubRecommendationItem() {
  // const [organizationId, setOrganizationId] = useState<OrganizationId>(clubId);

  // useEffect(() => {
  //     setOrganizationId(clubId);
  // }, [clubId]);

  return (
    <div className="w-[250px] h-[120px] bg-gray-200 rounded-lg grid relatives text-black p-3">
      <div className="flex gap-3 items-center">
        <div className="h-10 w-10 bg-pink-50 rounded-[50%] border"></div>
        <div>
          <p className="text-2xl">Club Name</p>
          <p className="text-sm">
            <em>Category</em>
          </p>
        </div>
      </div>
      <div className="text-sm">
        <p>Coming up:</p>

        {/* {info.events.map((event, i) => (
          <p key={i}>{event}</p>
        ))} */}
      </div>
    </div>
  );
}
