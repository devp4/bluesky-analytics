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