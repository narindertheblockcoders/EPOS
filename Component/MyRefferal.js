import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Arrow from "../public/arrow.svg";



const MyRefferal = () => {
    const [data,setData] = useState()
    async function getPeople(){
        let resp = await axios.post('/api/refers')
        console.log(resp.data.data)
        setData(resp.data.data)
    }
useEffect(()=>{
    getPeople()
},[])
  return (
    <div>
    <section className="profile-sec" >
      <div className="container">
        <div className="row justify-content-center">
 
          <form className="input-sec" id="ref-code"  >
            {/* <div className="line profile-line" id="ch-line"></div> */}
            <h3 className="heading-text pink-text mt-2 ">
            <Link href={'/dashboard'}>
            <span  className="arrows-icon" id='left-rfset' style={{ position: "relative", left: "-44%", cursor:"pointer" }}  >
            <img src={Arrow.src} />
                </span>
                </Link>
                My Referrals</h3>
               
                <table className="table funds-table mt-5" id='funds-color'>
                    
                    <thead>
                      <tr>
                        <th id='fuds' scope="col" >Sr. No.</th>
                        <th id='fuds' scope="col">First Name</th>
                        {/* <th id='fuds' scope="col">Last Name</th> */}
                        {/* <th id='fuds' scope="col">Email</th> */}
                        <th id='fuds' scope="col"  >Registeration Date</th>
                        
                        {/* <th scope="col" colspan="2" style={{textAlign:"right"}}>
                          ACTION
                        </th> */}
                      </tr>
                    </thead>
                    
                    <tbody >

                      {data? data.map((item,i)=>{
                        return(

                      
                      <tr key={i}>
                        <td className="">
                        {(i+1)}
                        </td>
                        <td>{item.firstName} </td>
                        {/* <td>{item.lastName}</td> */}
                        {/* <td>{item.email}</td> */}
                        <td>{new Date(item.regDate).toLocaleString('en-us', { day:"numeric", year:"numeric", month:"numeric"} )}</td>
                        {/* <td style={{textAlign:"right"}}>Approved</td> */}
                        
                      </tr>
                        )

                      }):null}
                    </tbody>
                  </table>


          
              {/* <div
                className="input-item item-set"
                style={{ marginLeft: "10px" }}
                >
              </div> */}
              {/* {enterfield && (<p style={{ color: "red" }}> Invalid detail </p>)} */}



            {/* <Link href={"/login"}> */}

          
            {/* <button
              href="funds-page.html"
              className="btn btn-round btn-warning w-100 "
              style={{ marginTop: "0px", marginBottom: "0px" }}
              type="submit"
            >
              UPDATE
            </button> */}

       
            {/* </Link> */}
          </form>
        </div>
      </div>
    </section>
  </div>
  )
}

export default MyRefferal