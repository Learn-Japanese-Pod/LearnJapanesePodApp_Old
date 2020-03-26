import { setPodcastDetailsReducer } from './reducer';

const mockRssItem = {
  id: 'LESSON1',
  lessonRef: 1,
  title: 'Lesson Title',
  url: 'URL',
  published: '2015/08/25',
  duration: null,
  content: 'URL',
  description: 'Desc',
  downloaded: false,
  size: '27.27 MB',
  type: 'LESSON',
  drill: {
    id: 'DIALOGUE1',
    lessonRef: 1,
    title: 'Title',
    url: 'URL',
    published: '2015/08/25',
    duration: null,
    content: 'Url',
    description: 'Desc',
    downloaded: false,
    size: '1.36 MB',
    type: 'DIALOGUE',
  },
  notes: {
    id: 'PDF1',
    lessonRef: 1,
    title: 'Title',
    url: 'Url',
    published: '2015/08/25',
    duration: null,
    content: 'Url',
    description: 'Desc',
    downloaded: false,
    size: '323.71 KB',
    type: 'PDF',
  },
};

const mockRssItem2 = {
  ...mockRssItem,
  id: 'LESSON2',
  drill: {
    ...mockRssItem.drill,
    id: 'DIALOGUE2',
  },
  notes: {
    ...mockRssItem.notes,
    id: 'PDF2',
  },
};

const mockFun = {
  id: 'FUN1',
  lessonRef: 1,
  title: 'Lesson Title',
  url: 'URL',
  published: '2015/08/25',
  duration: null,
  content: 'URL',
  description: 'Desc',
  downloaded: false,
  size: '27.27 MB',
  type: 'LESSON',
};

const mockRss = [mockRssItem, mockFun];

const mockDetails = [
  {
    id: 'LESSON1',
    completed: false,
    downloaded: false,
    downloadedUrl: '',
    starred: true,
  },
  {
    id: 'PDF1',
    completed: false,
    downloaded: true,
    downloadedUrl: 'here',
    starred: false,
  },
  {
    id: 'DIALOGUE1',
    completed: false,
    downloaded: true,
    downloadedUrl: '',
    starred: false,
  },
  {
    id: 'FUN1',
    completed: false,
    downloaded: true,
    downloadedUrl: '',
    starred: true,
  },
];

const state = {
  podcasts: mockDetails,
};

describe('setPodcastDetailsReducer', () => {
  it('Split the rss feed out into individual details', () => {
    const res = setPodcastDetailsReducer(state, {
      payload: mockRss,
    });

    expect(res.podcasts.length).toBe(4);
    expect(res.podcasts[0].id).toBe('LESSON1');
    expect(res.podcasts[1].id).toBe('PDF1');
    expect(res.podcasts[2].id).toBe('DIALOGUE1');
    expect(res.podcasts[3].id).toBe('FUN1');
  });

  it('Does not override existing state', () => {
    const res = setPodcastDetailsReducer(state, {
      payload: mockRss,
    });

    expect(res.podcasts[0].starred).toBeTruthy();
    expect(res.podcasts[1].downloaded).toBeTruthy();
    expect(res.podcasts[1].downloadedUrl).toBe('here');
    expect(res.podcasts[2].downloaded).toBeTruthy();
    expect(res.podcasts[3].starred).toBeTruthy();
  });

  it('Handles new podcast', () => {
    const res = setPodcastDetailsReducer(state, {
      payload: [...mockRss, mockRssItem2],
    });

    expect(res.podcasts.length).toBe(7);
    expect(res.podcasts[0].id).toBe('LESSON1');
    expect(res.podcasts[1].id).toBe('PDF1');
    expect(res.podcasts[2].id).toBe('DIALOGUE1');
    expect(res.podcasts[3].id).toBe('FUN1');
    expect(res.podcasts[4].id).toBe('LESSON2');
    expect(res.podcasts[5].id).toBe('PDF2');
    expect(res.podcasts[6].id).toBe('DIALOGUE2');

    expect(res.podcasts[0].starred).toBeTruthy();
    expect(res.podcasts[1].downloaded).toBeTruthy();
    expect(res.podcasts[1].downloadedUrl).toBe('here');
    expect(res.podcasts[2].downloaded).toBeTruthy();
    expect(res.podcasts[3].starred).toBeTruthy();
  });
});
