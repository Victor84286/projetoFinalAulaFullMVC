import axios from 'axios';

const API_URL = '/api/tarefas';

const tarefaService = {
    // Listar todas as tarefas
    getAllTarefas: async (filtro = null) => {
        try {
            const url = filtro ? `${API_URL}?filtro=${filtro}` : API_URL;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            throw error;
        }
    },

    // Buscar tarefa por ID
    getTarefaById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar tarefa:', error);
            throw error;
        }
    },

    // Criar nova tarefa
    createTarefa: async (tarefa) => {
        try {
            const response = await axios.post(API_URL, tarefa);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            throw error;
        }
    },

    // Atualizar tarefa
    updateTarefa: async (id, tarefa) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, tarefa);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            throw error;
        }
    },

    // Deletar tarefa
    deleteTarefa: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            throw error;
        }
    },

    // Alternar conclusão da tarefa
    toggleConcluida: async (id) => {
        try {
            const response = await axios.put(`${API_URL}/${id}/concluir`);
            return response.data;
        } catch (error) {
            console.error('Erro ao alternar conclusão:', error);
            throw error;
        }
    }
};

export default tarefaService;

