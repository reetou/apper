import { RGBColor } from "react-color";
import { CustomComponent } from "../store/BuilderContext";
import { FLOATING_COMPONENTS, NON_EMBEDDABLE_COMPONENTS } from "../components/mobile_components";


export function toThumbnailSize(defaultSize: number, thumbnailSize: number, isThumbnail?: boolean) {
  if (Boolean(isThumbnail)) {
    return thumbnailSize
  }
  return defaultSize
}

export function rgbToString(rgb: RGBColor) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
}

export function isEmbeddable(component: CustomComponent) {
  return !NON_EMBEDDABLE_COMPONENTS.includes(component.item_type)
}

export function isFloating(component: CustomComponent) {
  return FLOATING_COMPONENTS.includes(component.item_type)
}

export function validateNumberValue(val: any) {
  if (!Boolean(Number(val)) && val !== '' && Number(val) !== 0) {
    return false
  }
  return true
}