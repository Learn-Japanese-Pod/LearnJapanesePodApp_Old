import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { ButtonText, FooterButton } from '../../atoms';
import { requestNewAudio, getFetching } from '../../../store/player';
import { RssFeedItem } from '../../../store/rss';

type Props = {
  rssItem: RssFeedItem;
  url: string;
};

export const PlayButton = ({ rssItem, url }: Props) => {
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
        <FontAwesome name={'play-circle'} size={26} style={{ color: '#333' }} />
      </ButtonText>
    </FooterButton>
  );
};
