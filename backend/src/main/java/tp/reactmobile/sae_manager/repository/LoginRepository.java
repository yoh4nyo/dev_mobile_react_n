package tp.reactmobile.sae_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tp.reactmobile.sae_manager.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
}
