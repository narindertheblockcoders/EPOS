import React from 'react'
import Payment from '../Component/Payment'
import{getSession} from 'next-auth/react'
import Head from 'next/head'

const payment = () => {
  return (
    <div>
      <Head>
      <title>Payment Method</title>
      </Head>
      <Payment/>
    </div>
  )
}

export default payment

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
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