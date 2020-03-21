export type CurrentlyPlaying = {
  id: string;
  title: string;
};

export type PlayerStatusInit = {
  isLoaded: boolean;
};

export type PlayerStatus = {
  didJustFinish: boolean;
  durationMillis: number;
  hasJustBeenInterrupted: boolean;
  isBuffering: boolean;
  isLoaded: boolean;
  isLooping: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  pitchCorrectionQuality: string;
  playableDurationMillis: number;
  positionMillis: number;
  progressUpdateIntervalMillis: number;
  rate: number;
  shouldCorrectPitch: boolean;
  shouldPlay: boolean;
  uri: string;
  volume: number;
};

export type PlayerState = {
  player: HTMLAudioElement | undefined;
  status: PlayerStatus | undefined | PlayerStatusInit;
  currentlyPlaying: CurrentlyPlaying | {};
  fetching: string | undefined;
};
