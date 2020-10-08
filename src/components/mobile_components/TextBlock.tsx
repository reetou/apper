import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native-web'
import { toThumbnailSize } from "../../utils/componentUtils";

interface Props {
  thumbnail?: boolean,
  data?: { value: any }
}

export default function TextBlock(props: Props) {
  const { data, thumbnail } = props
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: toThumbnailSize(14, 6, thumbnail),
        }}
      >
        {thumbnail ? 'Lorem ipsum' : data?.value}
      </Text>
    </View>
  )
}