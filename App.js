import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import ShareMenu from 'react-native-share-menu';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import HomePage from './components/HomePage';

const useMount = func => useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });

  return {url, processing};
};

const light = {
  sixty: '#fff',
  thirty: '#000',
};
const dark = {
  sixty: '#000',
  thirty: '#fff',
};

const App = () => {
  const [theme, setTheme] = useState('light');
  const THEME = useSharedValue(light);
  SystemNavigationBar.setNavigationColor('#fff');
  StatusBar.setBackgroundColor('#fff');
  useEffect(() => {
    if (theme === 'dark') {
      SystemNavigationBar.setNavigationColor('#000', true);
      StatusBar.setBackgroundColor('#000');
      THEME.value = dark;
    } else {
      SystemNavigationBar.setNavigationColor('#fff');
      StatusBar.setBackgroundColor('#fff');
      THEME.value = light;
    }
  }, [theme]);

  const {url: initialUrl, processing} = useInitialURL();
  const [listenedUrl, setListenedUrl] = useState(null);
  useEffect(() => {
    setListenedUrl(null);
    const linker = Linking.addEventListener('url', e => setListenedUrl(e.url));
    return () => linker.remove();
  }, []);

  const [shareData, setShareData] = useState(null);
  const handleShare = useCallback(item => {
    if (!item) {
      setShareData(null);
      return;
    } else {
      setShareData(item.data);
    }
  });

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);
  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);
    return () => listener.remove();
  }, []);

  const rootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withSpring(THEME.value.sixty),
    };
  });

  return (
    <Animated.View style={[styles.container, rootStyle]}>
      <TouchableOpacity
        onPress={() => setTheme(pre => (pre === 'dark' ? 'light' : 'dark'))}>
        <Text>click</Text>
      </TouchableOpacity>
      <HomePage
        THEME={THEME}
        initialUrl={initialUrl}
        listenedUrl={listenedUrl}
        shareData={shareData}
      />
    </Animated.View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
