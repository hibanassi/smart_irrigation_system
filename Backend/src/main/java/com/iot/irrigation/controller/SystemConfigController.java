package com.iot.irrigation.controller;

import com.iot.irrigation.model.SystemConfig;
import com.iot.irrigation.repository.SystemConfigRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class SystemConfigController {

    private final SystemConfigRepository repository;

    public SystemConfigController(SystemConfigRepository repository) {
        this.repository = repository;
    }

    private SystemConfig getConfig() {

        if(repository.count() == 0){

            SystemConfig config = new SystemConfig();
            config.setAutoMode(true);
            config.setPumpStatus("OFF");

            return repository.save(config);
        }

        return repository.findAll().get(0);
    }

    @PostMapping("/pump/on")
    public SystemConfig pumpOn(){

        SystemConfig config = getConfig();

        config.setPumpStatus("ON");

        return repository.save(config);
    }

    @PostMapping("/pump/off")
    public SystemConfig pumpOff(){

        SystemConfig config = getConfig();

        config.setPumpStatus("OFF");

        return repository.save(config);
    }

    @PostMapping("/auto/enable")
    public SystemConfig enableAuto(){

        SystemConfig config = getConfig();

        config.setAutoMode(true);

        return repository.save(config);
    }

    @PostMapping("/auto/disable")
    public SystemConfig disableAuto(){

        SystemConfig config = getConfig();

        config.setAutoMode(false);

        return repository.save(config);
    }

    @GetMapping("/config")
    public SystemConfig getConfiguration(){

        return getConfig();
    }
}