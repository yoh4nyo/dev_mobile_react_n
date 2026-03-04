package fr.mmi.sae.config;

import fr.mmi.sae.model.Sae;
import fr.mmi.sae.repository.SaeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(SaeRepository repository) {
        return args -> {
            // Création de fausses données de test

            Sae sae1 = new Sae();
            sae1.setTitre("Création d'un site e-commerce");
            sae1.setAnnee("MMI2");
            sae1.setSemestre("S3");
            sae1.setDomaine("Développement");
            sae1.setCompetences("Développer pour le Web, Intégrer, Gérer une base de données");
            sae1.setAuteurs("Alice Martin, Bob Dupont");
            sae1.setDateDebut(LocalDate.of(2025, 9, 15));
            sae1.setDateFin(LocalDate.of(2025, 12, 10));
            sae1.setNoteObtenue(16.5);
            sae1.setTauxReussite(95.0);
            sae1.setUeCorrespondante("UE 3.1, UE 3.2");
            sae1.setLienSite("https://projet1-mmi.fr");
            sae1.setLienProduction("https://github.com/mmi/projet1");
            sae1.setImagesUrl(Arrays.asList("https://picsum.photos/400/300", "https://picsum.photos/400/301"));

            Sae sae2 = new Sae();
            sae2.setTitre("Réalisation d'un court-métrage 3D");
            sae2.setAnnee("MMI3");
            sae2.setSemestre("S5");
            sae2.setDomaine("3D");
            sae2.setCompetences("Modélisation 3D, Montage, Scénarisation");
            sae2.setAuteurs("Charlie Chap, Diane Leroi");
            sae2.setDateDebut(LocalDate.of(2025, 10, 1));
            sae2.setDateFin(LocalDate.of(2026, 1, 20));
            sae2.setNoteObtenue(18.0);
            sae2.setTauxReussite(100.0);
            sae2.setUeCorrespondante("UE 5.3");
            sae2.setLienSite("https://courtmetrage-mmi.fr");
            sae2.setLienProduction("https://github.com/mmi/courtmetrage-assets");
            sae2.setImagesUrl(Arrays.asList("https://picsum.photos/400/302", "https://picsum.photos/400/303"));

            Sae sae3 = new Sae();
            sae3.setTitre("Identité Visuelle pour Mairie");
            sae3.setAnnee("MMI2");
            sae3.setSemestre("S4");
            sae3.setDomaine("Création");
            sae3.setCompetences("Design Graphique, Typographie, Charte Graphique");
            sae3.setAuteurs("Emma Laurent, Fabrice Durand");
            sae3.setDateDebut(LocalDate.of(2026, 2, 1));
            sae3.setDateFin(LocalDate.of(2026, 6, 15));
            sae3.setNoteObtenue(14.5);
            sae3.setTauxReussite(88.0);
            sae3.setUeCorrespondante("UE 4.1");
            sae3.setLienSite("https://portfolio-emma.fr/sae_mairie");
            sae3.setLienProduction("");
            sae3.setImagesUrl(Arrays.asList("https://picsum.photos/400/304"));

            // Sauvegarde dans la base
            repository.saveAll(Arrays.asList(sae1, sae2, sae3));
        };
    }
}
