import 'react-native-gesture-handler';
import React from 'react';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { initStore } from './store';
import { AppNavigation } from './navigation';
import { Network } from './network';
import { Player } from './components/organisms/Player';
import { useKeepAwake } from 'expo-keep-awake';
import { SENTRY_DSN } from './config';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

Sentry.init({
  dsn: SENTRY_DSN,
  debug: true,
  enableInExpoDevelopment: false,
});
Sentry.setRelease(Constants.manifest.revisionId);

const PageWrap = styled.View`
  flex: 1;
`;

const store = initStore();

const LJP = () => {
  useKeepAwake();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <NavigationContainer>
          <Network />
          <PageWrap>
            <AppNavigation />
          </PageWrap>
          <Player />
        </NavigationContainer>
      </Provider>
    </>
  );
};

registerRootComponent(LJP);
