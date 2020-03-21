import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FilterButton, SettingsButton } from './components/molecules';
import { Home, Pdf, Settings, Sentences } from './components/pages';

export const AppNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: 'Home',
            headerLeft: () => <FilterButton />,
            headerRight: () => <SettingsButton navigation={navigation} />,
          })}
        />
        <Stack.Screen name="Pdf" component={Pdf} options={{ title: 'PDF' }} />
        <Stack.Screen
          name="Sentences"
          component={Sentences}
          options={{ title: 'Just the dialogues' }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </>
  );
};
