import React, { FC } from "react";
import { CarDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";

export interface CarCardHProps {
  className?: string;
  data?: CarDataType;
}

const CarCardH: FC<CarCardHProps> = ({ className = ""} ) => {


  const renderSliderGallery = () => {
    return (
      <div className="relative w-full flex items-center justify-center md:w-72 flex-shrink-0 border-r border-neutral-100 dark:border-neutral-800">
        <div className="w-full py-5 sm:py-0">
          <NcImage className="w-full" src="" />
        </div>
        <BtnLikeIcon className="absolute right-3 top-3" />
         <SaleOffBadge className="absolute left-3 top-3" />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold capitalize">
              <span className="line-clamp-1">

              </span>
            </h2>
          </div>
          <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span>· </span>
            <div className="flex items-center">
              <span className="hidden sm:inline-block  text-base">
                <i className="las la-map-marked"></i>
              </span>
              <span className="sm:ml-2 line-clamp-1"> {}</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        {/* SHOW MOBILE */}
        <div className="flex sm:hidden items-center text-sm text-neutral-500 dark:text-neutral-400 space-x-2 mt-4 sm:mt-0">
          <span>4 seats</span>
          <span>· </span>
          <span>Auto gearbox</span>
          <span>· </span>
          <span>4 seats</span>
        </div>
        {/* SHOW DESK */}
        <div className="hidden sm:flex items-center space-x-8">
          {/* --- */}
          <div className="flex items-center space-x-2">
            <i className="las la-user-friends text-xl"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              4 seats
            </span>
          </div>
          {/* --- */}
          <div className="flex items-center space-x-2">
            <i className="las la-dharmachakra text-xl"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Auto gearbox
            </span>
          </div>
          {/* --- */}
          <div className="flex items-center space-x-2">
            <i className="las la-suitcase text-xl"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              2 bags
            </span>
          </div>
        </div>

        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-3 text-sm text-neutral-700  dark:text-neutral-300">
            <span className="hidden sm:inline-block">
              <span className="hidden sm:inline">Car owner </span>{" "}
            </span>
          </div>
          <span className="text-lg font-semibold text-secondary-700">
            {` `}
            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
              /day
            </span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-CarCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
      data-nc-id="CarCardH"
    >

    </div>
  );
};

export default CarCardH;
