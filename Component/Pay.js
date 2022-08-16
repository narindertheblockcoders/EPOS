import React from "react";
import Arrow from "../public/arrow.svg";
import Qr from "../public/qrcode.png";
import MDI from "../public/mdi.png";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const Pay = () => {

  const router = useRouter()
  ///////////toast////////////////
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

  return (
    <div>
      <section className="profile-sec">
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
            <form className="input-sec input-top" style={{ width: "40%" }}>
              <div className="input-line pay-line"></div>

              {/* <h3 className="heading-text mt-0"><span style={{position:"relative", left:"-30%"}}><img src={Arrow.src}/></span> Pay <span style={{color:"#F77D15", fontWeight:"boldW"}}>2.334 BTC</span></h3> */}

              <span className="arrows-icon" onClick={()=>router.back()}  style={{ position: "relative", left: "-45%", cursor: "pointer" }}  >
                    <img id="arrow-icon" style={{width:"3.5%"}} src={Arrow.src} />
                  </span>
              <div className="mt-1 input-item ">
                <div className="qr-sec">
              

                  <Link href={"/varification"}>

                    <img src={Qr.src} className="qr" />
                  </Link>
                </div>
                <div className="qr-sec">
                  <p className="qr-text">OR</p>
                </div>
                <div
                  className="para-set"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "24px",
                    border: "none",
                    overflow: "hidden",
                    width: "111%",
                  }}
                >
                  <p
                    className="iptpara-text"
                    style={{
                      fontSize: "14px",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    0x8B9071AAC02ab97b250f66A2aBa629f6e8806e07
                    {/* <img style={{marginLeft:"10px"}} src={MDI.src}/> */}
                    <CopyToClipboard
                      text={"0x8B9071AAC02ab97b250f66A2aBa629f6e8806e07"}
                      onCopy={() => notify("Copied Successfully")}
                    >
                      <img style={{ marginLeft: "10px" }} src={MDI.src} />
                    </CopyToClipboard>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pay;
