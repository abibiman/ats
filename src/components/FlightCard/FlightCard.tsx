import axios from "axios";
import React, { FC, useState,useEffect } from "react";

export interface FlightCardProps {
  className?: string;
  defaultOpen?: boolean;
  data: {
    id: string;
    data: {
      passengers:string;
      endDate:string;
      fullName:string;
      dropoffLocation:string;
      pickupLocation:string;
      type:string;
      message:string;
      dateCreated:string;
      phone:string;
      vehicleID:string;
      freeRun:string;
      email:string;
      startDate:string;
      price:string;
      numberOfDays:string;
      currency:string;
      agentName:string;
      agentPhone:string;
      status:string;
      reserveID:string;


    }
  };
}

interface Car {
  image: string;
  carName: string;
  description: string;
  services: [],
  seats:'',
  pricePerDay:'',
  specialFeatures:[],
  topSpeed:'',
  model:'',
  year:'',
  gearBox:'',
  brand:'',
  make:'',
  currency:""


  // Add other properties as needed
}

const FlightCard: FC<FlightCardProps> = ({
  className = "",
  data,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [car, setCar] = useState<Car>({ currency:'',image: "",carName:'',description:'',services:[],seats:'',pricePerDay:'',specialFeatures:[],topSpeed:'',model:'',year:'',make:'',gearBox:'',brand:'' });


  useEffect(()=> {
    console.log(data.data.vehicleID)
    axios.get(`https://us-central1-abibiman-transportation.cloudfunctions.net/api/v1/fleet/${data.data.vehicleID}`)
    .then(res  => {
      setCar(res.data)
    })
    .catch(error => {
      console.error("AxiosError:", error);
      // Handle the error here
    });
  },[])

  const jsonDate = (x:string) => {
    const date = new Date(x);

      // Define month names
      const monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
      ];

      // Get the day, month, and year from the Date object
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      // Format the date in the desired format
      const formattedDate = `${day} ${monthNames[monthIndex]}, ${year}`;
      return formattedDate

  }

  const renderDetailTop = () => {
    return (
      <div>
        <div className="flex flex-col md:flex-row ">
          <div className="w-24 md:w-20 lg:w-24 flex-shrink-0 md:pt-7">
            <img src={car.image} className="w-10" alt="" />
          </div>
          <div className="flex my-5 md:my-0">
            <div className="ml-4 space-y-10 text-sm">
              <div className="flex flex-col space-y-1">
                <span className=" text-neutral-500 dark:text-neutral-400">
                  {data.data.passengers}
                </span>
                <span className=" font-semibold">
                  Passengers
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className=" text-neutral-500 dark:text-neutral-400">
                  {data.data.type}
                </span>
                <span className=" font-semibold">
                  Purpose
                </span>
              </div>
            </div>
          </div>
          <div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
          <ul className="text-sm text-neutral-500 dark:text-neutral-400 space-y-1 md:space-y-2">
            <li>Assigned Agent:  <strong>{data.data.agentName}</strong></li>
            <li>Agent Phone:     <strong>{data.data.agentPhone}</strong> </li>
            <li>Request Date:     <strong>{jsonDate(data.data.dateCreated)}</strong> </li>
            <li>Price Per Day:     <strong>              {data.data.currency==="USD"?"$":"GH₵"}{car.pricePerDay}.00</strong> </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    if (isOpen) return null;
    return (
      <div className="p-4 md:p-8 border border-neutral-200 dark:border-neutral-700 rounded-2xl ">
        {renderDetailTop()}
        <div className="my-7 md:my-10 space-y-5 md:pl-24">
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
          <div className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            <h1>{data.data.status}</h1>
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
        </div>
      </div>
    );
  };

  const getDate = (x:string) => {
    const date = new Date(x);
    return date
  }

  return (
    <div
      className={`nc-FlightCardgroup p-4 sm:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6 ${className}`}
      data-nc-id="FlightCard"
    >
      <div
        className={` sm:pr-20 relative  ${className}`}
        data-nc-id="FlightCard"
      >
        {/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="##" className="absolute inset-0" />

        <span
          className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
            isOpen ? "transform -rotate-180" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="text-xl las la-angle-down"></i>
        </span>

        <div className="flex  flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
          {/* LOGO IMG */}
          <div className="w-24 lg:w-32 flex-shrink-0">
            <img src={car.image} className="w-10" alt="" />
          </div>

          {/* FOR MOBILE RESPONSIVE */}
          <div className="block lg:hidden space-y-1">
            <div className="flex font-semibold">
              <div>
                <span>{car.carName}</span>
                <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
                  {car.model}
                </span>
              </div>
            </div>

            <div className="flex font-semibold">
              <div>
                <span>Pickup Date</span>
                <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
                  {data.data.startDate}
                </span>
              </div>
            </div>

            <div className="flex font-semibold">
              <div>
                <span>Pickup Location</span>
                <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
                  {data.data.pickupLocation}
                </span>
              </div>
            </div>
          </div>

          {/* TIME - NAME */}
          <div className="hidden lg:block  min-w-[150px] flex-[4] ">
            <div className="font-medium text-lg">{car.carName}</div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              {car.model}
            </div>
          </div>

          {/* TIMME */}
          <div className="hidden lg:block flex-[4] whitespace-nowrap">
            <div className="font-medium text-lg"> Pick Up Date </div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
            {getDate(data.data.startDate).toLocaleDateString()}
            </div>
          </div>

          {/* TYPE */}
          <div className="hidden lg:block flex-[4] whitespace-nowrap">
            <div className="font-medium text-lg">Pickup Location</div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              {data.data.pickupLocation}
            </div>
          </div>

          {/* PRICE */}
          <div className="flex-[4] whitespace-nowrap sm:text-right">
            <div>
              <span className="text-xl font-semibold text-secondary-6000">
              {data.data.currency==="USD"?"$":"GH₵"}{data.data.price}.00
              </span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
             {data.data.numberOfDays} days
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL */}
      {renderDetail()}
    </div>
  );
};

export default FlightCard;
