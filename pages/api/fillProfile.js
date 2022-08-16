import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log (data, "api values");

      // console.log(re)
      let response = await axios.post(
        "http://13.215.196.173:3000/api/v1/auth/signup",
        data
        );
        const reference = response.data;
      

      // console.log(reference, "string");
      res.status(200).json({ data: reference });
    } catch (err) {
      // console.log(err);        "http://13.215.196.173:3000/api/v1/auth/signup",

      res.status(500).json({ Error: err });
    }
  }
}