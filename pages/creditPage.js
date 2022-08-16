import React from 'react'
import CreditPage from '../Component/CreditPage'
import{getSession} from 'next-auth/react'
import Head from 'next/head'

const creditPage = () => {
  return (
    <div>
      <Head>
      <title>Payment Type</title>
      </Head>
        <CreditPage/>
    </div>
  )
}

export default creditPage

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