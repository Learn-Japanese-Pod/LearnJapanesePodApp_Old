import axios from 'axios';
import config from '../../config.json';

let PUSH_ENDPOINT = null;
let AUTH_TOKEN = null;

const { prod, dev } = config;

if (!__DEV__) {
  PUSH_ENDPOINT = prod.pushUrl;
  AUTH_TOKEN = prod.pushToken;
} else if (dev) {
  PUSH_ENDPOINT = dev.pushUrl;
  AUTH_TOKEN = dev.pushToken;
}

export const storeToken = async token => {
  if (PUSH_ENDPOINT && AUTH_TOKEN) {
    try {
      return await axios.post(
        PUSH_ENDPOINT,
        {
          push_token: token,
        },
        {
          headers: { Authorization: `Token ${AUTH_TOKEN}` },
        }
      );
    } catch (e) {}
  }
};

export const deleteToken = async token => {
  if (PUSH_ENDPOINT && AUTH_TOKEN) {
    try {
      return await axios.delete(PUSH_ENDPOINT + '/' + token, {
        headers: { Authorization: `Token ${AUTH_TOKEN}` },
      });
    } catch (e) {
      console.log(e);
    }
  }
};

export const sendTest = async token => {
  if (PUSH_ENDPOINT && AUTH_TOKEN) {
    try {
      return await axios.post(
        PUSH_ENDPOINT,
        {
          push_token: token,
          body: 'test body',
        },
        {
          headers: { Authorization: `Token ${AUTH_TOKEN}` },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
};
