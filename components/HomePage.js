import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
  View,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import LoadingAnimation from './LoadingAnimation';
import Links from './Links';

const HomePage = ({THEME, initialUrl, listenedUrl, shareData}) => {
  const viewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withSpring(THEME.value.sixty),
    };
  });
  const textStyle = useAnimatedStyle(() => {
    return {
      color: withSpring(THEME.value.thirty),
    };
  });

  const [fetching, setFetching] = useState(false);
  const [success, setSuccess] = useState(false);
  const [links, setLinks] = useState('');
  const timeOut = 20000;
  const getDownloadLink = () => {
    if (!fetching) {
      // set fetching of json to true
      setFetching(true);

      // fetch controller
      const controller = new AbortController();

      // fetch json here
      fetch('https://api.jsonbin.io/v3/b/62ff1c605c146d63ca759afa', {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'X-Access-Key':
            '$2b$10$1suYr0YeBndpLhHfwspaWurjAjxApk.7vyInODDBxS/xMtYRiaZ2G',
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response.record.body.video || response.record.body.videoHD) {
            setSuccess(true);
            setFetching(false);
            setLinks(response.record.body);
          }
        })
        .catch(err => {
          setFetching(prev => prev === true && false);
          setSuccess(prev => prev === true && false);
          setLinks('');
          ToastAndroid.showWithGravityAndOffset(
            err.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            80,
          );
          return null;
        });

      // cancel fetching after timeOut
      setTimeout(() => {
        if (fetching) {
          setFetching(prev => prev === true && false);
          setSuccess(prev => prev === true && false);
          setLinks('');
          if (!success) {
            ToastAndroid.showWithGravityAndOffset(
              'Network request failed',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              0,
              80,
            );
            return null;
          }
        }
      }, timeOut);
    }
  };

  return (
    <Animated.View style={[styles.view, viewStyle]}>
      <Animated.View style={[viewStyle, styles.con]}>
        <TextInput
          multiline={false}
          placeholder="Paste fb video link here..."
          placeholderTextColor="#A5A5A5"
          selectionColor="#1D58FF8C"
          defaultValue={shareData || listenedUrl || initialUrl || ''}
          onSubmitEditing={() => getDownloadLink()}
          onChangeText={value => {
            if (
              value === shareData ||
              value === listenedUrl ||
              value === initialUrl
            ) {
              setSuccess(true);
            } else {
              setFetching(prev => prev === true && false);
              setSuccess(prev => prev === true && false);
            }
          }}
          style={[styles.textInput]}
        />
        {success ? (
          <Links links={links} />
        ) : (
          <TouchableOpacity
            onPress={() => getDownloadLink()}
            activeOpacity={0.5}
            style={[styles.btn]}>
            {fetching ? (
              <LoadingAnimation />
            ) : (
              <Text style={[styles.btnText]}>Get Download Link</Text>
            )}
          </TouchableOpacity>
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  con: {
    height: 200,
    width: 250,
    elevation: 5,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    height: 60,
    backgroundColor: '#EBEBEB',
    textAlignVertical: 'center',
    textAlign: 'left',
    borderRadius: 5,
    paddingHorizontal: 5,
    color: '#000',
    fontSize: 17,
  },
  btn: {
    height: 50,
    width: '80%',
    backgroundColor: '#1D58FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
