package tp.reactmobile.sae_manager.controller;

import tp.reactmobile.sae_manager.model.Sae;
import tp.reactmobile.sae_manager.service.SaeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saes")
@CrossOrigin(origins = "*")
public class SaeController {

    private final SaeService saeService;

    @Autowired
    public SaeController(SaeService saeService) {
        this.saeService = saeService;
    }

    @GetMapping
    public ResponseEntity<List<Sae>> getAllSaes() {
        return new ResponseEntity<>(saeService.getAllSaes(), HttpStatus.OK);
    }

    @GetMapping("/annee/{annee}")
    public ResponseEntity<List<Sae>> getSaesByAnnee(@PathVariable String annee) {
        return new ResponseEntity<>(saeService.getSaesByAnnee(annee), HttpStatus.OK);
    }

    @GetMapping("/domaine/{domaine}")
    public ResponseEntity<List<Sae>> getSaesByDomaine(@PathVariable String domaine) {
        return new ResponseEntity<>(saeService.getSaesByDomaine(domaine), HttpStatus.OK);
    }

    @GetMapping("/classement")
    public ResponseEntity<List<Sae>> getClassement() {
        return new ResponseEntity<>(saeService.getSaesClassement(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Sae> addSae(@RequestBody Sae sae) {
        Sae nouvelleSae = saeService.addSae(sae);
        return new ResponseEntity<>(nouvelleSae, HttpStatus.CREATED);
    }
}
