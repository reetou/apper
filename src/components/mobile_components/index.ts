import { CustomComponent, CustomComponentType } from "../../store/BuilderContext";
import CustomInput from "./CustomInput";
import CustomGenericButton from "./CustomGenericButton";
import { v4 as uuidv4 } from 'uuid'
import TextBlock from "./TextBlock";
import CustomImage from "./CustomImage";
import { ONCLICK_TYPES } from "../../utils/buttonUtils";
import CustomListView from "./CustomListView";

interface ComponentTypesInterface {
  CustomInput: CustomComponentType,
  CustomGenericButton: CustomComponentType,
  CustomGenericButtonRounded: CustomComponentType,
  TextBlock: CustomComponentType,
  CustomImage: CustomComponentType,
  CustomListView: CustomComponentType,
  CustomTextListView: CustomComponentType,
  CustomFloatingButton: CustomComponentType,
}

export const CUSTOM_COMPONENT_TYPES: ComponentTypesInterface = {
  CustomInput: 'custom_input',
  CustomGenericButton: 'custom_generic_button',
  CustomGenericButtonRounded: 'custom_generic_button_rounded',
  TextBlock: 'custom_text_block',
  CustomImage: 'custom_image',
  CustomListView: 'custom_list_view',
  CustomTextListView: 'custom_text_list_view',
  CustomFloatingButton: 'custom_floating_button',
}

export const CUSTOM_INPUTS = [
  CUSTOM_COMPONENT_TYPES.CustomInput,
]

export const COMPONENTS_WITH_LIST_ITEMS = [
  CUSTOM_COMPONENT_TYPES.CustomListView,
  CUSTOM_COMPONENT_TYPES.CustomTextListView,
]

export const FLOATING_COMPONENTS = [
  CUSTOM_COMPONENT_TYPES.CustomFloatingButton,
]

export const NON_EMBEDDABLE_COMPONENTS = [
  ...FLOATING_COMPONENTS,
]

export const DEFAULT_IMAGE_URL = 'https://i.imgur.com/t0nSc4e.png'

// @ts-ignore
export const ALL_CUSTOM_COMPONENT_TYPES: CustomComponentType[] = Object.keys(CUSTOM_COMPONENT_TYPES).map((k) => CUSTOM_COMPONENT_TYPES[k])

export function getCustomComponentByItemType(type: CustomComponentType): CustomComponent {
  switch (type) {
    case CUSTOM_COMPONENT_TYPES.CustomGenericButton:
      return CustomGenericButtonData()
    case CUSTOM_COMPONENT_TYPES.CustomGenericButtonRounded:
      return CustomGenericRoundedButtonData()
    case CUSTOM_COMPONENT_TYPES.TextBlock:
      return TextBlockData()
    case CUSTOM_COMPONENT_TYPES.CustomImage:
      return CustomImageData()
    case CUSTOM_COMPONENT_TYPES.CustomListView:
      return CustomListViewData()
    case CUSTOM_COMPONENT_TYPES.CustomTextListView:
      return CustomTextListViewData()
    case CUSTOM_COMPONENT_TYPES.CustomFloatingButton:
      return CustomFloatingButtonData()
    default:
      console.error(`Returning default component because no such custom type ${type}`)
      return CustomInputData()
  }
}

export function CustomInputData(): CustomComponent {
  return {
    id: uuidv4(),
    component: CustomInput,
    props: {
      disabled: false,
      inputPlaceholder: 'Text...',
      margin: 0,
      padding: 0,
    },
    children: [],
    title: 'Поле для ввода текста',
    item_type: CUSTOM_COMPONENT_TYPES.CustomInput,
    data: {
      value: '',
    }
  }
}

const buttonBasicProps = {
  newPageId: '',
  onClickType: ONCLICK_TYPES.noop,
  disabled: false,
  backgroundColor: '#fafafa',
  textColor: '#000000',
  borderColor: '#000000',
  borderWidth: 1,
  webPageUrl: ''
}

export function CustomGenericButtonData(): CustomComponent {
  return {
    id: uuidv4(),
    component: CustomGenericButton,
    props: {
      text: 'Сохранить',
      ...buttonBasicProps,
      margin: 0,
      padding: 0,
    },
    children: [],
    title: 'Кнопка',
    item_type: CUSTOM_COMPONENT_TYPES.CustomGenericButton,
    data: {
      value: '',
    }
  }
}

export function CustomGenericRoundedButtonData(): CustomComponent {
  return {
    id: uuidv4(),
    component: CustomGenericButton,
    props: {
      ...buttonBasicProps,
      text: 'Сохранить',
      rounded: true,
      margin: 0,
      padding: 0,
    },
    children: [],
    title: 'Закругленная кнопка',
    item_type: CUSTOM_COMPONENT_TYPES.CustomGenericButtonRounded,
    data: {
      value: '',
    }
  }
}

export function TextBlockData(): CustomComponent {
  return {
    id: uuidv4(),
    component: TextBlock,
    props: {
      text: 'Lorem ipsum',
      horizontalAlign: 'flex-start',
      margin: 0,
      padding: 0,
    },
    children: [],
    title: 'Блок текста',
    item_type: CUSTOM_COMPONENT_TYPES.TextBlock,
    data: {
      value: 'Lorem ipsum dolorum'
    }
  }
}

export function CustomImageData(): CustomComponent {
  return {
    id: uuidv4(),
    component: CustomImage,
    props: {
      imageUrl: DEFAULT_IMAGE_URL,
      horizontalAlign: 'flex-start',
      width: 60,
      height: 60,
      margin: 0,
      padding: 0,
    },
    children: [],
    title: 'Изображение',
    item_type: CUSTOM_COMPONENT_TYPES.CustomImage,
    data: {
      value: '',
    }
  }
}

export function CustomListViewData(): CustomComponent {
  return {
    id: uuidv4(),
    component: CustomListView,
    props: {
      margin: 0,
      padding: 0,
      backgroundColor: '#FFFFFF'
    },
    children: [],
    title: 'Список элементов',
    item_type: CUSTOM_COMPONENT_TYPES.CustomListView,
    data: {
      value: '',
      childComponents: [],
    }
  }
}

export function CustomTextListViewData(): CustomComponent {
  return {
    id: uuidv4(),
    component: CustomListView,
    props: {
      margin: 0,
      padding: 0,
      backgroundColor: '#FFFFFF',
      noImage: true,
      noSubtitle: true,
      listItemPrepend: 'circle',
    },
    children: [],
    title: 'Текстовый список',
    item_type: CUSTOM_COMPONENT_TYPES.CustomTextListView,
    data: {
      value: '',
      childComponents: [],
    }
  }
}

export function CustomFloatingButtonData(): CustomComponent {
  return {
    id: uuidv4(),
    component: CustomGenericButton,
    props: {
      ...buttonBasicProps,
      text: 'Сохранить',
      rounded: true,
      margin: 0,
      padding: 0,
    },
    children: [],
    title: 'Плавающая кнопка снизу',
    item_type: CUSTOM_COMPONENT_TYPES.CustomFloatingButton,
    data: {
      value: '',
    }
  }
}