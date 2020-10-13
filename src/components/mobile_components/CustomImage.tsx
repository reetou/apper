import React from 'react'
import { View, Image } from "react-native-web";
import { DEFAULT_IMAGE_URL } from "./index";

interface Props {
  imageUrl?: string;
  thumbnail?: boolean;
  rounded?: boolean;
  width: number;
  height: number;
  padding?: number;
  margin?: number;
  horizontalAlign?: 'center' | 'flex-start' | 'flex-end';
}

export default function CustomImage(props: Props) {
  const {
    imageUrl,
    thumbnail,
    rounded,
    horizontalAlign,
    width,
    height,
    padding,
    margin,
  } = props
  const uri = thumbnail ? DEFAULT_IMAGE_URL : imageUrl || DEFAULT_IMAGE_URL
  return (
    <View
      style={{
        alignItems: horizontalAlign,
        ...padding ? { padding } : {},
        ...margin ? { margin } : {},
      }}
    >
      <Image
        source={{ uri }}
        style={{
          borderRadius: rounded ? 16 : 0,
          width,
          height,
        }}
      />
    </View>
  )
}