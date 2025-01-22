import { useCallback, useRef, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import Constants from 'expo-constants';

import { Colors } from '@/constants/Colors';
import { Config } from '@/constants/Config';

const INJECTED_JAVASCRIPT = `(function() {
  const message = { messageType: "testMessage" };
  
  
  const button = document.createElement('button');
  button.innerHTML = 'GET CAT FACTS';
  button.className = 'btn btn-primary btn-block mt-15';
  button.addEventListener('click', function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  });
  
  const titleNode = document.getElementsByClassName('part-date')?.[0];
  titleNode.parentNode.insertBefore(button, titleNode.nextSibling);
})();`;

export default function App() {
  const colorScheme = useColorScheme();
  const webViewRef = useRef<WebView>(null);
  const [isFirstLoadEnds, setIsFirstLoadEnds] = useState(false);

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.messageType === 'testMessage') {
      console.log('testMessage');
    }
  };

  const handleLoadEnd = useCallback(() => {
    if (!isFirstLoadEnds) {
      setIsFirstLoadEnds(true);
    }
  }, [isFirstLoadEnds]);

  const handleWebViewNavigationStateChange = ({ url }) => {
    if (!url) {
      return;
    }

    // array.startsWith() also works, but I'm not sure if there's sth in-between
    // so to be more sure here's some parsing
    const isWorkPage = url.split('/').some(i => i === Config.WORK_URI);

    if (isWorkPage) {
      webViewRef.current?.injectJavaScript(INJECTED_JAVASCRIPT);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].mainBg }]}
      source={{ uri: Config.WEB_URI }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      onLoadEnd={handleLoadEnd}
      onMessage={handleMessage}
      javaScriptEnabled
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
