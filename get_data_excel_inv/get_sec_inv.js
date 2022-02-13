const xlsx = require('xlsx')
const fs = require('fs')
const csvwriter = require('csv-writer')
const config = require('./config')
const dbs = require('./dbs')
const nameExcel = 'Tong-hop-KH-einv-2021.xlsx'
const newNameExcel = 'Tong-hop-KH-einv-2021-ma_tra_cuu.csv'

const getSecInv = async (where_select, binds_query, schema) => { 
  let sql
    , sec
    , bind
    , result
    , rowResult
  sql = `select sec from ${schema}.s_inv where ${where_select}`
  bind = binds_query
  result = await dbs.query(sql, bind)
  if (result[0] && result[0][0]) {
    rowResult = result[0][0]
    if (rowResult.sec) { sec = rowResult.sec }
  }
  return sec
}

const readExcelFile = (name_file_excel) => {
  let arr_data_inv
  try {
    const wb = xlsx.readFile(name_file_excel, {cellDates: true})
      , sheetName = wb.SheetNames[0]
      , ws = wb.Sheets[sheetName]
      , opt = { blankrows: false }
    arr_data_inv = xlsx.utils.sheet_to_json(ws, opt)
  } catch (err) {
    console.log("**Err read file xlsx", err)
  }
  return arr_data_inv
}

const remakeSeq = (seq) => {
  let new_str_seq = ''
  try{
    seq = seq.toString()
    new_str_seq = seq.padStart(7, '0')
  } catch (e) {
    console.log("** Seq null")
  }
  return new_str_seq
}

const convertDataExcel = async (arr_data_excel) => {
  let new_arr_data = []
  for (let i = 0; i < arr_data_excel.length; i ++) {
    let row_info = arr_data_excel[i]
      , row_new_info = {
        id: '',
        name: '',
        tax_code: '',
        agent: '',
        form: '',
        serial: '',
        seq: '',
        export_date: '',
        sec: ''
      }
    if (row_info.__EMPTY_1 !== 'STT' && !row_info.__EMPTY_9) {
      // console.log(row_info)
      let sec
        , form = row_info.__EMPTY_5
        , serial = row_info.__EMPTY_6
        , seq = remakeSeq(row_info.__EMPTY_7)
        , where_select = 'form = ? and serial = ? and seq = ?'
        , binds_query = [
          form,
          serial,
          seq
        ]
        , schema = 'i0104128565'
      if (form && serial && seq) {
        sec = await getSecInv(where_select, binds_query, schema)
        if (sec) { row_info['__EMPTY_9'] = sec }
      }
    }
    if (row_info.__EMPTY_1) {
      row_new_info['id'] = row_info.__EMPTY_1
    }
    if (row_info.__EMPTY_2) {
      row_new_info['name'] = row_info.__EMPTY_2
    }
    if (row_info.__EMPTY_3) {
      row_new_info['tax_code'] = row_info.__EMPTY_3
    }
    if (row_info.__EMPTY_4) {
      row_new_info['agent'] = row_info.__EMPTY_4
    }
    if (row_info.__EMPTY_5) {
      row_new_info['form'] = row_info.__EMPTY_5
    }
    if (row_info.__EMPTY_6) {
      row_new_info['serial'] = row_info.__EMPTY_6
    }
    if (row_info.__EMPTY_7) {
      row_new_info['seq'] = row_info.__EMPTY_7
    }
    if (row_info.__EMPTY_8) {
      row_new_info['export_date'] = row_info.__EMPTY_8
    }
    if (row_info.__EMPTY_9) {
      row_new_info['sec'] = row_info.__EMPTY_9
    }
    new_arr_data.push(row_new_info)
  }
  return new_arr_data
}

const genNewExcelFile = (path_new_file, new_data_excel) => {
  try {
    const createCsvWriter = csvwriter.createObjectCsvWriter
    const csvWriter = createCsvWriter({
      // Output csv file name is geek_data
      path: path_new_file,
      header: [
        {id: 'id', title: 'STT'},
        {id: 'name', title: 'Tên khách hàng'},
        {id: 'tax_code', title: 'Mã số thuế'},
        {id: 'agent', title: 'Đại lý'},
        {id: 'form', title: 'Mẫu số'},
        {id: 'serial', title: 'Ký hiệu'},
        {id: 'seq', title: 'Số hóa đơn'},
        {id: 'export_date', title: 'Ngày xuất'},
        {id: 'sec', title: 'SEC'},
      ]
    })
    const results = new_data_excel
    csvWriter
      .writeRecords(results)
      .then(()=> console.log('Data uploaded into csv successfully'));
  } catch (e) {
    console.log(e)
  }
}

const start = async () => {
  let pathExcelFile = config.name_folder_excel + nameExcel
    , pathNewExcelFile = config.name_folder_result_excel + newNameExcel
    , arrDataExcel
    , newDataExcel
  arrDataExcel = readExcelFile(pathExcelFile)
  newDataExcel = await convertDataExcel(arrDataExcel)
  console.log(newDataExcel)
  genNewExcelFile(pathNewExcelFile, newDataExcel)
  console.log("Done gen excel file")
  return true
}

start()
