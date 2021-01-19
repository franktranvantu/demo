package com.lab2.controller;

import com.lab2.model.Spa;
import com.lab2.repository.SpaRepository;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/spa")
public class SpaRestController {

    @Autowired
    private SpaRepository spaRepository;

    @GetMapping
    public List<Spa> getAllSpa() {
        return spaRepository.findAll();
    }

    @GetMapping("/search")
    public List<Spa> searchSpa(String name, String price) {
        if (StringUtils.isNoneBlank(name) && NumberUtils.isParsable(price)) {
            return spaRepository.findSpasByNameAndPrice(name, Double.parseDouble(price));
        } else if (StringUtils.isBlank(name) && StringUtils.isBlank(price)) {
            return getAllSpa();
        }
        Double p = StringUtils.isBlank(price) ? null : Double.parseDouble(price);
        return spaRepository.findSpasByNameOrPrice(name, p);
    }

    @GetMapping(value = "/{id}")
    public Spa getSpa(@PathVariable("id") Long id) {
        return spaRepository.getOne(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Spa createSpa(@RequestBody Spa spa) {
        return spaRepository.save(spa);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Spa updateSpa(@RequestBody Spa spa) {
        return spaRepository.save(spa);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteSpa(@PathVariable("id") Long id) {
        Spa spa = spaRepository.getOne(id);
        spaRepository.delete(spa);
    }
}
