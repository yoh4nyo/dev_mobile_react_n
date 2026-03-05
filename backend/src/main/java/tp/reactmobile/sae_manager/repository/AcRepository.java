package tp.reactmobile.sae_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tp.reactmobile.sae_manager.model.Ac;

@Repository
public interface AcRepository extends JpaRepository<Ac, Long> {
}
