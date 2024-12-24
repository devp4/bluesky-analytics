import React from 'react'
import { Profile } from './Profile/Profile'
import { Stats } from './Stats'

interface Account {
  did: string
}

const getAccountData = async (handle: string) => {
  const getAccountURL = process.env.URL + '/api/user/' + handle + "/profile"
  const accountResponse = await fetch(getAccountURL, {next: {revalidate: 3600}})

  const account: Account = await accountResponse.json()
  const status = accountResponse.status

  return { account, status }
}

export const Content = async ({ handle }: {handle: string}) => {
  // Fetch account
  const { account, status } = await getAccountData(handle)

  return (
      <div className="grid gap-16">
        {
          status === 200 ? 
          <>
            <Profile did={account.did}/>
            <Stats did={account.did}/>
          </> :
          <div>
            Not Found
          </div>
        }
      </div>
  )
}
