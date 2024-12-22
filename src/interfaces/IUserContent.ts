interface PostEntry {
  post?: {
    record?: {
      createdAt?: string;
    };
    embed?: {
      record?: {
        uri?: string;
      };
    };
  };
  reason?: {
    $type?: string;
    indexedAt?: string;
  };
  reply?: Record<string, unknown>;
}

export interface FeedResponse {
  feed?: PostEntry[];
  cursor?: string;
}

export interface ContentStats {
  date?: string;
  posts: number;
  replies: number;
  quotes: number;
  reposts: number;
}