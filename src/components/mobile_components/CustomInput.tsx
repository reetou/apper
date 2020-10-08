import React from 'react'
import { TextInput } from 'react-native-web'
import { toThumbnailSize } from "../../utils/componentUtils";

interface Props {
  thumbnail?: boolean,
  disabled?: boolean,
}

export default function CustomInput(props: Props) {
  const { thumbnail, disabled } = props
  return (
    <TextInput
      value="Some test"
      editable={!disabled || thumbnail}
      allowFontScaling
      style={{
        width: 'inherit',
        fontSize: toThumbnailSize(14, 6, thumbnail),
        borderWidth: toThumbnailSize(1, 0.5, thumbnail),
        borderColor: 'black',
        paddingVertical: toThumbnailSize(8, 4, thumbnail),
        paddingHorizontal: toThumbnailSize(4, 2, thumbnail),
      }}
      placeholder="Text..."
    />
  )
}