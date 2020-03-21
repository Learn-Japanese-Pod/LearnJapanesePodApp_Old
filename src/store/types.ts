import { RssState } from './rss/types';
import { PlayerState } from './player/types';
import { NetworkState } from './network/types';
import { FilterState } from './filter/types';
import { DownloadState } from './download/types';
import { DeviceState } from './device/types';
import { DetailsState } from './details/types';

export type GlobalState = {
  rss: RssState;
  player: PlayerState;
  network: NetworkState;
  filter: FilterState;
  download: DownloadState;
  device: DeviceState;
  details: DetailsState;
};
