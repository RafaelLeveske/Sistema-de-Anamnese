
exports.up = function(knex) {
    return knex.schema.createTable('anamnese', function (table){
        table.increments('id').primary();
        table.string('queixa_principal').notNullable();
        table.string('caracteristicas_infancia').notNullable();
        table.string('caracteristicas_adolescencia').notNullable();
        table.string('caracteristicas_adulta').notNullable();
        table.string('relacoes_sociais').notNullable();

        table.string('psicologo_id').notNullable();

        table.string('paciente_id').notNullable();

        table.foreign('psicologo_id').references('id').inTable('psicologo');
        table.foreign('paciente_id').references('id').inTable('paciente');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('anamnese');
};
