import { createActions } from 'redux-actions';

export const { setNetworkStatus } = createActions(
  {},
  ...['SET_NETWORK_STATUS'],
  {
    prefix: 'NETWORK',
  }
);
