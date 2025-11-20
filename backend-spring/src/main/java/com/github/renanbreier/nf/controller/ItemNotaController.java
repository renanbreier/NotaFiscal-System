package com.github.renanbreier.nf.controller;

import com.github.renanbreier.nf.model.Item;
import com.github.renanbreier.nf.model.ItemNota;
import com.github.renanbreier.nf.model.NotaFiscal;
import com.github.renanbreier.nf.repository.ItemNotaRepository;
import com.github.renanbreier.nf.repository.ItemRepository;
import com.github.renanbreier.nf.repository.NotaFiscalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/item-nota")
public class ItemNotaController {

    @Autowired
    private ItemNotaRepository itemNotaRepository;

    @Autowired
    private NotaFiscalRepository notaFiscalRepository;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public ResponseEntity<List<ItemNota>> findAll() {
        return ResponseEntity.ok().body(itemNotaRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<ItemNota> itemNota = itemNotaRepository.findById(id);

        if(itemNota.isEmpty()) {
            return ResponseEntity.status(404).body("Item com o ID " + id + " não encontrado");
        }
        return ResponseEntity.ok().body(itemNota.get());
    }

    @GetMapping("/nota/{notaId}")
    public ResponseEntity<?> findByNotaFiscalId(@PathVariable Long notaId){
        List<ItemNota> itemNota = itemNotaRepository.findByNotaFiscalId(notaId);

        if(itemNota.isEmpty()) {
            return ResponseEntity.status(404).body("Nenhum itemNota encontrado para a nota fiscal com ID " + notaId);
        }
        return ResponseEntity.ok().body(itemNota);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ItemNota itemNota){
        try {
            if (itemNota.getNotaFiscal() == null || itemNota.getNotaFiscal().getId() == null) {
                return ResponseEntity.badRequest().body("É necessário informar o ID da Nota Fiscal");
            }

            if (itemNota.getItemNota() == null || itemNota.getItemNota().getId() == null) {
                return ResponseEntity.badRequest().body("É necessário informar o ID do Item");
            }

            NotaFiscal nota = notaFiscalRepository.findById(itemNota.getNotaFiscal().getId())
                    .orElseThrow(() -> new RuntimeException("Nota Fiscal com ID " + itemNota.getNotaFiscal().getId() + " não encontrada"));

            Item item = itemRepository.findById(itemNota.getItemNota().getId())
                    .orElseThrow(() -> new RuntimeException("Item com o ID " + itemNota.getItemNota().getId() + " não encontrado"));

            BigDecimal valorTotal = item.getValorUnitario()
                    .multiply(BigDecimal.valueOf(itemNota.getQuantidade()));

            itemNota.setNotaFiscal(nota);
            itemNota.setItemNota(item);
            itemNota.setValorTotal(valorTotal);

            ItemNota novoItemNota = itemNotaRepository.save(itemNota);
            return ResponseEntity.status(201).body(novoItemNota);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao cadastrar o itemNota" + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ItemNota itemNotaAtualizado){
        try {
            return itemNotaRepository.findById(id)
                    .<ResponseEntity<?>>map(itemNota -> {
                        itemNota.setSequencial(itemNotaAtualizado.getSequencial());
                        itemNota.setQuantidade(itemNotaAtualizado.getQuantidade());

                        if (itemNotaAtualizado.getNotaFiscal() != null &&
                                itemNotaAtualizado.getNotaFiscal().getId() != null) {
                            NotaFiscal nota = notaFiscalRepository.findById(itemNotaAtualizado.getNotaFiscal().getId())
                                    .orElseThrow(() -> new RuntimeException("Nota Fiscal não encontrada"));
                            itemNota.setNotaFiscal(nota);
                        }

                        if (itemNotaAtualizado.getItemNota() != null &&
                                itemNotaAtualizado.getItemNota().getId() != null) {
                            Item item = itemRepository.findById(itemNotaAtualizado.getItemNota().getId())
                                    .orElseThrow(() -> new RuntimeException("Item não encontrado."));
                            itemNota.setItemNota(item);

                            // recalcular valor total
                            BigDecimal valorTotal = item.getValorUnitario()
                                    .multiply(BigDecimal.valueOf(itemNotaAtualizado.getQuantidade()));
                            itemNota.setValorTotal(valorTotal);
                        }

                        ItemNota atualizado = itemNotaRepository.save(itemNota);
                        return ResponseEntity.ok(atualizado);
                    })
                    .orElseGet(() -> ResponseEntity.status(404)
                            .body("ItemNota com o ID " + id + " não encontrado."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar ItemNota: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        if (!itemNotaRepository.existsById(id)) {
            return ResponseEntity.status(404).body("ItemNota com o ID " + id + " não encontrado");
        }

        itemNotaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
