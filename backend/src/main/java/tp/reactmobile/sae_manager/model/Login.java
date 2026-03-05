package tp.reactmobile.sae_manager.model;

import jakarta.persistence.*;

@Entity
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLogin;

    private String identifiant;
    private String password;

    public Long getIdLogin() {
        return idLogin;
    }

    public void setIdLogin(Long idLogin) {
        this.idLogin = idLogin;
    }

    public String getIdentifiant() {
        return identifiant;
    }

    public void setIdentifiant(String identifiant) {
        this.identifiant = identifiant;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
