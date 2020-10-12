import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native-web'
import { toThumbnailSize } from "../../utils/componentUtils";

interface Props {
  thumbnail?: boolean,
  text?: string,
  horizontalAlign?: 'flex-start' | 'center' | 'flex-end'
}

export default function TextBlock(props: Props) {
  const { text, thumbnail, horizontalAlign } = props
  return (
    <View
      style={{
        flex: 1,
        alignItems: horizontalAlign || 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: toThumbnailSize(14, 6, thumbnail),
        }}
      >
        {thumbnail ? 'Lorem ipsum!' : (text || 'Lorem ipsum...')}
      </Text>
    </View>
  )
}