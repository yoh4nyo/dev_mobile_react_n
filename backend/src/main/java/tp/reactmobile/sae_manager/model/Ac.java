package tp.reactmobile.sae_manager.model;

import jakarta.persistence.*;

@Entity
public class Ac {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAc;

    private String nom;

    public Long getIdAc() {
        return idAc;
    }

    public void setIdAc(Long idAc) {
        this.idAc = idAc;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}
