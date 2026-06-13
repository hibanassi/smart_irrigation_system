package com.iot.irrigation.controller;

import com.iot.irrigation.dto.SensorDataDTO;
import com.iot.irrigation.model.SensorData;
import com.iot.irrigation.repository.SensorDataRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/sensor")
@CrossOrigin("*")
public class SensorController {

    private final SensorDataRepository repository;

    public SensorController(SensorDataRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/data")
    public String receiveData(@RequestBody SensorDataDTO data) {

        SensorData sensorData = new SensorData();

        sensorData.setTemperature(data.getTemperature());
        sensorData.setSoilMoisture(data.getSoilMoisture());

        sensorData.setTimestamp(LocalDateTime.now());

        sensorData.setPumpStatus("OFF");
        sensorData.setAutoMode(true);

        repository.save(sensorData);

        return "Data saved successfully";
    }
}