import React from 'react'
import { View, Image } from "react-native-web";
import { DEFAULT_IMAGE_URL } from "./index";

interface Props {
  imageUrl?: string;
  thumbnail?: boolean;
  rounded?: boolean;
  width: number;
  height: number;
  horizontalAlign?: 'center' | 'flex-start' | 'flex-end';
}

export default function CustomImage(props: Props) {
  const { imageUrl, thumbnail, rounded, horizontalAlign, width, height } = props
  const uri = thumbnail ? DEFAULT_IMAGE_URL : imageUrl || DEFAULT_IMAGE_URL
  return (
    <View
      style={{
        borderRadius: rounded ? 16 : 0,
        alignItems: horizontalAlign
      }}
    >
      <Image
        source={{ uri }}
        style={{
          width,
          height,
        }}
      />
    </View>
  )
}