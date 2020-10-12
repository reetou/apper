import React from 'react'
import { TouchableOpacity, Text, View } from "react-native-web";
import { toThumbnailSize } from "../../utils/componentUtils";


interface Props {
  text?: string;
  thumbnail?: boolean;
  rounded?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

const getBorderWidth = (val: any) => {
  if (typeof val !== 'number') {
    return 1
  }
  if (val > 16) {
    return 16
  }
  return val
}

export default function CustomGenericButton(props: Props) {
  const {
    text,
    thumbnail,
    rounded,
    textColor,
    backgroundColor,
    borderColor,
    borderWidth,
  } = props
  return (
    <TouchableOpacity
      style={{
        borderRadius: rounded ? 16 : 0,
        backgroundColor: backgroundColor || '#fafafa',
        borderWidth: getBorderWidth(borderWidth),
        borderColor: borderColor || 'black',
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
            fontSize: toThumbnailSize(14, 8, thumbnail),
            color: textColor || 'black',
          }}
        >
          {text || 'Сохранить'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}