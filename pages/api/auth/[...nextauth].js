import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 1500,
    secret:"ayC5ej+5fmSNxGt61XXH2uSa61wQgCr2dUwmAoDUzXs="
  },
  providers: [
    CredentialsProviders({
      name: "Custom Provider",
      async authorize(credentials) {
        let { email, password } = credentials;
        // console.log(credentials)
        let data = { email: email, password: password };
        // console.log(data, "form email and password");
        
        let response = await axios.post(
          "http://13.215.196.173:3000/api/v1/auth/signin",
          data
        );
        let user = response.data;
        let token = response.data.data;
        console.log(token ,"token di mdl")
        var decoded = jwt_decode(token);
        console.log(decoded)
        let iat = decoded.referralcode.toString()
        if (!token) {
          throw new Error("Invalid token");
        }
        if (!(response.status == 200)) {
          
          throw new Error("Invalid Credentials" + email);
        } 
        if (response.status == 200) {
          return (user = {
            name: token,
            email: iat,
           
          });
          
        }
      },
    }),
  ],
});
