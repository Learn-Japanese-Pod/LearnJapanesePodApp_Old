import moment from 'moment';
import { PodcastTypes } from './types';

export enum MimeTypes {
  AUDIO = 'audio/mpeg',
  PDF = 'application/pdf',
}

const formatBytes = (bytes, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const parseRss = rssArray => {
  const lessons = [];
  const drills = [];
  const notes = [];
  const fun = [];

  rssArray.forEach(rssItem => {
    const title = rssItem.title[0];
    const stripped = title.toLowerCase().replace(/\s/g, '');
    const matched = stripped.match(/\d+/g);
    const number = matched ? matched.map(Number)[0] : null;
    const contentValues = Object.values(rssItem['media:content'][0]);
    const mimeType = contentValues[0].type;
    const fileSize = contentValues[0].fileSize;
    const url = contentValues[0].url;
    const duration = rssItem.duration ? rssItem.duration[0] : null;
    const isAudio = mimeType === MimeTypes.AUDIO;
    const isDrill = stripped.includes('dialog') || stripped.includes('drill');
    const isFun = stripped.includes('funfriday');
    const pubDate = moment(rssItem.pubDate[0]).format('YYYY/MM/DD');
    const item = {
      id: PodcastTypes.LESSON + number,
      lessonRef: number,
      title,
      url,
      published: pubDate,
      duration,
      content: rssItem['link'][0],
      description: rssItem['itunes:subtitle'][0],
      downloaded: false,
      size: formatBytes(fileSize),
    };

    if (mimeType === MimeTypes.PDF) {
      notes.push({
        ...item,
        type: PodcastTypes.PDF,
        id: PodcastTypes.PDF + number,
      });
    } else if (isAudio && isDrill) {
      drills.push({
        ...item,
        type: PodcastTypes.DRILL,
        id: PodcastTypes.DRILL + number,
      });
    } else if (isAudio && isFun) {
      fun.push({
        ...item,
        type: PodcastTypes.FUN,
        id: PodcastTypes.FUN + pubDate,
        lessonRef: null,
      });
    } else {
      lessons.push({
        ...item,
        type: PodcastTypes.LESSON,
        id: PodcastTypes.LESSON + number,
      });
    }
  });

  drills.forEach(item => {
    lessons.find(lesson => lesson.lessonRef === item.lessonRef).drill = item;
  });

  notes.forEach(item => {
    lessons.find(lesson => lesson.lessonRef === item.lessonRef).notes = item;
  });

  return [...lessons, ...fun]
    .sort((a, b) => {
      return moment(a.published, 'YYYY/MM/DD').diff(
        moment(b.published, 'YYYY/MM/DD')
      );
    })
    .reverse();
};
