import { combineReducers } from 'redux';
import { rssReducer } from './rss';
import { playerReducer } from './player';
import { detailsReducer } from './details';
import { networkReducer } from './network';
import { filterReducer } from './filter';
import { downloadReducer } from './download';
import { deviceReducer } from './device';

const mainReducer = combineReducers({
  player: playerReducer,
  rss: rssReducer,
  details: detailsReducer,
  network: networkReducer,
  filter: filterReducer,
  download: downloadReducer,
  device: deviceReducer,
});

const rootReducer = (state, action) => {
  return mainReducer(state, action);
};

export default rootReducer;
