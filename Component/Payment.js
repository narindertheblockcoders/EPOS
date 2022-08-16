import React, { useEffect, useState } from "react";
import Arrow from "../public/arrow.svg";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { Spinner, Alert } from "react-bootstrap";
import { utils } from "ethers";
import { YourApp } from "./ui/ConnectBtn";
import ab from "../utils/coin.json";
let { abi } = ab;
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useNetwork,
  useProvider,
} from "wagmi";
import { BigNumber } from "ethers";
const Payment = () => {
  const [usd, setUSD] = useState(0);
  const [finalRes, setFinalRes] = useState();
  const [price, setPrice] = useState(null);
  const [isLoadings, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currency, setCurrency] = useState(null);
  const [finalValue, setFinalValue] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [txId, setTxId] = useState(null);
  const router = useRouter();
  const account = useAccount();
  const [transaction, setTransactions] = useState(null);
  const [refferAccount, setRefferAccount]= useState()
  // console.log(account.address);
  const { chain, chains } = useNetwork();
  // console.log(chains);
  let tokenAddress = "0xD5f41607518Bf05e55754c61639DA77BdedA74A2";
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: tokenAddress,
    contractInterface: abi,
    functionName: "register",

    args: [],

    onSettled(data, error) {
      setIsLoading(true);
      console.log("Settled", { data, error });
      setErrorMessage(error?.message);
      if (error) {
        setIsLoading(false);

        console.log(error.data.message, "err");
        if (error.data.message) {
          setErrorMessage(error?.data.message);
        } else {
          setErrorMessage(error);
        }
        // setTimeout(function () {
        //   setModalShow(false);
        // }, 2000);
      }
    },
    onSuccess(data) {
      // setTransHash(data?.hash);
      console.log("Success", data);
      setTransactions(data?.hash);
    },
  });
  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      // setTransaction(data?.hash);

      // setSuccess(true);
      console.log("Settled Wait", { data, error });
      // let token = getCurrentToken()
      // console.log(token)
      console.log(data);
      // let tokenId = parseInt(token.data);
      if (data?.status == 1) {
        setTransaction(data?.hash);

        console.log("api");
      }
      if (data?.status == 0) {
        setErrorMessage(error);
        setIsLoading(false);

        // setErrorMessage("Transaction failed");
        // setTimeout(function () {
        //   setModalShow(false);
        // }, 2000);
      }
      if (error) {
        setErrorMessage(
          "An error has occurred please check etherscan for full details."
        );
        setTimeout(function () {
          setModalShow(false);
        }, 5000);
        return;
      }
    },
  });
  const [maticPrice, setMaticPrice] = useState(null);

  // const token = useContractRead({
  //   addressOrName: tokenAddress,
  //   contractInterface: abi,
  //   functionName: "getLatestPrice",
  //   onSettled(data, error) {
  //     // console.log("Settled", { data, error });
  //     // let dat = BigNumber.from(data).toNumber();
  //     // console.log(dat);
  //     setMaticPrice(dat / 100000000);
  //   },
  // });

  async function payment() {
    try {
      let res = await axios.post("/api/payment");
      const record = res.data;
      let ud = await JSON.parse(localStorage.getItem("query"));
      setUSD(ud.enteredFor);
      setQuantity(ud.finalValue);
      console.log(ud.finalValue);
      console.log(JSON.parse(localStorage.getItem("query")));
      setPrice(record.arr);
      console.log(record.arr, "arrr");
      setFinalRes(record.data.data);
    } catch (err) {
      console.log(err, "hello");
    }
  }

  async function setTransaction(data) {
    //     let tranx = await JSON.parse(localStorage.getItem('tranx'))
    // console.log(tranx)
    //     let token =  localStorage.getItem('token')
    //     let query= await JSON.parse(localStorage.getItem('query'))
    // if(!query) return;
    const tx = {
      transactionId: data,
      id: txId,
    };

    let res = await axios.post("/api/payment/success", tx);
    let response = res.data.data;
    console.log(response);

    // setTransactionID({trans:tranx.transId,id:tranx.id})

    router.push({
      pathname: "/paymentForm",
      query: { via: currency, finalAmount: finalValue },
    });
  }

  async function formPut(e) {
    let currency = e?.currentTarget?.name;
    console.log(e?.currentTarget?.name);
    // let currency = 2;
    // return;
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const local = await localStorage.getItem("query");
      const localValue = JSON.parse(local);
      let currency = 4;
      // const token = localStorage.getItem("token");
      console.log(usd, price, currency);
      let finalAmount = usd.toString() / price[currency - 2];

      // console.log(finalAmount , usd, price)
      const data = {
        usdAmount: localValue.enteredFor,
        tokenQuantity: localValue.finalValue,
        tokenPrice: localValue.tokenPrice,
        finalAmount: finalAmount.toFixed(4),
        paymentMode: 2,
        currencyId: currency,
        // token,
      };
      setCurrency(currency);
      setFinalValue(finalAmount);
      console.log(data, "Parse data on payment form");

      let res = await axios.post("/api/formfill", data);
      const response = res.data;
      console.log(response, "data");
      setTxId(response.data.id);

      // console.log(quant)

      let qu = BigInt(quantity * 1000000000000000000);
     
      let pay = (usd * maticPrice).toString();
      let da = pay;
      console.log(usd, maticPrice);
      // let usdt = 1 * 100;
      let payWei = BigInt(pay * 1000000000000000000);
      console.log(usd * 1000000000000000000, qu)
      write({
        args: [refferAccount ],
        overrides: {
          value: localValue.enteredFor,
          gasLimit: 450000,
        },
      });
      // router.push({
      //   pathname: "/paymentForm",
      //   query: { via: currency, finalAmount: finalAmount },
      // });
    } catch (err) {
      console.log(err, "error-1");
    }
  }

  // async function currencyData() {
  //   try {
  //     let res = await axios.post("/api/currencydata");
  //     const response = res.data;
  //     console.log(response, "currencyData on payment form");
  //   } catch (err) {
  //     console.log(err, "error-2");
  //   }
  // }

  // useEffect (()=> {
  //   currencyData()
  // }, [])

  function formSubmitHandler(event) {
    event.preventDefault();
  }
  function onTrans() {}

  useEffect(() => {
    // token;
    payment();
    console.log(isError);
  }, []);

  return (
    <div>
      <section className="profile-sec verify-hight">
        <div className="container">
          <div className="row justify-content-center">
            <form className="input-sec input-top" onSubmit={formSubmitHandler}>
              <div className="input-line credit-line" id="cred-line"></div>

              <h3 className="heading-text mt-0">
                {/* <Link href={"/creditPage"}> */}
                <span
                  className="arrow-icon"
                  onClick={() => router.back()}
                  style={{ position: "relative", left: "-10%" }}
                >
                  <img src={Arrow.src} />
                </span>
                {/* </Link> */}
                Pay with crypto wallet
              </h3>

              <YourApp name={"Connect Wallet"} setIsMounted={setIsMounted} />
              {isMounted && price ? (
                <div
                  style={{ alignItems: "center", textAlign: "center" }}
                  className="input-item mt-3"
                >
                  <input className="textinput" onChange={e=>setRefferAccount(e.currentTarget.value)} type="text" placeholder="Refferer address"></input>
                  <button
                    type="button"
                    name={chain?.id}
                    disabled={isLoadings}
                    onClick={(e) => {
                      // formPut(e);
                      // onTrans();
                      formPut(e);
                    }}
                    className="btn  credit-btn mt-2"
                    style={{ padding: "15px !important" }}
                  >
                    Pay with {chain?.name}{" "}
                    {isLoadings ? (
                      <Spinner size="sm" animation="border" variant="primary" />
                    ) : (
                      ""
                    )}
                    {/* {(usd / price[item.id - 2]).toFixed(4)} */}
                    {/* {(usd / price[1]).toFixed(4)} */}
                  </button>
                  {transaction != null && errorMessage == null ? (
                    <Alert style={{ marginTop: "10px" }} variant="success">
                      {" "}
                      Please wait while the transaction is being processed.
                    </Alert>
                  ) : (
                    ""
                  )}
                  {errorMessage != null ? (
                    <Alert
                      style={{ textAlign: "center" }}
                      variant={"danger"}
                      className="text-break mt-2"
                    >
                      {errorMessage.substring(0, 50)}
                    </Alert>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              {/* {errorMessage && errorMessage} */}
              {/* {!isMounted ? (""
              ) : finalRes ? (
                finalRes.map((item) => {
                  if (item.id == 1) return;
                  return (
                    <div key={item.id} className="input-item mt-3">
                      <button
                        type="button"
                        disabled={isLoadings}
                        onClick={(e) => {
                          // formPut(e);
                          write({
                            args: [account.address,quantity],
                            overrides: {
                              gasLimit: 3302558,
                              value: (quantity * 100000000000000).toString()
                            },

                          });
                        }}
                        value={item.id}
                        className="btn  credit-btn mt-2"
                        style={{ padding: "15px !important" }}
                      >
                        Pay with {item.description}{" "}
                        {(usd / price[item.id - 2]).toFixed(4)}
                      </button>
                    </div>
                  );
                })
              ) : (
                <Spinner animation="border" variant="primary" />
              )} */}

              {/* <Link href={'/paymentForm'}>
            //   <button type="button" className="btn  credit-btn mt-2" style={{padding:"15px !important"}}><img className="icon-space" src={Bitcoin.src}/> Pay with Bitcoin</button> 
            //  </Link>
              <button type="button" className="btn  connect-btn mt-3  mb-0" style={{padding:"15px !important"}}><img className="icon-space" src={Eth.src}/>Pay with Ethereum</button>  
              <button type="button" className="btn  connect-btn mt-3 mb-0"  style={{padding:"15px !important"}}><img className="icon-space" src={Tether.src}/> Pay with USDT</button> 
             <Link href={"/pay"}>
              <button type="button" className="btn  connect-btn mt-3 mb-3" style={{padding:"15px !important"}}><img className="icon-space" src={Polygon.src}/> Pay with Polygon</button> 
     </Link> */}
            </form>
          </div>
        </div>
        <div className="text-set mt-4" id="skip-page">
          <Link href={"/dashboard"}>
            <p style={{ cursor: "pointer" }}>Skip for Now</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Payment;
