import {NextPage} from 'next'
import Page from '../components/Page'
import React from 'react'
import {useSession} from 'next-auth/react'

const Me: NextPage = () => {
  const {data: session} = useSession()
  return (
    <Page>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Page>
  )
}

export default Me
