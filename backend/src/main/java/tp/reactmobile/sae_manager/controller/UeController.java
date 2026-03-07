package tp.reactmobile.sae_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tp.reactmobile.sae_manager.model.Ue;
import tp.reactmobile.sae_manager.repository.UeRepository;

import java.util.List;

@RestController
@RequestMapping("/api/ues")
@CrossOrigin(origins = "*")
public class UeController {

    private final UeRepository ueRepository;

    @Autowired
    public UeController(UeRepository ueRepository) {
        this.ueRepository = ueRepository;
    }

    @GetMapping
    public ResponseEntity<List<Ue>> getAllUes() {
        return new ResponseEntity<>(ueRepository.findAll(), HttpStatus.OK);
    }
}
