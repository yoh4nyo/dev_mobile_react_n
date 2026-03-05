package tp.reactmobile.sae_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tp.reactmobile.sae_manager.model.Sae;
import java.util.List;

@Repository
public interface SaeRepository extends JpaRepository<Sae, Long> {
    List<Sae> findByAnnee(Integer annee);
}
