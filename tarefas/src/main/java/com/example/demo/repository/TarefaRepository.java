package com.example.demo.repository;

import com.example.demo.model.Tarefa;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarefaRepository extends MongoRepository<Tarefa, String> {
    List<Tarefa> findByConcluida(Boolean concluida);

    List<Tarefa> findByTituloContainingIgnoreCase(String titulo);
}
