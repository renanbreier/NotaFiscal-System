package com.github.renanbreier.nf.controller;

import com.github.renanbreier.nf.model.Cliente;
import com.github.renanbreier.nf.model.Item;
import com.github.renanbreier.nf.model.ItemNota;
import com.github.renanbreier.nf.model.NotaFiscal;
import com.github.renanbreier.nf.repository.ClienteRepository;
import com.github.renanbreier.nf.repository.ItemRepository;
import com.github.renanbreier.nf.repository.NotaFiscalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/nota")
public class NotaFiscalController {

    @Autowired
    private NotaFiscalRepository notaFiscalRepository;

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public ResponseEntity<List<NotaFiscal>> findAll() {
        return ResponseEntity.ok().body(notaFiscalRepository.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<NotaFiscal> notaFiscal = notaFiscalRepository.findById(id);

        if (notaFiscal.isEmpty()) {
            return ResponseEntity.status(404).body("Nota Fiscal com ID " + id + " não encontrada");
        }
        return ResponseEntity.ok().body(notaFiscal.get());
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody NotaFiscal notaFiscal) {
        try {
            Cliente cliente = (Cliente) clienteRepository.findById(notaFiscal.getCliente().getId())
                    .orElseThrow(() -> new RuntimeException(
                            "Cliente com ID " + notaFiscal.getCliente().getId() + " não encontrado"));

            notaFiscal.setCliente(cliente);

            if (notaFiscal.getItens() != null && !notaFiscal.getItens().isEmpty()) {
                for (ItemNota itemNota : notaFiscal.getItens()) {
                    Item item = itemRepository.findById(itemNota.getItemNota().getId())
                            .orElseThrow(() -> new RuntimeException("Item com ID " + itemNota.getItemNota().getId() + " não encontrado"));

                    itemNota.setItemNota(item);
                    itemNota.setNotaFiscal(notaFiscal);

                    itemNota.setValorTotal(item.getValorUnitario()
                            .multiply(new BigDecimal(itemNota.getQuantidade())));
                }
            }

            NotaFiscal novaNota = notaFiscalRepository.save(notaFiscal);
            return ResponseEntity.status(201).body(novaNota);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao cadastrar a nota fiscal: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody NotaFiscal notaAtualizada) {
        try {
            return notaFiscalRepository.findById(id)
                    .<ResponseEntity<?>>map(nota -> {
                        nota.setNumeroNota(notaAtualizada.getNumeroNota());
                        nota.setDataEmissao(notaAtualizada.getDataEmissao());

                        if (notaAtualizada.getCliente() != null &&
                                notaAtualizada.getCliente().getId() != null) {
                            Cliente cliente = (Cliente) clienteRepository.findById(notaAtualizada.getCliente().getId())
                                    .orElseThrow(() -> new RuntimeException(
                                            "Cliente com ID " + notaAtualizada.getCliente().getId() + " não encontrado"));
                            nota.setCliente(cliente);
                        }

                        nota.getItens().clear();

                        if (notaAtualizada.getItens() != null && !notaAtualizada.getItens().isEmpty()) {

                            for (ItemNota itemNota : notaAtualizada.getItens()) {
                                Item item = itemRepository.findById(itemNota.getItemNota().getId())
                                        .orElseThrow(() -> new RuntimeException(
                                                "Item com ID " + itemNota.getItemNota().getId() + " não encontrado"));

                                itemNota.setItemNota(item);
                                itemNota.setNotaFiscal(nota);

                                itemNota.setValorTotal(
                                        item.getValorUnitario().multiply(new BigDecimal(itemNota.getQuantidade()))
                                );

                                nota.getItens().add(itemNota);
                            }
                        }

                        NotaFiscal notaSalva = notaFiscalRepository.save(nota);
                        return ResponseEntity.ok(notaSalva);
                    })
                    .orElseGet(() -> ResponseEntity.status(404)
                            .body("Nota Fiscal com ID " + id + " não encontrada"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar a nota fiscal: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!notaFiscalRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Nota Fiscal com ID " + id + " não encontrada");
        }

        notaFiscalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
