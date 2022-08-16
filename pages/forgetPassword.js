import React from 'react'
import ForgetPassword from '../Component/ForgetPassword'
import {getSession} from 'next-auth/react'
import Head from 'next/head'

const forgetPassword = () => {
  return (
    <div>
      <Head>
      <title>Forget Passsword</title>
      </Head>
        <ForgetPassword/>
    </div>
  )
}

export default forgetPassword

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      }
    }
  }
  return {
    props:{
      session
    }
  }
}