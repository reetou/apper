import React from 'react'
import { TouchableOpacity, Text, View } from "react-native-web";
import { toThumbnailSize } from "../../utils/componentUtils";


interface Props {
  text?: string;
  thumbnail?: boolean;
  rounded?: boolean;
}

export default function CustomGenericButton(props: Props) {
  const { text, thumbnail, rounded } = props
  return (
    <TouchableOpacity
      style={{
        borderRadius: rounded ? 16 : 0,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: toThumbnailSize(16, 8, thumbnail),
        paddingVertical: toThumbnailSize(8, 4, thumbnail)
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            fontSize: toThumbnailSize(14, 8, thumbnail)
          }}
        >
          {text || 'Сохранить'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}