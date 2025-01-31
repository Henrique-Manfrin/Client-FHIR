const { practitionerService, patientService, encounterService, mediaService } = require('../index');
const path = require('path');

async function executarTestesManual() {
  console.log('Iniciando testes manuais...\n');
  
  try {
    // 1. Criar um paciente
    console.log('1. Testando criação de paciente...');
    const paciente = await patientService.create({
      name: [{ 
        family: 'Teste', 
        given: ['Paciente'] 
      }],
      gender: 'female',
      birthDate: '1990-01-01'
    });
    console.log('✓ Paciente criado com sucesso:', paciente.id);

    // 2. Criar um médico
    console.log('\n2. Testando criação de médico...');
    const medico = await practitionerService.create({
      name: [{ 
        family: 'Doutor', 
        given: ['Teste'] 
      }],
      gender: 'male',
      birthDate: '1980-03-15'
    });
    console.log('✓ Médico criado com sucesso:', medico.id);

    // 3. Criar uma consulta com observações
    console.log('\n3. Testando criação de consulta...');
    const consulta = await encounterService.create({
      practitionerId: medico.id,
      patientId: paciente.id,
      date: new Date(),
      observacoes: 'Paciente apresentou sintomas de gripe. Prescrito repouso e medicamentos.'
    });
    console.log('✓ Consulta criada com sucesso:', consulta.id);

    // Adicionar teste para Media
    console.log('\n7. Testando upload de áudio da consulta...');
    const audioPath = path.join(__dirname, '..', '..', 'Teste de Áudio.wav');
    const media = await mediaService.create({
      encounterId: consulta.id,
      audioPath: audioPath,
      title: 'Gravação da Consulta',
      description: 'Áudio da consulta médica realizada'
    });
    console.log('✓ Áudio da consulta salvo com sucesso:', media.id);

    // 4. Buscar paciente criado
    console.log('\n4. Testando busca de paciente...');
    const pacienteBuscado = await patientService.getById(paciente.id);
    console.log('✓ Paciente encontrado com sucesso');

    // 5. Buscar médico criado
    console.log('\n5. Testando busca de médico...');
    const medicoBuscado = await practitionerService.getById(medico.id);
    console.log('✓ Médico encontrado com sucesso');

    // 6. Buscar consulta criada
    console.log('\n6. Testando busca de consulta...');
    const consultaBuscada = await encounterService.getById(consulta.id);
    console.log('✓ Consulta encontrada com sucesso');

    console.log('\n✅ Todos os testes foram executados com sucesso!');

  } catch (error) {
    console.error('\n❌ Erro durante os testes:', error);
    process.exit(1);
  }
}

executarTestesManual(); 