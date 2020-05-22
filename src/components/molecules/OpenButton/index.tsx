import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { FooterButton, ButtonText } from '../../atoms';
import { useNavigation } from '@react-navigation/native';
import { getConnected } from '../../../store/network/selectors';
import { Alert } from 'react-native';
import { withTheme } from 'styled-components';

type Props = {
  url: string;
  downloaded: boolean;
  theme: unknown;
};

const Button = ({ url, downloaded, theme }: Props) => {
  const navigation = useNavigation();
  const connected = useSelector(getConnected);

  const handlePress = () => {
    if (!connected && !downloaded) {
      Alert.alert(
        'No Network Detected',
        `Looks like you're offline, this feature is only available while you have a active internet connection.`,
        [{ text: 'OK', style: 'cancel' }],
        { cancelable: false }
      );
      return false;
    } else {
      navigation.navigate('Pdf', {
        url,
      });
    }
  };

  return (
    <FooterButton onPress={handlePress}>
      <ButtonText>
        <FontAwesome
          name={'external-link'}
          size={26}
          style={{ color: theme.iconColor }}
        />
      </ButtonText>
    </FooterButton>
  );
};

export const OpenButton = withTheme(Button);
