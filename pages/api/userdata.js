import axios from "axios";
import {getSession} from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({req})
  if (req.method === "POST") {
    try {
      // const{token} = req.body;
       const {data} = req.body
       console.log(req.body)
console.log(data ,'data a gya')
      var config = {
        method: "post",
        url:  "http://13.215.196.173:3000/api/v1/user/updateprofile",
        headers: {
          Authorization: `Bearer ${session.user.name} `,
        },
        data
      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        res.status(200).json({ data: response.data.data });
      });


      // res.status(200).json({ data: reference });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}