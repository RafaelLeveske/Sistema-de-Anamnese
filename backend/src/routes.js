const express = require('express');

const PsicologoController = require ('./controllers/PsicologoController');
const PacienteController = require ('./controllers/PacienteController');
const AnamneseController = require ('./controllers/AnamneseController');
const ConsultaController = require ('./controllers/ConsultaController');
const EvolucaoController = require ('./controllers/EvolucaoController');
const ProfileController = require ('./controllers/ProfileController');
const SessionController = require ('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/psicologo', PsicologoController.index);
routes.post('/psicologo', PsicologoController.create);
routes.delete('/psicologo/:id', PsicologoController.delete);
routes.put('/psicologo/:id', PsicologoController.update);

routes.get('/profile', ProfileController.index);

routes.get('/paciente', PacienteController.index);
routes.post('/paciente', PacienteController.create);
routes.delete('/paciente/:id', PacienteController.delete);
routes.put('/paciente/:id', PacienteController.update);

routes.get('/anamnese', AnamneseController.index);
routes.post('/anamnese', AnamneseController.create);

routes.get('/consulta', ConsultaController.index);
routes.post('/consulta', ConsultaController.create);


routes.get('/evolucao', EvolucaoController.index);
routes.post('/evolucao', EvolucaoController.create);



module.exports = routes;