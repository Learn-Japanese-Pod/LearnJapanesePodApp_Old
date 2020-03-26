import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components/native';
import { View } from 'react-native';
import { PodcastTypes, RssFeedItem } from '../../../store/rss';
import { getDetailsById } from '../../../store/details';
import {
  PodcastTabContentBody,
  PodcastTabContentDetails,
  PlayButton,
  OpenButton,
  DownloadButton,
} from '../../molecules';

const fullBorderRadiusCSS = css`
  border-radius: 8px;
`;

const bottomBorderRadiusCSS = css`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

type WrapProps = {
  type: PodcastTypes;
};

const Wrap = styled(View)`
  background-color: #f1f1f1;
  ${(props: WrapProps) =>
    props.type === PodcastTypes.FUN
      ? fullBorderRadiusCSS
      : bottomBorderRadiusCSS}
`;

const FooterButtons = styled.View`
  ${bottomBorderRadiusCSS};
  padding: 8px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-color: #ddd;
`;

type Props = {
  rssItem: RssFeedItem;
};

export const PodcastTabContent = ({ rssItem }: Props) => {
  const {
    type,
    title,
    lessonRef,
    description,
    content,
    url: uri,
    published,
    duration,
    id,
    size,
  } = rssItem;
  const details = useSelector(state => getDetailsById(state, id));
  const url = (details && details.downloaded && details.downloadedUrl) || uri;

  const titleText =
    type === PodcastTypes.FUN
      ? title.split('riday: ')[1]
      : title.split(`${lessonRef}: `)[1];

  return (
    <Wrap type={type}>
      <PodcastTabContentBody
        title={titleText}
        description={description}
        content={content}
        lessonRef={lessonRef}
        type={type}
      />
      <FooterButtons>
        {type === PodcastTypes.PDF ? (
          <OpenButton url={url} downloaded={details?.downloaded} />
        ) : (
          <PlayButton rssItem={rssItem} url={url} />
        )}
        <PodcastTabContentDetails
          published={published}
          duration={duration}
          size={size}
        />
        <DownloadButton url={url} id={id} type={type} />
      </FooterButtons>
    </Wrap>
  );
};
