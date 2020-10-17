import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native-web'
import { toThumbnailSize } from "../../utils/componentUtils";

interface Props {
  thumbnail?: boolean,
  text?: string,
  horizontalAlign?: 'flex-start' | 'center' | 'flex-end',
  padding?: number,
  margin?: number,
  fontSize?: number,
  fontWeight?: any,
}

export default function TextBlock(props: Props) {
  const {
    text,
    thumbnail,
    horizontalAlign,
    padding,
    margin,
    fontSize,
    fontWeight,
  } = props
  // @ts-ignore
  return (
    <View
      style={{
        flex: 1,
        alignItems: horizontalAlign || 'flex-start',
        ...padding ? { padding } : {},
        ...margin ? { margin } : {},
      }}
    >
      <Text
        style={{
          fontSize: toThumbnailSize(fontSize || 14, 6, thumbnail),
          fontWeight: fontWeight ? String(fontWeight) : 'normal',
        } as any}
      >
        {thumbnail ? 'Lorem ipsum!' : (text || 'Lorem ipsum...')}
      </Text>
    </View>
  )
}