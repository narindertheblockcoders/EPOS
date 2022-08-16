import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let response = await axios.post(
        "http://13.215.196.173:3000/api/v1/list/tokenprice"
      );
      const reference = response.data;
      console.log(reference, "string");
      res.status(200).json({ data: reference });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
