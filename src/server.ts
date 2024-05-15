import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.addHook('onSend', (request, reply, payload, done) => {
  reply.header('Access-Control-Allow-Origin', '*')
  done(null, payload)
})

app.get('/dados', async (request, reply) => {
  try {
    const rows = await knex('tb_teste').select(
      'id_projeto',
      'nome',
      'municipio',
      'uf',
      'valor_captado',
      'valor_aprovado',
    )

    const result = {
      card: rows.map((row) => ({
        id_projeto: row.id_projeto,
        nome: row.nome,
        municipio: row.municipio,
        uf: row.uf,
        valor_captado: row.valor_captado,
        valor_aprovado: row.valor_aprovado,
      })),
    }

    reply.type('application/json').send(JSON.stringify(result))
  } catch (error) {
    app.log.error(error)
    reply.status(500).send({ error: 'Erro ao obter os dados' })
  }
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Runnig!')
})
