package com.github.renanbreier.nf.repository;

import com.github.renanbreier.nf.model.ItemNota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemNotaRepository extends JpaRepository<ItemNota, Long> {
    List<ItemNota> findByNotaFiscalId(Long notaFiscalId);
}
