package com.example.demo.controller;

import com.example.demo.model.Tarefa;
import com.example.demo.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    // GET /api/tarefas - Listar todas as tarefas
    @GetMapping
    public ResponseEntity<List<Tarefa>> getAllTarefas(@RequestParam(required = false) String filtro) {
        List<Tarefa> tarefas;

        if (filtro != null && !filtro.isEmpty()) {
            if (filtro.equalsIgnoreCase("concluidas")) {
                tarefas = tarefaService.listarConcluidas();
            } else if (filtro.equalsIgnoreCase("pendentes")) {
                tarefas = tarefaService.listarPendentes();
            } else {
                tarefas = tarefaService.listarTodas();
            }
        } else {
            tarefas = tarefaService.listarTodas();
        }

        return ResponseEntity.ok(tarefas);
    }

    // GET /api/tarefas/{id} - Buscar tarefa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> getTarefaById(@PathVariable String id) {
        return tarefaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/tarefas - Criar nova tarefa
    @PostMapping
    public ResponseEntity<Tarefa> createTarefa(@RequestBody Tarefa tarefa) {
        Tarefa novaTarefa = tarefaService.salvar(tarefa);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaTarefa);
    }

    // PUT /api/tarefas/{id} - Atualizar tarefa
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> updateTarefa(@PathVariable String id, @RequestBody Tarefa tarefa) {
        return tarefaService.atualizar(id, tarefa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/tarefas/{id} - Deletar tarefa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarefa(@PathVariable String id) {
        if (tarefaService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // PUT /api/tarefas/{id}/concluir - Alternar conclusão da tarefa
    @PutMapping("/{id}/concluir")
    public ResponseEntity<Tarefa> alternarConclusao(@PathVariable String id) {
        return tarefaService.alternarConclusao(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

