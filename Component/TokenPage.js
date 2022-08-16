
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Arrow from "../public/arrow.svg";


const TokenPage = () => {

  // const [rxAmt,setRxAmt ] =useState()
  const [usdAmt, setUsdAmt] = useState()

  async function tokenPrice(data) {
    try {
      // let token = localStorage.getItem("token");
      let res = await axios.post("/api/mytokens",data);
      const response = res.data
      // localStorage.setItem("token", response.data.data);
      console.log(response.data)
      setUsdAmt(response.data)
    }
    catch (err) {
      console.log(err, err);

    }
  }

  useEffect(() => {
    tokenPrice()
  }, [])

  function onSubmitHandler(event) {
    event.preventDefault()
  }



  return (
    <div>

      <section className="profile-sec " id="wallet-setting" >
        <div className="container">
          <div className="row justify-content-center">
            <form className="funds-sec" onSubmit={onSubmitHandler}>
              {/* <h3 className="funds-heading">DASHBOARD</h3> */}
           
              <div className="col-head" style={{display:"flex", justifyContent:"center", }}>
                {/* <div className="col-md-7 left-headSec">

                  <div className="link-head  " id="first-sec">
                    <Link href={"/userProfile"}>
                      <div className="link-item first-sec">PROFILE</div>
                    </Link>

                    <div className="link-item second-sec" id="first-item">
                      ENABLE 2FA
                    </div>
                    <Link href={"/funds"}>
                      <div className="link-item third-sec" id="first-item">
                        FUNDS
                      </div>
                    </Link>

                    <Link href={'/changePassword'}>
                      <div className="link-item four-sec" id="second-item">
                        CHANGE PASSWORD
                      </div>
                    </Link>
                    <Link href={"/buy"}>
                      <div className="link-item five-sec" id="third-item">
                        BUY TOKEN
                      </div>
                    </Link>
                    <div className="link-item six-sec" id="third-item">
                      TOKEN
                    </div>
                  </div>


                </div>
                */}



                <div className="col-md-12 right-profile" id="right-profile" >
               <div className="input-line linkPage-line" ></div>
                  <div className="wallet-box">
                  {/* <h3 className="funds-heading"> */}
                {/* <Link href={'/linkPage'}>
                  <span className="arrows-icon" style={{ position: "relative", left: "-23%", cursor: "pointer" }}  >
                    <img src={Arrow.src} />
                  </span>
                </Link>
                dashboard  </h3>   */}
     <Link href={'/dashboard'}>
                  <span className="arrows-icon" style={{ position: "relative", left: "-0%", cursor: "pointer" }}  >
                    <img src={Arrow.src} />
                  </span>
                  </Link>
                    <h4 className="wallet-heading" style={{paddingLeft:"20px"}}>
       
                        WALLET
                       
                        </h4>
              
                  </div>

                  <div className="wallet-box1">
                  <div>
                      <p className="wallet-para">Coin Price</p>
                    </div>
                    <div >
                      <p className="wallet-amt">10 $ </p>
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
                      <p className="wallet-amt"> {usdAmt?.availableToken} EPOS</p>
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
                </div>
                {/* <div className="col-md-3"></div> */}


              </div>

            </form>



          </div>
        </div>

      </section>


    </div>
  );
};

export default TokenPage;




{/* <section className="profile-sec">
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
      </section> */}
