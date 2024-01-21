import React, { FC,useState,useEffect } from "react";
import StayCard from "components/StayCard/StayCard";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import axios from 'axios'
import { auth ,db} from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({

  className = "",
  data = DEMO_DATA,
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
    .then(res=> {
      setDataList(res.data)
      console.log(dataList)
    })
  },[])

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((stay) => (
          <StayCard key={stay.id} data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
