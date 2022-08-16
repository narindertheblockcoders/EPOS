import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const data = req.body
      // // console.log (data, "api values");

      let response = await axios.post("");
      const reference = response.data;
      console.log(reference, "string");
      res.status(200).json({ data: reference });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
