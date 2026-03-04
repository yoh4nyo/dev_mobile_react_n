package fr.mmi.sae.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Sae {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String annee; // ex: MMI2, MMI3
    private String semestre;
    private String domaine;
    
    @Column(columnDefinition = "TEXT")
    private String competences;
    
    @Column(columnDefinition = "TEXT")
    private String auteurs;
    
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Double noteObtenue;
    private Double tauxReussite;
    private String ueCorrespondante;
    
    private String lienSite;
    private String lienProduction;

    @ElementCollection
    private List<String> imagesUrl;

    // Constructeur par défaut
    public Sae() {
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getAnnee() { return annee; }
    public void setAnnee(String annee) { this.annee = annee; }

    public String getSemestre() { return semestre; }
    public void setSemestre(String semestre) { this.semestre = semestre; }

    public String getDomaine() { return domaine; }
    public void setDomaine(String domaine) { this.domaine = domaine; }

    public String getCompetences() { return competences; }
    public void setCompetences(String competences) { this.competences = competences; }

    public String getAuteurs() { return auteurs; }
    public void setAuteurs(String auteurs) { this.auteurs = auteurs; }

    public LocalDate getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDate dateDebut) { this.dateDebut = dateDebut; }

    public LocalDate getDateFin() { return dateFin; }
    public void setDateFin(LocalDate dateFin) { this.dateFin = dateFin; }

    public Double getNoteObtenue() { return noteObtenue; }
    public void setNoteObtenue(Double noteObtenue) { this.noteObtenue = noteObtenue; }

    public Double getTauxReussite() { return tauxReussite; }
    public void setTauxReussite(Double tauxReussite) { this.tauxReussite = tauxReussite; }

    public String getUeCorrespondante() { return ueCorrespondante; }
    public void setUeCorrespondante(String ueCorrespondante) { this.ueCorrespondante = ueCorrespondante; }

    public String getLienSite() { return lienSite; }
    public void setLienSite(String lienSite) { this.lienSite = lienSite; }

    public String getLienProduction() { return lienProduction; }
    public void setLienProduction(String lienProduction) { this.lienProduction = lienProduction; }

    public List<String> getImagesUrl() { return imagesUrl; }
    public void setImagesUrl(List<String> imagesUrl) { this.imagesUrl = imagesUrl; }
}
