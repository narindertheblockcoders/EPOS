import React from 'react'
import PaymentForm from '../Component/PaymentForm'
import{getSession} from 'next-auth/react'
import Head from 'next/head'

const paymentForm = () => {
  return (
    <div>
      <Head>
      <title>Welcome</title>
      </Head>
        <PaymentForm/>
    </div>
  )
}

export default paymentForm

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