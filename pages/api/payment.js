import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const data = req.body
      // console.log (data, "api values");

      let response = await axios.post(
        "http://13.215.196.173:3000/api/v1/list/currencies"
      );
      const reference = response.data;
      console.log(reference.data, "string");
      const token = ["bitcoin", "ethereum", "matic-network", "tether"];
      let dat = await reference.data;
      let arr = [];
      for (let i = 0; i <= dat.length - 2; i++) {
        let response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${token[i]}&vs_currencies=usd`
        );
        // arr.push(response.data)
        console.log(response.data);
        if (i == 0) {
          arr.push(response.data.bitcoin.usd);
        } else if (i == 1) {
          arr.push(response.data.ethereum.usd);
        } else if (i == 2) {
          arr.push(response.data["matic-network"].usd);
          // console.log(response.data["matic-network"].usd)
        } else if (i == 3) {
          arr.push(response.data.tether.usd);
        }
      }

      res.status(200).json({ data: reference, arr: arr });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
