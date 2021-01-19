package com.lab2.repository;

import com.lab2.model.Spa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpaRepository extends JpaRepository<Spa, Long> {

    List<Spa> findSpasByNameAndPrice(String name, Double price);

    List<Spa> findSpasByNameOrPrice(String name, Double price);

}
