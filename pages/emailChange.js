import React from 'react'
import EmailChange from '../Component/EmailChange'
import {getSession} from 'next-auth/react'
import Head from 'next/head'


const emailChange = () => {
  return (
    <div>
      <Head>
      <title>Email Change</title>
      </Head>
     
<EmailChange/>
    </div>
  )
}

export default emailChange

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