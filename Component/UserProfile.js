import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Arrow from "../public/arrow.svg";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Button from 'react-bootstrap/Button';



const UserProfile = () => {

  const firstNameRef =useRef()
  const lastNameRef = useRef()
  const  emailRef =useRef()
  const contactNumberRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const stateRef = useRef()
  const countryRef = useRef()
  const zipCodeRef = useRef()
  const [verify, setVerify]=useState(false)
  const [name, setName]= useState()
  const [lastName, setLastName]= useState()
  const [contactNumber, setContactNumber]= useState()
  const [address, setAddress] = useState()
  const [city, setCity] = useState()
  const [country, setCountry]= useState()
  const [state, setState]= useState()
  const [zipcode, setZipcode]=useState()




  const [isLoadingRef, setLoadingRef] = useState(false);

const [isLoading,setIsLoading]= useState(false)
  const [isFinalData, setIsFinalData] = useState();
  // const [profileData,setProfileData] =useState()
  async function userProfile() {
    try {
      
      let res = await axios.post("/api/userProfile");
      const response = res.data;
      console.log(response.data);
      setIsFinalData(response.data)
      console.log(setIsFinalData,"a gya yr")
      setName(response.data.firstName)
      setLastName(response.data.lastName)
      setContactNumber(response.data.contactNumber)
      setAddress(response.data.address)
      setCity(response.data.city)
      setCountry(response.data.country)
      setState(response.data.state)
      setZipcode(response.data.zipcode)
      





    } catch (err) {
      console.log(err, err);
    }
  }
  
  
  useEffect(() => {
    userProfile()
  }, [])
  
  
  const router = useRouter()
  async function userData(data) {
    try {
      const token = localStorage.getItem("token")
      console.log(token, "for api");
      let res = await axios.post("/api/userdata",{token:token,data} );
      const request = res.data;
      console.log(request.data, 'data fet');
      setIsFinalData(request.data)
      setIsLoading(true)
      setVerify(true)
      notify ('User Detail Updated')
      setLoadingRef(true)

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
      
    } catch (err) {
      console.log(err, err);
      // notifyError('Invalid Detail')
    }
  }



  function formSubmitHandler(event) {
    event.preventDefault();
    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value
    const email = emailRef.current.value
    const contactNumber = contactNumberRef.current.value
    const address = addressRef.current.value
    const city = cityRef.current.value
    const state = stateRef.current.value
    const country = countryRef.current.value
    const zipcode = zipCodeRef.current.value


    
    const data = {
      firstName,
      lastName,
      email,
      contactNumber,
      address,
      city,
      state,
      country,
      zipcode
    }

    console.log(data, "all data here")

    userData(data)

  }

  /////////////Toast//////////////////////
  const notify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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


    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 3000));
    }


    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoadingRef(false);
        });
      }
    }, [isLoading]);
  
    const handleClick = () => setLoadingRef(false);
