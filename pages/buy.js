import React from 'react'
import Buy from '../Component/Buy'
import{getSession} from 'next-auth/react'
import Head from 'next/head'

const buy = () => {
  return (
    <div>
      <Head>
      <title>Buy</title>
      </Head>
    <Buy/>
    </div>
  )
}

export default buy

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