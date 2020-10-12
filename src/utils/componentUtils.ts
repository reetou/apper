import { RGBColor } from "react-color";


export function toThumbnailSize(defaultSize: number, thumbnailSize: number, isThumbnail?: boolean) {
  if (Boolean(isThumbnail)) {
    return thumbnailSize
  }
  return defaultSize
}

export function rgbToString(rgb: RGBColor) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
}