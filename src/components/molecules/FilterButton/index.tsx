import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { HeaderButton } from '../../atoms/HeaderButton';
import { setShowFilter, getShowFilter } from '../../../store/filter';
import { withTheme } from 'styled-components';

type Props = {
  theme: unknown;
};

const Button = ({ theme }: Props) => {
  const dispatch = useDispatch();
  const showFilter = useSelector(getShowFilter);

  const handleFilter = () => {
    dispatch(setShowFilter(!showFilter));
  };

  return (
    <HeaderButton onPress={handleFilter}>
      <FontAwesome name="filter" size={26} style={{ color: theme.iconColor }} />
    </HeaderButton>
  );
};

export const FilterButton = withTheme(Button);
