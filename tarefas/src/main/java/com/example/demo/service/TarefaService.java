package com.example.demo.service;

import com.example.demo.model.Tarefa;
import com.example.demo.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    // Listar todas as tarefas
    public List<Tarefa> listarTodas() {
        return tarefaRepository.findAll();
    }

    // Buscar tarefa por ID
    public Optional<Tarefa> buscarPorId(Long id) {
        return tarefaRepository.findById(id);
    }

    // Salvar nova tarefa
    public Tarefa salvar(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    // Atualizar tarefa existente
    public Tarefa atualizar(Long id, Tarefa tarefaAtualizada) {
        Optional<Tarefa> tarefaExistente = tarefaRepository.findById(id);
        if (tarefaExistente.isPresent()) {
            Tarefa tarefa = tarefaExistente.get();
            tarefa.setTitulo(tarefaAtualizada.getTitulo());
            tarefa.setDescricao(tarefaAtualizada.getDescricao());
            tarefa.setConcluida(tarefaAtualizada.getConcluida());
            return tarefaRepository.save(tarefa);
        }
        return null;
    }

    // Deletar tarefa
    public boolean deletar(Long id) {
        if (tarefaRepository.existsById(id)) {
            tarefaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Alternar status de conclusão
    public Tarefa alternarConclusao(Long id) {
        Optional<Tarefa> tarefaOpt = tarefaRepository.findById(id);
        if (tarefaOpt.isPresent()) {
            Tarefa tarefa = tarefaOpt.get();
            tarefa.setConcluida(!tarefa.getConcluida());
            return tarefaRepository.save(tarefa);
        }
        return null;
    }

    // Listar tarefas concluídas
    public List<Tarefa> listarConcluidas() {
        return tarefaRepository.findByConcluida(true);
    }

    // Listar tarefas pendentes
    public List<Tarefa> listarPendentes() {
        return tarefaRepository.findByConcluida(false);
    }

    // Buscar tarefas por título
    public List<Tarefa> buscarPorTitulo(String titulo) {
        return tarefaRepository.findByTituloContainingIgnoreCase(titulo);
    }
}


