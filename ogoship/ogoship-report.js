#!/usr/bin/env node

const _ = require('lodash')
const fs = require('fs')
const csv = require('csv');
const BPromise = require('bluebird');

BPromise.promisifyAll(csv);

const INVENTORY_COLUMNS_IN_ORDER = [
  'name',
  'stockAvailable',
  'potentialValue',
];
const ORDERS_COLUMNS_IN_ORDER = [
  'customerName',
  'editTime',
  'status',
  'customerCountryCode',
  'customerCity',
  'customerEmail',
  'totalEstimatedValue',
  'totalQuantity',
  'totalBlackQuantity',
  'totalWhiteQuantity',
  'orderLines',
];
const paperTypes = ['black', 'white']
const sizes = ['30x40', '50x70']

const sizePotentialValue = {
  '30x40': 15.9,
  '50x70': 23.79,
}

if (!process.argv[2]) {
  console.error('Incorrect parameters')
  console.error(`Usage: ${process.argv[1]} <products-json-file> <orders-json-file>`)
  process.exit(2)
}

function getProductAttr(name, attrArr) {
  const processedName = name.toLowerCase().replace(/ /g, '')
  const type = _.find(attrArr, t => processedName.indexOf(t) !== -1)
  return type
}

function getPaperType(name) {
  return getProductAttr(name, paperTypes)
}

function getSize(name) {
  return getProductAttr(name, sizes)
}

function isPackaging(name) {
  const processedName = name.toLowerCase().replace(/ /g, '')
  return processedName.indexOf('packaging') !== -1
}

function readJsonFileSync(filePath) {
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  try {
    return JSON.parse(fileContent)
  } catch (e) {
    console.error('Error parsing json file', filePath)
    throw e
  }
}

function calculatePotentialValue(size) {
  return sizePotentialValue[size]
}

async function writeInventory(products) {
  const inventoryData = _.map(products, (product) => {
    if (isPackaging(product.name)) {
      return {
        name: product.name,
        stockAvailable: product.stockAvailable,
        potentialValue: 0,
      }
    }

    const size = getSize(product.name)

    return {
      name: product.name,
      stockAvailable: product.stockAvailable,
      potentialValue: calculatePotentialValue(size) * product.stockAvailable,
    }
  })

  const csvRows = [INVENTORY_COLUMNS_IN_ORDER].concat(_.map(inventoryData, (obj) => {
    return _.map(INVENTORY_COLUMNS_IN_ORDER, key => obj[key]);
  }));

  const str = await csv.stringifyAsync(csvRows)
  fs.writeFileSync(`${__dirname}/inventory.csv`, str, { encoding: 'utf8' })
  console.log('Wrote', `${__dirname}/inventory.csv`)
}

async function writeOrders(orders, products) {
  const shippedOrders = _.filter(orders, o => {
    const isShipped = o.status.toLowerCase() === 'shipped'
    const email = o.customer.email ? o.customer.email : ''
    const isInternalOrder = email.toLowerCase().indexOf('alvarcarto') !== -1
    return isShipped && !isInternalOrder
  })
  const orderData = _.map(shippedOrders, (order) => {
    const mappedProducts = _.filter(_.map(order.orderLines, line => {
      const product = _.find(products, p => p.code === line.code)
      if (!product) {
        console.warn('Order', order.reference, 'contains products which do not exist:', line.code)
        return undefined
      }

      const size = getSize(product.name)
      const potentialValue = calculatePotentialValue(size)

      return {
        name: product.name,
        paperType: getPaperType(product.name),
        quantity: line.quantity,
        valueEstimate: potentialValue * line.quantity,
      }
    }, p => !_.isUndefined(p)))

    return {
      customerName: order.customer.name,
      editTime: order.editTime,
      status: order.status,
      customerCountryCode: order.customer.countryCode,
      customerCity: order.customer.city,
      customerEmail: order.customer.email,
      totalEstimatedValue: _.sumBy(mappedProducts, p => p.valueEstimate),
      totalQuantity: _.sumBy(mappedProducts, p => p.quantity),
      totalBlackQuantity: _.sumBy(_.filter(mappedProducts, p => p.paperType === 'black'), p => p.quantity),
      totalWhiteQuantity: _.sumBy(_.filter(mappedProducts, p => p.paperType === 'white'), p => p.quantity),
      orderLines: _.map(mappedProducts, p => `${p.quantity}x "${p.name}"`).join(', '),
    }
  })

  const csvRows = [ORDERS_COLUMNS_IN_ORDER].concat(_.map(orderData, (obj) => {
    return _.map(ORDERS_COLUMNS_IN_ORDER, key => obj[key]);
  }));

  const str = await csv.stringifyAsync(csvRows)
  fs.writeFileSync(`${__dirname}/orders.csv`, str, { encoding: 'utf8' })
  console.log('Wrote', `${__dirname}/orders.csv`)
}


async function main() {
  const products = readJsonFileSync(process.argv[2])
  const orders = readJsonFileSync(process.argv[3])

  await writeInventory(products)
  await writeOrders(orders, products)
}

main()
  .catch(err => {
    throw err;
  })
