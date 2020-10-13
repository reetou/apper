import { CustomComponent, CustomComponentType } from "../../store/BuilderContext";
import CustomInput from "./CustomInput";
import CustomGenericButton from "./CustomGenericButton";
import { v4 as uuidv4 } from 'uuid'
import TextBlock from "./TextBlock";
import CustomImage from "./CustomImage";
import { ONCLICK_TYPES } from "../../utils/buttonUtils";

interface ComponentTypesInterface {
  [key: string]: CustomComponentType,
}

export const CUSTOM_COMPONENT_TYPES: ComponentTypesInterface = {
  CustomInput: 'custom_input',
  CustomGenericButton: 'custom_generic_button',
  CustomGenericButtonRounded: 'custom_generic_button_rounded',
  TextBlock: 'custom_text_block',
  CustomImage: 'custom_image',
}

export const CUSTOM_INPUTS = [
  CUSTOM_COMPONENT_TYPES.CustomInput,
]

export const DEFAULT_IMAGE_URL = 'https://i.imgur.com/t0nSc4e.png'

export const ALL_CUSTOM_COMPONENT_TYPES: CustomComponentType[] = Object.keys(CUSTOM_COMPONENT_TYPES).map(k => CUSTOM_COMPONENT_TYPES[k])

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