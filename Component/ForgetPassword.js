import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Arrow from "../public/arrow.svg";
import Link  from "next/link";
import Button from 'react-bootstrap/Button';
import { Alert } from "react-bootstrap";


const ForgetPassword = () => {
  const passwordRef = useRef()
  const otpRef= useRef()
  const confirmPasswordRef = useRef()
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);
  const [error, setError]= useState(false)
  const [verify, setVerify]=useState(false)
  const [isPasswordValid, setIsPasswordValid ] = useState(false)




  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }


  const  router = useRouter()
  // const [enterfield, setEnterField] = useState(false);

  useEffect (()=> {
    setEmail(localStorage.getItem('email'))
    console.log(localStorage.getItem('email'))
  },[])


  async function forgetPassword(data) {
    try {
        // const email = localStorage.getItem('email')
        // console.log(email,'vufhyugyuyu')
      let res = await axios.post("/api/forgetpassword",data);
      const record = res.data;
 
      console.log(record, "hii man")
      setError(false)

      notify ('Password Changed')
      setVerify(true)
      setLoadingRef(true)
      setIsLoading(true)
      setTimeout(()=>{
        router.push('/login')
      },2000)
  

    } catch (err) {
      console.log(err, "hello");
      notifyError('Invalid Code')
      setError(true)
    }
  }
  

function onSubmitHandler(e){
  var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  e.preventDefault()
  // const oldPassword = oldPasswordRef.current.value
  const password = passwordRef.current.value
  const confirmPassword = confirmPasswordRef.current.value
  const otp = otpRef.current.value

const data = {
    email,
  password,
  confirmPassword,
  otp
}

console.log(data,'data here')

if (!(password===confirmPassword)) {
  notifyError("Password doesn't match")
  setIsValid(true)
  setError(false)
  return;
}

if(!regularExpression.test(password)) {
  setIsPasswordValid(true)
  setLoadingRef(false)
  setIsLoading(false)
  return false;

}
setIsPasswordValid(false)

setIsValid(false);
forgetPassword(data)



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
      <section className="profile-sec verify-hight" >
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
            <form className="input-sec" onSubmit={onSubmitHandler}>
              <div className="line profile-line" id="forget-line"></div>
              <h3 className="heading-text pink-text mt-2 mb-4">
              <Link href={'/emailVerify'}>
              <span  className="arrows-icon"  style={{ position: "relative", left: "-23%", cursor:"pointer" }}  >
                    <img src={Arrow.src} />
                  </span>
                  </Link>
                 Forget Password</h3>
                 
                 <div className="input-item item-set ">
                <h6 className="item-text">EMAIL</h6>
                <input value={email} required disabled className="textinput" type="text" name="password" />
              </div>


              <div className="input-item item-set ">
                <h6 className="item-text">NEW PASSWORD</h6>
                <input ref={passwordRef}  required className="textinput" type="password" name="password" />
                {isPasswordValid && <Alert style={{margin:"0"}} variant={"danger"}>Your password must be at least 8 characters long, should contain at least one number or special character and have a mixture of uppercase and lowercase letters.</Alert>}

              </div>

              <div className="input-item item-set">
                <h6 className="item-text">CONFIRM NEW PASSWORD</h6>
                <input ref={confirmPasswordRef} required className="textinput" type="password" name="confirmpassword" />
                {isValid && (<p style={{ color: "red" }}> Password doesn't match </p>)}
              </div>


              <div className="input-item item-set " style={{marginBottom:"30px"}}>
                <h6 className="item-text">VERIFICATION CODE</h6>
                <input ref={otpRef}  required className="textinput" type="number" name="password" />
              </div>
              {/* <div className="name-sec" >
                <div className="input-item item-set" style={{ marginRight: "10px", display: "flex" }} >
                  <input className="textinput w-50" type="name" name="username" style={{ borderRadius: " 10px 0 0 10px !important" }} ref={sendCodeRef} />
                  <button type="button"   disabled={isLoading} onClick={onClickHandler} className="btn btn-roundes  btn- w-50   " style={{  }}>
                    Send Code
                  </button>

                </div> */}

                {/* <div
                  className="input-item item-set"
                  style={{ marginLeft: "10px" }}
                  >
                </div> */}
              {/* </div> */}
                {/* {enterfield && (<p style={{ color: "red" }}> Invalid detail </p>)} */}



              {/* <Link href={"/login"}> */}
              {error && (<p style={{ color: "red", fontSize:"15px", margin:"0" }}> Invalid Code </p>)}
              {verify && (
                  <p style={{ color: "green", fontSize:"15px",   margin:"0" }}> Password Changed</p>
                )}
              {/* <button
                href="funds-page.html"
                className="btn btn-round btn-warning w-100 "
                style={{ marginTop: "30px", marginBottom: "10px" }}
                type="submit"
              >
                SUBMIT
              </button> */}
              <Button
      variant="primary"
      className="btn btn-round btn-warning w-100 "
      style={{ marginTop: "0px", marginBottom: "10px" }}
      type="submit"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      >
      {isLoadingRef ? 'Loading…' : '     SUBMIT'}
    </Button>




              {/* </Link> */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword;
