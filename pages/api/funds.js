import axios from "axios";
import {getSession} from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({req})
  if (req.method === "POST") {
    try {
      const data = req.body;

      // let { token } = data;
      // console.log(token, "dataa");

      var config = {
        method: "post",
        url: "http://13.215.196.173:3000/api/v1/buy/transactions",
        headers: {
          Authorization: `Bearer ${session.user.name} `,
        },
      };
      await axios(config).then(function (response) {
        // console.log(JSON.stringify(response.data));
        res.status(200).json({ data: response.data.data });
        
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}


