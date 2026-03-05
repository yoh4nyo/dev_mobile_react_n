package tp.reactmobile.sae_manager.model;

import jakarta.persistence.*;

@Entity
public class Ue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUe;

    private String nom;

    public Long getIdUe() {
        return idUe;
    }

    public void setIdUe(Long idUe) {
        this.idUe = idUe;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}
