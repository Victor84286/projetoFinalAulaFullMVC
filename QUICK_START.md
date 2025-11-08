# 🚀 Quick Start Guide - Sistema de Tarefas Full Stack

## ⚡ Início Rápido

### Opção 1: Script Automático (Recomendado)

```bash
cd /home/victor/Documentos/projetoFinalAulaFullMVC
./start.sh
```

### Opção 2: Manual

**Terminal 1 - Backend:**
```bash
cd /home/victor/Documentos/projetoFinalAulaFullMVC/tarefas
./mvnw spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd /home/victor/Documentos/projetoFinalAulaFullMVC/frontend
npm start
```

## 🌐 URLs de Acesso

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Aplicação** | http://localhost:3000 | Interface React |
| **API REST** | http://localhost:8080/api/tarefas | Backend API |
| **H2 Console** | http://localhost:8080/h2-console | Banco de dados |

### Credenciais H2 Console
- **JDBC URL**: `jdbc:h2:mem:tarefasdb`
- **Username**: `sa`
- **Password**: *(deixe em branco)*

## 📋 Estrutura do Projeto

```
projetoFinalAulaFullMVC/
├── 📂 frontend/              React Application
│   ├── src/
│   │   ├── components/       Componentes React
│   │   │   ├── ListaDeTarefas.js
│   │   │   ├── FormularioTarefa.js
│   │   │   └── ItemTarefa.js
│   │   └── services/         API Service
│   │       └── tarefaService.js
│   └── package.json
│
├── 📂 tarefas/               Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/example/demo/
│   │       ├── config/       Configurações
│   │       ├── controller/   REST Controllers
│   │       ├── model/        Entidades
│   │       ├── repository/   Repositories
│   │       └── service/      Services
│   └── pom.xml
│
├── README.md                 Documentação completa
├── QUICK_START.md           Este arquivo
└── start.sh                 Script de inicialização
```

## 🔧 Componentes React Criados

### 1. **ListaDeTarefas** (Componente Principal)
- Gerencia estado com `useState`
- Faz requisições HTTP com Axios
- Controla filtros e mensagens
- Exibe estatísticas

**Hooks utilizados:**
- `useState` - Estado de tarefas, filtros, mensagens
- `useEffect` - Carrega tarefas ao montar/atualizar

### 2. **FormularioTarefa**
- Formulário reutilizável (criar/editar)
- Validação de campos
- Styled com React Bootstrap
- Estados: titulo, descricao, concluida

### 3. **ItemTarefa**
- Exibe tarefa individual
- Botões de ação (concluir, editar, deletar)
- Formatação de data em pt-BR
- Badge de status

## 🔌 API REST Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tarefas` | Lista todas |
| GET | `/api/tarefas?filtro=pendentes` | Pendentes |
| GET | `/api/tarefas?filtro=concluidas` | Concluídas |
| GET | `/api/tarefas/{id}` | Por ID |
| POST | `/api/tarefas` | Criar |
| PUT | `/api/tarefas/{id}` | Atualizar |
| DELETE | `/api/tarefas/{id}` | Deletar |
| PUT | `/api/tarefas/{id}/concluir` | Toggle status |

## 📦 Tecnologias Utilizadas

### Frontend
- ⚛️ React 19.2.0
- 🎨 React Bootstrap
- 📡 Axios
- 🔄 React Hooks (useState, useEffect)

### Backend
- ☕ Java 21
- 🍃 Spring Boot 3.5.7
- 💾 Spring Data JPA
- 🗄️ H2 Database

## ✨ Funcionalidades

✅ CRUD completo de tarefas  
✅ Filtros (todas/pendentes/concluídas)  
✅ Estatísticas em tempo real  
✅ Design responsivo  
✅ Feedback visual (alerts)  
✅ Confirmação de exclusão  
✅ Loading states  
✅ API RESTful  
✅ CORS configurado  

## 🎯 Fluxo de Dados

```
Usuario interage com UI (React)
        ↓
useState atualiza estado
        ↓
Evento dispara função handler
        ↓
tarefaService.js faz requisição HTTP (Axios)
        ↓
API REST (Spring Boot) processa
        ↓
Service Layer (lógica de negócio)
        ↓
Repository (JPA) acessa banco
        ↓
H2 Database
        ↓
Response retorna pela cadeia
        ↓
useState atualiza estado
        ↓
React re-renderiza componentes
        ↓
UI atualizada!
```

## 🐛 Solução de Problemas

### Backend não inicia
```bash
# Limpar e recompilar
cd tarefas
./mvnw clean install
```

### Frontend não conecta com Backend
1. Verifique se backend está rodando (porta 8080)
2. Verifique o proxy no `package.json`: `"proxy": "http://localhost:8080"`
3. Abra o console do navegador (F12) para ver erros

### Erro de CORS
- Verifique se `CorsConfig.java` está configurado
- Backend deve estar permitindo origem `http://localhost:3000`

### Dependências do Frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentação

- [README Principal](./README.md) - Documentação completa do projeto
- [README Frontend](./frontend/README.md) - Detalhes do React

## 🎓 Conceitos Demonstrados

### Backend (MVC)
- ✅ Model (Entidades JPA)
- ✅ Repository (Spring Data)
- ✅ Service (Lógica de negócio)
- ✅ Controller (REST API)

### Frontend (React)
- ✅ Component-Based Architecture
- ✅ State Management (useState)
- ✅ Side Effects (useEffect)
- ✅ HTTP Requests (Axios)
- ✅ Props & Callbacks

### Full Stack
- ✅ REST API Communication
- ✅ CORS Configuration
- ✅ JSON Data Exchange
- ✅ Separation of Concerns

## 💡 Dicas

1. **Desenvolvimento**: Use dois terminais, um para cada serviço
2. **Debug**: Console do navegador (F12) e logs do Spring Boot
3. **Banco de Dados**: Acesse H2 Console para visualizar dados
4. **Hot Reload**: Ambos suportam hot reload (atualização automática)
5. **Ports**: Backend (8080), Frontend (3000), H2 Console (8080/h2-console)

## ✅ Checklist de Instalação

- [ ] Java JDK 21 instalado
- [ ] Maven instalado (ou usar wrapper)
- [ ] Node.js e npm instalados
- [ ] Dependências do frontend instaladas (`npm install`)
- [ ] Backend compilado (`./mvnw clean install`)
- [ ] Portas 8080 e 3000 disponíveis

## 🚀 Próximos Passos

1. Explore a aplicação em http://localhost:3000
2. Crie algumas tarefas
3. Teste os filtros
4. Edite e delete tarefas
5. Veja as estatísticas atualizando
6. Acesse o H2 Console para ver os dados persistidos
7. Abra o DevTools e veja as requisições HTTP

---

**Desenvolvido como Projeto Final da matéria Full MVC** 🎓

