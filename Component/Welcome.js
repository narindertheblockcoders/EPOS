import React, { useEffect, useState } from "react";
import Success from "../public/success.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";


const Welcome = () => {
  const router = useRouter();

//   const via = router.query;

const [transactionID, setTransactionID]= useState(null)
//   console.log( via, 'hello')
async function setTransaction(){
    let tranx = await JSON.parse(localStorage.getItem('tranx'))
console.log(tranx)
    let token =  localStorage.getItem('token')
    let query= await JSON.parse(localStorage.getItem('query'))
    // if(!query) return;
     const data = {
        transactionId:tranx.transId,id:tranx.id,token
       };
       localStorage.removeItem('query')


    let res = await axios.post("/api/payment/success",data)
    let dataa = res.data.data
    console.log(dataa)


    setTransactionID({trans:tranx.transId,id:tranx.id})
}
  useEffect(()=>{
      
    setTransaction()


  },[])
    // const { finalAmount } = router.query

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

            <form
              className="input-sec  payment-form "
              id="form-pay"
              style={{ width: "35%", padding: "30px" }}
            >
              <div className="input-line   welcome-line"></div>
                <div className="wel-head mt-5"  id="heading-part">
<img src={Success.src}/>
                </div>
              <div className="heading-parts mt-5" id="heading-part">
                <h3 className="order-text" style={{color:"green"}}>ORDER CONFIRMATION</h3>
                <p className="pt-2">Your order has been successfully submitted.</p>
                <p className="pt-2 mt-0 text-break">Transaction ID : <strong> {transactionID?.trans} </strong>  <CopyToClipboard
                        text={transactionID?.trans}
                        onCopy={() => notify("Copied Successfully")}
                      >
                        <img style={{ marginLeft: "10px" }} src={'/mdi.png'} />
                      </CopyToClipboard>
                      </p> 
                      {/* <p lassName="pt-2 mt-0"> {transactionID?.id}  </p> */}
              </div>


              <div className="head-partes">
                </div>
              <div className="heading-parts mt-2">
                <Link href={"/dashboard"}>
                <button
                  className="btn btn-round btn-warning form-btn w-50 p-0 mb-3"
                  style={{ marginTop: "0px" }}
                  type="submit"
                >
                  DASHBOARD
                </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
