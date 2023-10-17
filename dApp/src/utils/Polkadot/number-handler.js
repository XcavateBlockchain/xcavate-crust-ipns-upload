import { create, all } from 'mathjs'
// please review mathjs bignumber on how to add remove and multiply bignumber you can divise like this
//var x=toBigNumber(100)
//var b=toBigNumber(100)
//var c=x.div(b)
//
// configure the default type of numbers as BigNumbers

const config = {
  number: 'BigNumber',
  epsilon: 1e50,
  precision: 50,
}

const math = create(all, config)
const bigNumber = math.bignumber

const toBigNumber = (number) => {
  return bigNumber(number)
}

// const fromBigNumber = (number) => {
//   return number.toFixed(8)
// }

const stringAmountDecimalDecombiner = (amount, decimal) => {
  if(amount) {
    return parseFloat(
      amountDecimalDecombiner(toBigNumber(amount.replaceAll(',', '')), decimal)
    )
  }
  return null
}

const amountDecimalToBigNumber = (amount, decimal) => {
  return bigNumber(amount).mul(bigNumber(Math.pow(10, decimal)))
}

//the return of this function is string if you want add or delet please parse it as float,int,bigNumber depen on the situation
const amountDecimalCombiner = (amount, decimal) => {
  return bigNumber(amount)
    .mul(bigNumber(Math.pow(10, decimal)))
    .toFixed()
}

const amountDecimalDecombiner = (
  totalAmount,
  decimal
) => {
  return totalAmount.div(Math.pow(10, decimal)).toFixed(8)
}
export {
  toBigNumber,
  amountDecimalCombiner,
  amountDecimalDecombiner,
  amountDecimalToBigNumber,
  stringAmountDecimalDecombiner,
}
