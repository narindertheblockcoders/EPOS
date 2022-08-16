import axios from "axios";
import {getSession} from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({req})
  if (req.method === "POST") {
    try {

    //   console.log(finalData, "finnhubsahuc");
      // let token = data.token;
      const config = {
        headers: { Authorization: `Bearer ${session.user.name}` },
      };

      let response = await axios.post(
        "http://13.215.196.173:3000/api/v1/user/myrefferlist",'',
        config
      );
      const reference = response.data;
      console.log(reference.data, "string");
      res.status(200).json({ data: reference.data });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
