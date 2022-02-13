process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const xlsx = require('xlsx')
const fs = require('fs')
const axios = require('axios')
const config = require('./config')

let nameFolderExcel = config.name_folder_excel

const getToken = async (username, password) => {
  let payload = {
      username,
      password
    }
    , token = ''
    , api_sign_in = config.api_sign_in
  try {
    await axios.post(api_sign_in, payload).then(async function (result) {
      token = result.data
    }).catch(err => {
      throw err
    })
  } catch (error) {
    console.log("**Err - Sign in:", error)
  }
  return token
}

const callApiAndLogParams = async (params, token, tax_code, inc_inv) => {
  let api_data_tvan = config.api_data_tvan
    , dir_folder_logs = config.name_folder_logs
    , dir_folder_logs_tax = dir_folder_logs + tax_code
    , file_log_call_api
    , data_log = JSON.stringify(params)
  const makeNameFileLog = (type) => {
    let name_file = `${dir_folder_logs_tax}/${type}_${inc_inv}.txt`
    return name_file
  }
  try {
    // await axios.post(api_data_tvan, params, { headers: { Authorization: "Bearer " + token } }) // Comment api that is locked - avoid mistake
    data_log = `Success call api:\n${data_log}`
    file_log_call_api = makeNameFileLog("succ")
    fs.writeFileSync(file_log_call_api, data_log)
    console.log("Create file success", file_log_call_api)
  } catch (err) {
    console.error("**Err call api data tvan", err)
    data_log = `Error call api:\n${data_log}`
    file_log_call_api = makeNameFileLog("err")
    fs.writeFileSync(file_log_call_api, data_log)
    console.log("Create file fail", file_log_call_api)
  }
}

const makeDataInv = async (arrDataExcel, token, tax_code) => {
  const type_xml = config.type_xml
  const param_inv = {
    taxschema: tax_code,
    id: "",
    type_xml,
    xml: ""
  }
  let dir_folder_logs = config.name_folder_logs
    , dir_folder_logs_tax = dir_folder_logs + tax_code
  if (!fs.existsSync(dir_folder_logs_tax)){
    fs.mkdirSync(dir_folder_logs_tax)
  }
  for(let i = 0; i < arrDataExcel.length; i++) {
    let row_data_inv_excel = arrDataExcel[i]
      , inc_inv = row_data_inv_excel["ID"]
      , xml_inv = row_data_inv_excel["XML"]
      , inv_id = ''
      , info_inv_search
      , data_inv
      , api_search = config.api_search
      , param_auth = {
        headers: {
          Authorization: "Bearer " + token
        }
      }
      , params_query = {
        params: {
          stax: tax_code,
          form: `${row_data_inv_excel["Mẫu số"]}`,
          serial: row_data_inv_excel["Ký hiệu"],
          seq: row_data_inv_excel["Số HĐ"]
        },
        ...param_auth
      }
    if (xml_inv) {
      let remake_xml = xml_inv.replace(/<\?xml\/?[^>]+(>|$)/, "")
      param_inv["xml"] = remake_xml
    } else { continue }
    try {
      info_inv_search = await axios.get(api_search, params_query)
      data_inv = info_inv_search.data[0].doc || {}
      inv_id = data_inv.id
      // if (inv_id && !config.list_arr_id_inv_scanned.includes(inv_id)) { // Temp
      if (inv_id) {
        param_inv["id"] = inv_id
      } else {
        continue
      }
    } catch (err) {
      console.error("**Err search json inv", err)
    }
    const params = {
      inv: param_inv,
    }
    await callApiAndLogParams(params, token, tax_code, inc_inv)
  }
}

const getInfoExcel = (nameFileExcel) => {
  let arr_data_inv
  try {
    const wb = xlsx.readFile(nameFileExcel)
      , sheetName = wb.SheetNames[0]
      , ws = wb.Sheets[sheetName]
      , opt = { blankrows: false }
    arr_data_inv = xlsx.utils.sheet_to_json(ws, opt)
  } catch (err) {
    console.log("**Err read file xlsx", err)
  }
  return arr_data_inv
}

const start = async () => {
  let token = ''
    , i = 0
    , listTaxCode = config.list_tax_code
    , listAcc = config.info_login
  fs.readdirSync(nameFolderExcel).forEach(async file_name => {
    console.log(file_name)
    let info_acc = listAcc[i]
      , tax_code = listTaxCode[i]
    token = await getToken(info_acc.username, info_acc.password)
    if (token) {
      let nameFileExcel = `${nameFolderExcel}${file_name}`
        , arrDataExcel
      arrDataExcel = getInfoExcel(nameFileExcel)
      await makeDataInv(arrDataExcel, token, tax_code)
    }
    i++
  })
}

start()