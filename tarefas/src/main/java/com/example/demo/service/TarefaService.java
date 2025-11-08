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
    public Optional<Tarefa> buscarPorId(String id) {
        return tarefaRepository.findById(id);
    }

    // Salvar nova tarefa
    public Tarefa salvar(Tarefa tarefa) {
        if (tarefa.getDataCriacao() == null) {
            tarefa.setDataCriacao(java.time.Instant.now());
        }
        return tarefaRepository.save(tarefa);
    }

    // Atualizar tarefa existente
    public Optional<Tarefa> atualizar(String id, Tarefa tarefaAtualizada) {
        return tarefaRepository.findById(id)
                .map(tarefa -> {
                    tarefa.setTitulo(tarefaAtualizada.getTitulo());
                    tarefa.setDescricao(tarefaAtualizada.getDescricao());
                    tarefa.setConcluida(tarefaAtualizada.getConcluida());
                    return tarefaRepository.save(tarefa);
                });
    }

    // Deletar tarefa
    public boolean deletar(String id) {
        if (tarefaRepository.existsById(id)) {
            tarefaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Alternar status de conclusão
    public Optional<Tarefa> alternarConclusao(String id) {
        return tarefaRepository.findById(id)
                .map(tarefa -> {
                    tarefa.setConcluida(!Boolean.TRUE.equals(tarefa.getConcluida()));
                    return tarefaRepository.save(tarefa);
                });
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


