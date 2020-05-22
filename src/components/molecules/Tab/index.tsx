import React from 'react';
import styled, { css } from 'styled-components/native';
import { Tabs } from '../PodcastTabs';
import { Text } from 'react-native';

const Button = styled.TouchableOpacity`
  width: 33.33%;
`;

const activeCSS = css`
  background-color: ${props => props.theme.tabActive};
`;

const defaultCSS = css`
  background-color: ${props => props.theme.tab};
`;

type TabProps = {
  active: boolean;
};

const Tab = styled.View`
  ${(props: TabProps) => (props.active ? activeCSS : defaultCSS)};
  padding-vertical: 12px;
  padding-horizontal: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const TabText = styled(Text)`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 10px;
  color: ${props => props.theme.tabTextColor};
`;

type Props = {
  handleTabPress: (type: Tabs) => void;
  type: Tabs;
  active: boolean;
  label: string;
};

export const TabButton = ({ handleTabPress, type, active, label }: Props) => {
  return (
    <Button onPress={(): void => handleTabPress(type)}>
      <Tab active={active}>
        <TabText>
          {label}
          {/*<FontAwesome name="volume-up" size={12} style={{ color: '#333' }} />*/}
        </TabText>
      </Tab>
    </Button>
  );
};
