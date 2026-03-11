package tp.reactmobile.sae_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tp.reactmobile.sae_manager.dto.NoteStatsResponse;
import tp.reactmobile.sae_manager.model.Sae;
import tp.reactmobile.sae_manager.service.SaeService;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public ResponseEntity<Sae> getSaeById(@PathVariable Long id) {
        Optional<Sae> sae = saeService.getSaeById(id);
        return sae.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{id}/notes/stats")
    public ResponseEntity<NoteStatsResponse> getSaeNoteStats(@PathVariable Long id) {
        Optional<NoteStatsResponse> stats = saeService.getNoteStatsBySaeId(id);
        return stats.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/annee/{annee}")
    public ResponseEntity<List<Sae>> getSaesByAnnee(@PathVariable Integer annee) {
        return new ResponseEntity<>(saeService.getSaesByAnnee(annee), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Sae> addSae(@RequestBody Sae sae) {
        Sae nouvelleSae = saeService.addSae(sae);
        return new ResponseEntity<>(nouvelleSae, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSae(@PathVariable Long id) {
        Optional<Sae> sae = saeService.getSaeById(id);
        if (sae.isPresent()) {
            saeService.deleteSae(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
