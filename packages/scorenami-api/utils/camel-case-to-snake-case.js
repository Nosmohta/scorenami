const camelCaseStringToSnakeCase = string => {
  return string.replace(/([A-Z])/g, $1 => {
    return '_' + $1.toLowerCase();
  });
};

const camelCaseToSnakeCase = input => {
  if (typeof input === 'string') {
    return camelCaseStringToSnakeCase(input);
  } else if (typeof input === 'object') {
    let newObject = {};

    Object.keys(input).forEach(key => {
      const newKey = camelCaseStringToSnakeCase(key);

      newObject[newKey] = input[key];
    });

    return newObject;
  } else {
    return input;
  }
};

module.exports = camelCaseToSnakeCase;
