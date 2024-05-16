import { knex as setupKnes } from 'knex'

export const knex = setupKnes({
  client: 'mysql2',
  connection: {
    host: '127.0.0.2',
    port: 3306,
    user: 'root',
    password: 'Root1234',
    database: 'simbidb',
  },
})
