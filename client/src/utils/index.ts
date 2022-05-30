export const numberRange = (start: number, end: number) => {
  return new Array(end - start).fill(null).map((d, i) => i + start);
}

export const getReadableDateFormat = (dateString: Date | string): string => {
  let dateJs = new Date(dateString);
  let readableDateFormat = dateJs.toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })

  return readableDateFormat.replace(",", "");
}

