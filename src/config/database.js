const sqlite3 = require("sqlite3")
const { open } = require("sqlite")
const path = require("path")
const fs = require("fs")

let db

const initializeDatabase = async () => {

  db = await open({
    filename: path.join(__dirname, "../../database/travel.db"),
    driver: sqlite3.Database
  })

  console.log("Database connected")

  // Run schema.sql
  const schemaPath = path.join(__dirname, "../../database/schema.sql")
  const schema = fs.readFileSync(schemaPath, "utf8")

  await db.exec(schema)

  console.log("Tables created successfully")

  // Run seeds.sql
  const seedsPath = path.join(__dirname, "../../database/seeds.sql")
  const seeds = fs.readFileSync(seedsPath, "utf8")

  await db.exec(seeds)

  console.log("Seed data inserted successfully")

}

const getDB = () => db

module.exports = {
  initializeDatabase,
  getDB
}