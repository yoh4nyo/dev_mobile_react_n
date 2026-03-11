package tp.reactmobile.sae_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tp.reactmobile.sae_manager.model.SaeGrp;
import tp.reactmobile.sae_manager.model.SaeGrpId;

@Repository
public interface SaeGrpRepository extends JpaRepository<SaeGrp, SaeGrpId> {

	@Query("""
			select min(sg.groupe.note), max(sg.groupe.note)
			from SaeGrp sg
			where sg.sae.idSae = :saeId
			""")
	Object[] findNoteRangeBySaeId(@Param("saeId") Long saeId);
}
