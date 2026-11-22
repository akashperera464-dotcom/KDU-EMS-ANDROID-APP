import React, { useRef } from 'react';
import { StyleSheet, StatusBar, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const webViewRef = useRef(null);

  // Android hardware back button — navigate back inside WebView
  React.useEffect(() => {
    const onBackPress = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#064e3b" barStyle="light-content" />
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://akashpereraproject24.vercel.app/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        geolocationEnabled={true}
        allowsBackForwardNavigationGestures={true}
        startInLoadingState={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
