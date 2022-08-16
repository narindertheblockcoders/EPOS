import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data);

      let response = await axios.post(
        "http://13.215.196.173:3000/api/v1/auth/verifyinitialcode",
        data
      );
      const redirect = response.data;
      console.log(response);

      res.status(200).json({ data: redirect });
    } catch (err) {
      console.log(err.data);
      res.status(500).json({ err: err });
    }
  }
}
