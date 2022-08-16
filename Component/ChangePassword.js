import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import changePassword from "../pages/changePassword";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Arrow from "../public/arrow.svg";
import Link  from "next/link";
import Button from 'react-bootstrap/Button';
import { Alert } from "react-bootstrap";




const ChangePassword = () => {
  const oldPasswordRef = useRef()
  const newPasswordRef= useRef()
  const confirmPasswordRef = useRef()
  const sendCodeRef = useRef()
  
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState()
  const [error, setError]= useState(false)
  const [errorValid, setErrorValid]= useState(false)
  const [verify, setVerify]=useState(false)
  const [isPasswordValid, setIsPasswordValid ] = useState(false)

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);


  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  

  const  router = useRouter()
  // const [enterfield, setEnterField] = useState(false);

  async function passwordFill() {
    try {
      // const token = localStorage.getItem('token')
      // console.log(token)
      let res = await axios.post("/api/sendCode");
      const record = res.data;
      console.log(record, "hii man");
      setEnterField(true)
      setIsLoading(true);
      // localStorage.setItem("token", record.data.data);
      // window.location.reload();
    } catch (err) {
      console.log(err, "hello");
    }
  }
  
  function onClickHandler() {
    const oldPassword = oldPasswordRef.current.value
    const password = newPasswordRef.current.value
    const confirmPassword = confirmPasswordRef.current.value
  
    if (!oldPassword || !password || !confirmPassword) {
      notifyError("Please fill the details.")
      setError("")
      return;
    }
    if (!(password===confirmPassword)) {
      notifyError("Password doesn't match")
      setErrorValid(false)

      return;
    }
    setIsLoading(false);
    passwordFill()
    notify('Verification Code Sent')
  }
  
  async function changePass(data) {
    try {
      const token = localStorage.getItem('token')
      console.log(token, 'weyfgqegfq')
      let res = await axios.post("/api/changepassword",{token:token,data});
      const resend = res.data;
      console.log(resend, "Passsword Change");
      setLoadingRef(true)
      setIsLoading(true)
      notify(' Successfully changed password')
      setVerify(true)
      setErrorValid(false)
      
  
      setTimeout(()=>{

        router.push('/dashboard')
      },3000)
  
      
    } catch (err) {
      console.log(err, "SomeThing Went Wrong");
      notifyError(' Invalid detail')
      setErrorValid(true)
  
    }

  }


function onSubmitHandler(e){
  var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  e.preventDefault()
  const oldPassword = oldPasswordRef.current.value
  const password = newPasswordRef.current.value
  const confirmPassword = confirmPasswordRef.current.value
  const otp = sendCodeRef.current.value

const data = {
  oldPassword,
  password,
  confirmPassword,
  otp
}
console.log(data,'data here')
setError(false)
setErrorValid(false)

if (!(password===confirmPassword)) {
  notifyError("Password doesn't match")
  setError(true)
  setErrorValid(false)

  return;
}


if(!regularExpression.test(password)) {
  setIsPasswordValid(true)
  setLoadingRef(false)
  setIsLoading(false)
  return false;

}
setIsPasswordValid(false)
changePass(data)


}

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
      setLoadingRef(true);
    });
  }
}, [isLoading]);

const handleClick = () =>

setLoadingRef(false);




  return (
    
    <div>
      <section className="profile-sec" >
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
            <form className="input-sec" id="form-setting" onSubmit={onSubmitHandler} >
              <div className="line profile-line" id="ch-line"></div>
              <h3 className="heading-text pink-text mt-2 ">
              <Link href={'/dashboard'}>
              <span  className="arrows-icon" id="cp-icon" style={{ position: "relative", left: "-21%", cursor:"pointer" }}  >
                    <img src={Arrow.src} />
                  </span>
                  </Link>
                 Change Password</h3>
                 


              <div className="input-item item-set mt-5">
                <h6 className="item-text">OLD PASSWORD</h6>
                <input ref={oldPasswordRef}  required className="textinput" type="password" name="password" />
              </div>

              <div className="input-item item-set">
                <h6 className="item-text">NEW PASSWORD</h6>
                <input ref={newPasswordRef} required className="textinput" type="password" name="password" />
              {isPasswordValid && <Alert style={{margin:"0"}} variant={"danger"}>Your password must be at least 8 characters long, should contain at least one number or special character and have a mixture of uppercase and lowercase letters.</Alert>}
              </div>

              <div className="input-item item-set">
                <h6 className="item-text">CONFIRM PASSWORD</h6>
                <input ref={confirmPasswordRef} required className="textinput" type="password" name="confirmpassword" />
                {isValid && (<p style={{ color: "red" }}> Password doesn't match </p>)}
              </div>
              <div style={{float:"left", width:"100%", marginTop:"10px"  }}>

<p style={{margin:"0", fontSize:"15px", marginTop:"15px", }}>Click SEND CODE, check your inbox, enter the verification code below and click UPDATE.</p>
  </div>
              <div className="name-sec mb-5 mt-0" style={{marginTop:"0px !important"}}>
              
                <div className="input-item item-set mt-0" id="item-value" style={{ marginRight: "10px", display: "flex", marginTop:"0px !important" }} >
                  <input className="textinput w-50" autoComplete="off" type="number" name="otp" style={{ borderRadius: " 10px 0 0 10px !important" }} ref={sendCodeRef} />
                  <button type="button"   disabled={isLoading} onClick={onClickHandler} className="btn btn-roundes  btn- w-50   " style={{  }}>
                    Send Code
                  </button>
                  
                </div>
                </div>

                {/* <div
                  className="input-item item-set"
                  style={{ marginLeft: "10px" }}
                  >
                </div> */}
                {/* {enterfield && (<p style={{ color: "red" }}> Invalid detail </p>)} */}



              {/* <Link href={"/login"}> */}

              {error && (
                  <p style={{ color: "red" }}> Password doesn't match </p>
                )}
                    {errorValid && (
                  <p style={{ color: "red",  }}> Invalid detail </p>
                )}
                       {verify && (
                  <p style={{ color: "green",  }}> Successfully changed password </p>
                )}
              {/* <button
                href="funds-page.html"
                className="btn btn-round btn-warning w-100 "
                style={{ marginTop: "0px", marginBottom: "0px" }}
                type="submit"
              >
                UPDATE
              </button> */}

              <Button
      variant="primary"
      className="btn btn-round btn-warning w-100 "
      style={{ marginTop: "0px", marginBottom: "0px" }}
      type="submit"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      >
      {isLoadingRef ? 'Loading…' : '     UPDATE'}
    </Button>
    <Link href={'/emailVerify'}>
              <p className="by-text" style={{cursor:"pointer", marginTop:"5px", fontSize:"13px", color:"#2990DF"}}>
                
                {" "}
             Forgot your password?
              </p>
              </Link>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword
