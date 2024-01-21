import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import  { FC } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";

import SectionHero3 from "components/SectionHero/SectionHero3";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";


import SectionClientSay from "components/SectionClientSay/SectionClientSay";


export interface ListingCarPageProps {
  className?: string;
}



const ListingCarPage: FC<ListingCarPageProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-ListingCarPage relative overflow-hidden ${className}`}
      data-nc-id="ListingCarPage"
    >
      <Helmet>
        <title>Abibiman Transportation</title>
      </Helmet>
      <BgGlassmorphism />

{/* SECTION HERO */}
<div className="container px-1 sm:px-4 mb-24 ">
  <SectionHero3 className="" />
</div>


<div className="container relative">


{/* SECTION */}
<SectionGridFilterCard className="pb-24 lg:pb-28" />

</div>

<div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}

        {/* SECTION2 */}
        <SectionOurFeatures />
        {/* SECTION */}
        {/* <SectionHowItWork /> */}



        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div>
      </div>


      <div className="container relative">




        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />
      </div>
    </div>
  );
};

export default ListingCarPage;
