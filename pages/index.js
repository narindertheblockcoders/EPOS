import React from 'react'
import FrontPage from '../Component/FrontPage'
import {getSession} from 'next-auth/react'
import Head from 'next/head'

const index = () => {
  return (
    <div>
       <Head>
        
        <title>Signup</title>

       </Head>
      <FrontPage/>
    </div>
  )
}

export default index

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