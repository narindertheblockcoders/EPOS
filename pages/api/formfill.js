import axios from "axios";
import {getSession} from 'next-auth/react'
import { setEmitFlags } from "typescript";

export default async function handler(req, res) {
  const session = await getSession({req})
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data, "api values");

      const finalData = {
        usdAmount: data.usdAmount,
        tokenQuantity: data.tokenQuantity,
        tokenPrice: data.tokenPrice,
        finalAmount: data.finalAmount,
        paymentMode: data.paymentMode,
        currencyId: data.currencyId,
      };
      console.log(finalData, "finnhubsahuc");
      // let token = data.token;
      const config = {
        headers: { Authorization: `Bearer ${session.user.name}` },
      };

      let response = await axios.post(
        "http://13.215.196.173:3000/api/v1/buy/token",
        finalData,
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
