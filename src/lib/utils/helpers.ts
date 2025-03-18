/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const reorderDraggableListItems = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list)
  const [removed] = result?.splice(startIndex, 1)
  result?.splice(endIndex, 0, removed)
  return result
}