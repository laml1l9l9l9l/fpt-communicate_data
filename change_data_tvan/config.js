const api_einvoice = "https://api.einvoice.fpt.com.vn/"
  , api_tvan_service = "https://einvoice-tvan-api-einvoice.paas.einvoice.fpt.com.vn/"
  , root_folder = "./"

const config = {
  root_folder: root_folder,
  name_folder_excel: `${root_folder}excels/`,
  name_folder_logs: `${root_folder}logs/`,
  api: api_einvoice,
  api_tvan: api_tvan_service,
  api_search: `${api_einvoice}search-invoice`,
  api_sign_in: `${api_einvoice}c_signin`,
  api_data_tvan: `${api_tvan_service}dataTVan`,
  type_xml: "hoa_don_co_ma",
  // type_xml: "hoa_don_khong_ma",
  info_login: [
    {
      username: "0106134571.admin",
      password: "Admin@123"
    },
    // {
    //   username: "0107286489.admin", // Temp role api - closed
    //   password: "dodau2016@"
    // },
    // {
    //   username: "0108651208.admin", // Temp role api - closed
    //   password: "Admin@123"
    // }
  ],
  list_tax_code: [
    "0106134571",
    // "0107286489", // Temp role api - closed
    // "0108651208" // Temp role api - closed
  ],
  list_arr_id_inv_scanned: []
}

module.exports = config
