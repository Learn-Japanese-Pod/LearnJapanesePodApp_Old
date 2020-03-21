import axios from 'axios';
import {
  DEV_PUSH_NOTIF_ENDPOINT,
  PROD_PUSH_NOTIF_ENDPOINT,
  PROD_PUSH_NOTIF_AUTH_TOKEN,
  DEV_PUSH_NOTIF_AUTH_TOKEN,
} from '../../config';

let PUSH_ENDPOINT = '';
let AUTH_TOKEN = '';

if (__DEV__) {
  PUSH_ENDPOINT = DEV_PUSH_NOTIF_ENDPOINT;
  AUTH_TOKEN = DEV_PUSH_NOTIF_AUTH_TOKEN;
} else {
  PUSH_ENDPOINT = PROD_PUSH_NOTIF_ENDPOINT;
  AUTH_TOKEN = PROD_PUSH_NOTIF_AUTH_TOKEN;
}

export const storeToken = async token => {
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
};

export const deleteToken = async token => {
  try {
    return await axios.delete(PUSH_ENDPOINT + '/' + token, {
      headers: { Authorization: `Token ${AUTH_TOKEN}` },
    });
  } catch (e) {
    console.log(e);
  }
};

export const sendTest = async token => {
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
};
