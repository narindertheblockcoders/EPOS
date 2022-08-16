import React from 'react'
import ChangePassword from '../Component/ChangePassword'
import {getSession} from 'next-auth/react'
import Head from 'next/head'



const changePassword = () => {
  return (
    <div>
      <Head>
      <title>Change Passsword</title>
      </Head>
      <ChangePassword/>
    </div>
  )
}

export default changePassword

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