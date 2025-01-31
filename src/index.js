const practitionerService = require('./services/practitioner');
const patientService = require('./services/patient');
const encounterService = require('./services/encounter');
const mediaService = require('./services/media');

// Exporta todos os serviços para uso externo
module.exports = {
  practitionerService,
  patientService,
  encounterService,
  mediaService
};

// Exemplo de uso
async function exemploDeFuncionamento() {
  try {
    // Criar um novo paciente
    const paciente = await patientService.create({
      name: [{ 
        family: 'Santos', 
        given: ['Maria'] 
      }],
      gender: 'female',
      birthDate: '1990-01-01'
    });
    console.log('Paciente criado:', paciente);

    // Criar um novo médico
    const medico = await practitionerService.create({
      name: [{ 
        family: 'Silva', 
        given: ['João'] 
      }],
      gender: 'male',
      birthDate: '1980-03-15'
    });
    console.log('Médico criado:', medico);

    // Criar uma consulta
    const consulta = await encounterService.create({
      practitionerId: medico.id,
      patientId: paciente.id,
      date: new Date()
    });
    console.log('Consulta criada:', consulta);

  } catch (error) {
    console.error('Erro durante a execução:', error);
  }
}

// Descomente a linha abaixo para executar o exemplo
// exemploDeFuncionamento(); 