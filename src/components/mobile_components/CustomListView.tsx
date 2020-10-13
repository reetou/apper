import React from 'react'
import { FlatList } from "react-native-web";
import CustomListViewItem from "./CustomListViewItem";
import { LIST_ITEM_ONCLICK_TYPES } from "../../utils/listViewUtils";

interface Props {
  thumbnail?: boolean;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  childComponents: [];
}

export default function CustomListView(props: Props) {
  const {
    thumbnail,
    childComponents,
    backgroundColor,
    padding,
    margin,
  } = props
  const noChildren = !thumbnail && childComponents.length === 0
  return (
    <FlatList
      style={{
        ...backgroundColor ? { backgroundColor } : {},
        ...noChildren ? { minHeight: 100 } : {},
        ...padding ? { padding } : {},
        ...margin ? { margin } : {},
      }}
      data={noChildren ? [{id: 'no_children', title: 'Sample Item', subtitle: 'Subtitle', onClickType: LIST_ITEM_ONCLICK_TYPES.navigateToItemPage}] : childComponents}
      renderItem={({ item }) => {
        return (
          <CustomListViewItem data={item} />
        )
      }}
    />
  )
}