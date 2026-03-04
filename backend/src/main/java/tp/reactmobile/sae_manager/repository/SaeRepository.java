package tp.reactmobile.sae_manager.repository;

import tp.reactmobile.sae_manager.model.Sae;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaeRepository extends JpaRepository<Sae, Long> {

    List<Sae> findByAnnee(String annee);

    List<Sae> findByDomaineIgnoreCase(String domaine);

    List<Sae> findAllByOrderByNoteObtenueDesc();
}