async function onModify(){

  let res = await axios.post("/api/modifyotp",{data:isFinalData?.email})
  let data = res.data;
  if(data.data.data){
    notify ('Verification Code sent to the email.')
    router.push({
      pathname:"/emailChange",
      query:{email:isFinalData?.email}
    })
  }
  console.log(data.data.data)
}

  return (
    <div>
      <section className="profile-sec ">
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
            <form className="input-sec mb-5" onSubmit={formSubmitHandler}>
              <div className="line userprofile-line" ></div>
              <h3 className="heading-text pink-text mt-2 mb-5" id="mb-mar">
                <Link href={'/dashboard'}>
                  <span className="arrows-icon" id="funds-arrow" style={{ position: "relative", left: "-23%", cursor: "pointer" }}  >
                    <img src={Arrow.src} />
                  </span>
                </Link>
                Complete Profile</h3>

              <div className="name-sec">
                <div
                  className="input-item item-set"
                  style={{ marginRight: "10px" }}
                >
                  <h6 className="item-text">FIRST NAME</h6>
                  <input
                  ref={firstNameRef}
                    // required
                    value={name}
                    onChange={(e)=>setName(e.currentTarget.value)}
              
                    className="textinput"
                    type="name"
                    name="username"
                    // placeholder={isFinalData?.firstName}

                  />
                </div>

                <div
                  className="input-item item-set"
                  style={{ marginLeft: "10px" }}
                >
                  <h6 className="item-text">LAST NAME</h6>
                  <input
                  ref={lastNameRef}
                    // required
                   value={lastName}
                   onChange={(e)=>setLastName(e.currentTarget.value)}
                    className="textinput"
                    type="last name"
                    name="last-name"
                    // placeholder={isFinalData?.lastName}
                  />
                </div>
              </div>
              {/* 
              <div className="input-item item-set">
                <h6 className="item-text">EMAIL</h6>
                <input disabled required className="textinput" name="email" value={isFinalData?.email} />
              </div> */}
              <div className="name-sec" >
                {/* <h6 className="item-text">EMAIL</h6> */}
                <div className="input-item item-set" style={{ marginRight: "10px", display: "flex" }} >
                  <input style={{    borderRadius: "4px 0 0 4px"}} ref={emailRef} disabled  className="textinput mt-0" name="email" 
                  defaultValue={isFinalData?.email}
                   />
         

                    <button type="button" onClick={onModify} className="btn btn-roundes  btn- w-50  mt-0 ">
                      MODIFY
                    </button>


                </div>
              </div>
              <div className="input-item item-set">
                <h6 className="item-text">CONTACT NUMBER</h6>
                <input ref={contactNumberRef} 
                onChange={(e)=>setContactNumber(e.currentTarget.value)}
                value={contactNumber}
                // placeholder={isFinalData?.contactNumber} 
                className="textinput" name="contact no" />
              </div>

              <div className="input-item item-set">
                <h6 className="item-text">ADDRESS</h6>
                <input  ref={addressRef} 
                value={address}
                onChange={(e)=>setAddress(e.currentTarget.value)}

                // placeholder={isFinalData?.address} 
                className="textinput" name="address" />
              </div>
              <div className="input-item item-set">
                <h6 className="item-text">CITY</h6>
                <input ref={cityRef}  
                value={city}
                onChange={(e)=>setCity(e.currentTarget.value)}
                // placeholder={isFinalData?.city} 
                className="textinput" name="city" />
              </div>
              <div className="input-item item-set">
                <h6 className="item-text">STATE/PROVINCE</h6>
                <input ref={stateRef} 
                value={state}
                onChange={(e)=>setState(e.currentTarget.value)}
                // placeholder={isFinalData?.state} 
                className="textinput" name="state" />
              </div>

              <div className="input-item item-set">
                <h6 className="item-text"> COUNTRY </h6>
                <input ref={countryRef} 
                  value={country}
                  onChange={(e)=>setCountry(e.currentTarget.value)}
                // placeholder={isFinalData?.country} 
                className="textinput" name="country" />
              </div>

              <div className="input-item item-set mb-4">
                <h6 className="item-text">ZIP Code</h6>
                <input ref={zipCodeRef} 
                value={zipcode}
                onChange={(e)=>setZipcode(e.currentTarget.value)}
                // placeholder={isFinalData?.zipcode} 
                className="textinput" name="zip code" />
              </div>
              {/* 
              <div className="input-item item-set">
                <h6 className="item-text">PASSWORD</h6>
                <input required className="textinput" type="password" name="password" />
              </div> */}

              {/* <div className="input-item item-set">
                <h6 className="item-text">CONFIRMPASSWORD</h6>
                <input required className="textinput" type="password" name="confirmpassword" />
                {/* {isValid && <p style={{ color: "red" }}> Password doesn't match </p>} */}

              {/* </div> */}
              {/* <Link href={"/login"}> */}

              {/* </Link> */}
              {/* <button
                href="funds-page.html"
               disabled={isLoading}
               onClick={!isLoading ? handleClick : null}
                className="btn btn-round btn-warning w-100 p-0"
                style={{ marginTop: "50px" }}
                type="submit"
              >
                UPDATE
              </button> */}
      {verify && (
                    <p style={{ color: "green", fontSize:"15px",  margin:"0" }}> User Detail Updated </p>
                  )}
              <Button
      variant="primary"
      className="btn btn-round btn-warning w-100 p-0 "
      style={{ marginTop: "5px" }}
      type="submit"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoadingRef ? 'Loading…' : '   UPDATE'}
    </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
