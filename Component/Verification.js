import axios from "axios";
import Link from "next/link";
// import Link from 'next/link'
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Arrow from "../public/arrow.svg";
import $ from "jquery";
import Button from 'react-bootstrap/Button';


const Verification = () => {
  const valueRef = useRef();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]= useState(false)
  const [isLoadingRef, setLoadingRef] = useState(false);
  const [show, setShow]= useState(false)
  const [active, setActive] = useState(false)
  const [counter, setCounter] = useState(31);




  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }


  //l///////////////////////////////////API for the OTP//////////////////////////
  async function verify(data) {
    // e.preventDefault()
    try {
      let res = await axios.post("/api/verify", data);
      const response = res.data;

      console.log(response, "rrr");
      router.replace("/profile");
      setIsLoading(false);
    } 
    catch (err) {
      console.log(err);
      notifyError("Invalid Verification Code ");
      setError(true)

    }
  }

  ///////////////////////////////////API for the Second ///////////////////////////
  async function resendCode() {
    setShow(true)
    setActive(true)
    const email = localStorage.getItem("email");

    console.log(email);
    if (!email) {
      notifyError("Please register first!");
      return;
    }
    try {
      let res = await axios.post("/api/resend", { email: email });
      const data = res.data;

      if(counter==0){
        setCounter(60)

      }
      console.log(data.data.message);
      if (data.data?.message) {
      
        notify('New verification code sent.');
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function formSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setLoadingRef(true)


    const otp = valueRef.current.value;
    const email = localStorage.getItem("email");

    if (otp.trim().length < 6) {
      notifyError("Invalid Verification Code ");
      setIsLoading(false);
      setLoadingRef(false)
      setError(true)

      return;
    }

    const data = { otp, email };
    console.log(data);
    await verify(data);
    setIsLoading(false);
  }





  useEffect(() => {
    if (counter==0 ){setShow(false) 
       setActive(false)}
      const timer =
      counter > 0   && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter],);
    

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
      <section className="profile-sec  verify-hight" >
        <div className="container">
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
          <div className="row justify-content-center">
            <form
              className="input-sec iptset-line ipt-width"
              id="form-setup"
              onSubmit={formSubmit}
            >
              <div className="input-line  varification-line"></div>

              <h3 className="heading-text" style={{ textAlign: "left" }}>
                <Link href={"/"}>
                  <span style={{ fontSize: "16px", paddingRight: "10px" }}>
                    <img src={Arrow.src} />
                  </span>
                </Link>
                Verification code
              </h3>

              <p className="check-txt">
              Check your email inbox for the verification code
              </p>
              <div className="ipt-box">
                <input
                  className="ipt-txt w-100"
                  required
                  type="number"
                  ref={valueRef}
                  style={{ }}
                />
              </div>
              <div className="did-txt">
                <p>
                  {" "}
                  Didn't receive it?{" "}
                  { active == false ?  <span
                    onClick={resendCode}
                    style={{ cursor: "pointer" }}
                    className="resend-txt "
                    disabled={active}
                  >
                    Resend code.
                  </span> :          <span
                    
                    style={{ cursor: "pointer", color:"gray" }}
                    className="resend-txt "
                    
                  >
                    Resend code.
                  </span>}{" "}
                </p>


                {show? <p    style={{
                  marginTop: "0px",
                  fontSize: "14px",
                }}>
                  Resend code again {counter}</p>:null}
                {/* <button  type="button" onClick={resendCode}>Resend Code</button> */}
              </div>
              {error && (
                  <p style={{ color: "red", fontSize:"13px",  margin:"0" }}> Invalid Verification Code </p>
                )}
              <p
                className="by-text mb-0 "
                style={{
                  marginTop: "5px",
                  fontSize: "11px",
                  paddingLeft: "5px",
                  float: "left",
                }}
              >
                <input
                  required
                  className="form-check-input mt-0"
                  type="checkbox"
                  style={{ marginRight: "7px", height: "16px", width: "16px" }}
                  id="flexCheckDefault"
                  />
                I agree with EPOS <a style={{color:"black",textDecoration:"none"}} target="_blank" rel="noreferrer" href={""}>Terms of Use</a>  and <a style={{color:"black",textDecoration:"none"}}  target="_blank" rel="noreferrer" href={""}> Privacy Policy</a>.
              </p>
              {/* <Link href={"/profile"}> */}

              <Button
      variant="primary"
      className="btn btn-round btn-warning w-100 p-0"
      style={{ marginTop: "5px" }}
      type="submit"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      >
      {isLoadingRef ? 'Loading…' : '   CONTINUE'}
    </Button>
              {/* <button
                disabled={isLoading}
                className="btn btn-round btn-warning w-100 p-0"
                style={{ marginTop: "15px", marginBottom: "5px" }}
                type="submit"
              >
                CONTINUE
              </button> */}

              {/* </Link> */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Verification;
