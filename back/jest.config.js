const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Configuração crucial para encontrar os testes
  roots: [
    path.resolve(__dirname, '..'), // Aponta para a raiz do projeto
  ],
  
  // Padrão para encontrar arquivos de teste
  testMatch: [
    '**/tests/unit/**/*.test.ts'
  ],
  
  // Configurações de cobertura
  collectCoverage: true,
  coverageDirectory: path.resolve(__dirname, 'coverage'),
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/tests/"
  ],
  
  // Mapeamento de caminhos (se usar aliases no TypeScript)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};