export const toTitleCase = (str) => {
    return str.replace(
      /(\w*\W*|\w*)\s*/g,
      function(txt) {
      return(txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      }
    ); 
}