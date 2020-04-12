const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const paciente = await connection('paciente').select('*');
    
        return response.json(paciente);

    },


    async create(request, response) {

        const { 
                nome,
                cpf, 
                nome_pai, 
                nome_mae, 
                data_nascimento, 
                cep, 
                endereco, 
                telefone, 
                uf, 
                estado_civil, 
            
            } = request.body;
            
            const psicologo_id = request.headers.authorization;

        const [id] = await connection('paciente').insert({
            
            nome,
            cpf,
            nome_pai,
            nome_mae,
            data_nascimento,
            cep,
            endereco,
            telefone,
            uf,
            estado_civil,
            psicologo_id
        });
        
        return response.json({id});
    
        },

        async delete(request, response) {
            const { id } = request.params;
            const psicologo_id = request.headers.authorization;
    
            const paciente = await connection('paciente')
            .where('id', id)
            .select('psicologo_id')
            .first();

            if (paciente.psicologo_id !== psicologo_id){
                return response.status(401).json({ error: 'Operation not permitted.' });
            }
    
            await connection('paciente').where('id', id).delete();
    
            return response.status(204).send();
        },

        async update(request, response) {
            const { id } = request.params;
            const psicologo_id = request.headers.authorization;

            const paciente = await connection('paciente')
            .where('id', id)
            .select('psicologo_id')
            .first();

            if (paciente.psicologo_id !== psicologo_id){
                return response.status(401).json({ error: 'Operation not permitted.' });
            }

            await connection('paciente').where('id', id).update({
                nome: request.body.nome,
                cpf: request.body.cpf,
                nome_pai: request.body.nome_pai,
                nome_mae: request.body.nome_mae,
                data_nascimento: request.body.data_nascimento,
                cep: request.body.cep,
                endereco: request.body.endereco,
                telefone: request.body.telefone,
                uf: request.body.uf,
                estado_civil: request.body.estado_civil,
                
            });
           
            return response.json('Cadastro atualizado com sucesso!');
        
        }

        
};