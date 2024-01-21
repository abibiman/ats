import {
  UserCircleIcon,
  NewspaperIcon,
  HomeIcon
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PathName } from "routers/types";
import MenuBar from "shared/MenuBar/MenuBar";
import isInViewport from "utils/isInViewport";
import Avatar from "shared/Avatar/Avatar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,logout ,db} from "../firebase/config";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

let WIN_PREV_POSITION = window.pageYOffset;

interface NavItem {
  name: string;
  link?: PathName;
  icon: any;
}

const NAV: NavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: HomeIcon,
  },
  {
    name: "My Reservations",
    link: "/account-billing",
    icon: NewspaperIcon,
  },
  {
    name: "My Account",
    link: "/account",
    icon: UserCircleIcon,
  },
  {
    name: "Menu",
    icon: MenuBar,
  },
];

const NAVOUT: NavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: HomeIcon,
  },
  {
    name: "LOG IN",
    link: "/login",
    icon: UserCircleIcon,
  },
  {
    name: "Menu",
    icon: MenuBar,
  },
];

const FooterNav = () => {
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "Users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  const containerRef = useRef<HTMLDivElement>(null);
  //

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", handleEvent);
  }, []);

  const handleEvent = () => {
    window.requestAnimationFrame(showHideHeaderMenu);
  };

  const showHideHeaderMenu = () => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    // SHOW _ HIDE MAIN MENU
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }

      containerRef.current.classList.add("FooterNav--hide");
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove("FooterNav--hide");
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
      transition-transform duration-300 ease-in-out"
    >
      {user?<div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {/* MENU */}
        {NAV.map((item, index) => {
          const active = location.pathname === item.link;
          return item.link ? (
            <Link
              key={index}
              to={item.link}
              className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                active ? "text-neutral-900 dark:text-neutral-100" : ""
              }`}
            >
              <item.icon
                className={`w-6 h-6 ${active ? "text-red-600" : ""}`}
              />
              <span className="text-[11px] leading-none mt-1">{item.name}</span>
            </Link>
          ) : (
            <div
              key={index}
              className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                active ? "text-neutral-900 dark:text-neutral-100" : ""
              }`}
            >
              <item.icon iconClassName="w-6 h-6" className={``} />
              <span className="text-[11px] leading-none mt-1">{item.name}</span>
            </div>
          );
        })}
      </div>:
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
      {/* MENU */}
      {NAVOUT.map((item, index) => {
        const active = location.pathname === item.link;
        return item.link ? (
          <Link
            key={index}
            to={item.link}
            className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
              active ? "text-neutral-900 dark:text-neutral-100" : ""
            }`}
          >
            <item.icon
              className={`w-6 h-6 ${active ? "text-red-600" : ""}`}
            />
            <span className="text-[11px] leading-none mt-1">{item.name}</span>
          </Link>
        ) : (
          <div
            key={index}
            className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
              active ? "text-neutral-900 dark:text-neutral-100" : ""
            }`}
          >
            <item.icon iconClassName="w-6 h-6" className={``} />
            <span className="text-[11px] leading-none mt-1">{item.name}</span>
          </div>
        );
      })}
    </div>
      }
    </div>
  );
};

export default FooterNav;
