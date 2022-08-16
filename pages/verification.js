import React from 'react'
import Varification from '../Component/Verification'
import {getSession} from 'next-auth/react'
import Head from 'next/head'

const verification = () => {
  return (
    <div>
      <Head>
      <title>Verification</title>
      </Head>
        <Varification/>
    </div>
  )
}

export default verification

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