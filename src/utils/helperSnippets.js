export function hasEmptyValue(userDataWithoutPasswords) {
  for (let key in userDataWithoutPasswords) {
    if (userDataWithoutPasswords.hasOwnProperty(key) && userDataWithoutPasswords[key] === "") {
      return true;
    }
  }
  return false;
}
