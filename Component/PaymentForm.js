import React, { useEffect, useState } from "react";
import Qr from "../public/qrcode.png";
import MDI from "../public/mdi.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


const PaymentForm = () => {
  const router = useRouter();
  const [ifSetId, setIfSetId] = useState(null);

  const [query, setQuery] = useState(null);
  const [ifFinalValue, setIfFinalValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRef, setLoadingRef] = useState(false);


  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  const via = router.query;
  const { finalAmount } = router.query;

  async function payment() {
    try {
      let res = await axios.post("/api/payment");
      const record = res.data;
      console.log(record.data.data);
      setIfSetId(record.data.data);

      if( setIfSetId){
        return(
          <Spinner animation="border" variant="primary" />
        )
      }


      setIfFinalValue(record.data.data);
    } catch (err) {
      console.log(err, "hello");
    }
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

  useEffect(() => {
    payment();
    if (window) {
      setQuery(JSON.parse(localStorage.getItem("query")));
    }
  }, []);

  async function formSubmitHandler(event) {
    event.preventDefault();

    var query = await JSON.parse(localStorage.getItem("query"));
    console.log(query);
    // localStorage.setItem("finaldata", JSON.stringify(query));
    setLoadingRef(true)
    setIsLoading(true)

    router.push("/dashboard");

    // PaymentForm()
  }


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
      <section className="profile-sec  pt-5 pb-3" >
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
              className="input-sec  "
              id="form-pay"
              style={{ width: "35%", padding: "30px" }}
              onSubmit={formSubmitHandler}
            >
              <div className="heading-parts">
                <h3 className="order-text">Your Order Confirmation</h3>
              </div>

              <div className="input-line   paymentForm-line" id="line-set"></div>

              <div className="head-partes mt-0">
                <div className="input-item mt-0" style={{marginTop:"0px !important"}}>
                  <div className="payment-method mt-0" id="payment-method">
                    <div className="flex-ipt mt-2">
                      <h4 className="payment-text">
                         EPOS Price:{" "}
                        <span> {query && query?.tokenPrice}</span>
                      </h4>
                      {/* <input className='ipt-currency' defaultValue={}></input> */}
                    </div>

                    <div className="flex-ipt">
                      <h4 className="payment-text">
                        Amount Paid :{" "}
                        <span> {query && query?.enteredFor}</span>
                      </h4>
                      {/* <input type="text" className='ipt-currency' defaultValue={query?.enteredFor}></input> */}
                    </div>

                    <div className="flex-ipt">
                      <h4 className="payment-text">
                         EPOS OWNED:{" "}
                        <span>  {query && query?.finalValue}</span>{" "}
                      </h4>
                      {/* <input type="text" className='ipt-currency' defaultValue={query?.finalValue}></input> */}
                    </div>

                    {/* <div className='flex-ipt'>

                      {ifSetId?.map(item => {
                        if (item.id == via.via) {
                          return <p className='ipt-currency' >{item.description}  </p>
                        }
                      })}
                      <p className='ipt-currency  font-weight-bold ' > {(parseFloat(finalAmount)).toFixed(5)}</p>
                    </div> */}

                    {/* <div className='flex-ipt'>
                      {/* <h4 className='payment-text'>Money in EPOS </h4> */}

                    {/* </div> */}
                  </div>
                  <div className="final-data">
                      <div className="dps text-break">
                        <p className=" dps-text   text-break" id="padd-set" style={{fontWeight:'500'}}>
                          {" "}
                          Paid <b> {parseFloat(finalAmount).toFixed(4)}</b>
                        </p>
                        {ifSetId?.map((item) => {   
                          if (item.id == via.via) { 
                            return (
                              <p className="dps-text" id="padd-set" style={{paddingLeft:"5px"}}>  {item.description} </p>
                            );}
                            })}
                        <p className="text-break" id="padd-set" style={{ paddingLeft: "5px" }}> for  {query && query?.finalValue} EPOS </p> 
                      </div>
                    </div>
                </div>

                {/* <div className="col-md-7">
                  <div className="input-item" id="space-ietm"> */}
                    {/* <div className="qr-sec m-0">
                      <Link href={"/varification"}>
                        <img src={Qr.src} className="qr" />
                      </Link>
                    </div> */}
                    {/* <div className="qr-sec m-0"> */}
                      {/* <p className="qr-text">OR</p>
                    </div> */}
                    {/* <div
                      className="para-set"
                      style={{
                        display: "flex",
                        border: "none",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginTop: "0px",
                        paddingLeft:"20px"
                      }}
                    >
                      <p className="iptpara-text text-break" style={{ fontSize: "13px" }}>
                        0x8B9071AAC02ab97b250f66A2aBa629f6e8806e07{" "}
                      </p>
                      <CopyToClipboard
                        text={"0x8B9071AAC02ab97b250f66A2aBa629f6e8806e07"}
                        onCopy={() => notify("Copied Successfully")}
                      >
                        <img style={{ marginLeft: "10px" }} src={MDI.src} />
                      </CopyToClipboard>
                    </div> */}
                    {/* <div className='deposit-cls'>
                      <p> DEPOSIT </p>
                    </div> */}

                    {/* <div className="final-data">
                      <div className="dps text-break">
                        <p className=" dps-text font-weight-bold  text-break" id="padd-set">
                          {" "}
                          DEPOSIT {parseFloat(finalAmount).toFixed(4)}
                        </p>
                        {ifSetId?.map((item) => {   
                          if (item.id == via.via) { 
                            return (
                              <p className="dps-text" id="padd-set" style={{paddingLeft:"5px"}}>  {item.description} </p>
                            );}
                            })}
                        <p className="text-break" id="padd-set" style={{ paddingLeft: "5px" }}> to the wallet address</p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="heading-parts ">
                {/* <Link href={"/login"}> */}
                {/* <button
                  className="btn btn-round btn-warning form-btn w-50 p-0 mb-3"
                  style={{ marginTop: "57px" }}
                  type="submit"
                  id="space-zero"
                >
                  CONTINUE
                </button> */}

                <Button
      variant="primary"
      className="btn btn-round btn-warning form-btn w-100 p-0 mb-3"
                  style={{ marginTop: "35px" }}
                  type="submit"
                  id="space-zero"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      >
      {isLoadingRef ? 'Loading…' : '   CONTINUE'}
    </Button>








                {/* </Link> */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentForm;
