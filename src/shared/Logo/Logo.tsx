import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/flogo.png";
import logoLightImg from "images/logo-light.png";
import LogoSvgLight from "./LogoSvgLight";
import LogoSvg from "./LogoSvg";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "w-24",
}) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >

      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img
          className={`block max-h-16 ${imgLight ? "dark:hidden" : ""}`}
          src={img}
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="hidden max-h-16 dark:block"
          src={img}
          alt="Logo-Light"
        />
      )}
    </Link>
  );
};

export default Logo;
