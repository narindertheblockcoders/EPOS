import React from 'react'
import Profile from '../Component/Profile'
import{getSession} from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import Head from 'next/head'

const profile = () => {
  return (
    <div>
      <Head>
      <title>Profile</title>
      </Head>
        <Profile/>
  
    </div>
  )
}

export default profile

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: "/buy",
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
