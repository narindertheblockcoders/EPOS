// import axios from "axios";
// import {getSession} from 'next-auth/react'

// export default async function handler(req, res) {
//     const session = await getSession({req})
//   if (req.method === "POST") {
//     try {
//       const data = req.body;
//       console.log(data, "api values");

//       let response = await axios.post("http://13.215.196.173:3000/api/v1/auth/signin",data);
//       const reference = response.data;
//       console.log(reference, "string")
//       res.status(200).json({ data: reference });
//     } 
//     catch (err) {
//       console.log(err);
//       res.status(500).json({ Error: err });
//     }
//   }
// }
