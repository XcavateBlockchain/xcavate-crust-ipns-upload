import moment from 'moment'

/**
 * Returns the abbreviation value.
 * 
 * @param str - Any kind of value
 * @param num - Number of the targeted value's length * 
 * @returns String
 */
export const abbreviationBasic = (str, num) => {
  if (!str) return ''

  return `${String(str).substring(0, num)}`
}

/**
 * Returns the abbreviation value.
 * 
 * @param str - Any kind of value
 * @param num - Number of the targeted value's length * 
 * @returns String
 */
export const abbreviation = (str, num) => {
  if (!str) return ''

  return `${String(str).substring(0, num)}${String(str).length > num ? '...' : ''}`
}

/**
 * Returns the abbreviation value like this 0xAE01...45bD.
 * 
 * @param str - Any kind of value
 * @param num1 - Number of the targeted value's first length *
 * @param num2 - Number of the targeted value's last length * 
 * @returns String
 */
export const abbreviationFormat = (str, num1, num2) => {
  if (!str) return ''
  const _str = String(str)

  return `${_str.substring(0, num1)}${_str.length > num1 + num2 ? '...' : ''}${_str.substring(_str.length - num2, _str.length)}`
}

/**
 * Convert normal date to unix timestamp
 * 
 * @param date any - Target date
 * @returns Converted unix timestamp
 */
export const convertDateToUnixTimestamp = (date) => {
  return Math.floor(new Date(date).getTime() / 1000)
}

/**
 * Convert BigInt to Decimal
 * 
 * @param value Number
 * @returns Converted String
 */
export const bigintToDecimal = (value) => {
  return (value / 10 ** 18).toFixed(4)
}

export const getPassedTime = (date) => {
  let _loadedTime = ''
  const passed = moment(new Date()).diff(date)
  if (passed > 0) {
    const diffDuration = moment.duration(passed)

    const months = diffDuration.months()
    const days = diffDuration.days()
    const hours = diffDuration.hours()
    const minutes = diffDuration.minutes()
    const seconds = diffDuration.seconds()

    if (months > 0) {
      _loadedTime = `${months} months`
    } else if (days > 0) {
      _loadedTime = `${days} days`
    } else if (hours > 0) {
      _loadedTime = `${hours} hours`
    } else if (minutes > 0) {
      _loadedTime = `${minutes} minutes`
    } else if (seconds > 0) {
      _loadedTime = `${seconds} seconds`
    }    
  }

  return `${_loadedTime} ago`
}

export const getRemainingTime = (date) => {
  let _loadedTime = ''
  const passed = moment(date).diff(new Date())
  if (passed > 0) {
    const diffDuration = moment.duration(passed)

    const months = diffDuration.months()
    const days = diffDuration.days()
    const hours = diffDuration.hours()
    const minutes = diffDuration.minutes()
    const seconds = diffDuration.seconds()

    if (months > 0) {
      _loadedTime = `${months} months`
    } else if (days > 0) {
      _loadedTime = `${days} days`
    } else if (hours > 0) {
      _loadedTime = `${hours} hours`
    } else if (minutes > 0) {
      _loadedTime = `${minutes} minutes`
    } else if (seconds > 0) {
      _loadedTime = `${seconds} seconds`
    }    
  }

  return `in ${_loadedTime}`
}

export const getDidAbbreviation = (did) => {
  return did.substring(9, 18)
}
