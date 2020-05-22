import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { green } from '../../../colors';
import { PodcastTypes } from '../../../store/rss';
import { downloadItem, isDownloadingById } from '../../../store/download';
import { FooterButton } from '../../atoms';
import { Spinner } from '../../atoms/Spinner';
import { getDownloadedById } from '../../../store/details';
import { withTheme } from 'styled-components';

type Props = {
  url: string;
  id: string;
  type: PodcastTypes;
  theme: unknown;
};

const Button = ({ url, id, type, theme }: Props) => {
  const dispatch = useDispatch();
  const downloaded = useSelector(state => getDownloadedById(state, id));
  const downloading = useSelector(state => isDownloadingById(state, id));

  const handlePress = () => {
    if (!downloaded && !downloading) {
      dispatch(
        downloadItem({
          id,
          type,
          url,
        })
      );
    }
  };

  const Icon = (
    <FontAwesome
      name={'download'}
      size={26}
      style={{ color: downloaded ? green : theme.iconColor }}
    />
  );

  return (
    <FooterButton onPress={handlePress}>
      {downloading ? <Spinner /> : Icon}
    </FooterButton>
  );
};

export const DownloadButton = withTheme(Button);
