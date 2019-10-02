const fs = require('fs')
const queryString = require('query-string')

function createUrl(cart) {
  const query = {
    apiKey: process.env.API_KEY,
    debug: 'true',
    cart: JSON.stringify(cart),
  }

  return `https://design.alvarcarto.com/?${queryString.stringify(query)}`;
}

function main() {
  const filePath = process.argv[2];
  const fileContents = fs.readFileSync(filePath, { encoding: 'utf8' })

  let cart
  try {
    cart = JSON.parse(fileContents)
  } catch (e) {
    console.error('Error parsing json file', filePath)
    throw e
  }

  const url = createUrl(cart)
  console.log(url)
}

main()