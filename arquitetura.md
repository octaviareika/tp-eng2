# Horas-Extracurriculares - Visão Geral da Arquitetura (Fase Inicial)

Este documento descreve a visão inicial da arquitetura do nosso projeto, ele deve evoluir conforme o projeto avança e mais detalhes se tornam claros.

## Introdução e objetivos

- **Nome do Projeto**: Horas Extracurriculares
- **Objetivos arquiteturais**: Alcançar alto desempenho, segurança, escalabilidade e privacidade dos dados.

## Partes Interessadas (Stakeholders)

- Equipe de Desenvolvimento (Backend, Frontend)
- UFOP (Universidade Federal de Ouro Preto)

## Principais Decisões Arquiteturais (Iniciais)

- **Linguagem/Framework Backend:** Node.js/Express
- **Banco de dados:** PostgreSQL

- **Linguagem/Framework FrontEnd:** React.js/CSS/Typescript

- **Controle de Versão:** GitHub

## Diagrama Geral do Sistema

![Diagrama](/Images/diagrama-arquitetura.jpeg)

## Componentes principais

- **Módulo de Autenticação:**

  - Componente de Cadastro:
    - Validação de RA (Registro Acadêmico)
    - Integração com e-mail institucional (@ufop.br)
    - Criação de conta segura (senha criptografada)
  - Componente de Login
    - Autenticação JWT
    - Redirecionamento por perfil (aluno/funcionário)
  - Componente de recuperação de senha
    - Geração de token temporário
    - Envio de e-mail institucional
    - Redefinição segura da senha

- **Módulo de atividades extracurriculares (Aluno)**

  - Componente de Registro de Atividades
    - Upload de certificados (PDF/Imagem)
    - Formulário de cadastro (horas, descrição, tipo de atividade)
    - Validação de dados
  - Componente de Gerenciamento de Atividades
    - Listagem de atividades por status (pendente/aprovado/reprovado)
    - Edição ou exclusão de atividades pendentes
    - Visualização de feedbacks (comentários)
  - Componente de buscas e filtros
    - Pesquisa por nome, tipo ou período
    - Ordenação por data ou horas
  - Componente de Histórico e Relatórios:
    - Progresso das horas (total/completas/restantes)
    - Geração de PDF do histórico
    - Gráficos de acompanhamento (opcional)
  - Componente de Notificações:
    - Envio de e-mail em mudanças de status
    - Alertas no painel do aluno

- **Módulo de Aprovação (Funcionário/Coordenação)**

  - Componente de revisão de atividades
    - Listagem de atividades pendentes (filtros por curso/aluno)
    - Aprovação/Reprovação com justificativas
    - Atribuição de horas válidas
  - Componente de visualização de certificados
    - Download de anexos
    - Visualizador integrado (PDF/Imagem)
  - Componente de feedback
    - Campo para comentários
    - Histórico de interações (log de alterações)

- **Módulo de Integração Institucional**
  - Validação de Dados
    - Confirmação de matrícula ativa
    - Verificação de e-mail institucional (@ufop.br)
  - Sincronização com sistemas existentes
    - Envio de horas aprovadas para o sistema acadêmico
    - Importação de dados básicos do aluno (nome, curso)

## Modelo de Dados (Conceitual de Alto Nível)

- **Entidade 1: Usuário**
- **Entidade 2: Aluno**
- **Entidade 3: Funcionário**
- **Entidade 4: Atividade**
- **Entidade 5: Solicitação**
- **Entidade 6: CategoriaAtividade**
- **Entidade 7: Configuração**
- **Entidade 8: Notificação**

- **Relacionamentos de Alto Nível:** Um Aluno pode fazer muitas Solicitações, Um Aluno pode submeter muitas Atividades, Um Funcionário pode interagir com muitas Solicitações, Um Aluno pode ter muitas Notificações, Um Funcionário pode ter muitas notificações, Uma Categoria pode ter muitas Atividades.

## Suposições e Restrições

- **Suposições:** Membros da equipe são familiarizados com a tecnologia utilizada; Membros serão capazes de realizar encontros frequentes para discutir sobre a aplicação.
- **Restrições:** Prazo apertado para o MVP.
