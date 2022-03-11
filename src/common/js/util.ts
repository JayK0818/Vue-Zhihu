function numberTransform (number : string | number): string | number {
  if (typeof number === 'string') {
    number = Number(number)
  }
  if (number > 999) {
    const numberArray = (number + '').split('').reverse()
    const temp:string [] = []
    numberArray.forEach((n, i) => {
      if (i === 0) {
        temp.push(n)
      } else {
        if (i % 3 === 0) {
          temp.push(',')
        }
        temp.push(n)
      }
    })
    return temp.reverse().join('')
  } else {
    return number
  }
}

export {
  numberTransform
}
