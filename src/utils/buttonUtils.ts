export const ONCLICK_TYPES: OnClickTypesInterface = {
  navigatePush: 'navigate_push',
  navigateBack: 'navigate_back',
  navigateReplace: 'navigate_replace',
  submitForm: 'submit_form',
  openWebPage: 'open_web_page',
  noop: 'noop'
}

interface OnClickTypesInterface {
  navigatePush: OnClickTypeType,
  navigateBack: OnClickTypeType,
  navigateReplace: OnClickTypeType,
  submitForm: OnClickTypeType,
  openWebPage: OnClickTypeType,
  noop: OnClickTypeType,
}

export type OnClickTypeType = 'navigate_push' | 'navigate_back' | 'navigate_replace' | 'noop' | 'submit_form' | 'open_web_page'

export const NAVIGATION_MOVE_ONCLICK_TYPES = [
  ONCLICK_TYPES.navigateReplace,
  ONCLICK_TYPES.navigatePush,
]
