# 📝 Sistema de Gerenciamento de Tarefas - Full Stack

Projeto final desenvolvido para demonstrar uma aplicação completa Full Stack utilizando a arquitetura MVC (Model-View-Controller) com Spring Boot no backend e React no frontend.

## 📋 Descrição

Sistema web para gerenciamento de tarefas que permite criar, visualizar, editar, concluir e deletar tarefas. Desenvolvido com:
- **Backend**: Spring Boot, JPA/Hibernate, API REST
- **Frontend**: React, React Bootstrap, Axios
- **Banco de Dados**: H2 (em memória)

## 🏗️ Arquitetura

O projeto segue uma arquitetura **Full Stack** separando Backend (API REST) e Frontend (SPA React):

### 📊 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                       FRONTEND (React)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐     │
│  │ ListaDeTarefas│  │ FormularioTarefa │  │ ItemTarefa  │     │
│  └──────┬──────┘  └──────┬───────┘  └────────┬───────┘     │
│         │                 │                    │              │
│         └─────────────────┴──────────┬─────────┘             │
│                                      │                        │
│                          ┌───────────▼────────┐              │
│                          │  tarefaService.js  │              │
│                          │     (Axios)        │              │
│                          └──────────┬─────────┘              │
└─────────────────────────────────────┼──────────────────────┘
                                      │
                                 HTTP REST API
                                      │
┌─────────────────────────────────────▼──────────────────────┐
│                    BACKEND (Spring Boot)                    │
│  ┌──────────────────────────────────────────────────┐      │
│  │              TarefaController (REST)              │      │
│  │         @RestController /api/tarefas              │      │
│  └───────────────────────┬──────────────────────────┘      │
│                          │                                  │
│  ┌───────────────────────▼──────────────────────────┐      │
│  │              TarefaService (Business Logic)       │      │
│  └───────────────────────┬──────────────────────────┘      │
│                          │                                  │
│  ┌───────────────────────▼──────────────────────────┐      │
│  │           TarefaRepository (Data Access)          │      │
│  └───────────────────────┬──────────────────────────┘      │
│                          │                                  │
│  ┌───────────────────────▼──────────────────────────┐      │
│  │              Tarefa (Entity/Model)                │      │
│  └───────────────────────┬──────────────────────────┘      │
└──────────────────────────┼─────────────────────────────────┘
                           │
                  ┌────────▼────────┐
                  │  H2 Database    │
                  │   (In-Memory)   │
                  └─────────────────┘
