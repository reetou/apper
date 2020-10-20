import { CustomComponent } from "../store/BuilderContext";
import { CUSTOM_COMPONENT_TYPES } from "../components/mobile_components";
import TextBlock from "../components/mobile_components/TextBlock";
import CustomInput from "../components/mobile_components/CustomInput";
import CustomGenericButton from "../components/mobile_components/CustomGenericButton";
import CustomListView from "../components/mobile_components/CustomListView";
import CustomImage from "../components/mobile_components/CustomImage";

export function getPageReactComponent(c: CustomComponent): React.ComponentType<any> {
  switch (c.item_type) {
    case CUSTOM_COMPONENT_TYPES.CustomInput:
      return CustomInput
    case CUSTOM_COMPONENT_TYPES.CustomGenericButton:
    case CUSTOM_COMPONENT_TYPES.CustomGenericButtonRounded:
    case CUSTOM_COMPONENT_TYPES.CustomFloatingButton:
      return CustomGenericButton
    case CUSTOM_COMPONENT_TYPES.CustomListView:
    case CUSTOM_COMPONENT_TYPES.CustomTextListView:
      return CustomListView
    case CUSTOM_COMPONENT_TYPES.CustomImage:
      return CustomImage
    case CUSTOM_COMPONENT_TYPES.CustomTextTitle:
    case CUSTOM_COMPONENT_TYPES.TextBlock:
      return TextBlock
    default:
      throw new Error(`No react component for type ${c.item_type}`)
  }
}