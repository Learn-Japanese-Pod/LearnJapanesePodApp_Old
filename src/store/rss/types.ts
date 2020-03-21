export enum PodcastTypes {
  LESSON = 'LESSON',
  PDF = 'PDF',
  DRILL = 'DIALOGUE',
  FUN = 'FUN FRIDAY',
}

export type RssFeedItem = {
  id: string;
  type: PodcastTypes;
  content?: string;
  lessonRef: number;
  title: string;
  url: string;
  published: string;
  duration?: string;
  description: string;
  size: string | undefined;
  drill?: RssFeedItem;
  notes?: RssFeedItem;
  hidden?: boolean;
};

export type MainFeed = Array<RssFeedItem>;
export type AnnouncementsFeed = Array<RssFeedItem>;

export type RssState = {
  announcementsFeed: AnnouncementsFeed;
  mainFeed: MainFeed;
  refreshing: boolean;
};
