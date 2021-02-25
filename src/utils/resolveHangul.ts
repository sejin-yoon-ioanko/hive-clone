type ResolveHangul = {
  cho: string;
  jung: string;
  jong: string;
}

const CHO = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
  'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
  'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ',
  'ㅍ', 'ㅎ'
]
const JUNG = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ',
  'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ',
  'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ',
  'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
]
const JONG = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ',
  'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ',
  'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]

// const getChoCharCode = (takeOutStartedHangleCharCode: number) => Math.floor(0x1100 + (takeOutStartedHangleCharCode / 588))
// const getJungCharCode = (takeOutStartedHangleCharCode: number) => Math.floor(0x1161 + (takeOutStartedHangleCharCode % 588) / 28)
// const getJongCharCode = (takeOutStartedHangleCharCode: number) => Math.floor(0x11A7 + takeOutStartedHangleCharCode % 28)

const getCho = (takeOutStartedHangleCharCode: number) => CHO[Math.floor(takeOutStartedHangleCharCode / 588)]
const getJung = (takeOutStartedHangleCharCode: number) => JUNG[Math.floor(takeOutStartedHangleCharCode % 588 / 28)]
const getJong = (takeOutStartedHangleCharCode: number) => JONG[Math.floor(takeOutStartedHangleCharCode % 28)]

const resolveHangul = (s: string): ResolveHangul | false => {
  if (!s.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/)) return false
  const takeOutStartedHangleCharCode = s.charCodeAt(0) - 0xAC00
  if (takeOutStartedHangleCharCode < 0) return false

  return {
    cho: getCho(takeOutStartedHangleCharCode),
    jung: getJung(takeOutStartedHangleCharCode),
    jong: getJong(takeOutStartedHangleCharCode)
  }
}

export {
  resolveHangul as default,
  resolveHangul,
  getCho,
  getJung,
  getJong
}
