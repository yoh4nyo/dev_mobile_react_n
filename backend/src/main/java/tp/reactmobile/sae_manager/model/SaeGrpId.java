package tp.reactmobile.sae_manager.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class SaeGrpId implements Serializable {

    private Long idSae;
    private Long idGrp;

    public SaeGrpId() {
    }

    public SaeGrpId(Long idSae, Long idGrp) {
        this.idSae = idSae;
        this.idGrp = idGrp;
    }

    public Long getIdSae() {
        return idSae;
    }

    public void setIdSae(Long idSae) {
        this.idSae = idSae;
    }

    public Long getIdGrp() {
        return idGrp;
    }

    public void setIdGrp(Long idGrp) {
        this.idGrp = idGrp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        SaeGrpId saeGrpId = (SaeGrpId) o;
        return Objects.equals(idSae, saeGrpId.idSae) &&
                Objects.equals(idGrp, saeGrpId.idGrp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idSae, idGrp);
    }
}
