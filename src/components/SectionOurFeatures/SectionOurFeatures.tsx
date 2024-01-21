import React, { FC } from "react";
import rightImgPng from "images/imageFor.jpg";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          Abibiman Transportation Services
        </span>
        <h2 className="font-semibold text-4xl mt-5">Why Us? </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="High Quality Service" />
            <span className="block text-xl font-semibold">
            Highly Trained and Professional Drivers
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
            Whether it's offering recommendations for local attractions or providing a warm welcome, our drivers are your trusted guides.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Safety " />
            <span className="block text-xl font-semibold">
            Vehicles in Pristine Condition for Your Safety
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
            Your safety is our utmost priority. We go beyond maintaining our vehicles for appearances;
             we invest in cutting-edge technology and rigorous inspections to ensure your well-being throughout the journey. From airbags to safety systems,
            we ensure that every safety feature in our vehicles is in perfect working order.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
