package tp.reactmobile.sae_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tp.reactmobile.sae_manager.model.Groupe;

@Repository
public interface GroupeRepository extends JpaRepository<Groupe, Long> {
}
