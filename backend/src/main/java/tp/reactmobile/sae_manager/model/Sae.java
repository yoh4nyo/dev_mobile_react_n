package tp.reactmobile.sae_manager.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Sae {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSae;

    private String nom;

    @Column(columnDefinition = "TEXT")
    private String contexte;

    private Integer semestre;
    private Integer annee;
    private String referent;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String tauxReussite;

    // ============================================
    // Relations ManyToMany (Tables pivots simples)
    // ============================================

    // Table SAE_UE
    @ManyToMany
    @JoinTable(name = "sae_ue", joinColumns = @JoinColumn(name = "id_sae"), inverseJoinColumns = @JoinColumn(name = "id_ue"))
    private List<Ue> ues = new ArrayList<>();

    // Table SAE_Ressource
    @ManyToMany
    @JoinTable(name = "sae_ressource", joinColumns = @JoinColumn(name = "id_sae"), inverseJoinColumns = @JoinColumn(name = "id_ressource"))
    private List<Ressource> ressources = new ArrayList<>();

    // Table SAE_AC
    @ManyToMany
    @JoinTable(name = "sae_ac", joinColumns = @JoinColumn(name = "id_sae"), inverseJoinColumns = @JoinColumn(name = "id_ac"))
    private List<Ac> apprentissagesCritiques = new ArrayList<>();

    // ============================================
    // Relation OneToMany (Table pivot avec attributs)
    // ============================================
    @OneToMany(mappedBy = "sae", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SaeGrp> saeGroupes = new ArrayList<>();

    // ============================================
    // Getters / Setters
    // ============================================

    public Long getIdSae() {
        return idSae;
    }

    public void setIdSae(Long idSae) {
        this.idSae = idSae;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getContexte() {
        return contexte;
    }

    public void setContexte(String contexte) {
        this.contexte = contexte;
    }

    public Integer getSemestre() {
        return semestre;
    }

    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }

    public Integer getAnnee() {
        return annee;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public String getReferent() {
        return referent;
    }

    public void setReferent(String referent) {
        this.referent = referent;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getTauxReussite() {
        return tauxReussite;
    }

    public void setTauxReussite(String tauxReussite) {
        this.tauxReussite = tauxReussite;
    }

    public List<Ue> getUes() {
        return ues;
    }

    public void setUes(List<Ue> ues) {
        this.ues = ues;
    }

    public List<Ressource> getRessources() {
        return ressources;
    }

    public void setRessources(List<Ressource> ressources) {
        this.ressources = ressources;
    }

    public List<Ac> getApprentissagesCritiques() {
        return apprentissagesCritiques;
    }

    public void setApprentissagesCritiques(List<Ac> apprentissagesCritiques) {
        this.apprentissagesCritiques = apprentissagesCritiques;
    }

    public List<SaeGrp> getSaeGroupes() {
        return saeGroupes;
    }

    public void setSaeGroupes(List<SaeGrp> saeGroupes) {
        this.saeGroupes = saeGroupes;
    }
}
