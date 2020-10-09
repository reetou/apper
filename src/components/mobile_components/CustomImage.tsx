import React from 'react'
import { View, Image } from "react-native-web";

let DEFAULT_IMAGE = 'https://i.imgur.com/t0nSc4e.png'


interface Props {
  image_url?: string;
  thumbnail?: boolean;
  rounded?: boolean;
}

export default function CustomImage(props: Props) {
  const { image_url, thumbnail, rounded } = props
  const uri = image_url || DEFAULT_IMAGE
  console.log(`Img uri`, uri)
  return (
    <View
      style={{
        borderRadius: rounded ? 16 : 0,
      }}
    >
      <Image
        source={{ uri }}
        style={{
          width: 60,
          height: 60,
        }}
      />
    </View>
  )
}