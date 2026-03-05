package tp.reactmobile.sae_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tp.reactmobile.sae_manager.model.Ue;

@Repository
public interface UeRepository extends JpaRepository<Ue, Long> {
}
