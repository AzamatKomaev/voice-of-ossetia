export const getMediaFullPath = (path: string): string => {
  return `${process.env.REACT_APP_SERVER_URL}/media/${path}`
}