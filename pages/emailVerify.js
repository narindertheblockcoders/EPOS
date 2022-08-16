import React from 'react'
import EmailSubmit from '../Component/EmailSubmit'
import {getSession} from 'next-auth/react'
import Head from 'next/head'

const emailVerify = () => {
  return (
    <div>
      <Head>
      <title>Email Verify</title>
      </Head>
        <EmailSubmit/>
    </div>
  )
}

export default emailVerify

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: "/",
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