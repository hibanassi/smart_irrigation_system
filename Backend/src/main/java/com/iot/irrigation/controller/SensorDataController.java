package com.iot.irrigation.controller;

import com.iot.irrigation.model.SensorData;
import com.iot.irrigation.repository.SensorDataRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/sensor")
@CrossOrigin("*")
public class SensorDataController {

    private final SensorDataRepository repository;

    public SensorDataController(SensorDataRepository repository) {
        this.repository = repository;
    }

    // ESP32 envoie les données ici
    @PostMapping("/add")
    public SensorData addData(@RequestBody SensorData data) {

        data.setTimestamp(LocalDateTime.now());

        return repository.save(data);
    }

    // Mobile récupère la dernière donnée
    @GetMapping("/latest")
    public SensorData getLatest() {
        return repository.findAll()
                .stream()
                .reduce((first, second) -> second)
                .orElse(null);
    }
    @GetMapping("/all")
    public java.util.List<SensorData> getAllData() {
        return repository.findAll();
    }
}