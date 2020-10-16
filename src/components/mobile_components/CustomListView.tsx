import React from 'react'
import { FlatList } from "react-native-web";
import CustomListViewItem from "./CustomListViewItem";
import { LIST_ITEM_ONCLICK_TYPES, OnListItemClickTypeType } from "../../utils/listViewUtils";
import { ICustomListViewItem } from "../../store/BuilderContext";

interface Props {
  thumbnail?: boolean;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  disableScroll?: boolean;
  noImage?: boolean;
  noSubtitle?: boolean;
  onClickType?: OnListItemClickTypeType;
  listItemPrepend?: 'circle',
  data: {
    childComponents: ICustomListViewItem[],
  }
}

const placeholderChild = {
  id: 'no_children',
  title: 'Sample Item',
  subtitle: 'Subtitle',
  onClickType: LIST_ITEM_ONCLICK_TYPES.navigateToItemPage
}

const placeholderChildren = [1].map(x => ({...placeholderChild, id: `${x}_${placeholderChild.id}`}))

export default function CustomListView(props: Props) {
  const {
    thumbnail,
    backgroundColor,
    padding,
    margin,
    onClickType,
    disableScroll,
    noImage,
    noSubtitle,
    listItemPrepend,
    data: { childComponents },
  } = props
  const noChildren = childComponents.length === 0
  return (
    <FlatList
      scrollEnabled={!disableScroll}
      style={{
        ...backgroundColor ? { backgroundColor } : {},
        ...padding ? { padding } : {},
        ...margin ? { margin } : {},
      }}
      keyExtractor={(item) => item.id}
      data={noChildren ? placeholderChildren : childComponents}
      renderItem={({ item }) => {
        return (
          <CustomListViewItem
            listItemPrepend={listItemPrepend}
            thumbnail={thumbnail}
            noImage={noImage}
            noSubtitle={noSubtitle}
            data={item}
            onClickType={onClickType}
          />
        )
      }}
    />
  )
}