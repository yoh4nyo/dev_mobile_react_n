package tp.reactmobile.sae_manager.model;

import jakarta.persistence.*;

@Entity
public class Groupe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idGrp;

    private Integer numeroGroupe;
    private String nom;
    private String prenom;
    private Integer note;

    public Long getIdGrp() {
        return idGrp;
    }

    public void setIdGrp(Long idGrp) {
        this.idGrp = idGrp;
    }

    public Integer getNumeroGroupe() {
        return numeroGroupe;
    }

    public void setNumeroGroupe(Integer numeroGroupe) {
        this.numeroGroupe = numeroGroupe;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }
}
