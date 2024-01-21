import Heading from "components/Heading/Heading";
import React from "react";
import NcImage from "shared/NcImage/NcImage";
import f1 from '../../images/f3.jpeg'
import f2 from '../../images/founder3.jpeg'
import f from '../../images/IMG_3437.jpg'

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Dr Collins Kwarteng`,
    job: "Founder and Chief Executive",
    avatar:
      "https://i.pinimg.com/280x280_RS/72/83/00/728300b9e3b894ac4805de5f2d8bdd43.jpg",
  },
  {
    id: "4",
    name: `Danien Jame`,
    job: "Head Of Operations",
    avatar: f1  },
  {
    id: "3",
    name: `Rachael Asiedu`,
    job: "Lead, Customer Relations",
    avatar: f2  },
  {
    id: "2",
    name: `Michael Tetteh`,
    job: "Safety Officer",
    avatar:f  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="We’re impartial and independent, and every day we create distinctive,
          world-class programmes and content"
      >
        ⛱ Founder
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={item.avatar}
            />
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
