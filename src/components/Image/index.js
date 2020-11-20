import React from 'react';
import {ImageBackground} from 'react-native';

export default function Image({image, width, height}) {
  return (
    <ImageBackground
      source={image}
      style={{
        width: width,
        height: height,
      }}
    />
  );
}
