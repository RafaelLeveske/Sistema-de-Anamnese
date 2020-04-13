const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const evolucao = await connection('evolucao')
        .join(
            'psicologo',
            'psicologo.id',
            '=',
            'evolucao.psicologo_id'
        )
        .select([
            'evolucao.*',
            'psicologo.crp',
            'psicologo.nome'
            ]);
    
        return response.json(evolucao);

    },
    
    async create(request, response) {

        const { 
                descricao
            
            } = request.body;
            
            const psicologo_id = request.headers.authorization;
            const paciente_id = request.headers.pacient;
            const anamnese_id = request.headers.anamnese;
            const consulta_id = request.headers.consult;

        const [id] = await connection('evolucao').insert({
            
                descricao,
                psicologo_id,
                paciente_id,
                anamnese_id,
                consulta_id
        });
        
        return response.json({id});
    
        },
};