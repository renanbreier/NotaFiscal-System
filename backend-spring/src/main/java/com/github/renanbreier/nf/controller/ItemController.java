package com.github.renanbreier.nf.controller;

import com.github.renanbreier.nf.model.Item;
import com.github.renanbreier.nf.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public ResponseEntity<List<Item>> findAll() {
        return ResponseEntity.ok().body(itemRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<Item> item = itemRepository.findById(id);

        if(item.isEmpty()) {
            return ResponseEntity.status(404).body("Item com ID " + id + " não encontrado");
        }
        return ResponseEntity.ok(item.get());
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Item item) {
        try {
            Item novoItem = itemRepository.save(item);
            return ResponseEntity.status(201).body(novoItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao cadastrar o item: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Item itemAtualizado) {
        try {
            return itemRepository.findById(id)
                    .<ResponseEntity<?>>map(item -> {
                        item.setCodigo(itemAtualizado.getCodigo());
                        item.setDescricao(itemAtualizado.getDescricao());
                        item.setValorUnitario(itemAtualizado.getValorUnitario());
                        Item  atualizado = itemRepository.save(item);
                        return ResponseEntity.ok(atualizado);
                    })
                    .orElseGet(() -> ResponseEntity.status(404)
                            .body("Item com ID " + id + " não encontrado"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar o item: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!itemRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Item com ID " + id + " não encontrado");
        }

        itemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
