import { CustomComponent, CustomComponentType } from "../../store/BuilderContext";
import CustomInput from "./CustomInput";
import CustomGenericButton from "./CustomGenericButton";
import { v4 as uuidv4 } from 'uuid'
import TextBlock from "./TextBlock";

interface ComponentTypesInterface {
  [key: string]: CustomComponentType,
}

export const CUSTOM_COMPONENT_TYPES: ComponentTypesInterface = {
  CustomInput: 'custom_input',
  CustomGenericButton: 'custom_generic_button',
  CustomGenericButtonRounded: 'custom_generic_button_rounded',
  TextBlock: 'custom_text_block',
}

export const ALL_CUSTOM_COMPONENT_TYPES: CustomComponentType[] = Object.keys(CUSTOM_COMPONENT_TYPES).map(k => CUSTOM_COMPONENT_TYPES[k])

export function getCustomComponentByItemType(type: CustomComponentType): CustomComponent {
  switch (type) {
    case CUSTOM_COMPONENT_TYPES.CustomGenericButton:
      return CustomGenericButtonData()
    case CUSTOM_COMPONENT_TYPES.CustomGenericButtonRounded:
      return CustomGenericRoundedButtonData()
    case CUSTOM_COMPONENT_TYPES.TextBlock:
      return TextBlockData()
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
    },
    children: [],
    title: 'Поле для ввода текста',
    item_type: CUSTOM_COMPONENT_TYPES.CustomInput
  }
}

export function CustomGenericButtonData(): CustomComponent {
  return {
    id: uuidv4(),
    component: CustomGenericButton,
    props: {
      disabled: false,
      text: 'Сохранить'
    },
    children: [],
    title: 'Кнопка',
    item_type: CUSTOM_COMPONENT_TYPES.CustomGenericButton
  }
}

export function CustomGenericRoundedButtonData(): CustomComponent {
  return {
    id: uuidv4(),
    component: CustomGenericButton,
    props: {
      disabled: false,
      text: 'Сохранить',
      rounded: true,
    },
    children: [],
    title: 'Закругленная кнопка',
    item_type: CUSTOM_COMPONENT_TYPES.CustomGenericButtonRounded
  }
}

export function TextBlockData(): CustomComponent {
  return {
    id: uuidv4(),
    component: TextBlock,
    props: {
      text: 'Lorem ipsum',
    },
    children: [],
    title: 'Блок текста',
    item_type: CUSTOM_COMPONENT_TYPES.TextBlock,
    data: {
      value: 'Lorem ipsum dolorum'
    }
  }
}