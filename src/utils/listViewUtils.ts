export const LIST_ITEM_ONCLICK_TYPES: OnListItemClickTypesInterface = {
  navigateToItemPage: 'open_target_page',
  noop: 'noop'
}

interface OnListItemClickTypesInterface {
  navigateToItemPage: OnListItemClickTypeType,
  noop: OnListItemClickTypeType,
}

export type OnListItemClickTypeType = 'open_target_page' | 'noop'

export const NAVIGATION_MOVE_LIST_ITEM_ONCLICK_TYPES = [
  LIST_ITEM_ONCLICK_TYPES.navigateToItemPage,
]
