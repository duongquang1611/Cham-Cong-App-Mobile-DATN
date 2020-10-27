function convertToArray(objectsArray) {
  let copyOfJsonArray = Array.from(objectsArray);
  let jsonArray = JSON.parse(JSON.stringify(copyOfJsonArray));
  return jsonArray;
}

const utils = {
  convertToArray,
};
export default utils;
