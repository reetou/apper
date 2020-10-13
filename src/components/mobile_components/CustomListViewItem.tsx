import React, { ReactNode } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Pressable } from "react-native-web";
import { ICustomListViewItem } from "../../store/BuilderContext";
import CustomImage from "./CustomImage";
import { LIST_ITEM_ONCLICK_TYPES } from "../../utils/listViewUtils";

interface Props {
  data: ICustomListViewItem;
}

interface ParentProps extends Props {
  children: ReactNode;
}

const Title = (props: Props) => {
  const { data: { title } } = props
  return (
    <Text style={{ fontSize: 12 }}>{title}</Text>
  )
}

const Subtitle = (props: Props) => {
  const { data: { subtitle } } = props
  return (
    <Text style={{ fontSize: 11 }}>{subtitle}</Text>
  )
}

const Parent = (props: ParentProps) => {
  const style = {
    paddingHorizontal: 8,
    paddingVertical: 4,
  }
  switch (props.data.onClickType) {
    case LIST_ITEM_ONCLICK_TYPES.navigateToItemPage:
      return (
        <TouchableOpacity
          style={style}
          onPress={() => {
            console.log(`Pressed`)
          }}
        >
          {props.children}
        </TouchableOpacity>
      )
    default:
      return (
        <View style={style}>
          {props.children}
        </View>
      )
  }
}

export default function CustomListViewItem(props: Props) {
  const {
    data,
  } = props
  return (
    <Parent {...props}>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View
          style={{ marginRight: 4 }}
        >
          <CustomImage
            rounded
            width={30}
            height={30}
            imageUrl={data.image_url}
          />
        </View>
        <View>
          <Title {...props} />
          {data.subtitle ? <Subtitle {...props} /> : null}
        </View>
      </View>
    </Parent>
  )
}