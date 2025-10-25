# 📝 Sistema de Gerenciamento de Tarefas - Full MVC

Projeto final desenvolvido para demonstrar uma aplicação completa utilizando a arquitetura MVC (Model-View-Controller) com Spring Boot.

## 📋 Descrição

Sistema web para gerenciamento de tarefas que permite criar, visualizar, editar, concluir e deletar tarefas. Desenvolvido com Spring Boot, JPA/Hibernate, Thymeleaf e banco de dados H2.

## 🏗️ Arquitetura

O projeto segue a arquitetura MVC (Model-View-Controller):

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

### Controller (Controlador)
- **TarefaController**: Gerencia requisições HTTP
  - GET `/tarefas` - Lista todas as tarefas
  - GET `/tarefas/nova` - Formulário de nova tarefa
  - POST `/tarefas` - Criar tarefa
  - GET `/tarefas/editar/{id}` - Formulário de edição
  - POST `/tarefas/editar/{id}` - Atualizar tarefa
  - GET `/tarefas/deletar/{id}` - Deletar tarefa
  - GET `/tarefas/concluir/{id}` - Alternar conclusão
  - GET `/tarefas/buscar` - Buscar tarefas

- **HomeController**: Redireciona a página inicial para lista de tarefas

### View (Visão)
Templates Thymeleaf com design moderno e responsivo:
- `layout/base.html` - Template base com layout comum
- `tarefas/lista.html` - Lista de tarefas com filtros
- `tarefas/form.html` - Formulário de criação/edição

## 🚀 Tecnologias Utilizadas

- **Java 21**
- **Spring Boot 3.5.7**
  - Spring Web
  - Spring Data JPA
  - Spring Boot DevTools
- **Thymeleaf** - Template engine
- **H2 Database** - Banco de dados em memória
- **Maven** - Gerenciamento de dependências

## 📁 Estrutura do Projeto

```
tarefas/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   ├── controller/
│   │   │   │   ├── HomeController.java
│   │   │   │   └── TarefaController.java
│   │   │   ├── model/
│   │   │   │   └── Tarefa.java
│   │   │   ├── repository/
│   │   │   │   └── TarefaRepository.java
│   │   │   ├── service/
│   │   │   │   └── TarefaService.java
│   │   │   └── TarefasApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   │           ├── layout/
│   │           │   └── base.html
│   │           └── tarefas/
│   │               ├── form.html
│   │               └── lista.html
│   └── test/
└── pom.xml
```

## ⚙️ Como Executar

### Pré-requisitos
- Java JDK 21 ou superior
- Maven (ou use o Maven Wrapper incluído)

### Passos para execução

1. **Clone o repositório**
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

4. **Acesse no navegador**
```
http://localhost:8080
```

## 🎯 Funcionalidades

✅ **Criar Tarefas** - Adicione novas tarefas com título e descrição  
✅ **Listar Tarefas** - Visualize todas as tarefas cadastradas  
✅ **Editar Tarefas** - Modifique informações de tarefas existentes  
✅ **Deletar Tarefas** - Remova tarefas indesejadas  
✅ **Concluir/Reabrir Tarefas** - Alterne o status de conclusão  
✅ **Filtrar Tarefas** - Filtre por status (todas/pendentes/concluídas)  
✅ **Buscar Tarefas** - Pesquise tarefas por título  
✅ **Interface Moderna** - Design responsivo e intuitivo  
✅ **Console H2** - Acesse o banco de dados diretamente  

## 🗄️ Banco de Dados

O projeto utiliza o H2, um banco de dados em memória. Para acessar o console:

```
URL: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:tarefasdb
Username: sa
Password: (deixe em branco)
```

## 📸 Recursos da Interface

- **Design Moderno**: Interface com gradiente roxo e cards estilizados
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Feedback Visual**: Mensagens de sucesso e erro
- **Confirmação**: Diálogo de confirmação para exclusão
- **Filtros Inteligentes**: Filtre e busque tarefas facilmente
- **Status Visual**: Badges coloridos indicam o status das tarefas
- **Animações**: Transições suaves e efeitos hover

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

### Padrões Utilizados
- **MVC** - Separação de responsabilidades
- **Repository Pattern** - Abstração de acesso a dados
- **Service Layer** - Lógica de negócios centralizada
- **RESTful** - Endpoints seguem convenções REST

## 📝 Licença

Projeto acadêmico desenvolvido para fins educacionais.

---

**Desenvolvido com ❤️ usando Spring Boot**
