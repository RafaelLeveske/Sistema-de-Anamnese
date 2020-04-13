const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const psicologo_id = request.headers.authorization;

        const paciente = await connection('paciente')
        .where('psicologo_id', psicologo_id)
        .select('*');

        return response.json(paciente);
    }
}