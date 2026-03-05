package tp.reactmobile.sae_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tp.reactmobile.sae_manager.model.Sae;
import tp.reactmobile.sae_manager.repository.SaeRepository;

import java.util.List;
import java.util.Optional;

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

    public List<Sae> getSaesByAnnee(Integer annee) {
        return saeRepository.findByAnnee(annee);
    }

    public Optional<Sae> getSaeById(Long id) {
        return saeRepository.findById(id);
    }

    public Sae addSae(Sae sae) {
        return saeRepository.save(sae);
    }
}
