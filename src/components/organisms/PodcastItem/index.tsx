import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { PodcastTypes, RssFeedItem } from '../../../store/rss';
import { PodcastHeader, PodcastTabs, Tabs } from '../../molecules';
import { PodcastTabContent } from '../PodcastTabContent';

type WrapProps = {
  first: boolean;
};

const Wrap = styled(View)`
  margin-bottom: 24px;
  margin-top: ${(props: WrapProps) => (props.first ? '24px' : '0px')};
`;

type Props = {
  podcast: RssFeedItem;
  first: boolean;
};

export const PodcastItem = ({ podcast, first }: Props) => {
  const { drill, notes, lessonRef, type, id } = podcast;
  const [activeTab, setActiveTab] = useState(Tabs.LESSON);

  const handleTabPress = (tab: Tabs): void => setActiveTab(tab);

  const getTabContent = (): RssFeedItem => {
    if (activeTab === Tabs.LESSON) {
      return podcast;
    }

    if (activeTab === Tabs.DRILL && drill) {
      return drill;
    }

    if (activeTab === Tabs.PDF && notes) {
      return notes;
    }
  };

  const tabContent = getTabContent();
  const title =
    type === PodcastTypes.FUN ? 'Fun Friday' : 'Podcast ' + lessonRef;
  const subTitle = podcast.title.split(': ')[1];

  return (
    <Wrap first={first}>
      <PodcastHeader
        title={title}
        subTitle={subTitle}
        id={id}
        type={PodcastTypes.LESSON}
      />
      {type !== PodcastTypes.FUN && (
        <PodcastTabs
          activeTab={activeTab}
          handleTabPress={handleTabPress}
          id={id}
        />
      )}
      <PodcastTabContent rssItem={tabContent} />
    </Wrap>
  );
};
