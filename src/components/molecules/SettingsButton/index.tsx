import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { HeaderButton } from '../../atoms/HeaderButton';

export const SettingsButton = ({ navigation }) => {
  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <HeaderButton onPress={handleSettings}>
      <FontAwesome name="cog" size={26} style={{ color: '#333' }} />
    </HeaderButton>
  );
};
