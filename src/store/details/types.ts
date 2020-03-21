export type PodcastMeta = {
  id: string;
  completed: number;
  downloaded: boolean;
  downloadedUrl: string;
  starred: boolean;
};

export type DetailsState = {
  podcasts: Array<PodcastMeta>;
};
