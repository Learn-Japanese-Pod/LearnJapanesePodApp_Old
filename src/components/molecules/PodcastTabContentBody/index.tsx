import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { PodcastTypes } from '../../../store/rss';
import { useNavigation } from '@react-navigation/native';
import { getConnected } from '../../../store/network/selectors';
import { Alert } from 'react-native';

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 8px;
  margin-vertical: 8px;
  border-radius: 4px;
  background-color: ${props => props.theme.tabViewContentButton};
`;

const ButtonText = styled(Text)`
  text-align: center;
  color: ${props => props.theme.tabTextColor};
`;

const ContentWrap = styled.View`
  padding: 8px;
  background-color: ${props => props.theme.tabContentBody};
`;

const TitleText = styled(Text)`
  font-size: 16px;
  margin-bottom: 4px;
`;

const Description = styled(Text)`
  color: ${props => props.theme.tabTextColor};
`;

type Props = {
  title: string;
  description: string;
  content: string;
  lessonRef: number;
  type: PodcastTypes;
};

export const PodcastTabContentBody = ({
  title,
  description,
  content,
  lessonRef,
  type,
}: Props) => {
  const navigation = useNavigation();
  const connected = useSelector(getConnected);

  const handlePress = () => {
    if (!connected) {
      Alert.alert(
        'No Network Detected',
        `Looks like you're offline, this feature is only available while you have a active internet connection.`,
        [{ text: 'OK', style: 'cancel' }],
        { cancelable: false }
      );
      return false;
    } else {
      navigation.navigate('Sentences', {
        lessonRef,
      });
    }
  };

  let Title = <TitleText>{title}</TitleText>;
  let Desc = <Description>{description}</Description>;

  if (type === PodcastTypes.DRILL) {
    Title = null;
    Desc = (
      <Description>
        Open the example sentences and listen along to the audio drills for
        lesson {lessonRef}
      </Description>
    );
  }
  if (type === PodcastTypes.PDF) {
    Title = null;
    Desc = (
      <Description>
        These are the PDF show notes for Podcast {lessonRef}
      </Description>
    );
  }

  return (
    <ContentWrap>
      {Desc}
      {content && type === PodcastTypes.DRILL && (
        <Button onPress={handlePress}>
          <ButtonText>View Content</ButtonText>
        </Button>
      )}
    </ContentWrap>
  );
};
