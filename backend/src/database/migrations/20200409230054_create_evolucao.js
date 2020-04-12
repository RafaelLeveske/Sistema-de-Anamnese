
exports.up = function(knex) {
  return knex.schema.createTable('evolucao', function(table){
      table.increments('id').primary();
      table.string('descricao').notNullable();

      table.string('anamnese_id').notNullable();
      table.string('psicologo_id').notNullable();
      table.string('paciente_id').notNullable();
      table.string('consulta_id').notNullable();

      table.foreign('anamnese_id').references('id').inTable('anamnese');
      table.foreign('psicologo_id').references('id').inTable('psicologo');
      table.foreign('paciente_id').references('id').inTable('paciente');
      table.foreign('consulta_id').references('id').inTable('consulta');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('evolucao');
};
