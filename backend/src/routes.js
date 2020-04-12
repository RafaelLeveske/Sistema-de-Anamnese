const express = require('express');

const PsicologoController = require ('./controllers/PsicologoController');
const PacienteController = require ('./controllers/PacienteController');
const AnamneseController = require ('./controllers/AnamneseController');
const ConsultaController = require ('./controllers/ConsultaController');
const EvolucaoController = require ('./controllers/EvolucaoController');

const routes = express.Router();

routes.get('/psicologo', PsicologoController.index);
routes.post('/psicologo', PsicologoController.create);
routes.delete('/psicologo/:id', PsicologoController.delete);
routes.put('/psicologo/:id', PsicologoController.update);

routes.get('/paciente', PacienteController.index);
routes.post('/paciente', PacienteController.create);
routes.delete('/paciente/:id', PacienteController.delete);
routes.put('/paciente/:id', PacienteController.update);

routes.get('/anamnese', AnamneseController.index);
routes.post('/anamnese', AnamneseController.create);
routes.delete('/anamnese/:id', AnamneseController.delete);
routes.put('/anamnese/:id', AnamneseController.update);

routes.post('/consulta', (request, response) => {

    const data = request.body;

    console.log(data);
    
    return response.json();
});

routes.post('/evolucao', (request, response) => {

    const data = request.body;

    console.log(data);
    
    return response.json();
});

module.exports = routes;