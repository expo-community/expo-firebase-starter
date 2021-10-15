import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { View } from './View';
import { Colors } from '../config';

export const TextInput = ({ width = '100%', leftIconName, ...otherProps }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderRadius: 8,
        flexDirection: 'row',
        padding: 12,
        marginVertical: 12,
        width,
        borderWidth: 1,
        borderColor: Colors.mediumGray
      }}
    >
      {leftIconName && (
        <MaterialCommunityIcons
          name={leftIconName}
          size={22}
          color={Colors.mediumGray}
          style={{ marginRight: 10 }}
        />
      )}
      <RNTextInput
        style={{
          flex: 1,
          width: '100%',
          fontSize: 18,
          color: Colors.black
        }}
        placeholderTextColor={Colors.mediumGray}
        {...otherProps}
      />
    </View>
  );
};
