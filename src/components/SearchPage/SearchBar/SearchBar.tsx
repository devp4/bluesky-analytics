"use client"

import React, { useState } from 'react';
import { Input } from '../../shadcn/input';
import { Button } from '../../shadcn/button';
import { useQueryState } from 'nuqs'

const SearchBar = ({ currentHandle }: { currentHandle: string }) => {
  const [input, setInput] = useState(currentHandle);
  const [handle, setHandle] = useQueryState("handle", { shallow: false, history: "push"});

  // Form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input !== "") {
      setHandle(input);
    }
  };

  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-center mb-6">
        Find Analytics on Any Bluesky User
      </h1>

      {/* Search Bar */}
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row items-center gap-4 mb-8 justify-center"
      >
        <div className="w-full sm:w-1/2 flex items-center gap-4">
          <Input
            type="text"
            name="query"
            placeholder="handle.bsky.social"
            className="flex-grow"
            value={input}
            autoComplete="off"
            onChange={e => setInput(e.target.value)} // Bind the input value to state
          />
          <Button type="submit" className="rounded-full h-8">Search</Button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
