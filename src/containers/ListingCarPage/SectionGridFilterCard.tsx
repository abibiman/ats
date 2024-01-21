import { FC, useEffect, useState } from "react";
import { CarDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import Heading2 from "components/Heading/Heading2";
import CarCard from "components/CarCard/CarCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import axios from "axios";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: CarDataType[];

}


const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
}) => {

  const [fleet, setFleet] = useState<CarDataType[]>([]);
  useEffect(()=> {
    axios.get("https://us-central1-abibiman-transportation.cloudfunctions.net/api/v1/fleet")
    .then(res => {
      setFleet(res.data)
    })
  },[])
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        heading="Our Fleet"
      />

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {fleet.slice(0,8).map((car) => (
          
          <CarCard key={car.id} datas={car}  />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
      <ButtonPrimary href={"/all-fleet"}>All Available Vehicles</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
