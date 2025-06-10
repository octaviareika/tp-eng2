# Requisitos
## Histórias de Usuário
* H01: Como usuário, quero me cadastrar com RA e senha para acessar meu painel.
* H02: Como usuário, quero gerenciar o login para acessar meus dados.
* H03: Como usuário, quero recuperar minha senha via e-mail institucional.
* H05: Como aluno, quero adicionar um certificado à atividade extracurricular. 
* H06: Como aluno, quero registrar uma nova atividade extracurricular.
* H07: Como aluno, quero ver qual o status da atividade.
* H08: Como aluno, quero ver quantas horas ainda faltam para completar as horas totais.
* H09: Como aluno, quero buscar uma atividade extracurricular específica.
* H10: Como aluno, quero imprimir meu histórico de atividades extracurriculares.
* H11: Como aluno, quero editar ou excluir o cadastro de uma atividade pendente.
* H12: Como aluno, quero visualizar o feedback de uma atividade.
* H13: Como aluno, quero receber um email quando o status de uma atividade mudar.
* H14: Como funcionário, quero ver as atividades pendentes do aluno.
* H15: Como funcionário, quero baixar e abrir o certificado da atividade.
* H16: Como funcionário, quero alterar o status da atividade como aprovado ou reprovado.
* H17: Como funcionário, quero adicionar um comentário à uma atividade.

## Casos de Uso
* Geração de histórico do usuário
  * Ator: Aluno
  * Fluxo principal (H10a):
    * Aluno acessa o sistema.
    * Aluno seleciona a seção histórico completo.
    * Aluno escolhe o formato do documento disponível.
    * Aluno seleciona a opção de gerar histórico.
  * Fluxo alternativo (H10b - Histórico vazio):
    * Sistema detecta 0 atividades
    * Exibe mensagem: "Nenhuma atividade registrada"
    * Bloqueia botão de geração
 
* Alteração do status da atividade
  * Ator: Funcionário
  * Fluxo principal (H16a - Aprovação):
    * Funcionário acessa o sistema.
    * Funcionário verifica a lista de atividades pendentes.
    * Funcionário seleciona uma atividade para ser analisada.
    * Funcionário baixa e verifica comprovante/certificado (H15).
    * Funcionário aprova uma atividade de acordo com sua análise.
    * Sistema registra alteração e notifica aluno (H13)
  * Fluxo alternativo (H16b - Reprovação):
    * Funcionário seleciona "Reprovar"
    * Sistema exige campo de comentário (H17)
    * Funcionário insere feedback detalhado
    * Funcionário seleciona "Salvar alterações"
    * Sistema registra alteração e notifica aluno (H13)
    
