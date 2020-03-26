import { handleActions } from 'redux-actions';
import { initialState } from './constants';
import {
  setPodcastDetails,
  setStarred,
  rehydrateDetailsState,
  setDownloaded,
  updatePodcastDetails,
} from './actions';

export function rehydrateDetailsStateReducer(state, action) {
  return {
    ...action.payload,
  };
}

export function setPodcastDetailsReducer(state, action) {
  const rss = action.payload;
  const currentDetails = state.podcasts;
  const details = [];

  rss.forEach(it => {
    const { id: lessonId, notes, drill } = it;
    const noteId = notes?.id;
    const drillId = drill?.id;

    const existingLesson = currentDetails.find(it => it.id === lessonId);
    const existingNote = currentDetails.find(it => it.id === noteId);
    const existingDrill = currentDetails.find(it => it.id === drillId);

    const detailObj = {
      id: lessonId,
      completed: false,
      downloaded: false,
      downloadedUrl: '',
      starred: false,
    };

    if (existingLesson) details.push(existingLesson);
    else details.push(detailObj);

    if (notes && existingNote) details.push(existingNote);
    else if (notes)
      details.push({
        ...detailObj,
        id: noteId,
      });

    if (drill && existingDrill) details.push(existingDrill);
    else if (drill)
      details.push({
        ...detailObj,
        id: drillId,
      });
  });

  return {
    ...state,
    podcasts: details,
  };
}

export function setStarredReducer(state, action) {
  const { id, starred } = action.payload;
  const updatedPodcasts = [...state.podcasts].map(it => {
    if (it.id === id) {
      return {
        ...it,
        starred: starred,
      };
    }

    return it;
  });

  return {
    ...state,
    podcasts: updatedPodcasts,
  };
}

export function setDownloadedReducer(state, action) {
  const { id, uri } = action.payload;
  const updatedPodcasts = [...state.podcasts].map(it => {
    if (it.id === id) {
      return {
        ...it,
        downloaded: true,
        downloadedUrl: uri,
      };
    }

    return it;
  });

  return {
    ...state,
    podcasts: updatedPodcasts,
  };
}

export function updatePodcastDetailsReducer(state, action) {
  // TODO
  // Update details without overriding. Fired on refresh.
  return {
    ...state,
  };
}

export const reducer = handleActions(
  {
    [rehydrateDetailsState.toString()]: rehydrateDetailsStateReducer,
    [setPodcastDetails.toString()]: setPodcastDetailsReducer,
    [setStarred.toString()]: setStarredReducer,
    [setDownloaded.toString()]: setDownloadedReducer,
    [updatePodcastDetails.toString()]: updatePodcastDetailsReducer,
  },
  initialState
);
