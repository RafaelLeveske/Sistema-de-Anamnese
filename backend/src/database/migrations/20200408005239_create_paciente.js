
exports.up = function(knex) {
    return knex.schema.createTable('paciente', function (table){
        table.increments('id').primary();
        table.string('nome',60).notNullable();
        table.integer('cpf',15).notNullable();
        table.string('nome_pai',60).notNullable();
        table.string('nome_mae',60).notNullable();
        table.date('data_nascimento').notNullable();
        table.integer('cep',15).notNullable();
        table.string('endereco',30).notNullable();
        table.integer('telefone',13).notNullable();
        table.string('uf',2).notNullable();
        table.string('estado_civil',10).notNullable();

        table.string('psicologo_id').notNullable();

        table.foreign('psicologo_id').references('id').inTable('psicologo');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('paciente');
};
