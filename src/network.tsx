// import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { initApp } from './store/device';
import { setNetworkStatus } from './store/network';

export const Network = () => {
  const dispatch = useDispatch();
  // const connected = useSelector(state => state.network.connected);

  NetInfo.addEventListener(state => {
    const { isConnected } = state;
    dispatch(setNetworkStatus(isConnected));
  });

  dispatch(initApp());

  // TODO: Display no connection banner.
  // !connected
  return null;
};
