const connection = require('../database/connection');

module.exports ={
    async create(request,response){
        const { id } = request.body;

        const psicologo = await connection ('psicologo')
            .where('id',id)
            .select('nome')
            .first();

            if (!psicologo) {
                return response.status(400).json({ error: 'No Psicologo found with this ID'});
            }

            return response.json(psicologo);
    }
}