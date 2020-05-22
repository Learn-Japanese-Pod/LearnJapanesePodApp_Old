import { DeviceState } from './types';

export const initialState: DeviceState = {
  downloadDir: undefined,
  pushToken: false,
  loading: true,
  notificationPermissions: false,
  theme: 'light',
};
