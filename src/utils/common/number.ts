export function getHanByNumber(num: number) {
  const HAN_STR = '01234567890'
  return HAN_STR.charAt(num)
}

export function transformToTimeCountDown(seconds: number) {
  const SECONDS_A_MINUTE = 60
  function fillZero(num: number) {
    return num.toString().padStart(2, '0')
  }
  const minuteNum = Math.floor(seconds / SECONDS_A_MINUTE)
  const minute = fillZero(minuteNum)
  const second = fillZero(seconds - minuteNum * SECONDS_A_MINUTE)
  return `${minute}: ${second}`
}

export function getRandomInteger(end: number, start = 0) {
  const range = end - start
  const random = Math.floor(Math.random() * range + start)
  return random
}
