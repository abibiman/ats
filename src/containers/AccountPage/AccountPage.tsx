import Label from "components/Label/Label";
import React, { FC, useState ,useEffect} from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { auth ,db} from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";

export interface AccountPageProps {
  className?: string;
}

interface UserData {
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any; // This is to allow other properties as well
}


const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const navigate = useNavigate()
  // State for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState<UserData>({});
  const [docId,setDocId] = useState("")

  const [user, loading, error] = useAuthState(auth);


  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "Users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      const bid = doc.docs[0].id;
      setUserData(data);
      setDocId(bid)

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

  // Handler functions for each input field
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  // Function to handle form submission (optional)
  const handleUpdateInfo = () => {

    axios.patch(`https://us-central1-abibiman-transportation.cloudfunctions.net/api/v1/users/${docId}`,{
      name : name?name:userData.name,
      phone: phone?phone:userData.phone
    })
    .then((res)=>{
      Swal.fire(
        'Great!',
        'Accout Information Updated',
        'success'
      )
    })
  };

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>My Account || Abibiman Transportation Services</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Account infomation</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Name</Label>
                <Input className="mt-1.5" value={name} onChange={handleNameChange} placeholder={userData.name} />
              </div>

              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" value={email} onChange={handleEmailChange} placeholder={userData.email} disabled/>
              </div>

              <div>
                <Label>Phone number</Label>
                <Input className="mt-1.5" value={phone} onChange={handlePhoneChange} placeholder={userData.phone}/>
              </div>

              <div className="pt-2">
                <ButtonPrimary onClick={handleUpdateInfo}>Update My Info</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
