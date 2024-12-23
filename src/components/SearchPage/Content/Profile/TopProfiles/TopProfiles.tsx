import React from 'react'
import { TopProfile } from './TopProfile'

export const TopProfiles = async () => {
  const bskyProfile = {
    displayName: "Bluesky",
    handle: "bsky.app",
    avatar: "https://cdn.bsky.app/img/avatar/plain/did:plc:z72i7hdynmk6r22z27h6tvur/bafkreihagr2cmvl2jt4mgx3sppwe2it3fwolkrbtjrhcnwjk4jdijhsoze@jpeg",
    banner: "https://cdn.bsky.app/img/banner/plain/did:plc:z72i7hdynmk6r22z27h6tvur/bafkreichzyovokfzmymz36p5jibbjrhsur6n7hjnzxrpbt5jaydp2szvna@jpeg"
  }

  const markCubanProfile = {
    displayName: "Mark Cuban",
    handle: "mcuban.bsky.social",
    avatar: "https://cdn.bsky.app/img/avatar/plain/did:plc:y5xyloyy7s4a2bwfeimj7r3b/bafkreihxddlkbnblytjdbajg5qopawdfcabg5e7ppwja6zmm3lvnedzojm@jpeg",
    banner: "https://cdn.bsky.app/img/banner/plain/did:plc:y5xyloyy7s4a2bwfeimj7r3b/bafkreif6ztdhaxtd26x33m67sdphgqvwc6ssmzecreqh2djcrt6mqxwiae@jpeg"
  }

  const onionProfile = {
    displayName: "The Onion",
    handle: "theonion.com",
    avatar: "https://cdn.bsky.app/img/avatar/plain/did:plc:a4pqq234yw7fqbddawjo7y35/bafkreiajdz4ktkjv5jrnye7sotgz6g5xarts6yu6ypbhninxqnvwoiwsfi@jpeg",
    banner: "https://cdn.bsky.app/img/banner/plain/did:plc:a4pqq234yw7fqbddawjo7y35/bafkreicgch7tqdrzk2hjjwgjf5pwxy3rfkv2l2rpnyxqu2sxyrz6oenp44@jpeg"
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Sample Profiles</h2>

      {/* Chart Section */}
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TopProfile profile={bskyProfile}/>
          <TopProfile profile={markCubanProfile}/>
          <TopProfile profile={onionProfile}/>
        </div>
      </div>
    </div>
  )
}
