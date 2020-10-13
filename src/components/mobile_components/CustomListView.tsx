import React from 'react'
import { FlatList } from "react-native-web";
import CustomListViewItem from "./CustomListViewItem";
import { LIST_ITEM_ONCLICK_TYPES, OnListItemClickTypeType } from "../../utils/listViewUtils";

interface Props {
  thumbnail?: boolean;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  childComponents: [];
  disableScroll?: boolean;
  noImage?: boolean;
  noSubtitle?: boolean;
  onClickType?: OnListItemClickTypeType;
  listItemPrepend?: 'circle'
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
    childComponents,
    backgroundColor,
    padding,
    margin,
    onClickType,
    disableScroll,
    noImage,
    noSubtitle,
    listItemPrepend,
  } = props
  const noChildren = childComponents.length === 0
  return (
    <FlatList
      scrollEnabled={!disableScroll}
      style={{
        ...backgroundColor ? { backgroundColor } : {},
        ...noChildren && !thumbnail ? { minHeight: 100 } : {},
        ...padding ? { padding } : {},
        ...margin ? { margin } : {},
      }}
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