```

## 🔧 Backend - API REST

O backend segue a arquitetura MVC com API REST:

### Model (Modelo)
- **Tarefa**: Entidade JPA que representa uma tarefa com os seguintes campos:
  - `id` (Long): Chave primária auto-gerada
  - `titulo` (String): Título da tarefa
  - `descricao` (String): Descrição detalhada (opcional)
  - `dataCriacao` (Instant): Data/hora de criação
  - `concluida` (Boolean): Status da tarefa (padrão: false)

### Repository (Repositório)
- **TarefaRepository**: Interface que estende JpaRepository para operações de banco de dados
  - Métodos customizados para busca por status e título

### Service (Serviço)
- **TarefaService**: Camada de lógica de negócios
  - Listar todas as tarefas
  - Buscar tarefa por ID
  - Criar nova tarefa
  - Atualizar tarefa existente
  - Deletar tarefa
  - Alternar status de conclusão
  - Filtrar por status (concluídas/pendentes)
  - Buscar por título

### Controller (API REST)
- **TarefaController**: REST Controller que expõe endpoints da API
  - GET `/api/tarefas` - Lista todas as tarefas
  - GET `/api/tarefas?filtro={status}` - Lista tarefas filtradas
  - GET `/api/tarefas/{id}` - Busca tarefa por ID
  - POST `/api/tarefas` - Cria nova tarefa
  - PUT `/api/tarefas/{id}` - Atualiza tarefa
  - DELETE `/api/tarefas/{id}` - Deleta tarefa
  - PUT `/api/tarefas/{id}/concluir` - Alterna conclusão

### Configuração
- **CorsConfig**: Configuração CORS para permitir requisições do frontend React

## 🎨 Frontend - React SPA

### Componentes React

#### 1. ListaDeTarefas (Componente Principal)
- Gerencia o estado da aplicação com `useState`
- Realiza requisições à API com Axios
- Controla filtros, mensagens e carregamento
- Exibe estatísticas de tarefas

#### 2. FormularioTarefa
- Formulário para criar/editar tarefas
- Validação de campos
- Integração com React Bootstrap
- Modo dual: criação e edição

#### 3. ItemTarefa
- Exibe tarefa individual
- Botões de ação (concluir, editar, deletar)
- Formatação de data
- Visual diferenciado para status

### Serviços
- **tarefaService.js**: Centraliza todas as chamadas à API REST usando Axios

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 21**
- **Spring Boot 3.5.7**
  - Spring Web (API REST)
  - Spring Data JPA
  - Spring Boot DevTools
- **H2 Database** - Banco de dados em memória
- **Maven** - Gerenciamento de dependências

### Frontend
- **React 19.2.0** - Biblioteca JavaScript para UI
- **React Bootstrap** - Componentes Bootstrap para React
- **Bootstrap 5** - Framework CSS
- **Axios** - Cliente HTTP para requisições
- **React Hooks** - useState, useEffect para gerenciamento de estado

## 📁 Estrutura do Projeto

```
projetoFinalAulaFullMVC/
├── frontend/                         # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── ListaDeTarefas.js    # Componente principal
│   │   │   ├── FormularioTarefa.js  # Formulário de tarefas
│   │   │   └── ItemTarefa.js        # Item individual
│   │   ├── services/
│   │   │   └── tarefaService.js     # Serviço de API
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
│
└── tarefas/                          # Backend Spring Boot
    ├── src/
    │   ├── main/
    │   │   ├── java/com/example/demo/
    │   │   │   ├── config/
    │   │   │   │   └── CorsConfig.java
    │   │   │   ├── controller/
    │   │   │   │   └── TarefaController.java
    │   │   │   ├── model/
    │   │   │   │   └── Tarefa.java
    │   │   │   ├── repository/
    │   │   │   │   └── TarefaRepository.java
    │   │   │   ├── service/
    │   │   │   │   └── TarefaService.java
    │   │   │   └── TarefasApplication.java
    │   │   └── resources/
    │   │       └── application.properties
    │   └── test/
    └── pom.xml
```

## ⚙️ Como Executar

### Pré-requisitos
- **Java JDK 21** ou superior
- **Maven** (ou use o Maven Wrapper incluído)
- **Node.js** e **npm**

### 🔧 Executar o Backend (Spring Boot)

1. **Navegue até o diretório do backend**
```bash
cd /home/victor/Documentos/projetoFinalAulaFullMVC/tarefas
```

2. **Compile o projeto**
```bash
./mvnw clean install
```

3. **Execute a aplicação**
```bash
./mvnw spring-boot:run
```

O backend estará rodando em: **http://localhost:8080**

### 🎨 Executar o Frontend (React)

1. **Abra um novo terminal e navegue até o diretório do frontend**
```bash
cd /home/victor/Documentos/projetoFinalAulaFullMVC/frontend
```

2. **Instale as dependências (se ainda não instalou)**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm start
```

O frontend abrirá automaticamente em: **http://localhost:3000**

### 🚀 Executar Aplicação Completa

Para rodar a aplicação completa:

1. **Terminal 1**: Inicie o backend (porta 8080)
2. **Terminal 2**: Inicie o frontend (porta 3000)
3. **Navegador**: Acesse http://localhost:3000

A aplicação React se comunicará automaticamente com a API REST do backend.

## 🎯 Funcionalidades

### Interface do Usuário (React)
✅ **Criar Tarefas** - Formulário com validação para criar novas tarefas  
✅ **Listar Tarefas** - Visualização em cards estilizados  
✅ **Editar Tarefas** - Edição inline com pré-carregamento de dados  
✅ **Deletar Tarefas** - Confirmação antes de deletar  
✅ **Concluir/Reabrir Tarefas** - Toggle rápido do status  
✅ **Filtrar Tarefas** - Filtre por todas/pendentes/concluídas  
✅ **Estatísticas** - Painel com total, pendentes e concluídas  
✅ **Feedback Visual** - Mensagens de sucesso/erro  
✅ **Design Responsivo** - Interface adaptável a todos os dispositivos  
✅ **Loading States** - Indicadores de carregamento  

### Backend (API REST)
✅ **API RESTful** - Endpoints seguindo padrões REST  
✅ **Persistência** - Banco de dados H2 em memória  
✅ **CORS** - Configurado para comunicação cross-origin  
✅ **Validação** - Campos obrigatórios e regras de negócio  
✅ **Console H2** - Acesso ao banco em http://localhost:8080/h2-console  

