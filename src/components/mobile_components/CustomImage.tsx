import React from 'react'
import { View, Image } from "react-native-web";
import { DEFAULT_IMAGE_URL } from "./index";

interface Props {
  image_url?: string;
  thumbnail?: boolean;
  rounded?: boolean;
  width: number;
  height: number;
  horizontalAlign?: 'center' | 'flex-start' | 'flex-end';
}

export default function CustomImage(props: Props) {
  const { image_url, thumbnail, rounded, horizontalAlign, width, height } = props
  const uri = thumbnail ? DEFAULT_IMAGE_URL : image_url || DEFAULT_IMAGE_URL
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