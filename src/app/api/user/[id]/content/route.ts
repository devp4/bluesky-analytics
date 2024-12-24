import { NextRequest, NextResponse } from 'next/server'
import { IFeedResponse, IContentStats, IEngangementStats } from '@/interfaces/IUserContent';

type ContentStatsByDate = Record<string, IContentStats>
type ContentStatsByDateOrdered = IContentStats[]
type CumulativeStatsByDate = IContentStats[]

type EngagementStatsByDate = Record<string, IEngangementStats>
type EngagementStatsByDateOrdered = IEngangementStats[]
type CumulativeEngagementStatsByDate = IEngangementStats[]

const getCumulativeStatsByDate = (contentStatsByDate: ContentStatsByDate, sortedDates: string[]): CumulativeStatsByDate => {
  const cumulativeStatsByDate: CumulativeStatsByDate = [];

  let cumulativePosts = 0;
  let cumulativeReplies = 0;
  let cumulativeQuotes = 0;
  let cumulativeReposts = 0;

  for (const date of sortedDates) {
    const stats = contentStatsByDate[date];

    cumulativePosts += stats.posts;
    cumulativeReplies += stats.replies;
    cumulativeQuotes += stats.quotes;
    cumulativeReposts += stats.reposts;

    cumulativeStatsByDate.push({
      date: date,
      posts: cumulativePosts,
      replies: cumulativeReplies,
      quotes: cumulativeQuotes,
      reposts: cumulativeReposts,
    });
  }

  return cumulativeStatsByDate;
};

const getCumulativeEngagementStatsByDate = (engagementStatsByDate: EngagementStatsByDate, sortedDates: string[]): CumulativeEngagementStatsByDate => {
  const cumulativeStatsByDate: CumulativeEngagementStatsByDate = [];

  let cumulativeLikes = 0;
  let cumulativeReplies = 0;
  let cumulativeQuotes = 0;
  let cumulativeReposts = 0;

  for (const date of sortedDates) {
    const stats = engagementStatsByDate[date];

    cumulativeLikes += stats.likes;
    cumulativeReplies += stats.replies;
    cumulativeQuotes += stats.quotes;
    cumulativeReposts += stats.reposts;

    cumulativeStatsByDate.push({
      date: date,
      likes: cumulativeLikes,
      replies: cumulativeReplies,
      quotes: cumulativeQuotes,
      reposts: cumulativeReposts,
    });
  }

  return cumulativeStatsByDate;
};

const getContentStatsByDateOrdered = (contentStatsByDate: ContentStatsByDate, sortedDates: string[]): ContentStatsByDateOrdered => {
  const contentStatsByDateOrdered: ContentStatsByDateOrdered = [];

  for (const date of sortedDates) {
    contentStatsByDateOrdered.push(contentStatsByDate[date])
  }

  return contentStatsByDateOrdered
}

const getEngagementStatsByDateOrdered = (engagementStatsByDate: EngagementStatsByDate, sortedDates: string[]): EngagementStatsByDateOrdered => {
  const engagementStatsByDateOrdered: EngagementStatsByDateOrdered = [];

  for (const date of sortedDates) {
    engagementStatsByDateOrdered.push(engagementStatsByDate[date])
  }

  return engagementStatsByDateOrdered
}

const getUserContentStats = async (did: string): Promise<{
  contentStatsByDate: ContentStatsByDate;
  engagementStatsByDate: EngagementStatsByDate
  status: number
}> => {

  const contentStatsByDate: ContentStatsByDate = {};
  const engagementStatsByDate: EngagementStatsByDate = {}

  let status = 200

  let cursor: string | null = null;

  while (true) {
    let baseUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${did}&limit=100`;
    if (cursor) {
      baseUrl += `&cursor=${cursor}`;
    }

    const response = await fetch(baseUrl);
    if (response.status !== 200) {
      console.error(`Error fetching data: ${response.status} - ${response.statusText}`);
      status = response.status
      break
    }

    const data: IFeedResponse = await response.json();

    // Posts in the feed
    for (const postEntry of data.feed || []) {
      const post = postEntry.post;
      const reason = postEntry.reason;

      // Reposts
      if (reason?.$type === "app.bsky.feed.defs#reasonRepost") {
        const createdAt = reason.indexedAt;
        if (createdAt) {
          const stringDate = new Date(createdAt).toISOString();
          const postDate = new Date(stringDate).toDateString()

          if (!contentStatsByDate[postDate]) {
            contentStatsByDate[postDate] = { date: postDate, posts: 0, replies: 0, quotes: 0, reposts: 0 };
          }

          contentStatsByDate[postDate].reposts += 1;
        }
        continue;
      }

      // Others
      const createdAt = post?.record?.createdAt;

      if (!createdAt) {
        continue;
      }

      const stringDate = new Date(createdAt).toISOString();
      const postDate = new Date(stringDate).toDateString()

      if (!contentStatsByDate[postDate]) {
        contentStatsByDate[postDate] = { date: postDate, posts: 0, replies: 0, quotes: 0, reposts: 0 };
      }

      if (!engagementStatsByDate[postDate]) {
        engagementStatsByDate[postDate] = { date: postDate, likes: 0, replies: 0, quotes: 0, reposts: 0 };
      }

      const embed = post?.embed;

      // Quote
      if (embed?.record?.uri) {
        contentStatsByDate[postDate].quotes += 1;
      }
      // Reply
      else if (postEntry.reply) {
        contentStatsByDate[postDate].replies += 1;
      }
      // Post
      else {
        contentStatsByDate[postDate].posts += 1;
      }
      
      
      // Aggregate daily stats
      engagementStatsByDate[postDate].likes += post?.likeCount || 0;
      engagementStatsByDate[postDate].replies += post?.replyCount || 0;
      engagementStatsByDate[postDate].quotes += post?.quoteCount || 0;
      engagementStatsByDate[postDate].reposts += post?.repostCount || 0;
    }

    // Cursor = next page of data
    cursor = data.cursor || null;

    // No more pages
    if (!cursor) {
      break;
    }
  }

  return { contentStatsByDate, engagementStatsByDate, status };
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const id = (await params).id;
  const { contentStatsByDate, engagementStatsByDate, status } = await getUserContentStats(id);

  const sortedContentDates = Object.keys(contentStatsByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const sortedEngagementDates = Object.keys(engagementStatsByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  const cumulativeStatsByDate = getCumulativeStatsByDate(contentStatsByDate, sortedContentDates)
  const contentStatsByDateOrdered = getContentStatsByDateOrdered(contentStatsByDate, sortedContentDates)

  const cumulativeEngagementStatsByDate = getCumulativeEngagementStatsByDate(engagementStatsByDate, sortedEngagementDates)
  const engagementStatsByDateOrdered = getEngagementStatsByDateOrdered(engagementStatsByDate, sortedEngagementDates)

  const data = {
    contentStatsByDate: contentStatsByDate,
    contentStatsByDateOrdered: contentStatsByDateOrdered,
    cumulativeStatsByDate: cumulativeStatsByDate,

    engagementStatsByDate: engagementStatsByDate,
    engagementStatsByDateOrdered: engagementStatsByDateOrdered,
    cumulativeEngagementStatsByDate: cumulativeEngagementStatsByDate
  }

  return NextResponse.json(data, {
    status: status
  })
}
