import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const DetailsWrap = styled.View`
  display: flex;
  flex-flow: row;
  align-items: center;
`;

const DetailsText = styled(Text)`
  color: #333;
  font-size: 12px;
  padding-horizontal: 4px;
`;

type Props = {
  published: string;
  duration: string | undefined;
  size: string;
};

export const PodcastTabContentDetails = ({
  published,
  duration,
  size,
}: Props) => {
  return (
    <DetailsWrap>
      <DetailsText>{published}</DetailsText>
      <FontAwesome name="circle" size={5} style={{ color: '#ccc' }} />
      {duration && (
        <>
          <DetailsText>{duration}</DetailsText>
          <FontAwesome name="circle" size={5} style={{ color: '#ccc' }} />
        </>
      )}
      <DetailsText>{size}</DetailsText>
    </DetailsWrap>
  );
};
