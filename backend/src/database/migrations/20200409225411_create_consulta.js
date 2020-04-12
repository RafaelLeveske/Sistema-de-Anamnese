
exports.up = function(knex) {
  return knex.schema.createTable('consulta', function (table){
    table.increments('id').primary();
    table.datetime('data_hora_consulta').notNullable();

    table.string('anamnese_id').notNullable();
    table.string('psicologo_id').notNullable();
    table.string('paciente_id').notNullable();
    
    table.foreign('anamnese_id').references('id').inTable('anamnese');
    table.foreign('psicologo_id').references('id').inTable('psicologo');
    table.foreign('paciente_id').references('id').inTable('paciente');   
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('consulta');
};
