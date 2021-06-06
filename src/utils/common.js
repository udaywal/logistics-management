export const toTitleCase = (str) => {
    return str.replace(
      /(\w*\W*|\w*)\s*/g,
      function(txt) {
      return(txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      }
    ); 
}

export const convertToObjByKey = (objsArray = [], key) => {
  return objsArray.reduce((acc, obj) => {
    const objKey = obj[key];
    if (acc[objKey]) {
      acc[objKey].push({ ...obj });
    } else {
      acc[objKey] = [{ ...obj }];
    }
    return acc;
  }, {});
};
