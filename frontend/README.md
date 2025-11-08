# 📝 Sistema de Tarefas - Frontend React

Frontend desenvolvido em React para o Sistema de Gerenciamento de Tarefas, utilizando React Bootstrap para estilização e Axios para comunicação com a API REST.

## 🚀 Tecnologias Utilizadas

- **React** 19.2.0 - Biblioteca JavaScript para construção de interfaces
- **React Bootstrap** - Framework CSS Bootstrap adaptado para React
- **Axios** - Cliente HTTP para requisições à API
- **Bootstrap** 5 - Framework CSS para estilização
- **useState Hook** - Gerenciamento de estado dos componentes

## 📁 Estrutura de Componentes

```
src/
├── components/
│   ├── ListaDeTarefas.js    # Componente principal que gerencia o estado
│   ├── FormularioTarefa.js  # Formulário para criar/editar tarefas
│   └── ItemTarefa.js        # Componente individual de cada tarefa
├── services/
│   └── tarefaService.js     # Serviço de comunicação com a API
├── App.js                    # Componente raiz da aplicação
├── App.css                   # Estilos globais
└── index.js                  # Ponto de entrada da aplicação
```

## 🎯 Componentes

### 1. ListaDeTarefas (Componente Principal)

Gerencia todo o estado da aplicação usando `useState`:

- **Estado gerenciado:**
  - `tarefas` - Lista de tarefas
  - `tarefaEditando` - Tarefa sendo editada
  - `filtro` - Filtro atual (todas/pendentes/concluídas)
  - `mensagem` - Mensagens de feedback
  - `carregando` - Estado de carregamento

- **Funcionalidades:**
  - Carrega tarefas da API
  - Cria novas tarefas
  - Atualiza tarefas existentes
  - Deleta tarefas
  - Alterna status de conclusão
  - Filtra tarefas por status
  - Exibe estatísticas

### 2. FormularioTarefa

Formulário reutilizável para criar e editar tarefas:

- Campos: título, descrição, status de conclusão
- Validação de campos obrigatórios
- Modo criação e edição
- Feedback de erros
- Estilização com React Bootstrap

### 3. ItemTarefa

Exibe uma tarefa individual:

- Informações da tarefa (título, descrição, data)
- Badge de status (pendente/concluída)
- Botões de ação (concluir, editar, deletar)
- Formatação de data em pt-BR
- Confirmação antes de deletar

## 🔌 Serviço de API (tarefaService.js)

Centraliza todas as chamadas à API REST usando Axios:

```javascript
- getAllTarefas(filtro)    // GET /api/tarefas
- getTarefaById(id)        // GET /api/tarefas/{id}
- createTarefa(tarefa)     // POST /api/tarefas
- updateTarefa(id, tarefa) // PUT /api/tarefas/{id}
- deleteTarefa(id)         // DELETE /api/tarefas/{id}
- toggleConcluida(id)      // PUT /api/tarefas/{id}/concluir
```

## ⚙️ Configuração

### Proxy para API

O `package.json` está configurado com proxy para o backend:

```json
"proxy": "http://localhost:8080"
```

Isso permite fazer requisições para `/api/tarefas` sem especificar o host completo.

## 🎨 Estilização

### Design Responsivo
- Layout adaptativo para diferentes tamanhos de tela
- Grid system do Bootstrap
- Cards com hover effects
- Animações suaves

### Tema
- Gradiente roxo de fundo
- Cards brancos com sombras
- Badges coloridos para status
- Botões com cores semânticas do Bootstrap

### Componentes Bootstrap Utilizados
- Container, Row, Col (Grid)
- Card
- Button, ButtonGroup
- Form, Form.Control
- Alert
- Badge
- Spinner

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- Backend (Spring Boot) rodando na porta 8080

### Instalação

1. **Navegue até o diretório frontend:**
```bash
cd /home/victor/Documentos/projetoFinalAulaFullMVC/frontend
```

2. **Instale as dependências (já feito):**
```bash
npm install
```

### Executar em Desenvolvimento

```bash
npm start
```

A aplicação abrirá automaticamente em: **http://localhost:3000**

### Build para Produção

```bash
npm run build
```

Gera os arquivos otimizados na pasta `build/`

## 📱 Funcionalidades da Interface

✅ **Criar Tarefas**
- Formulário com validação
- Campos: título (obrigatório) e descrição (opcional)

✅ **Listar Tarefas**
- Visualização em cards estilizados
- Informações: título, descrição, data de criação, status

✅ **Editar Tarefas**
- Click em "Editar" carrega a tarefa no formulário
- Permite modificar todos os campos incluindo status

✅ **Deletar Tarefas**
- Confirmação antes de deletar
- Feedback de sucesso/erro

✅ **Concluir/Reabrir Tarefas**
- Toggle rápido do status
- Visual diferenciado para tarefas concluídas

✅ **Filtrar Tarefas**
- Todas
- Pendentes (⏳)
- Concluídas (✅)

✅ **Estatísticas**
- Total de tarefas
- Tarefas pendentes
- Tarefas concluídas

✅ **Feedback Visual**
- Mensagens de sucesso/erro
- Indicador de carregamento
- Animações suaves

## 🔄 Fluxo de Dados

1. **Montagem do componente:** `useEffect` carrega as tarefas
2. **Interação do usuário:** Ações disparam funções no `ListaDeTarefas`
3. **Chamada à API:** `tarefaService` faz requisição HTTP via Axios
4. **Atualização do estado:** `useState` atualiza o estado
5. **Re-renderização:** React re-renderiza componentes afetados
6. **Feedback:** Mensagem de sucesso/erro é exibida

## 🎯 Integração com Backend

A aplicação React se comunica com a API REST Spring Boot:

- **Backend URL:** `http://localhost:8080`
- **API Base:** `/api/tarefas`
- **CORS:** Configurado no backend para aceitar requisições do frontend

### Endpoints Utilizados:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tarefas` | Lista todas as tarefas |
| GET | `/api/tarefas?filtro=pendentes` | Lista tarefas pendentes |
| GET | `/api/tarefas?filtro=concluidas` | Lista tarefas concluídas |
| GET | `/api/tarefas/{id}` | Busca tarefa por ID |
| POST | `/api/tarefas` | Cria nova tarefa |
| PUT | `/api/tarefas/{id}` | Atualiza tarefa |
| DELETE | `/api/tarefas/{id}` | Deleta tarefa |
| PUT | `/api/tarefas/{id}/concluir` | Alterna conclusão |

## 📝 Boas Práticas Implementadas

- ✅ Componentização adequada
- ✅ Separação de responsabilidades (UI, Service, State)
- ✅ Hooks do React (useState, useEffect)
- ✅ Tratamento de erros
- ✅ Feedback ao usuário
- ✅ Código limpo e comentado
- ✅ Responsividade
- ✅ Acessibilidade (labels, semantic HTML)

## 🐛 Troubleshooting

### Erro de CORS
Se aparecer erro de CORS, verifique:
1. Backend está rodando na porta 8080
2. CorsConfig está configurado no backend
3. Proxy está configurado no package.json

### Erro ao carregar tarefas
1. Verifique se o backend está rodando
2. Abra o console do navegador (F12) para ver erros
3. Verifique a URL da API no tarefaService.js

### Dependências
Se houver problemas com dependências:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 👨‍💻 Desenvolvimento

Este frontend foi desenvolvido como parte do **Projeto Final da matéria Full MVC**, integrando-se perfeitamente com o backend Spring Boot.

---

**Desenvolvido com ❤️ usando React e Bootstrap**
