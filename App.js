import {StyleSheet, Text, View, Linking, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

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

const App = () => {
  const {url: initialUrl, processing} = useInitialURL();
  const [listenedUrl, setListenedUrl] = useState(null);
  useEffect(() => {
    const linker = Linking.addEventListener('url', e => setListenedUrl(e.url));
    return () => linker.remove();
  }, [Linking]);

  const getThat = () =>
    fetch('./assets/fetch.json')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => getThat()}>
        <Text>
          {processing
            ? 'Processing the initial url from a deep link'
            : `The deep link is: ${listenedUrl || initialUrl || 'None'}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
