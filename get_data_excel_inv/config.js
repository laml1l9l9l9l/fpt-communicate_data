const root_folder = "./get_data_excel_inv/"
const config = {
  poolConfig: {
    user: "appuser",
    password: "fpsadmin",
    host: "10.14.231.9",
    port: 6446,
    multipleStatements: true,
    connectionLimit: 1024
  },
  name_folder_excel: `${root_folder}original_excel/`,
  name_folder_result_excel: `${root_folder}new_excel_files/`,
}
module.exports = config
