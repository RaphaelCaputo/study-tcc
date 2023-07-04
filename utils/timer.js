export function formatTimer(time) {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time - hours * 3600) / 60)
  const seconds = time - hours * 3600 - minutes * 60

  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes
  const displayHours = hours < 10 ? `0${hours}` : hours

  return `${displayHours}:${displayMinutes}:${displaySeconds}`
}
