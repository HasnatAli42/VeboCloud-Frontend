export const formatTrackLength = (length: string): string => {
  const [hours, minutes, seconds] = length.split(':');

  const cleanSeconds = seconds.split('.')[0];

  if (parseInt(hours, 10) === 0) {
    return `${minutes}:${cleanSeconds}`;
  } else {
    return `${hours}:${minutes}:${cleanSeconds}`;
  }
};
