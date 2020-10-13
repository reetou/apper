import React, { useState } from 'react'
import { TextInput, View } from 'react-native-web'
import { toThumbnailSize } from "../../utils/componentUtils";

interface Props {
  thumbnail?: boolean,
  disabled?: boolean,
  inputPlaceholder?: string,
  padding?: number,
  margin?: number,
}

export default function CustomInput(props: Props) {
  const {
    thumbnail,
    disabled,
    inputPlaceholder,
    margin,
    padding,
  } = props
  const [value, setValue] = useState<string>('')
  return (
    <View>
      <TextInput
        value={value}
        editable={!disabled || thumbnail}
        allowFontScaling
        onChangeText={setValue}
        style={{
          fontSize: toThumbnailSize(14, 6, thumbnail),
          borderWidth: toThumbnailSize(1, 0.5, thumbnail),
          borderColor: 'black',
          ...padding ? { padding } : {
            paddingVertical: toThumbnailSize(8, 4, thumbnail),
            paddingHorizontal: toThumbnailSize(4, 2, thumbnail),
          },
          ...margin ? { margin } : {},
        }}
        placeholder={inputPlaceholder || 'Text...'}
      />
    </View>
  )
}