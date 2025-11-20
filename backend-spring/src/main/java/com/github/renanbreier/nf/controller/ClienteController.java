package com.github.renanbreier.nf.controller;

import com.github.renanbreier.nf.model.Cliente;
import com.github.renanbreier.nf.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public ResponseEntity<List<Cliente>> findAll() {
        return ResponseEntity.ok().body(clienteRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);

        if (cliente.isEmpty()) {
            return ResponseEntity.status(404).body("Cliente com ID " + id +" não encontrado");
        }
        return ResponseEntity.ok(cliente.get());
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Cliente cliente) {
        try {
           Cliente novoCliente = clienteRepository.save(cliente);
           return ResponseEntity.status(201).body(novoCliente);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao cadastrar o cliente: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Cliente clienteAtualizado) {
        try {
            return clienteRepository.findById(id)
                    .<ResponseEntity<?>>map(cliente -> {
                        cliente.setCodigo(clienteAtualizado.getCodigo());
                        cliente.setNome(clienteAtualizado.getNome());
                        Cliente atualizado = clienteRepository.save(cliente);
                        return ResponseEntity.ok(atualizado);
                    })
                    .orElseGet(() -> ResponseEntity.status(404)
                            .body("Cliente com ID " + id + " não encontrado"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar o cliente: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!clienteRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Cliente com ID " + id + " não encontrado");
        }
        clienteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
