import React from 'react'
import UserProfile from '../Component/UserProfile'
import {getSession} from 'next-auth/react'
import Head from 'next/head'

const userprofile = () => {
  return (
    <div>
      <Head>
      <title>Update Profile</title>
      </Head>
        <UserProfile/>
  
    </div>
  )
}

export default userprofile;

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