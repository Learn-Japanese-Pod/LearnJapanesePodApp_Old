import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { HeaderButton } from '../../atoms/HeaderButton';
import { withTheme } from 'styled-components';

const Button = ({ navigation, theme }) => {
  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <HeaderButton onPress={handleSettings}>
      <FontAwesome name="cog" size={26} style={{ color: theme.iconColor }} />
    </HeaderButton>
  );
};

export const SettingsButton = withTheme(Button);
