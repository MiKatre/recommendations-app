// takes string and return it lowercased with spaces and _ replaced with -
export const kebabCase = str => str.toString().replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase()