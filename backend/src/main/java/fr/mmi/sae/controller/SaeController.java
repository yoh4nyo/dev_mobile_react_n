package fr.mmi.sae.controller;

import fr.mmi.sae.model.Sae;
import fr.mmi.sae.service.SaeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saes")
@CrossOrigin(origins = "*") // Autoriser les requêtes CORS depuis React Native
public class SaeController {

    private final SaeService saeService;

    @Autowired
    public SaeController(SaeService saeService) {
        this.saeService = saeService;
    }

    // Récupérer toutes les SAé
    @GetMapping
    public ResponseEntity<List<Sae>> getAllSaes() {
        return new ResponseEntity<>(saeService.getAllSaes(), HttpStatus.OK);
    }

    // Filtrer par année (ex: /api/saes/annee/MMI2)
    @GetMapping("/annee/{annee}")
    public ResponseEntity<List<Sae>> getSaesByAnnee(@PathVariable String annee) {
        return new ResponseEntity<>(saeService.getSaesByAnnee(annee), HttpStatus.OK);
    }

    // Filtrer par domaine (ex: /api/saes/domaine/Dev)
    @GetMapping("/domaine/{domaine}")
    public ResponseEntity<List<Sae>> getSaesByDomaine(@PathVariable String domaine) {
        return new ResponseEntity<>(saeService.getSaesByDomaine(domaine), HttpStatus.OK);
    }

    // Obtenir le classement (toutes les SAé par note décroissante)
    @GetMapping("/classement")
    public ResponseEntity<List<Sae>> getClassement() {
        return new ResponseEntity<>(saeService.getSaesClassement(), HttpStatus.OK);
    }

    // Ajouter une nouvelle SAé
    @PostMapping
    public ResponseEntity<Sae> addSae(@RequestBody Sae sae) {
        Sae nouvelleSae = saeService.addSae(sae);
        return new ResponseEntity<>(nouvelleSae, HttpStatus.CREATED);
    }
}
