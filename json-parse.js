let textVersion;

await fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(async (response) => {
    textVersion = await response.text();
  })
  .then((json) => console.log(json));

const jsonVersion = JSON.parse(textVersion);

// const input = JSON.stringify(jsonVersion)

// {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   }

// '{"userId":1,"id":1,"title":"delectus aut autem","completed":false}'

// {
//    key: "value"
// }

const input = `
{
    "hi_hi": "     b    y",
  "hello ": "  jason",

  "world"   :   "  bacon",
}`;
// {"key": "value"}

export const parseJson = (json) => {
  const result = {};
  const maxLength = json.length;

  let tempKey = '';
  let tempValue = '';
  let i = 1;
  let currentChar = json[i];

  while (i < maxLength) {
    currentChar = json[i];
    skipWhiteSpaces();

    switch (currentChar) {
      case '"':
        next();
        tempKey = readString();
      case ':':
        next();
        skipWhiteSpaces();
        if (currentChar === '"') {
          next();
          tempValue = readString();
          pushResultAndReset();
        }
      default:
        next();
    }
  }

  // 1.  first char will be {
  // 2.  look for opening " then loop through rest of characeters until closing "
  // 3.  then loop through rest of characeters until closing "
  // 4.  look for :
  // 5.  then everything to the right of it is the value "...value..."
  // 6.  look for opening " then loop through rest of characeters until closing "
  // 7.  push the key:value pair to the results object
  // 8.  then look for a comma
  // 9.  if there is a comma, then go to the next index
  // 10. if there is a comma, then go back to step 2
  // 11. if there isn't a comma, there should be a }, in which case, the algorithm is complete
  // 12. return results object
  //

  return result;

  function next() {
    i++;
    currentChar = json[i];
  }

  function skipWhiteSpaces() {
    while ((currentChar === ' ' || currentChar === '\n') && i < maxLength) {
      i++;
      currentChar = json[i];
    }
  }

  function pushResultAndReset(key, value) {
    pushValue(tempKey, tempValue);
    clearTemps();
  }

  function pushValue(key, value) {
    result[key] = value;
  }

  function clearTemps() {
    tempKey = '';
    tempValue = '';
  }

  function readString() {
    let string = '';
    while (currentChar != '"' && i < maxLength && currentChar != ':') {
      string += currentChar;
      next();
    }
    next();
    return string;
  }
};

// console.log(parseJson(input));

// const jsonify = (text) => {

// }

/**
 * {"key": "value"}
 * 
 * 1. first char will be {
 * 
 * index = 0
 * {"key": "value"}
 * 
 * ^
 * 2. look for opening " then loop through rest of characeters until closing "
 * key = ""
 * index = 1
 * 
 * 3. then loop through rest of characeters until closing "
 * index = 2 > k
 * index = 3 > e
 * index = 4 > y
 * index = 5 > "
 * 
 * key = "key"
 * 
  // 4. look for :
 *  index = 6 > :
  
 * 5. then everything to the right of it is the value "...value..."
  let value = ""
 * {"key": "value"}
 *       ^
 * >  look for opening " then loop through rest of characeters until closing "
 * index = 7 > value = "v"
 * index = 8 > value = "va"
 * index = 9 > value = "val"
 * index = 10 > value = "valu"
 * index = 11 > value = "value"
 * 
  *  push the key:value pair to the results object
  * // then look for a comma
 *  if there is a comma, then go to the next index 
 * 
 * if there is a comma, then go back to step 2
 * if there isn't a comma, there should be a }, in which case, the algorithm is complete
 * return results object 
*/
