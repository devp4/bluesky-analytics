import React, { Suspense } from 'react';
import { Separator } from "@/components/shadcn/separator";
import SearchBar from '@/components/SearchBar/SearchBar';
import { Profile } from '@/components/Profile/Profile';
import { UserContent } from '@/components/Graphs/UserContent/UserContent';

interface Account {
  did: string
}

const getAccountData = async (handle: string) => {
  const getAccountURL = process.env.URL + '/api/user/' + handle + "/profile"
  const accountResponse = await fetch(getAccountURL)

  const account: Account = await accountResponse.json()
  const status = accountResponse.status

  return { account, status }
}

const SearchPage = async ({ searchParams }: {
  searchParams: Promise<{ handle: string }>
}) => {

  const { handle = "bsky.app" } = await searchParams
  
  // Fetch account
  const { account, status } = await getAccountData(handle)

  
  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar currentHandle={handle}/>
      <Separator className="mb-8" />
      <Suspense fallback={<div>Loading</div>}>
      <div className="grid gap-16">
        {
          status === 200 ? 
          <>
            <Profile did={account.did}/>
            <UserContent did={account.did}/>
          </> :
          <div>
            Not Found
          </div>
        }
      </div>
      </Suspense>
    </div>
  );
};

export default SearchPage;

