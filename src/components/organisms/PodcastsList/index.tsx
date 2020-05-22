import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { PodcastItem } from '../../organisms/PodcastItem';
import {
  isRefreshing,
  MainFeed,
  PodcastTypes,
  refreshMainFeed,
  RssFeedItem,
  selectMainFeed,
} from '../../../store/rss';
import { FilterState, getFilter, Sort } from '../../../store/filter';
import { getDetails, PodcastMeta } from '../../../store/details';

const Wrap = styled.View`
  padding-horizontal: 16px;
  background-color: ${props => props.theme.podcastListBG};
  flex: 1;
`;

const Seperator = styled.View`
  width: 30px;
  height: 3px;
  background-color: ${props => props.theme.seperator};
  margin: 0 auto;
  margin-bottom: 16px;
`;

const filterMainFeed = (
  rss: MainFeed,
  filter: FilterState,
  details: Array<PodcastMeta>
) => {
  const { sort } = filter;
  const filteredRss =
    rss &&
    rss.filter(item => {
      const { type, id } = item;
      const podcastDetails = details.find(it => it.id === id);
      const isStarred = podcastDetails?.starred;
      const showStarred = filter.starred;
      const showFun = filter.fun;
      const showLessons = filter.lessons;
      const isLesson = type === PodcastTypes.LESSON;
      const isFun = type === PodcastTypes.FUN;

      if (!showStarred && isStarred) return false;

      if ((showLessons && isLesson) || (isStarred && showStarred)) {
        return item;
      }

      if ((showFun && isFun) || (isStarred && showStarred)) {
        return item;
      }
    });
  return sort === Sort.ASC ? filteredRss : [...filteredRss].reverse();
};

export const PodcastsList = () => {
  const dispatch = useDispatch();
  const details = useSelector(getDetails);
  const refreshing = useSelector(isRefreshing);
  const filter = useSelector(getFilter);
  const unfilteredMainFeed = useSelector(selectMainFeed);
  const mainFeed = filterMainFeed(unfilteredMainFeed, filter, details);

  const handleRssRefresh = () => {
    dispatch(refreshMainFeed());
  };

  const renderItem = ({ item, index }) => {
    return <PodcastItem podcast={item} first={index === 0} />;
  };

  const renderSeparator = () => <Seperator />;

  return (
    <Wrap>
      <FlatList
        data={mainFeed}
        renderItem={renderItem}
        keyExtractor={(item: RssFeedItem): string => item.id}
        ItemSeparatorComponent={renderSeparator}
        refreshing={refreshing}
        onRefresh={handleRssRefresh}
        showsVerticalScrollIndicator={false}
      />
    </Wrap>
  );
};
