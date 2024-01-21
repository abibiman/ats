import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import  { FC } from "react";
import SectionGridFleetCard from "./fleet";
import { Helmet } from "react-helmet";

import SectionHero3 from "components/SectionHero/SectionHero3";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";


import SectionClientSay from "components/SectionClientSay/SectionClientSay";


export interface ListingCarPageProps {
  className?: string;
}



const ListingFleetPage: FC<ListingCarPageProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-ListingCarPage relative overflow-hidden ${className}`}
      data-nc-id="ListingCarPage"
    >
      <Helmet>
        <title>Our Fleet || Abibiman Transportation</title>
      </Helmet>
      <BgGlassmorphism />




<div className="container relative">


{/* SECTION */}
<SectionGridFleetCard className="pb-24 lg:pb-28" />

</div>




      <div className="container relative">




        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />
      </div>
    </div>
  );
};

export default ListingFleetPage;
