export const upCaseFirstLetter = str => {
  if (!str) return
  var splitStr = str.toLowerCase().split(" ")
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(" ")
}

export const truncate = (str, no_words) => {
  const strArr = str.split(" ")

  if (strArr.length <= no_words) {
    return str
  } else {
    return strArr.splice(0, no_words).concat(["..."]).join(" ")
  }
}
