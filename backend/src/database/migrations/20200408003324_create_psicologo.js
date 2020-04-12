
exports.up = function(knex) {
  return knex.schema.createTable('psicologo', function (table){
      table.string('id').primary();
      table.string('nome').notNullable();
      table.integer('crp').notNullable();
      table.integer('cep').notNullable();
      table.string('endereco').notNullable();
      table.string('uf',2).notNullable();
      table.string('estado_civil').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('psicologo');
};
