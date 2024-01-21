/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { FC,useState,useEffect } from "react";

import Badge from "shared/Badge/Badge";
import LikeSaveBtns from "components/LikeSaveBtns";

import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import DetailPagetLayout from "../Layout";

import axios from 'axios'
import { useParams } from "react-router-dom";
import FormItem from "containers/PageAddListing1/FormItem";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import NcInputNumber from "components/NcInputNumber/NcInputNumber";





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

interface FormState {
  pickupLocation: string;
  numberOfPassengers: string;
  pickupDate: string;
}

const ListingCarDetail: FC<{}> = () => {

  const [value, setValue] = React.useState("")
  
  const [valueT, setValueT] = React.useState("")
  const [inputNumberValue, setInputNumberValue] = useState<number>(1); 
  const [formState, setFormState] = useState<FormState>({
    pickupLocation: "",
    numberOfPassengers: "",
    pickupDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const {id} = useParams()

  const [car, setCar] = useState<Car>({ currency:'',image: "",carName:'',description:'',services:[],seats:'',pricePerDay:'',specialFeatures:[],topSpeed:'',model:'',year:'',make:'',gearBox:'',brand:'' });
  // USE STATE

  useEffect(()=>{
    axios.get(`https://us-central1-abibiman-transportation.cloudfunctions.net/api/v1/fleet/${id}`)
    .then(res=>{
      setCar(res.data)
    })
  },[])



  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge color="pink" name={car.brand} />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {car.carName}
        </h2>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-user-friends text-2xl"></i>
            <span className="">{car.seats} seats</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-dharmachakra text-2xl"></i>
            <span className=""> Automatic</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-calendar text-2xl"></i>
            <span className=""> {car.model}</span>
          </div>
        </div>
      </div>
    );
  };

  //
  const renderSectionTienIch = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">
            Vehicle parameters & utilities{" "}
          </h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 ">
          {/* TIEN ICH 1 */}
          {car.specialFeatures.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 ">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    const apiHtml = car.description  
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Description</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div
          className="text-neutral-6000 dark:text-neutral-300"
          dangerouslySetInnerHTML={{ __html: apiHtml }}
        ></div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Include </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Included in the price
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {car.services
            .filter((_, i) => i < 12)
            .map((item) => (
              <div key={item} className="flex items-center space-x-3">
                <i className="las la-check-circle text-2xl"></i>
                <span>{item}</span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  // const renderSection5 = () => {
  //   return (
  //     <div className="listingSection__wrap">
  //       {/* HEADING */}
  //       <h2 className="text-2xl font-semibold">Car Owner</h2>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

  //       {/* host */}
  //       <div className="flex items-center space-x-4">
  //         <Avatar
  //           hasChecked
  //           hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
  //           sizeClass="h-14 w-14"
  //           radius="rounded-full"
  //         />
  //         <div>
  //           <a className="block text-xl font-medium" href="##">
  //             Kevin Francis
  //           </a>
  //           <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
  //             <StartRating />
  //             <span className="mx-2">·</span>
  //             <span> 12 places</span>
  //           </div>
  //         </div>
  //       </div>

  //       {/* desc */}
  //       <span className="block text-neutral-6000 dark:text-neutral-300">
  //         Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
  //         accommodation, an outdoor swimming pool, a bar, a shared lounge, a
  //         garden and barbecue facilities...
  //       </span>

  //       {/* info */}
  //       <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
  //         <div className="flex items-center space-x-3">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-6 w-6"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={1.5}
  //               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  //             />
  //           </svg>
  //           <span>Joined in March 2016</span>
  //         </div>
  //         <div className="flex items-center space-x-3">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-6 w-6"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={1.5}
  //               d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
  //             />
  //           </svg>
  //           <span>Response rate - 100%</span>
  //         </div>
  //         <div className="flex items-center space-x-3">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-6 w-6"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={1.5}
  //               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  //             />
  //           </svg>

  //           <span>Fast response - within a few hours</span>
  //         </div>
  //       </div>

  //       {/* == */}
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
  //       <div>
  //         <ButtonSecondary href="/author">See host profile</ButtonSecondary>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderSection6 = () => {
  //   return (
  //     <div className="listingSection__wrap">
  //       {/* HEADING */}
  //       <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

  //       {/* Content */}
  //       <div className="space-y-5">
  //         <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
  //         <div className="relative">
  //           <Input
  //             fontClass=""
  //             sizeClass="h-16 px-4 py-3"
  //             rounded="rounded-3xl"
  //             placeholder="Share your thoughts ..."
  //           />
  //           <ButtonCircle
  //             className="absolute right-2 top-1/2 transform -translate-y-1/2"
  //             size=" w-12 h-12 "
  //           >
  //             <ArrowRightIcon className="w-5 h-5" />
  //           </ButtonCircle>
  //         </div>
  //       </div>

  //       {/* comment */}
  //       <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
  //         <CommentListing className="py-8" />
  //         <CommentListing className="py-8" />
  //         <CommentListing className="py-8" />
  //         <CommentListing className="py-8" />
  //         <div className="pt-8">
  //           <ButtonSecondary>View more 20 reviews</ButtonSecondary>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderSection7 = () => {
  //   return (
  //     <div className="listingSection__wrap">
  //       {/* HEADING */}
  //       <div>
  //         <h2 className="text-2xl font-semibold">Location</h2>
  //         <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
  //           San Diego, CA, United States of America (SAN-San Diego Intl.)
  //         </span>
  //       </div>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

  //       {/* MAP */}
  //       <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
  //         <div className="rounded-xl overflow-hidden z-0">
  //           <iframe
  //             title="x"
  //             width="100%"
  //             height="100%"
  //             loading="lazy"
  //             allowFullScreen
  //             referrerPolicy="no-referrer-when-downgrade"
  //             src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
  //           ></iframe>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Lock in this fantastic price today, cancel free of charge anytime.
            Reserve now and pay at pick-up.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Special Note</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            We asked ourselves, “How can we make the dash not only look better,
            but also give the driver a better look outside?” The unexpected
            answer is having no hood above the available 10.25-inch digital
            instrument cluster...
          </span>
        </div>
      </div>
    );
  };

  const renderSidebarPrice = () => {
    const currency: string = car.currency;
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
          {currency === "USD" ? "$" : currency === "GHC" ? "GH₵" : <a></a>} {car.pricePerDay}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /day
            </span>
          </span>

        </div>

        {/* FORM */}




        <FormItem label="Pickup Location">
        <input
          type="text"
          name="pickupLocation"
          placeholder="Your Pickup Location"
          value={formState.pickupLocation}
          onChange={handleInputChange}


        />
      </FormItem>


      <NcInputNumber
  label="Number Of Passengers"
  defaultValue={1}
  onChange={(value: number) => setInputNumberValue(value)}
/>


      <FormItem label="Pick Up Date">
      <Input type="date" 
        defaultValue="DD/MM/YY"
        value={value}
        onChange={(e)=>{
          setValue(e.target.value)
        }}
      />
      </FormItem>

      <FormItem label="Pick Up Time">
      <Input type="time" 
        value={valueT}
        onChange={(e)=>{
          setValueT(e.target.value)
        }}
      />
      </FormItem>









        


        {/* SUM */}
        <div className="flex flex-col space-y-4 ">
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$199</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary href={"/checkout"}>Reserve</ButtonPrimary>
      </div>
    );
  };

  const renderSidebarDetail = () => {
    return (
      <div className="listingSection__wrap lg:shadow-xl">

        <img

        src={car.image} // Replace with your image source URL
        alt="Image Description"     // Replace with a suitable image description
        className="rounded-full"    // Apply rounded corners to the image
      />
      </div>
    );
  };

  return (
    <div className={` nc-ListingCarDetailPage `}>
      {/* SINGLE HEADER */}


      {/* MAIn */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          <div className="block lg:hidden">{renderSidebarDetail()}</div>
          {renderSectionTienIch()}
          {renderSection2()}
          {renderSection3()}
          
          {/* {renderSection6()} */}
          {/* {renderSection7()} */}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className="block flex-grow mt-14 lg:mt-0">
          {renderSidebarDetail()}
          
          <div className="hidden lg:block mt-10 sticky top-28">
            {renderSidebarPrice()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function ListingCarDetailPage() {
  return (
    <DetailPagetLayout>
      <ListingCarDetail />
    </DetailPagetLayout>
  );
}
