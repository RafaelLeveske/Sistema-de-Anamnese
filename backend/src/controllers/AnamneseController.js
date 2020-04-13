const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const anamnese = await connection('anamnese')
        .join(
            'psicologo',
            'psicologo.id',
            '=',
            'anamnese.psicologo_id'
        )
        .select([
            'anamnese.*',
            'psicologo.crp',
            'psicologo.nome'
            ]);
    
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
    
        }
    
};