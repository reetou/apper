


export function toThumbnailSize(defaultSize: number, thumbnailSize: number, isThumbnail?: boolean) {
  if (Boolean(isThumbnail)) {
    return thumbnailSize
  }
  return defaultSize
}