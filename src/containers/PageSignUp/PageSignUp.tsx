import React, { FC,useState } from "react";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    registerWithEmailAndPassword

} from "../../firebase/config"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [

  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth);

    // States
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");  // Added state for full name
    const [phoneNumber, setPhoneNumber] = useState<string>("");  // Added state for phone number
   
  
    // Handlers
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value);  // Handler for full name
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value);  // Handler for phone number

    const signUp = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (password === confirmPassword) {
          registerWithEmailAndPassword(email,password,fullName,phoneNumber)
          Swal.fire(
            'Great!',
            'Signup Successful!',
            'success'
          )
        navigate("/account");
      } else {
          alert("Passwords do not match");
      }

  };
  
  
  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Abibiman Transportation Service</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={signUp}>
    <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
            Your Name
        </span>
        <Input
            type="text"
            placeholder="John Oppong"
            className="mt-1"
            value={fullName}
            onChange={handleFullNameChange}
            required
        />
    </label>
    <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
            Your Phone Number
        </span>
        <Input
            type="tel"
            placeholder="0552314421"
            className="mt-1"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
        />
    </label>
    <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
            Email address
        </span>
        <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
            value={email}
            onChange={handleEmailChange}
            required
        />
    </label>
    <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Password
        </span>
        <Input 
            type="password" 
            className="mt-1" 
            value={password}
            onChange={handlePasswordChange}
            required
        />
    </label>
    <label className="block">
        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Confirm Password
        </span>
        <Input 
            type="password" 
            className="mt-1"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange} 
            required
        />
    </label>
    <ButtonPrimary type="submit">Continue</ButtonPrimary>
</form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
