import React from 'react'
import Funds from '../Component/Funds'
import {getSession} from 'next-auth/react'
import Head from 'next/head'

const funds = () => {
  return (
    <div>
      <Head>
      <title>Funds</title>
      </Head>
        <Funds/>
    </div>
  )
}

export default funds

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