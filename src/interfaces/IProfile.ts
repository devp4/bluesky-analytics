export interface IProfile {
  did: string
  handle: string
  displayName: string
  avatar: string
  createdAt: string
  description: string | undefined
  banner?: string | undefined
  followersCount: string
  followsCount: string
  postsCount: string
}