import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Links = ({links}) => {
  const bg_high = links.videoHD ? '#1D58FFFF' : '#84A5FFFF';
  const bg_low = links.video ? '#1D58FFFF' : '#84A5FFFF';
  return (
    <View style={[styles.con]}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.btn, {backgroundColor: bg_low}]}>
        <Text style={[styles.btnText]}>Low Quality</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.btn, {backgroundColor: bg_high}]}>
        <Text style={[styles.btnText]}>High Quality</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Links;

const styles = StyleSheet.create({
  con: {
    height: 50,
    width: '90%',
    backgroundColor: '#ffffff00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  btn: {
    // backgroundColor: '#1D58FFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
