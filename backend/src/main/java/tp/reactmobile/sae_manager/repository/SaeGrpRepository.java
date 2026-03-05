package tp.reactmobile.sae_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tp.reactmobile.sae_manager.model.SaeGrp;
import tp.reactmobile.sae_manager.model.SaeGrpId;

@Repository
public interface SaeGrpRepository extends JpaRepository<SaeGrp, SaeGrpId> {
}
