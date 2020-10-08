import { CustomComponent } from "../../store/BuilderContext";
import CustomInput from "./CustomInput";
import CustomGenericButton from "./CustomGenericButton";

export function CustomInputData(): CustomComponent {
  return {
    component: CustomInput,
    props: {
      disabled: false,
    },
    children: [],
    title: 'Поле для ввода текста'
  }
}

export function CustomGenericButtonData(): CustomComponent {
  return {
    component: CustomGenericButton,
    props: {
      disabled: false,
      text: 'Сохранить'
    },
    children: [],
    title: 'Кнопка'
  }
}

export function CustomGenericRoundedButtonData(): CustomComponent {
  return {
    component: CustomGenericButton,
    props: {
      disabled: false,
      text: 'Сохранить',
      rounded: true,
    },
    children: [],
    title: 'Закругленная кнопка'
  }
}