import sha1 from 'sha1'
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
const userKey = sha1('user')
function getCurrentUser (): null | {username: string, isLogin: boolean} {
  try {
    const string = window.localStorage.getItem(userKey)
    if (string) {
      const user = JSON.parse(window.atob(string))
      return user
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}

function saveCurrentUser (userInfo: {username:string;isLogin: boolean}): void {
  const string = JSON.stringify(userInfo)
  window.localStorage.setItem(userKey, window.btoa(string))
}

export {
  numberTransform,
  getCurrentUser,
  saveCurrentUser,
  userKey
}
