const crypto = require ('crypto');
const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const psicologo = await connection('psicologo').select('*');
    
        return response.json(psicologo);

    },

    async create(request, response) {
        const { nome, crp, cep, endereco, uf, estado_civil } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('psicologo').insert({
            id,
            nome,
            crp,
            cep,
            endereco,
            uf,
            estado_civil
        })
        
        return response.json({id});
    },

    async delete(request, response) {
        const { id } = request.params;

        const psicologo = await connection('psicologo')
        .where('id', id)
        .select('*')
        .first();

        await connection('psicologo').where('id', id).delete();

        return response.status(204).send();
    },

    async update(request, response) {
        const { id } = request.params;
        

        const psicologo = await connection('psicologo')
        .where('id', id)
        .select('*')
        .first();

        await connection('psicologo').where('id', id).update({
            nome: request.body.nome,
            crp: request.body.crp,
            cep: request.body.cep,
            endereco: request.body.endereco,
            uf: request.body.uf,
            estado_civil: request.body.estado_civil,
            
        });
       
        return response.json('Cadastro atualizado com sucesso!');
    
    }
};