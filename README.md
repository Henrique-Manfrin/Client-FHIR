# Cliente FHIR para Integração com HAPI FHIR

## 📋 Descrição
Cliente FHIR desenvolvido em Node.js para interagir com servidores HAPI FHIR, permitindo o gerenciamento de recursos como Pacientes, Médicos, Consultas e Mídias (áudios de consultas).

## 🚀 Funcionalidades

- ✅ Gerenciamento de Pacientes (CRUD)
- ✅ Gerenciamento de Médicos (CRUD)
- ✅ Gerenciamento de Consultas (CRUD)
- ✅ Upload e gerenciamento de áudios de consultas
- ✅ Suporte a observações médicas nas consultas
- ✅ Integração completa com FHIR R4

## 📦 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM (Node Package Manager)
- Servidor HAPI FHIR em execução

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone [url-do-repositorio]
cd fhir-client
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env`:
```env
FHIR_BASE_URL=http://localhost:8080/fhir
API_VERSION=4.0.1
TIMEOUT=10000
```

## 💻 Como Usar

### Estrutura do Projeto

```
fhir-client/
├── src/
│   ├── config/
│   │   └── config.js
│   ├── services/
│   │   ├── fhirApi.js
│   │   ├── patient.js
│   │   ├── practitioner.js
│   │   ├── encounter.js
│   │   └── media.js
│   ├── utils/
│   │   └── errorHandler.js
│   ├── test/
│   │   └── manual-test.js
│   └── index.js
├── .env
└── package.json
```

### Exemplos de Uso

```javascript
const { 
  patientService, 
  practitionerService, 
  encounterService,
  mediaService 
} = require('./src');

// Criar um paciente
const paciente = await patientService.create({
  name: [{ 
    family: 'Santos', 
    given: ['Maria'] 
  }],
  gender: 'female',
  birthDate: '1990-01-01'
});

// Criar uma consulta
const consulta = await encounterService.create({
  practitionerId: 'id-do-medico',
  patientId: 'id-do-paciente',
  date: new Date(),
  observacoes: 'Observações da consulta'
});

// Adicionar áudio à consulta
const media = await mediaService.create({
  encounterId: consulta.id,
  audioPath: './caminho/do/audio.wav',
  title: 'Gravação da Consulta',
  description: 'Áudio da consulta médica'
});
```

## 🧪 Testes

### Executar Testes Manuais
```bash
npm run test:manual
```

### Executar Testes Automatizados
```bash
npm test
```

## 📚 Recursos FHIR Suportados

- **Patient**: Gerenciamento de informações de pacientes
- **Practitioner**: Gerenciamento de informações de profissionais de saúde
- **Encounter**: Registro de consultas e atendimentos
- **Media**: Gerenciamento de arquivos de mídia (áudios de consultas)

## 🔧 Configuração

O projeto utiliza variáveis de ambiente para configuração. Crie um arquivo `.env` na raiz do projeto:

```env
FHIR_BASE_URL=http://localhost:8080/fhir
API_VERSION=4.0.1
TIMEOUT=10000
```

## 🚨 Tratamento de Erros

O projeto inclui um sistema robusto de tratamento de erros através da classe `FHIRError`, que fornece informações detalhadas sobre falhas nas operações FHIR.

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🔍 Problemas Comuns

### Erro de Conexão com Servidor FHIR
**Problema**: Não consegue conectar ao servidor FHIR
**Solução**: Verifique se:
1. O servidor FHIR está rodando
2. A URL no .env está correta
3. As portas necessárias estão liberadas

### Exemplo de Resposta

```json
{
  "resourceType": "Patient",
  "id": "123",
  "name": [{
    "family": "Santos",
    "given": ["Maria"]
  }]
}
```
