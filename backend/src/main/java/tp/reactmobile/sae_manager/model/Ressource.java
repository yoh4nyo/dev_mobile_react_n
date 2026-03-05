package tp.reactmobile.sae_manager.model;

import jakarta.persistence.*;

@Entity
public class Ressource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRessource;

    private String nom;
    private String prof;

    public Long getIdRessource() {
        return idRessource;
    }

    public void setIdRessource(Long idRessource) {
        this.idRessource = idRessource;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getProf() {
        return prof;
    }

    public void setProf(String prof) {
        this.prof = prof;
    }
}
