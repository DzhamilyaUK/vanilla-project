/**
 * Словарь склонений для слов обозначающих количество
 */

const dictionary = {
  ru: {
    days: {
      few: 'дней',
      one: 'день',
      two: 'дня',
    },
    hours: {
      few: 'часов',
      one: 'час',
      two: 'часа',
    },
    minutes: {
      few: 'минут',
      one: 'минута',
      two: 'минуты',
    },
    variants: {
      few: 'вариантов',
      one: 'вариант',
      two: 'варианта',
    },
  },
}

/**
 * @param {number} number
 * @param {string} key
 *
 * @return {string}
 */
export const formatNumber = (number, key) => {
  const { one, two, few } = (dictionary['ru'] ?? {})[key]
  const titles = [one, two, few]
  const cases = [2, 0, 1, 1, 1, 2]

  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}
