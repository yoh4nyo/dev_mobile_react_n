package tp.reactmobile.sae_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tp.reactmobile.sae_manager.dto.NoteStatsResponse;
import tp.reactmobile.sae_manager.model.Sae;
import tp.reactmobile.sae_manager.model.Ue;
import tp.reactmobile.sae_manager.repository.SaeGrpRepository;
import tp.reactmobile.sae_manager.repository.SaeRepository;
import tp.reactmobile.sae_manager.repository.UeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SaeService {

    private final SaeRepository saeRepository;
    private final UeRepository ueRepository;
    private final SaeGrpRepository saeGrpRepository;

    @Autowired
    public SaeService(SaeRepository saeRepository, UeRepository ueRepository, SaeGrpRepository saeGrpRepository) {
        this.saeRepository = saeRepository;
        this.ueRepository = ueRepository;
        this.saeGrpRepository = saeGrpRepository;
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

    public Optional<NoteStatsResponse> getNoteStatsBySaeId(Long id) {
        if (!saeRepository.existsById(id)) {
            return Optional.empty();
        }

        Object[] noteRange = saeGrpRepository.findNoteRangeBySaeId(id);
        Integer minNote = toInteger(noteRange[0]);
        Integer maxNote = toInteger(noteRange[1]);

        return Optional.of(new NoteStatsResponse(minNote, maxNote));
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

    private Integer toInteger(Object value) {
        if (value == null) {
            return null;
        }
        return ((Number) value).intValue();
    }
}
