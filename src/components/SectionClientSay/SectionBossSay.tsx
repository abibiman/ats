import Glide from "@glidejs/glide";
import Heading from "components/Heading/Heading";
import React, { FC } from "react";
import { useEffect } from "react";
import clientSayMain from "images/clientSayMain.png";
import clientSay1 from "images/clientSay1.png";
import clientSay2 from "images/clientSay2.png";
import clientSay3 from "images/clientSay3.png";
import clientSay4 from "images/clientSay4.png";
import clientSay5 from "images/clientSay5.png";
import clientSay6 from "images/clientSay6.png";
import quotationImg from "images/quotation.png";
import quotationImg2 from "images/quotation2.png";
import useNcId from "hooks/useNcId";

export interface SectionBossSayProps {
  className?: string;
  uniqueClassName: string;
}



const SectionBossSay: FC<SectionBossSayProps> = ({
  className = "",
  uniqueClassName = "",
}) => {
  const UNIQUE_CLASS = `SectionClientSay_glide_${uniqueClassName}` + useNcId();

  useEffect(() => {
    if (document.querySelector(`.${UNIQUE_CLASS}`)) {
      setTimeout(() => {
        new Glide(`.${UNIQUE_CLASS}`, {
          perView: 1,
        }).mount();
      }, 10);
    }
  }, []);

  const renderBg = () => {
    return (
      <div className="hidden md:block">
        {/* <img className="absolute top-9 -left-20" src={clientSay1} alt="" />
        <img
          className="absolute bottom-[100px] right-full mr-40"
          src={clientSay2}
          alt="" */}
        {/* /> */}
        {/* <img
          className="absolute top-full left-[140px]"
          src={clientSay3}
          alt=""
        />
        <img
          className="absolute -bottom-10 right-[140px]"
          src={clientSay4}
          alt=""
        />
        <img
          className="absolute left-full ml-32 bottom-[80px]"
          src={clientSay5}
          alt=""
        /> */}
        {/* <img className="absolute -right-10 top-10 " src={clientSay6} alt="" /> */}
      </div>
    );
  };

  return (
    <div
      className={`nc-SectionClientSay relative ${className} `}
      data-nc-id="SectionClientSay"
    >
      <Heading desc="We are happy to serve" isCenter>
        From Our Founder
      </Heading>
      <div className="relative md:mb-16 max-w-2xl mx-auto">
        {renderBg()}
        {/* <img className="mx-auto" src={clientSayMain} alt="" /> */}
        <div className={`mt-12 lg:mt-16 relative ${UNIQUE_CLASS}`}>
          <img
            className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1"
            src={quotationImg}
            alt=""
          />
          <img
            className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1"
            src={quotationImg2}
            alt=""
          />
          <div className="glide__track " data-glide-el="track">
            <ul className="glide__slides ">
                <li

                  className="glide__slide flex flex-col items-center text-center"
                >
                  <span className="block text-2xl">I founded this company with a steadfast dedication to safety and excellence. Your well-being is our top priority, evident in our meticulous vehicle maintenance and our drivers' certified training in defensive driving practices. We're more than a transportation service; we're your trusted partners in travel, ensuring every journey with us is characterized by luxury, comfort, and exceptional service</span>


                </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBossSay;
