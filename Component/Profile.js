import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {signIn} from "next-auth/react"
import Link from "next/link";
import Arrow from "../public/arrow.svg";
import { ToastContainer, toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import { Alert } from "react-bootstrap";



const Profile = () => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const [email, setEmail] = useState(null);
  const passwordInputRef = useRef();
  const reffralByRef = useRef();

  const confirmPasswordInputRef = useRef();
  const [refCode,setRefCode]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);
  const [isPasswordValid, setIsPasswordValid ] = useState(false)
  // const [reffralBy,setReffralBy]= useState(false)

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  const router = useRouter();

  const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      setRefCode(localStorage.getItem('rfCode'))
    setEmail(localStorage.getItem("email"));
  }, []);
  async function profileFill(data) {
    try {
      let res = await axios.post("/api/fillProfile",data)
       const record = res.data;
      console.log(record, "hii man");
      let { email, password } = data;
      const rest = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(rest, "anything");
      if (rest?.error) {
      
        console.log(rest.error);
      } else {
        // setError(null);
      }
      if (!rest.error) {
        setLoadingRef(false)
        setIsLoading(false)
        router.push("/buy");
      }
      localStorage.setItem("token", record.data.data);
      window.location.reload();
    } 
    catch (err) {
      console.log(err, "hello");
      setLoadingRef(false)
      setIsLoading(false)
    }

  }
  console.log("hii to all file")

  function formSubmitHandler(event) {
    setLoadingRef(true)
    setIsLoading(true)
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    event.preventDefault();

    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    let  referredBy = reffralByRef.current?.value;

if(!referredBy){
  referredBy = ''
}
    if (password !== confirmPassword) {
      setIsValid(true);
      notifyError(" Password doesn't match");
      setLoadingRef(false)
      setIsLoading(false)
      setIsPasswordValid(false)
      // setReffralBy(false)

      return;
    }

    setIsValid(false);

    if(!regularExpression.test(password)) {
      setIsPasswordValid(true)
      setLoadingRef(false)
      setIsLoading(false)
      return false;

    }
    // router.push("/buy");
    setIsPasswordValid  (false)

    const local = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      referredBy
    };
    console.log(local, "sxqwdqwdx");

    setIsPasswordValid  (false)
    localStorage.setItem("profile", JSON.stringify(local));

    profileFill(local);
  }

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });



    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoadingRef(false);
        });
      }
    }, [isLoading]);
  
    const handleClick = () =>
    
    setLoadingRef(false);


  return (
    <div>
      <section className="profile-sec  " >
        <div className="container">
          <div className="row justify-content-center">

          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <form className="input-sec" id="form-setup" onSubmit={formSubmitHandler}>
              <div className="line profile-line" id="profile-line"></div>
              <h3 className="heading-text pink-text mt-2"> 
              {/* <Link href={'/verification'}>
                  <span className="arrows-icon" style={{ position: "relative", left: "-15%", cursor: "pointer" }}  >
                    <img src={Arrow.src} />
                  </span>
                </Link> */}
                Complete Your Profile</h3>
              <p style={{fontSize:"14px", paddingTop:"7px",  margin:"0"}}>To access your EPOS  Dashboard </p>
              <div className="name-sec">
                <div
                  className="input-item item-set"
                  style={{ marginRight: "10px" }}
                >
                  <h6 className="item-text">FIRST </h6>
                  <input
                    name="fname"
                    ref={firstNameInputRef}
                    required
                    className="textinput"
                    type="name"
                  />
                </div>

                <div
                  className="input-item item-set"
                  style={{ marginLeft: "10px" }}
                >
                  <h6 className="item-text">LAST </h6>
                  <input
                    name="lname"
                    ref={lastNameInputRef}
                    required
                    className="textinput"
                    type="last name"
                  />
                </div>
              </div>

              <div className="input-item item-set">
                <h6 className="item-text">EMAIL</h6>
                <input
                  disabled
                  required
                  className="textinput"
                  defaultValue={email}
                  name="email"
                />
              </div>

              <div className="input-item item-set">
                <h6 className="item-text">PASSWORD</h6>
                <input
                  ref={passwordInputRef}
                  required

                  className="textinput"
                  type="password"
                  name="password"
                  id="pass"
                  autoComplete="new-password"
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                />
              {isPasswordValid && <Alert variant={"danger"}>Your password must be at least 8 characters long, should contain at least one number or special character and have a mixture of uppercase and lowercase letters.</Alert>}
              </div>

              <div className="input-item item-set">
                <h6 className="item-text">CONFIRM PASSWORD</h6>
                <input
                  ref={confirmPasswordInputRef}
                  required
                  className="textinput"
                  type="password"
                  name="password"
                  id="pass"
                  autoComplete="new-password"
                
                />
                {isValid && (
                  <p style={{ color: "red" }}> Password doesn't match </p>
                )}
              </div>

           {  refCode? <div className="input-item item-set">
                <h6 className="item-text">Referred By</h6>
                <input
                  ref={reffralByRef}
                  defaultValue={refCode||''}
                  className="textinput"
                  type="text"
disabled
                  name="Refferedby"
                />
            
              </div>: null }
              {/* <Link href={"/login"}> */}
              {/* <button
                href="funds-page.html"
                className="btn btn-round btn-warning w-100 "
                style={{ marginTop: "30px" }}
                type="submit"
              >
                CONTINUE
              </button> */}


              <Button
      variant="primary"
      className="btn btn-round btn-warning w-100 "
      style={{ marginTop: "30px" }}
      type="submit"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      >
      {isLoadingRef ? 'Loading…' : '   CONTINUE'}
    </Button>



              {/* </Link> */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
