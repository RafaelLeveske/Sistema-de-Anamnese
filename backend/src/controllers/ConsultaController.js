const connection = require('../database/connection');

module.exports = {
    
    async index (request, response) {
        const consulta = await connection('consulta')

        .join(
            'psicologo',
            'psicologo.id',
            '=',
            'consulta.psicologo_id'
        )
        .select([
            'consulta.*',
            'psicologo.crp',
            'psicologo.nome'
            ]);
    
        return response.json(consulta);

    },


    async create(request, response) {

        const { 
                data_hora_consulta
            
            } = request.body;
            
            const psicologo_id = request.headers.authorization;
            const paciente_id = request.headers.pacient;
            const anamnese_id = request.headers.anamnese;

        const [id] = await connection('consulta').insert({
            
                data_hora_consulta,
                psicologo_id,
                paciente_id,
                anamnese_id
        });
        
        return response.json({id});
    
        },
   
};