import React from 'react';
import { useSelector } from 'react-redux';
import { PodcastsList } from '../../organisms';
import { GlobalState } from '../../../store/types';
import { Spinner } from '../../atoms/Spinner';
import styled from 'styled-components/native';
import { Filter } from '../../molecules/Filter';

const LoadingWrap = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Home = () => {
  const loading = useSelector((state: GlobalState) => state.device.loading);
  return loading ? (
    <LoadingWrap>
      <Spinner size={45} />
    </LoadingWrap>
  ) : (
    <>
      <Filter />
      <PodcastsList />
    </>
  );
};
