package tp.reactmobile.sae_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tp.reactmobile.sae_manager.model.Sae;
import tp.reactmobile.sae_manager.model.Ue;
import tp.reactmobile.sae_manager.repository.SaeRepository;
import tp.reactmobile.sae_manager.repository.UeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SaeService {

    private final SaeRepository saeRepository;
    private final UeRepository ueRepository;

    @Autowired
    public SaeService(SaeRepository saeRepository, UeRepository ueRepository) {
        this.saeRepository = saeRepository;
        this.ueRepository = ueRepository;
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
        if (sae.getUes() != null && !sae.getUes().isEmpty()) {
            List<Long> ueIds = sae.getUes().stream()
                    .map(Ue::getIdUe)
                    .toList();
            List<Ue> managedUes = ueRepository.findAllById(ueIds);
            sae.setUes(managedUes);
        }
        return saeRepository.save(sae);
    }

    public void deleteSae(Long id) {
        saeRepository.deleteById(id);
    }
}
