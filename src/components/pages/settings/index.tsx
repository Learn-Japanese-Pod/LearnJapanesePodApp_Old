import React from 'react';
import { useDispatch } from 'react-redux';
import {
  deletePersistedData,
  deleteDir,
  sendTestNotification,
  deletePushToken,
} from '../../../store/device';
import { Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import {
  FontAwesome as _FontAwesome,
  MaterialCommunityIcons as _MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Linking } from 'expo';
import Constants from 'expo-constants';

const vNum = Constants.manifest.version;
const bNum = Constants.manifest.ios.buildNumber;
const appInfo = `${vNum} [${bNum}]`;

const Wrap = styled.View`
  display: flex;
  align-items: center;
  flex-flow: column;
`;

const Button = styled.TouchableOpacity`
  background-color: #dddddd;
  border-radius: 4px;
  padding: 8px;
  width: 200px;
  margin-bottom: 8px;
`;

const ButtonText = styled(Text)`
  text-align: center;
`;

const Header = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 4px;
`;

const ShortHeader = styled(Header)`
  width: 200px;
  text-align: center;
`;

const SocialsWrap = styled.View`
  display: flex;
  flex-flow: row;
  padding-vertical: 8px;
`;

const SocialLink = styled.TouchableOpacity`
  margin-horizontal: 8px;
`;

const IconWrap = styled.View`
  width: 40px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

const FontAwesome = styled(_FontAwesome)``;

const MaterialCommunityIcons = styled(_MaterialCommunityIcons)``;

const LinkText = styled.TouchableOpacity`
  margin-bottom: 24px;
`;

const isDev = __DEV__;

export const Settings = () => {
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Wrap>
        <Header>Credits</Header>
        <Text>J Pod Ninja</Text>
        <Text>Yalgie</Text>
        <Text>Gizotti</Text>
        <Text>Gencast</Text>

        <ShortHeader>Connect with Learn Japanese Pod</ShortHeader>
        <SocialsWrap>
          <SocialLink
            onPress={() =>
              Linking.openURL('https://www.facebook.com/LearnJapanesePod/')
            }>
            <IconWrap>
              <FontAwesome
                name="facebook-square"
                size={42}
                style={{ color: '#333' }}
              />
            </IconWrap>
          </SocialLink>
          <SocialLink
            onPress={() =>
              Linking.openURL('https://twitter.com/japanesepodcast')
            }>
            <IconWrap>
              <FontAwesome
                name="twitter-square"
                size={42}
                style={{ color: '#333' }}
              />
            </IconWrap>
          </SocialLink>
          <SocialLink
            onPress={() =>
              Linking.openURL('https://www.instagram.com/learnjapanesepod/')
            }>
            <IconWrap>
              <FontAwesome
                name="instagram"
                size={42}
                style={{ color: '#333' }}
              />
            </IconWrap>
          </SocialLink>
        </SocialsWrap>
        <SocialsWrap>
          <SocialLink
            onPress={() =>
              Linking.openURL(
                'https://discordapp.com/channels/506368145032871936'
              )
            }>
            <IconWrap>
              <MaterialCommunityIcons
                name="discord"
                size={42}
                style={{ color: '#333' }}
              />
            </IconWrap>
          </SocialLink>
          <SocialLink
            onPress={() => Linking.openURL('https://learnjapanesepod.com/')}>
            <IconWrap>
              <MaterialCommunityIcons
                name="web"
                size={42}
                style={{ color: '#333' }}
              />
            </IconWrap>
          </SocialLink>
          <SocialLink
            onPress={() => Linking.openURL('mailto:info@learnjapanesepod.com')}>
            <IconWrap>
              <MaterialCommunityIcons
                name="email"
                size={42}
                style={{ color: '#333' }}
              />
            </IconWrap>
          </SocialLink>
        </SocialsWrap>

        <Header>Feedback/Bug Form</Header>

        <Button
          onPress={() =>
            Linking.openURL(
              'https://docs.google.com/forms/d/e/1FAIpQLSevuxbMwzUIDYF49smeCE3uV7pqZ07gFnIx_WeT3f40qOqprQ/viewform'
            )
          }>
          <ButtonText>Open Form</ButtonText>
        </Button>

        {isDev && (
          <>
            <Header>Dev</Header>
            <Button onPress={() => dispatch(deletePersistedData())}>
              <ButtonText>Delete Cache</ButtonText>
            </Button>
            <Button onPress={() => dispatch(deleteDir())}>
              <ButtonText>Delete Downloads</ButtonText>
            </Button>
            <Button onPress={() => dispatch(deletePushToken())}>
              <ButtonText>Delete Push Token</ButtonText>
            </Button>
            <Button onPress={() => dispatch(sendTestNotification())}>
              <ButtonText>Send Test Notification</ButtonText>
            </Button>
          </>
        )}

        <Header>App Info</Header>
        <Text>{appInfo}</Text>
        <LinkText
          onPress={() => Linking.openURL('https://thecodingforge.com.au/')}>
          <Text>Built by The Coding Forge</Text>
        </LinkText>
      </Wrap>
    </ScrollView>
  );
};
