import { createActions } from 'redux-actions';

export const {
  readDir,
  writeDir,
  deleteDir,
  setPermission,
  getPushToken,
  setPushToken,
  initApp,
  setLoading,
  rehydrateDeviceState,
  persistData,
  deletePersistedData,
  deletePushToken,
  sendTestNotification,
} = createActions(
  {},
  ...[
    'READ_DIR',
    'WRITE_DIR',
    'DELETE_DIR',
    'SET_PUSH_TOKEN',
    'INIT_APP',
    'SET_LOADING',
    'REHYDRATE_DEVICE_STATE',
    'PERSIST_DATA',
    'DELETE_PERSISTED_DATA',
    'SET_PERMISSION',
    'GET_PUSH_TOKEN',
    'DELETE_PUSH_TOKEN',
    'SEND_TEST_NOTIFICATION',
  ],
  {
    prefix: 'DEVICE',
  }
);
