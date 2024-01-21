import React, { FC } from "react";
import { CarDataType } from "data/types";
import { Link } from "react-router-dom";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import NcImage from "shared/NcImage/NcImage";

export interface CarCardProps {
  className?: string;
  datas?: CarDataType;
  size?: "default" | "small";
}



const CarCard: FC<CarCardProps> = ({
  size = "default",
  className = "",
  datas = { // provide a default value for datas
    id: "", 
    data: {
      carName: "",
      pricePerDay: "",
      image: "",
      gearBox: "",
      seats: "",
      currency:''

    }
  },
}) => {
  const {
    id,data
  } = datas;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 ">
          <NcImage
            containerClassName="flex items-center justify-center"
            className="w-full"
            src={data.image}
          />
        </div>
       <SaleOffBadge className="absolute left-3 top-3" />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2
              className={`  capitalize ${
                size === "default"
                  ? "text-xl font-semibold"
                  : "text-base font-medium"
              }`}
            >
              <span className="line-clamp-1">{data.carName}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            <span className="">{data.seats} seats</span>
            <span>-</span>
            <span className="">{data.gearBox} </span>
          </div>
        </div>
        <div className="w-14  border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {data.currency==='USD'?`$`:data.currency==="GHC"?`GH₵ `:<a></a>} 
            {data.pricePerDay}.00
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /day
              </span>
            )}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 will-change-transform ${className}`}
      data-nc-id="CarCard"
    >
      <Link to={`/listing-car-detail/${id}`} className="flex flex-col">
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default CarCard;
