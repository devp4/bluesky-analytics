import React, { Suspense } from 'react';
import { Separator } from "@/components/shadcn/separator";
import SearchBar from '@/components/SearchPage/SearchBar/SearchBar';
import { Content } from '@/components/SearchPage/Content/Content';
import { TopProfiles } from '@/components/SearchPage/Content/Profile/TopProfiles/TopProfiles';

const SearchPage = async ({ searchParams }: {
  searchParams: Promise<{ handle: string }>
}) => {

  const { handle = undefined } = await searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar currentHandle={handle ? handle : ""} />
      <Separator className="mb-8" />
      {handle ?
        <Suspense fallback={<div>Loading</div>}>
          <Content handle={handle} />
        </Suspense> :
        <TopProfiles />
      }
    </div>
  );
};

export default SearchPage;

