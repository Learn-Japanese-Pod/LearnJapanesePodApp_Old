import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { GlobalState } from '../../../store/types';
import { View } from 'react-native';
import { TabButton } from '../../molecules/Tab';

const TabsWrapper = styled(View)`
  display: flex;
  flex-flow: row;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

export enum Tabs {
  LESSON = 'Lesson',
  DRILL = 'Dialogue',
  PDF = 'Notes',
}

type Props = {
  activeTab: Tabs;
  handleTabPress: (tab: Tabs) => void;
  id: string;
};

export const PodcastTabs = ({ activeTab, handleTabPress, id }: Props) => {
  const podcast = useSelector((state: GlobalState) =>
    state.rss.mainFeed.find(it => it.id === id)
  );
  const hasDrill = !!podcast.drill;
  const hasNotes = !!podcast.notes;

  return (
    <TabsWrapper>
      <TabButton
        handleTabPress={handleTabPress}
        type={Tabs.LESSON}
        active={activeTab === Tabs.LESSON}
        label={Tabs.LESSON}
      />
      {hasDrill && (
        <TabButton
          handleTabPress={handleTabPress}
          type={Tabs.DRILL}
          active={activeTab === Tabs.DRILL}
          label={Tabs.DRILL}
        />
      )}
      {hasNotes && (
        <TabButton
          handleTabPress={handleTabPress}
          type={Tabs.PDF}
          active={activeTab === Tabs.PDF}
          label={Tabs.PDF}
        />
      )}
    </TabsWrapper>
  );
};
