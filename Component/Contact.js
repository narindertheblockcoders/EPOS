
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Arrow from "../public/arrow.svg";


const Login = () => {
 


  const router = useRouter()

  return (
    <div>
      <section className="profile-sec">
        <div className="container">
          <div className="row justify-content-center">
            
            <form
              className="input-sec  payment-form "
              id="form-pay"
              style={{ width: "35%", padding: "30px" }}
            >
              <div className="input-line   welcome-line"></div>
                <span className="arrows-icon" onClick={()=>router.back()}  style={{ position: "relative", left: "-41%", cursor: "pointer" }}  >
                    <img id="arrow-icon" style={{width:"2.5%"}} src={Arrow.src} />
                  </span>
                <div className="wel-head mt-4"  id="heading-part">
<img src="email.png"/>
                </div>
              <div className="heading-parts "  id="heading-part">
                <h3 className="order-text" style={{color:"#F77D15", fontSize:"24px !important"}}>Contact Us</h3>
                <p className="pt-2">We're here for you to answer your questions and support you on your path to being EPOS. Email us or use the chat below.



</p>
           
                      {/* <p lassName="pt-2 mt-0"> {transactionID?.id}  </p> */}
              </div>
              <script src="//code.tidio.co/cxqo3ntmn8twp6qa7xomks3yhutwseht.js" async></script>





              <div className="head-partes">
                </div>
              <div className="heading-parts mt-2">
                {/* <Link href={"/dashboard"}> */}
              
                {/* <Script id="form-script-tag-3443593" src="https://www.EPOS.net/public/remote/page/4931931cf737288ba0e8b30a751ad4c276fd7bc.js"></Script> */}
                <button
                  className="btn btn-round btn-warning form-btn w-50 p-0 mb-3 systeme-show-popup-3443593"
                  style={{ marginTop: "0px" }}
                  type="submit"
                >
               Email
                </button>
                {/* </Link> */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
      
      
      
      
      
      
      );
    };
    
    export default Login;
    
      
 

