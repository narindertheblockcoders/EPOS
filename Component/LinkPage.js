import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";

const LinkPage = ({ props }) => {
  console.log(props.session.user.email);

  // const [rxAmt,setRxAmt ] =useState()
  const [usdAmt, setUsdAmt] = useState();
  const [name, setName] = useState(null);

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

  async function tokenPrice(data) {
    try {
      // let token = localStorage.getItem("token");
      let res = await axios.post("/api/mytokens", data);
      const response = res.data;
      // localStorage.setItem("token", response.data.data);
      console.log(response.data);
      setUsdAmt(response.data);
    } catch (err) {
      console.log(err, err);
    }
  }

  useEffect(() => {
    tokenPrice();
  }, []);
  function logoutHandler() {
    signOut();
  }

  async function getUserData() {
    let data = await axios.post("api/userProfile");
    setName(data.data.data);
  }

  useEffect(() => {
    getUserData();
  }, []);

  function onSubmitHandler(event) {
    event.preventDefault();
  }

  return (
    <div>
      <section className="profile-sec ">
        <div className="container">
          <div className="row justify-content-center">
            <form className="funds-sec" id="dashboard-chg" onSubmit={onSubmitHandler}>
              
              {/* <h3 className="funds-heading">Your Dashboard</h3> */}
              <h3> <span style={{ marginBottom: "0px !important", color:"#F77D15", fontWeight:"600" }}>
                  {" "}
                  Welcome {name?.firstName} !{" "}
                </span>{" "}</h3>
              <h4 className="wel-text pt-0">
                {/* Welcome NAME ! */}{" "}
                Start with the <a href="/" style={{color:"#424242"}}> EPOS  Finance Crowdfunding Platform.</a>

              </h4>

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

              <div className="col-head mt-1 " id="col-head">
                <h6 className="mb-0 mt-0" style={{ fontSize: "14px", lineHeight:"1.5rem", fontWeight:"600",  color:"#424242" }}>

                 
                  Share, inspire, and earn using your unique tracking link:                   
                  <span style={{ fontSize: "0.8rem" }}>
                    {" "}
                    https://epos-steel.vercel.app/?ref={props.session.user.email}. {" "}
                  </span>


                  <CopyToClipboard
                  style={{marginLeft:"5px"}}
                    text={`https://epos-steel.vercel.app/?ref=${props.session.user.email}`}
                    onCopy={() => {
                      notify("Copied Successfully");
                    }}
                  >
                    <img style={{ marginLeft: "0px", cursor:"pointer" }} src={"/mdi.png"} />
                  </CopyToClipboard>
                  {" "}

                  Access        
                    {" "}
                    influencer resources
{" "}
                    <a
                    style={{ color: "#424242" }}
                    href=""
                    target="_blank"
                    rel="noreferrer"
                  >
                   here.</a>{" "}
 Questions?{" "}
                  <a
                    style={{ color: "#424242" }}
                    href=""
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Contact us.
                  </a>
                </h6>
                <h6 className="mt-2 mb-4" style={{ fontSize: "14px" }}>
                {" "}
                  {/* |{" "} */}
                  {/* <a
                    style={{ color: "black" }}
                    href="https://EPOS.io/influencer-program/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    Influencer Resources
                  </a>{" "} */}
                </h6>
    {/* <div className="dashboard-img">
      <a href=""  target="_blank"
                    rel="noreferrer">
<img className="solution-img" src="/solution.png"/>
</a>
    </div> */}


                <div className="col-md-12 left-headSec">
                  <div className="link-head  " id="first-sec" style={{justifyContent:"space-between"}}>
                    {/* <Link
                      href={"/tokenPage"
                      }
                      target="_blank"
                      rel="noreferer"
                    >
                      <div className="link-item four-sec"> 
                      <h6 className="dashboard-txt"> Token </h6>
                      </div>
                    </Link> */}

                    <Link href={"/userProfile"}>
                      <div
                        className="link-item first-sec first-set"
                        id="first-item "
                      >
               {" "} 
                      <h6 className="dashboard-txt"> MY PROFILE</h6> 
                      </div>
                    </Link>

                    <Link href={"/funds"}>
                      <div className="link-item third-sec" id="sec-item">
                      <h6 className="dashboard-txt"> MY WALLET</h6> 
                      
                        {/* TOKEN */}
                      </div>
                    </Link>
                    <Link href={"/buy"}>
                      <div className="link-item five-sec" id="first-item">
                      <h6 className="dashboard-txt">      BUY EPOS </h6>
                      </div>
                    </Link>
                    <Link href={"/changePassword"}>
                      <div className="link-item six-sec" id="third-item">
                      <h6 className="dashboard-txt">     CHANGE PASSWORD</h6>
                      </div>
                    </Link>

                    <Link href={"/myrefers"}>
                      <div className="link-item seven-sec" id="four-item">
                      <h6 className="dashboard-txt">    MY REFERRALS </h6>
                      
                      </div>
                    </Link>

                    <Link href={"/login"}>
                      <div
                        className="link-item second-sec "
                        onClick={logoutHandler}
                        id="fifth-item"
                      >
                     <h6 className="dashboard-txt">     LOGOUT</h6>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* <div className="col-md-2 right-profile">
                  <div className="input-line linkPage-line"></div>
                  <div className="wallet-box">
                    <h4 className="wallet-heading">Your Wallet</h4>
                  </div>

                  <div className="wallet-box1">
                    <div>
                      <p className="wallet-para">Coin Price</p>
                    </div>
                    <div>
                      <p className="wallet-amt">$ {usdAmt?.coinPrice} </p>
                    </div>
                  </div>

                  <div className="wallet-box1">
                    <div>
                      <p className="wallet-para">Locked</p>
                    </div>
                    <div>
                      <p className="wallet-amt"> {usdAmt?.locked} EPOS</p>
                    </div>
                  </div>

                  <div className="wallet-box1">
                    <div>
                      <p className="wallet-para">Available Token</p>
                    </div>
                    <div>
                      <p className="wallet-amt">
                        {" "}
                        {usdAmt?.availableToken} EPOS
                      </p>
                    </div>
                  </div>
                  <div className="wallet-box1">
                    <div>
                      <p className="wallet-para">Total</p>
                    </div>
                    <div>
                      <p className="wallet-amt"> {usdAmt?.total} EPOS</p>
                    </div>
                  </div>

                  <div className="wallet-box1">
                    <div>
                      <p className="wallet-para">Total Value</p>
                    </div>
                    <div>
                      <p className="wallet-amt">$ {usdAmt?.totalValue} </p>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-3"></div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinkPage;

{
  /* <section className="profile-sec">
        <div className="container">
          <div className="row justify-content-center">
            <form
              className="input-sec  payment-form "
              id="form-pay"
              style={{ width: "35%", padding: "30px" }}
            >
              <div className="heading-parts">
                <h3
                  className="order-text"
                  style={{ textAlign: "left !important", paddingLeft: "25px" }}
                >
                  DASHBOARD
                </h3>
              </div>

              <div className="input-line   link-line"></div>
              <div className="link-head ">
                <Link href={"/userProfile"}>
                  <div className="link-item">PROFILE</div>
                </Link>

                <div className="link-item" id="first-item">
                  ENABLE 2FA
                </div>
                <Link href={"/funds"}>
                  <div className="link-item" id="first-item">
                    FUNDS
                  </div>
                </Link>

                <div className="link-item" id="second-item">
                  CHANGE PASSWORD
                </div>
                <Link href={"/buy"}>
                  <div className="link-item" id="third-item">
                    BUY TOKEN
                  </div>
                </Link>
                <div className="link-item" id="third-item">
                  TOKEN
                </div>
              </div>
            </form>
          </div>
        </div>
      </section> */
}
