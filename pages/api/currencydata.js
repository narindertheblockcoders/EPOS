import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      
        try{
       
    
        let response = await axios.post('https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd');
        const reference = response.data
        // console.log(reference, "string")
        res.status(200).json({ data: reference })
        
        
    }
    catch (err) {
        console.log (err);
    res.status(500).json({ Error: err});
}}

  }
  