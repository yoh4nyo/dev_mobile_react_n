package tp.reactmobile.sae_manager.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "sae_grp")
public class SaeGrp {

    @EmbeddedId
    private SaeGrpId id = new SaeGrpId();

    @ManyToOne
    @MapsId("idSae")
    @JoinColumn(name = "id_sae", referencedColumnName = "idSae")
    @JsonIgnore // Pour éviter les boucles infinies lors du parse JSON
    private Sae sae;

    @ManyToOne
    @MapsId("idGrp")
    @JoinColumn(name = "id_grp", referencedColumnName = "idGrp")
    private Groupe groupe;

    private String lienSite;
    private String lienCode;

    // Getters and Setters
    public SaeGrpId getId() {
        return id;
    }

    public void setId(SaeGrpId id) {
        this.id = id;
    }

    public Sae getSae() {
        return sae;
    }

    public void setSae(Sae sae) {
        this.sae = sae;
    }

    public Groupe getGroupe() {
        return groupe;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
    }

    public String getLienSite() {
        return lienSite;
    }

    public void setLienSite(String lienSite) {
        this.lienSite = lienSite;
    }

    public String getLienCode() {
        return lienCode;
    }

    public void setLienCode(String lienCode) {
        this.lienCode = lienCode;
    }
}
