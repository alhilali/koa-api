
exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts', (table) => {
    table.uuid('id').primary()

    table.uuid('user_id')
    table.foreign('user_id').references('id').inTable('users')

    table.string('title').notNullable().defaultTo('')
    table.string('body').nullable().defaultTo('')

    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('posts')
}