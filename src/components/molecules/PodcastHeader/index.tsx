import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getDetailsById, setStarred } from '../../../store/details';
import { PodcastTypes } from '../../../store/rss';
import { withTheme } from 'styled-components';

const Wrap = styled(View)`
  margin-bottom: 4px;
`;

const Header = styled.View`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrap = styled.View`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

const HeaderText = styled(Text)`
  font-size: 20px;
  color: ${props => props.theme.podcastHeaderText};
`;

const SubHeaderText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.podcastSubHeaderText};
`;

const FavouriteButton = styled.TouchableOpacity`
  width: 34px;
  padding-left: 8px;
`;

type Props = {
  title: string;
  id: string;
  subTitle: string;
  type: PodcastTypes;
  theme: unknown;
};

const HeaderComponent = ({ title, subTitle, id, theme }: Props) => {
  const dispatch = useDispatch();
  const details = useSelector(state => getDetailsById(state, id));
  const isStarred = details && details.starred;

  const handleStar = () => {
    dispatch(
      setStarred({
        id,
        starred: !isStarred,
      })
    );
  };

  return (
    <Wrap>
      <Header>
        <TitleWrap>
          <HeaderText>{title}</HeaderText>
          <SubHeaderText>{subTitle}</SubHeaderText>
        </TitleWrap>
        <FavouriteButton onPress={() => handleStar()}>
          <FontAwesome
            name="star"
            size={26}
            style={{ color: isStarred ? '#3cd070' : theme.starColor }}
          />
        </FavouriteButton>
      </Header>
    </Wrap>
  );
};

export const PodcastHeader = withTheme(HeaderComponent);
