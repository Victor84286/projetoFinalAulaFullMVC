#!/bin/bash

# Script para iniciar o projeto Full Stack
# Backend (Spring Boot) + Frontend (React)

echo "🚀 Iniciando Sistema de Gerenciamento de Tarefas - Full Stack"
echo "============================================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verifica se o Java está instalado
if ! command -v java &> /dev/null; then
    echo "❌ Java não encontrado. Por favor, instale Java JDK 21 ou superior."
    exit 1
fi

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js e npm."
    exit 1
fi

echo -e "${GREEN}✓${NC} Java encontrado: $(java -version 2>&1 | head -n 1)"
echo -e "${GREEN}✓${NC} Node.js encontrado: $(node -v)"
echo -e "${GREEN}✓${NC} npm encontrado: $(npm -v)"
echo ""

# Instala dependências do frontend se necessário
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependências do frontend...${NC}"
    cd frontend
    npm install
    cd ..
    echo -e "${GREEN}✓${NC} Dependências do frontend instaladas!"
    echo ""
fi

# Inicia o backend
echo -e "${GREEN}🔧 Iniciando Backend (Spring Boot)...${NC}"
echo "   Porta: 8080"
echo "   URL: http://localhost:8080/api/tarefas"
cd tarefas
gnome-terminal -- bash -c "./mvnw spring-boot:run; exec bash" 2>/dev/null || \
xterm -e "./mvnw spring-boot:run" 2>/dev/null || \
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

# Aguarda o backend iniciar
echo ""
echo "⏳ Aguardando o backend iniciar..."
sleep 15

# Inicia o frontend
echo ""
echo -e "${GREEN}🎨 Iniciando Frontend (React)...${NC}"
echo "   Porta: 3000"
echo "   URL: http://localhost:3000"
cd frontend
gnome-terminal -- bash -c "npm start; exec bash" 2>/dev/null || \
xterm -e "npm start" 2>/dev/null || \
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN}✅ Aplicação iniciada com sucesso!${NC}"
echo ""
echo "📌 Acesse a aplicação em: ${GREEN}http://localhost:3000${NC}"
echo "📌 API REST disponível em: ${GREEN}http://localhost:8080/api/tarefas${NC}"
echo "📌 Console H2: ${GREEN}http://localhost:8080/h2-console${NC}"
echo ""
echo "Para parar os servidores, pressione Ctrl+C"
echo ""

# Mantém o script rodando
wait

