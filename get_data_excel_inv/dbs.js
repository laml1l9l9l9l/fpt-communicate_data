"use strict"
const mysql = require("mysql2/promise")
const config = require("./config")
const pool = mysql.createPool(config.poolConfig)
pool.on("enqueue", () => { console.log("Waiting for available connection slot") })
module.exports = pool