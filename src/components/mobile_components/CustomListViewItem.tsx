import React, { ReactNode } from 'react'
import { View, Text, TouchableOpacity } from "react-native-web";
import { ICustomListViewItem } from "../../store/BuilderContext";
import CustomImage from "./CustomImage";
import { LIST_ITEM_ONCLICK_TYPES, OnListItemClickTypeType } from "../../utils/listViewUtils";
import { toThumbnailSize } from "../../utils/componentUtils";

interface Props {
  data: ICustomListViewItem;
  onClickType?: OnListItemClickTypeType;
  noImage?: boolean;
  noSubtitle?: boolean;
  thumbnail?: boolean;
  listItemPrepend?: 'circle';
}

interface ParentProps extends Props {
  children: ReactNode;
}

const Title = (props: Props) => {
  const { data: { title }, thumbnail } = props
  return (
    <Text style={{ fontSize: toThumbnailSize(12, 6, thumbnail) }}>{title}</Text>
  )
}

const Subtitle = (props: Props) => {
  const { data: { subtitle }, thumbnail } = props
  return (
    <Text style={{ fontSize: toThumbnailSize(11, 5, thumbnail) }}>{subtitle}</Text>
  )
}

const Parent = (props: ParentProps) => {
  const style = {
    paddingHorizontal: 8,
    paddingVertical: 4,
  }
  switch (props.onClickType) {
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
    noSubtitle,
    noImage,
    thumbnail,
    listItemPrepend,
  } = props
  return (
    <Parent {...props}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {
          !noImage
            ? (
              <View
                style={{ marginRight: toThumbnailSize(4, 2, thumbnail) }}
              >
                <CustomImage
                  rounded
                  width={toThumbnailSize(30, 12, thumbnail)}
                  height={toThumbnailSize(30, 12, thumbnail)}
                  imageUrl={data.image_url}
                />
              </View>
            )
            : (
              <React.Fragment>
                {
                  listItemPrepend === 'circle'
                    ? (
                      <View
                        style={{
                          marginRight: toThumbnailSize(4, 2, thumbnail),
                          borderRadius: 16,
                          width: toThumbnailSize(6, 4, thumbnail),
                          height: toThumbnailSize(6 , 4, thumbnail),
                          backgroundColor: '#000000',
                        }}
                      />
                    )
                    : null
                }
              </React.Fragment>
            )
        }
        <View>
          <Title {...props} />
          {data.subtitle && !noSubtitle ? <Subtitle {...props} /> : null}
        </View>
      </View>
    </Parent>
  )
}