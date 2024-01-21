import React from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";
import SectionGridFilterCard from "containers/ListingFlightsPage/SectionGridFilterCard";

const AccountBilling = () => {
  return (
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">My Reservations</h2>

          <div className="container relative">
        {/* SECTION HERO */}


        {/* SECTION */}
        <SectionGridFilterCard/>

      </div>

        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountBilling;
