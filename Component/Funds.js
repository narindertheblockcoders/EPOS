import React, { useRef, useState, useEffect } from "react";
import BTC from "../public/btc.png";
import ETH from "../public/eth.png";
import Polygon  from "../public/polygon.svg";
import Tether from "../public/tether.png";
import FEI from "../public/fei.png";
import Nav from "react-bootstrap/Nav";
import { Tab, Tabs, Sonnet } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import Arrow from "../public/arrow.svg";
import Link from "next/link";
import TokenPage from "./TokenPage";



const Funds = () => {
  const router = useRouter();
  const [token1, setToken] = useState(null);
  const [ref, setRef] = useState();
 const [stakes,setStakes] =useState ()
 const [myTokens,setMyTokens] = useState()

  async function register() {
    try {
      // let token = localStorage.getItem("token");
      let res = await axios.post("/api/funds");
      const rec = res.data;
      // console.log(rec, "error not show");
      setRef(rec.data);
    } catch (err) {
      console.log(err, "Err");
    }
  }
  
  useEffect(() => {
    staking();
    register();
  }, []);


  async function staking() {
    try {
      // let token = localStorage.getItem("token");
      let res = await axios.post("/api/staking");
      let rest = await axios.post("/api/mytokens");

      const rec = res.data;
      // console.log(rec)
      console.log(rest.data.data, "error not show");

      setStakes(rec.data);
      setToken([rest.data.data],'rest here')
    } 
    catch (err) {
      console.log(err, "Err");
    }
  }
//  async function myToken() {
//     try {
//       console.log("my")
//       let token = localStorage.getItem("token");
//       const rec = res.data;
//       console.log(rec, "my Token");
      
//       setMyTokens(rec.data);
//     } catch (err) {
//       console.log(err, "Err");
//     }
//   }

  // useEffect(() => {
  // }, []);



  function formSubmitHandler(e) {
    e.preventDefault();
    transactions();
  }

  async function onClickHandler(event) {
    event.preventDefault();
    router.push("/pay");
  }

  
  return (
    <div>
      <section className="profile-sec" >
        <div className="container">
          <div className="row justify-content-center">
            <div className="funds-sec" onSubmit={formSubmitHandler}>
              <h3 className="funds-heading">
              <span className="arrows-icon" id="fds-arrow"   onClick={()=>router.back()}  style={{ position: "relative", left: "-1%",marginLeft:"20px", cursor: "pointer" }}  >
                    <img src={Arrow.src} />
                  </span>
                 MY WALLET</h3>

              <Tabs
                defaultActiveKey="Wallet"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
               
<Tab   
  eventKey="Wallet"
  className="btn-ajayaar"
  title="Wallet"
  style={{ height: "50px" }}
>
<TokenPage/>
</Tab>
                <Tab
                  eventKey="Funds"
                  className="btn-ajayaar"
                  title="Funds"
                  style={{ height: "50px" }}
                >
                  <div className="search-sec">
                    <input
                      className="search-input"
                      type="text"
                      name="username"
                      placeholder="Search"
                    />
                    <div className="switch-sec">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          style={{ width: "3rem" }}
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                        />
                      </div>
                      <p className="switch-text">Hide Zero Balances</p>
                    </div>
                  </div>
                  {/* <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"> */}
                  <table className="table funds-table" >
                    <thead>
                      <tr>
                        <th scope="col" style={{textAlign:"left"}}> ASSETS</th>
                        <th scope="col">COIN PRICE</th>
                        <th scope="col">AVAILABLE BALANCE</th>
                        <th scope="col">LOCKED</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col" style={{paddingRight:"15px"}}> VALUE</th>
                        <th scope="col" colspan="2"  style={{textAlign:"right"}}>
                          ACTION
                        </th>
                      </tr>
                    </thead>

                    <tbody style={{borderBottom:"1px solid black"}}>
                   {token1? token1?.map((item)=>{
                     return (
                      <tr>
                      <td className="logo-txt">
                         EPOS
                      </td> 
                      <td >
                        {/* {item.availableToken>0? */}
                      {item.coinPrice}
                    {/* } */}
                      </td>
                      <td style={{textAlign:"center"}}>{item?.availableToken}</td>
                      <td id="padding-set"> {item.locked}</td>
                      <td>
                    {item.total}
                      </td>
                      <td  style={{textAlign:"center"}}>{item?.totalValue}</td>
                      <td   style={{textAlign:"right"}}>{item.totalValue>0?
                        <button
                          type="button"
                          className="btn deposit-btn"
                          role="button"
                        disabled={item.availableToken == 0 ? true :false}
                          onClick={()=>router.push('/pay')}
                        >
                          Withdraw
                        </button>:null
                    }
                      </td>
                  
                    </tr>
                     )
                   }):null}
                   
                    
                    </tbody>
                  </table>

                  <table className="table funds-table mt-5">
                    
                    <thead>
                      <tr>
                        <th scope="col" style={{textAlign:"left"}}>STAKING DATE</th>
                        <th scope="col">TOKEN</th>
                        <th scope="col">ROI</th>
                        <th scope="col" id="padding-set">END DATE</th>
                        <th scope="col" style={{textAlign:"right"}}> STATUS</th>
                        
                        {/* <th scope="col" colspan="2" style={{textAlign:"right"}}>
                          ACTION
                        </th> */}
                      </tr>
                    </thead>
                    
                    <tbody>

                      {stakes? stakes.map((item,i)=>{
                        return(

                      
                      <tr key={i}>
                        <td className="logo-txt">
                        {new Date(item.createdAt).toLocaleString('en-us', { day:"numeric", year:"numeric", month:"numeric"})}
                        </td>
                        <td>{item.token} </td>
                        <td>{item.roi}%</td>
                        <td>
                          {new Date(item.endDate).toLocaleString('en-us', { year:"numeric", month:"numeric",day:"numeric", }) }
                       
                        </td>
                        <td style={{textAlign:"right"}}>Approved</td>
                        
                      </tr>
                        )

                      }):null}
                    </tbody>
                  </table>

               
                </Tab>
                <Tab
                  eventKey="Transfer"
                  style={{ height: "50px" }}
                  title="Transaction"
                >
                  {/* <Sonnet /> */}

                  <table className="table funds-table">
                    <thead>
                      <tr>
                        <th scope="col" 
                        // style={{ textAlign:"left" }}
                        >
                          DATE
                        </th>
                        <th scope="col">USD AMOUNT</th>
                        <th scope="col">TOKEN QUANTITY</th>
                        <th scope="col">TOKEN PRICE</th>
                        <th scope="col">PAYMENT MODE</th>
                        <th
                          scope="col"
                          id="coin-padd"
                          style={{ width: "10%", paddingRight: "0" }}
                        >
                          COIN
                        </th>
                        <th
                          scope="col"
                          style={{ width: "20%", textAlign: "center" }}
                        >
                          FINAL AMOUNT
                        </th>
                        <th
                          scope="col"
                          colSpan="2"
                          style={{ textAlign: "center" }}
                        >
                          STATUS
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {ref
                        ? ref?.map((item) => {
                            return (
                              <>
                                <tr>
                                  <td
                                    className="logo-txt" id="logo-padd"
                                    style={{ textAlign:"center" }}
                                  >
                                    {new Date().toDateString()}
                                  </td>

                                  <td> {item.usdAmount} </td>
                                  <td style={{paddingLeft:"0px !important"}}>{item.tokenQuantity}</td>
                                  <td id="td-set">
                                    {" "}
                                    <strong>{item.tokenPrice}</strong>
                                  </td>
                                  <td>{item.paymentMode}</td>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      width: "10%",
                                    }}
                                  >
                                    {item.coin}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {item.finalAmount}
                                  </td>
                                  <td>{item.status}</td>
                                  {/* <td><button type="button" onClick={onClickHandler} className="btn deposit-btn" role="button">Deposit</button> </td>
         <td style={{width:"5%",}}><button type="button" className="btn deposit-btn" role="button">Withdraw</button></td> */}
                                </tr>
                              </>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </Tab>
              </Tabs>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                ></div>
            
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Funds;