## 🗄️ Banco de Dados

O projeto utiliza o H2, um banco de dados em memória. Para acessar o console:

```
URL: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:tarefasdb
Username: sa
Password: (deixe em branco)
```

## 📸 Recursos da Interface React

- **Design Moderno**: Interface com gradiente roxo de fundo e cards brancos estilizados
- **React Bootstrap**: Componentes profissionais e responsivos
- **Responsivo**: Grid system que adapta-se a diferentes tamanhos de tela
- **Feedback Visual**: Alerts do Bootstrap para mensagens de sucesso e erro
- **Confirmação**: Diálogo JavaScript antes de deletar tarefas
- **Filtros Dinâmicos**: ButtonGroup para filtrar tarefas em tempo real
- **Status Visual**: Badges coloridos indicam o status das tarefas (pendente/concluída)
- **Animações CSS**: Transições suaves e efeitos hover nos cards
- **Gerenciamento de Estado**: useState para controle reativo da interface
- **Carregamento**: Spinner do Bootstrap durante requisições à API

## 🔧 Configurações

As configurações principais estão em `application.properties`:

```properties
# Nome da aplicação
spring.application.name=tarefas

# Configuração do banco H2
spring.datasource.url=jdbc:h2:mem:tarefasdb
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Configuração JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido como parte do **Projeto Final da matéria Full MVC**.

### Padrões e Arquiteturas Utilizados

#### Backend
- **MVC** - Separação clara de responsabilidades (Model, View, Controller)
- **Repository Pattern** - Abstração de acesso a dados com Spring Data JPA
- **Service Layer** - Lógica de negócios centralizada e reutilizável
- **RESTful API** - Endpoints seguindo convenções REST (GET, POST, PUT, DELETE)
- **CORS** - Configuração para permitir requisições cross-origin
- **JPA/Hibernate** - ORM para persistência de dados

#### Frontend
- **Component-Based Architecture** - Componentes React reutilizáveis e modulares
- **Service Layer** - Centralização de chamadas HTTP no tarefaService.js
- **React Hooks** - useState e useEffect para gerenciamento de estado
- **Unidirectional Data Flow** - Fluxo de dados unidirecional do React
- **Separation of Concerns** - UI, lógica de negócios e serviços separados
- **Responsive Design** - Bootstrap Grid System e media queries

### Comunicação Frontend-Backend
```
React (localhost:3000)
    ↓ HTTP Requests (Axios)
    ↓
API REST (localhost:8080/api/tarefas)
    ↓ JPA/Hibernate
    ↓
H2 Database (In-Memory)
```

### API Endpoints

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| GET | `/api/tarefas` | Lista todas as tarefas | - | Array<Tarefa> |
| GET | `/api/tarefas?filtro=pendentes` | Lista tarefas pendentes | - | Array<Tarefa> |
| GET | `/api/tarefas?filtro=concluidas` | Lista tarefas concluídas | - | Array<Tarefa> |
| GET | `/api/tarefas/{id}` | Busca tarefa por ID | - | Tarefa |
| POST | `/api/tarefas` | Cria nova tarefa | Tarefa | Tarefa |
| PUT | `/api/tarefas/{id}` | Atualiza tarefa | Tarefa | Tarefa |
| PUT | `/api/tarefas/{id}/concluir` | Alterna status | - | Tarefa |
| DELETE | `/api/tarefas/{id}` | Deleta tarefa | - | - |

### Estrutura de Dados (JSON)

```json
{
  "id": 1,
  "titulo": "Comprar material de escritório",
  "descricao": "Comprar canetas, papel A4 e grampeador",
  "dataCriacao": "2025-10-25T10:30:00Z",
  "concluida": false
}
```

## 🔍 Testes e Depuração

### Backend
- Acesse a API diretamente: http://localhost:8080/api/tarefas
- Console H2: http://localhost:8080/h2-console
- Logs SQL estão habilitados em `application.properties`

### Frontend
- Console do navegador (F12) para ver logs e erros
- React Developer Tools para inspecionar componentes
- Network tab para ver requisições HTTP

## 📝 Licença

Projeto acadêmico desenvolvido para fins educacionais.

## 📚 Recursos Adicionais

- [Documentação Frontend](./frontend/README.md) - Detalhes específicos do React
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)

---

**Desenvolvido com ❤️ usando Spring Boot + React**
