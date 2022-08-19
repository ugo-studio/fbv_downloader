import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const LoadingAnimation = () => {
  const fanimate = useSharedValue(40);
  const firstAnimation = useAnimatedStyle(() => {
    return {
      height: fanimate.value,
    };
  });
  const sanimate = useSharedValue(20);
  const secondAnimation = useAnimatedStyle(() => {
    return {
      height: sanimate.value,
    };
  });

  useEffect(() => {
    const repeat = -1;
    fanimate.value = withRepeat(
      withSequence(
        withTiming(40, {duration: 500}),
        withTiming(20, {duration: 500}),
      ),
      repeat,
      true,
    );
    sanimate.value = withRepeat(
      withSequence(
        withTiming(20, {duration: 500}),
        withTiming(40, {duration: 500}),
      ),
      repeat,
      true,
      finished => {
        const resultStr = finished ? 'Finished!' : '';
      },
    );
  }, []);

  return (
    <View style={[styles.con]}>
      <Animated.View style={[styles.bars, firstAnimation]} />
      <Animated.View style={[styles.bars, secondAnimation]} />
      <Animated.View style={[styles.bars, firstAnimation]} />
    </View>
  );
};

export default LoadingAnimation;

const styles = StyleSheet.create({
  con: {
    backgroundColor: '#ffffff00',
    width: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bars: {
    height: 45,
    width: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
