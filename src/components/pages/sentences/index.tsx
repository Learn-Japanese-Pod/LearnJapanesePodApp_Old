import React from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../../store/types';
import { WebView } from 'react-native-webview';

export const Sentences = ({ route }) => {
  const { lessonRef } = route.params;
  const content: string = useSelector(
    (state: GlobalState) => state.rss.mainFeed
  ).find(it => it.lessonRef === lessonRef).drill.content;

  const runFirst = `
      window.isNativeApp = true;
      document.body.height = 0;
      [].forEach.call(document.querySelectorAll('#site-footer'),function(e){
        e.parentNode.removeChild(e);
      });
      [].forEach.call(document.querySelectorAll('.entry-categories'),function(e){
        e.parentNode.removeChild(e);
      });
      [].forEach.call(document.querySelectorAll('.pagination-single'),function(e){
        e.parentNode.removeChild(e);
      });
      [].forEach.call(document.querySelectorAll('.footer-nav-widgets-wrapper'),function(e){
        e.parentNode.removeChild(e);
      });
      [].forEach.call(document.querySelectorAll('.post-meta-wrapper'),function(e){
        e.parentNode.removeChild(e);
      });
      [].forEach.call(document.querySelectorAll('.powerpress_links'),function(e){
        e.parentNode.removeChild(e);
      });
      [].forEach.call(document.querySelectorAll('.powerpress_player'),function(e){
        e.parentNode.removeChild(e);
      });
      [].forEach.call(document.querySelectorAll('#site-header'),function(e){
        e.parentNode.removeChild(e);
      });
      document.body.style.paddingBottom = "64px";
      true;
   `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: content,
      }}
      injectedJavaScript={runFirst}
    />
  );
};
