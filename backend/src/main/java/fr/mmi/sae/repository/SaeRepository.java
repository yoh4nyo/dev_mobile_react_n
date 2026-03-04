package fr.mmi.sae.repository;

import fr.mmi.sae.model.Sae;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaeRepository extends JpaRepository<Sae, Long> {
    
    // Pour filtrer par année
    List<Sae> findByAnnee(String annee);
    
    // Pour filtrer par domaine
    List<Sae> findByDomaineIgnoreCase(String domaine);
    
    // Pour le classement (note décroissante)
    List<Sae> findAllByOrderByNoteObtenueDesc();
}
