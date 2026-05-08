package com.dyqanioptikes.backend.controller;

import com.dyqanioptikes.backend.models.DetajetPorosise;
import com.dyqanioptikes.backend.repository.DetajetPorosiseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detajet-porosise")
@CrossOrigin(origins = "http://localhost:3000")
public class DetajetPorosiseController {

    @Autowired
    private DetajetPorosiseRepository detajetRepository;

    @GetMapping
    public List<DetajetPorosise> getAll() {
        return detajetRepository.findAll();
    }

    @GetMapping("/porosia/{id}")
    public List<DetajetPorosise> getByPorosia(@PathVariable Integer id) {
        return detajetRepository.findByPorosia_PorosiId(id);
    }

    @PostMapping
    public DetajetPorosise shto(@RequestBody DetajetPorosise detaj) {
        return detajetRepository.save(detaj);
    }

    @DeleteMapping("/{id}")
    public void fshij(@PathVariable Integer id) {
        detajetRepository.deleteById(id);
    }
}