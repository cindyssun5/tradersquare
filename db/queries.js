const db = require('./config.js');
const callAll = require('../server/request_handler/all_companies')

module.exports = function() {
  db.query(`INSERT INTO productionschema.stockdatatable();`)
    .on('end', function() {
      console.log("created")
    })
}

/**
 * Called from all_companies.js: consolidate
 * [creates Schema]
 * @param  {[array]} sortedElements [array of keys, in ASCII order]
 * @return {[null]}                []
 */

/**
 * [sortQuery description]
 * @param  {[object]} element [description]
 * @return {[array]}         [description]
 */
module.exports.sortQuery = sortQuery;

function sortQuery(element) {
  let indexedElements = [];
  for (let key in element) {
    indexedElements.push(key);
  }
  const sortedElements = indexedElements.sort();
  return sortedElements;
}

module.exports.createSchema = sortedElements => {

  const varChar = ' varchar(40), ';
  const tableCols = sortedElements.join(varChar);
  let dummyCols = '';

  for (let i = 0; i < 20; i++) {
    dummyCols = dummyCols + `Equation${i}${varChar}`;
  }

  dummyCols = dummyCols.slice(0, dummyCols.length - 2);

  db.query(`CREATE TABLE IF NOT EXISTS productionschema.realdata (id SERIAL PRIMARY KEY, ${tableCols} varchar(40), ${dummyCols});`)
    .on('end', function() {
      console.log("created")
    })
    .catch(console.error)
}

/**
 * [allows entry of user defined columns]
 * @param  {array} importedCols [0: schema, 1: table, ...: cols]
 * @param  {obj} res          [for res.send]
 * one endpoint using this func from server.js: /createGenericTable/
 */
module.exports.genericTableCreator = (importedCols, res) => {
  console.log(importedCols);
  const frontQueryStr = `CREATE TABLE IF NOT EXISTS ${importedCols[0]}.${importedCols[1]} (id SERIAL PRIMARY KEY,`
  let endQueryStr = ``;
  for (let i = 2; i < importedCols.length; i++) {
    const col = importedCols[i];
    console.log('optionalSize: ', col.optionalSize);
    let size = '';
    if (col.optionalSize) {
      size = `(${col.optionalSize})`;
    };

    //ternary operator simply doesn't work!
    // let size = (!col.optionalSize) ? 'r' : `(${col.optiionalSize})`;

    endQueryStr = `${endQueryStr} ${col.colTitle} ${col.colType}${size},`;
  }
  // const queryStr = `${frontQueryStr} `
  endQueryStr = endQueryStr.slice(0, endQueryStr.length - 1) + `)`;
  // console.log(frontQueryStr, endQueryStr);
  const fullQueryStr = frontQueryStr + endQueryStr;
  console.log((fullQueryStr));

  db.query(fullQueryStr)
    .on('end', function() {
      console.log("created")
    })
    .catch(console.error);

  res.status(200).send(`end query: ${fullQueryStr}`);
}

module.exports.insertRow = (data, elements) => {
  for (let key in elements) {
    if (data.indexOf(key) === -1) {
      delete elements[key];
    }
  }
  // console.log('testing insertRow');
  let sortedArr = sortQuery(elements);
  let colsPure = '';

  sortedArr.map(val => {
    colsPure = colsPure + val + ', ';
  })
  colsPure = colsPure.slice(0, colsPure.length - 2);

  let values = '';

  sortedArr.map(key => {
    let val = elements[key];
    values = `${values} '${val}',`;
  });

  values = values.slice(0, values.length - 1);

  db.query(`INSERT INTO productionschema.realdata (${colsPure}) values(${values})`)
    .on('end', function() {
      console.log("inserted into productionschema.stockdatatable")
    });
}

// module.exports.updateRow = (element) => {
//   db.query(`UPDATE productionschema.stockdatatable SET `)
// }
