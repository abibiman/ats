import React, { FC,useState,useEffect } from "react";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import FlightCard, { FlightCardProps } from "components/FlightCard/FlightCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import axios from 'axios'
import { auth ,db} from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";


export interface SectionGridFilterCardProps {
  className?: string;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
}) => {
  const [user, loading, error] = useAuthState(auth);
  const [email,setEmail] = useState("")
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "Users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setEmail(data.email);

    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    fetchUserName();
  }, [user, loading]);

  const [dataList,setDataList] = useState([])

  useEffect(()=> {

    axios.get(`https://us-central1-abibiman-transportation.cloudfunctions.net/api/v1/booking/user/${email}`)
    .then(res => {
      setDataList(res.data);

    })
    .catch(error => {
      console.error("AxiosError:", error);
      // Handle the error here
    });
  })
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >

      <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
        {dataList.map((item, index) => (
          <FlightCard defaultOpen={!index} key={index} data={item}  />
        ))}

      </div>
    </div>
  );
};

export default SectionGridFilterCard;
