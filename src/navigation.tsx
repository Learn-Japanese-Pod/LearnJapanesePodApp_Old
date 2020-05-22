/* eslint-disable react/display-name */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FilterButton, SettingsButton } from './components/molecules';
import { Home, Pdf, Settings, Sentences } from './components/pages';
import { lightTheme, darkTheme } from './colors';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

export const AppNavigation = () => {
  const Stack = createStackNavigator();
  const theme = darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: 'Home',
            headerTintColor: theme.headerColor,
            headerStyle: {
              backgroundColor: theme.headerBG,
              shadowColor: 'transparent',
            },
            headerLeft: () => <FilterButton />,
            headerRight: () => <SettingsButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Pdf"
          component={Pdf}
          options={{
            title: 'PDF',
            headerTintColor: theme.headerColor,
            headerStyle: {
              backgroundColor: theme.headerBG,
              shadowColor: 'transparent',
            },
          }}
        />
        <Stack.Screen
          name="Sentences"
          component={Sentences}
          options={{
            title: 'Just the dialogues',
            headerTintColor: theme.headerColor,
            headerStyle: {
              backgroundColor: theme.headerBG,
              shadowColor: 'transparent',
            },
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings',
            headerTintColor: theme.headerColor,
            headerStyle: {
              backgroundColor: theme.headerBG,
              shadowColor: 'transparent',
            },
          }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
};
