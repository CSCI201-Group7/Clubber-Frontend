"use client";

// import { useEffect, useState } from "react";
interface ClubInfo {
  clubName: string;
  category: string;
  events: string[];
  description?: string;
  rating: number;
  logo: string;
  reviews: {
    title: string;
    reviewDescription: string;
    rate: number;
  }[];
}

interface ClubRecommendationItemProps {
  clubInfo: ClubInfo;
}

export default function ClubRecommendationItem({
  clubInfo,
}: ClubRecommendationItemProps) {
  // const [organizationId, setOrganizationId] = useState<OrganizationId>(clubId);

  // useEffect(() => {
  //     setOrganizationId(clubId);
  // }, [clubId]);

  const handleClick = () => {
    // Navigate to club page with the club data
    const queryParams = new URLSearchParams({
      name: clubInfo.clubName,
      category: clubInfo.category,
      events: JSON.stringify(clubInfo.events),
      description: clubInfo.description || "",
      rating: clubInfo.rating.toString(),
      logo: clubInfo.logo,
      reviews: JSON.stringify(clubInfo.reviews),
    }).toString();

    window.location.href = `/pages/club?${queryParams}`;
  };

  return (
    <div
      className="w-[250px] h-auto bg-gray-200 rounded-lg grid relatives text-black p-3 cursor-pointer hover:bg-gray-300 transition-colors"
      onClick={handleClick}
    >
      <div className="flex gap-3 items-center">
        <img
          src={clubInfo.logo || "/anon.png"}
          alt="Club Logo"
          className="h-10 w-10 rounded-[50%] border"
        />
        <div>
          <p className="text-2xl">{clubInfo.clubName}</p>
          <p className="text-sm">
            <em>{clubInfo.category}</em>
          </p>
        </div>
      </div>
      <div className="text-sm">
        <p>Events coming up:</p>
        {clubInfo.events.slice(0, 2).map((event, i) => (
          <p key={i}>{event}</p>
        ))}
      </div>
    </div>
  );
}
