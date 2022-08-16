import React from 'react'
import TokenPage from '../Component/TokenPage'
import {getSession} from 'next-auth/react'
import Head from 'next/head'

const tokenPage = () => {
  return (
    <div>
      <Head>
      <title>My Token</title>
      </Head>
        <TokenPage/>
    </div>
  )
}

export default tokenPage

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