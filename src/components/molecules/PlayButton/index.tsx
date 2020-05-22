import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { ButtonText, FooterButton } from '../../atoms';
import { requestNewAudio, getFetching } from '../../../store/player';
import { RssFeedItem } from '../../../store/rss';
import { withTheme } from 'styled-components';

type Props = {
  rssItem: RssFeedItem;
  url: string;
  theme: unknown;
};

const Button = ({ rssItem, url, theme }: Props) => {
  const dispatch = useDispatch();
  const fetching = useSelector(getFetching);

  const handlePress = () => {
    const { id, title } = rssItem;
    if (fetching !== url) {
      dispatch(
        requestNewAudio({
          id,
          title,
          url,
        })
      );
    }
  };

  return (
    <FooterButton onPress={handlePress}>
      <ButtonText>
        <FontAwesome
          name={'play-circle'}
          size={26}
          style={{ color: theme.iconColor }}
        />
      </ButtonText>
    </FooterButton>
  );
};

export const PlayButton = withTheme(Button);
