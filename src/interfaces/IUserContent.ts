interface IPostEntry {
  post?: {
    record?: {
      createdAt?: string;
    };
    embed?: {
      record?: {
        uri?: string;
      };
    };
    likeCount: number,
    replyCount: number,
    quoteCount: number,
    repostCount: number
  };
  reason?: {
    $type?: string;
    indexedAt?: string;
  };
  reply?: Record<string, unknown>;
}

export interface IFeedResponse {
  feed?: IPostEntry[];
  cursor?: string;
}

export interface IContentStats {
  date: string;
  posts: number;
  replies: number;
  quotes: number;
  reposts: number;
}

export interface IEngangementStats {
  date: string;
  likes: number;
  replies: number;
  quotes: number;
  reposts: number;
}