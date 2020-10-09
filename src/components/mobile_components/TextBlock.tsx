import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native-web'
import { toThumbnailSize } from "../../utils/componentUtils";

interface Props {
  thumbnail?: boolean,
  text?: string,
}

export default function TextBlock(props: Props) {
  const { text, thumbnail } = props
  return (
    <View style={{ flex: 1 }}>
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