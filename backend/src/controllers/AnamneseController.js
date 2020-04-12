const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const anamnese = await connection('anamnese').select('*');
    
        return response.json(anamnese);

    },
    
    async create(request, response) {

        const { 
                queixa_principal,
                caracteristicas_infancia,
                caracteristicas_adolescencia,
                caracteristicas_adulta,
                relacoes_sociais 
            
            } = request.body;
            
            const psicologo_id = request.headers.authorization;
            const paciente_id = request.headers.pacient;

        const [id] = await connection('anamnese').insert({
            
                queixa_principal,
                caracteristicas_infancia,
                caracteristicas_adolescencia,
                caracteristicas_adulta,
                relacoes_sociais,
                psicologo_id,
                paciente_id
        });
        
        return response.json({id});
    
        },

        async delete(request, response) {
            const { id } = request.params;
            const psicologo_id = request.headers.authorization;
            const paciente_id = request.headers.pacient;
    
            const anamnese = await connection('anamnese')
            .where('id', id)
            .select('psicologo_id', 'paciente_id')
            .first();

            if (anamnese.psicologo_id !== psicologo_id){
                return response.status(401).json({ error: 'Operation not permitted.' });
            }

            if (anamnese.paciente_id !== paciente_id){
                return response.status(401).json({ error: 'Operation not permitted.' });
            }
    
            await connection('anamnese').where('id', id).delete();
    
            return response.status(204).send();
        },

        async update(request, response) {
            const { id } = request.params;
            const psicologo_id = request.headers.authorization;
            const paciente_id = request.headers.pacient;

            const anamnese = await connection('anamnese')
            .where('id', id)
            .select('psicologo_id','paciente_id')
            .first();

            if (anamnese.psicologo_id !== psicologo_id){
                return response.status(401).json({ error: 'Operation not permitted.' });
            }

            if (anamnese.paciente_id !== paciente_id){
                return response.status(401).json({ error: 'Operation not permitted.' });
            }

            await connection('anamnese').where('id', id).update({

                queixa_principal: request.body.queixa_principal,
                caracteristicas_infancia: request.body.caracteristicas_infancia,
                caracteristicas_adolescencia: request.body.caracteristicas_adolescencia,
                caracteristicas_adulta: request.body.caracteristicas_adulta,
                relacoes_sociais: request.body.relacoes_sociais,
            });
           
            return response.json('Cadastro atualizado com sucesso!');
        
        }

};