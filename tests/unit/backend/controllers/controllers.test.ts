// // tests/unit/backend/controllers/controllers.test.ts
// import { Request, Response } from 'express';
// import { AlunoController } from '../../../../back/src/app/controllers/AlunoController';  // Caminho relativo
// import * as AlunoRepository from '../../../../back/src/app/repositories/AlunoRepository';

// // Mock completo do repositório
// jest.mock('@/app/repositories/AlunoRepository', () => ({
//   addAluno: jest.fn()
// }));

// describe('AlunoController', () => {
//   let alunoController: AlunoController;
//   let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
  
//   // Objeto simulado para aluno criado
//   const mockAluno = {
//     id: 1,
//     nome: 'João Silva',
//     email: 'joao@ufop.br',
//     matricula: '20240001',
//     curso: 'Engenharia de Computação'
//   };

//   beforeEach(() => {
//     alunoController = new AlunoController();
//     mockRequest = {};
//     mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };
    
//     // Resetar mocks antes de cada teste
//     jest.clearAllMocks();
//   });

//   describe('create()', () => {
//     it('deve criar aluno com sucesso quando todos campos são válidos', async () => {
//       // Configurar
//       mockRequest.body = { 
//         nome: 'João Silva',
//         email: 'joao@ufop.br',
//         matricula: '20240001',
//         curso: 'Engenharia de Computação'
//       };
      
//       (AlunoRepository.addAluno as jest.Mock).mockResolvedValue(mockAluno);

//       // Executar
//       await alunoController.create(mockRequest as Request, mockResponse as Response);

//       // Verificar
//       expect(AlunoRepository.addAluno).toHaveBeenCalledWith(mockRequest.body);
//       expect(mockResponse.status).toHaveBeenCalledWith(201);
//       expect(mockResponse.json).toHaveBeenCalledWith(mockAluno);
//     });

//     it('deve retornar erro 400 quando faltar campo obrigatório', async () => {
//       const testCases = [
//         { campo: 'nome', body: { email: 'a@b.com', matricula: '123', curso: 'Eng' } },
//         { campo: 'email', body: { nome: 'Ana', matricula: '123', curso: 'Eng' } },
//         { campo: 'matricula', body: { nome: 'Ana', email: 'a@b.com', curso: 'Eng' } },
//         { campo: 'curso', body: { nome: 'Ana', email: 'a@b.com', matricula: '123' } }
//       ];

//       for (const testCase of testCases) {
//         // Configurar
//         mockRequest.body = testCase.body;
        
//         // Executar
//         await alunoController.create(mockRequest as Request, mockResponse as Response);
        
//         // Verificar
//         expect(mockResponse.status).toHaveBeenCalledWith(400);
//         expect(mockResponse.json).toHaveBeenCalledWith({
//           message: "Todos os campos são obrigatórios"
//         });
//         expect(AlunoRepository.addAluno).not.toHaveBeenCalled();
        
//         // Resetar mocks para próximo caso
//         jest.clearAllMocks();
//       }
//     });

//     it('deve retornar erro 500 quando o repositório falhar', async () => {
//       // Configurar
//       mockRequest.body = {
//         nome: 'Maria',
//         email: 'maria@ufop.br',
//         matricula: '20240002',
//         curso: 'Medicina'
//       };
      
//       const error = new Error('Database connection failed');
//       (AlunoRepository.addAluno as jest.Mock).mockRejectedValue(error);

//       // Executar
//       await alunoController.create(mockRequest as Request, mockResponse as Response);

//       // Verificar
//       expect(mockResponse.status).toHaveBeenCalledWith(500);
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: "Erro ao criar aluno.",
//         error: error.message
//       });
//     });

//     it('deve validar formato de email', async () => {
//       // Configurar
//       mockRequest.body = {
//         nome: 'Carlos',
//         email: 'email-invalido',
//         matricula: '20240003',
//         curso: 'Direito'
//       };

//       // Executar
//       await alunoController.create(mockRequest as Request, mockResponse as Response);

//       // Verificar
//       expect(mockResponse.status).toHaveBeenCalledWith(400);
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: "Email inválido"
//       });
//       expect(AlunoRepository.addAluno).not.toHaveBeenCalled();
//     });
//   });
// });