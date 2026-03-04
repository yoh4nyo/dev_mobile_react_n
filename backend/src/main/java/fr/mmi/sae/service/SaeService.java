package fr.mmi.sae.service;

import fr.mmi.sae.model.Sae;
import fr.mmi.sae.repository.SaeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaeService {

    private final SaeRepository saeRepository;

    @Autowired
    public SaeService(SaeRepository saeRepository) {
        this.saeRepository = saeRepository;
    }

    public List<Sae> getAllSaes() {
        return saeRepository.findAll();
    }

    public List<Sae> getSaesByAnnee(String annee) {
        return saeRepository.findByAnnee(annee);
    }

    public List<Sae> getSaesByDomaine(String domaine) {
        return saeRepository.findByDomaineIgnoreCase(domaine);
    }

    public List<Sae> getSaesClassement() {
        return saeRepository.findAllByOrderByNoteObtenueDesc();
    }

    public Sae addSae(Sae sae) {
        return saeRepository.save(sae);
    }
}
