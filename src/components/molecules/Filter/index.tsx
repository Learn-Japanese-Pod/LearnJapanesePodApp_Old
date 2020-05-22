import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilter,
  getShowFilter,
  setSort,
  setFun,
  setLessons,
  setStarred,
  Sort,
} from '../../../store/filter';
import { Text as _Text } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { withTheme } from 'styled-components';

const FilterWrap = styled.View`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 50%;
  background-color: ${props => props.theme.filterBG};
  padding: 16px;
  border-radius: 8px;
  border: 1px ${props => props.theme.filterBorder};
  z-index: 99;
`;

const FilterItem = styled.View`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled(_Text)`
  font-size: 16px;
  padding-vertical: 4px;
  color: ${props => props.theme.filterTextColor};
`;

type Props = {
  theme: unknown;
};

const FilterComponent = ({ theme }: Props) => {
  const dispatch = useDispatch();
  const showFilter = useSelector(getShowFilter);
  const { sort, fun, lessons, starred } = useSelector(getFilter);

  const handleSort = () => {
    dispatch(setSort(sort === Sort.ASC ? Sort.DESC : Sort.ASC));
  };

  const handleFun = () => {
    dispatch(setFun(!fun));
  };

  const handleLessons = () => {
    dispatch(setLessons(!lessons));
  };

  const handleStarred = () => {
    dispatch(setStarred(!starred));
  };

  return (
    (showFilter && (
      <FilterWrap>
        <TouchableOpacity onPress={handleSort}>
          <FilterItem>
            <Text>Sort</Text>
            {sort === Sort.ASC ? (
              <Entypo
                name={'triangle-up'}
                size={20}
                style={{ color: theme.iconColor }}
              />
            ) : (
              <Entypo
                name={'triangle-down'}
                size={20}
                style={{ color: theme.iconColor }}
              />
            )}
          </FilterItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLessons}>
          <FilterItem>
            <Text>Show Lessons</Text>
            {lessons ? (
              <MaterialIcons
                name={'check-box'}
                size={20}
                style={{ color: theme.iconColor }}
              />
            ) : (
              <MaterialIcons
                name={'check-box-outline-blank'}
                size={20}
                style={{ color: theme.iconColor }}
              />
            )}
          </FilterItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFun}>
          <FilterItem>
            <Text>Show Fun Friday</Text>
            {fun ? (
              <MaterialIcons
                name={'check-box'}
                size={20}
                style={{ color: theme.iconColor }}
              />
            ) : (
              <MaterialIcons
                name={'check-box-outline-blank'}
                size={20}
                style={{ color: theme.iconColor }}
              />
            )}
          </FilterItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStarred}>
          <FilterItem>
            <Text>Show Favourites</Text>
            {starred ? (
              <MaterialIcons
                name={'check-box'}
                size={20}
                style={{ color: theme.iconColor }}
              />
            ) : (
              <MaterialIcons
                name={'check-box-outline-blank'}
                size={20}
                style={{ color: theme.iconColor }}
              />
            )}
          </FilterItem>
        </TouchableOpacity>
      </FilterWrap>
    )) ||
    null
  );
};

export const Filter = withTheme(FilterComponent);
