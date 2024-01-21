import { Tab } from "@headlessui/react";
import CarCard from "components/CarCard/CarCard";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import StayCard from "components/StayCard/StayCard";
import {

  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "data/listings";
import React, { Fragment, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";

const AccountSavelists = () => {
  let [categories] = useState(["Stays", "Experiences", "Cars"]);

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">My Invoices</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>


      </div>
    );
  };

  return (
    <div>
      <CommonLayout>{renderSection1()}</CommonLayout>
    </div>
  );
};

export default AccountSavelists;
