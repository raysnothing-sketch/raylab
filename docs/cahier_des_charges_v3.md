<USER_REQUEST>
# RAYLAB — CAHIER DES CHARGES FONCTIONNEL ET TECHNIQUE
## Version 3.0 — Document de référence du projet

**Nom du projet :** RayLab  
**Signature :** Learn. Build. Secure. Become.  
**Site actuel :** https://raylab.pages.dev  
**Version du document :** 3.0  
**Statut :** Spécification de référence — conception et développement  
**Langue principale :** Français  
**Langues futures :** Anglais et allemand  

---

# 1. VISION GÉNÉRALE

## 1.1 Présentation

RayLab est une plateforme éducative et un environnement d'apprentissage pratique spécialisé dans l'informatique, les systèmes, les réseaux, la programmation et la cybersécurité.

La plateforme doit permettre à un apprenant de passer progressivement de la découverte des concepts à leur maîtrise pratique, à travers :

- Des cursus structurés et progressifs.
- Des cours théoriques et techniques.
- Des exercices interactifs.
- Des évaluations et des quiz.
- Des projets concrets.
- Des laboratoires virtuels sécurisés.
- Des parcours de spécialisation.
- Un accompagnement vers les certifications et l'emploi.

RayLab ne doit pas être une simple bibliothèque de tutoriels. Son objectif est de former des personnes capables de comprendre, concevoir, construire, sécuriser et démontrer leurs compétences.

## 1.2 Mission

Construire un environnement dans lequel chaque apprenant peut développer des compétences techniques solides, les mettre en pratique et constituer progressivement un portfolio professionnel.

## 1.3 Signature

**Learn. Build. Secure. Become.**

Cette signature représente les quatre piliers pédagogiques :

1. **Learn :** comprendre les concepts et les fondamentaux.
2. **Build :** construire des solutions et réaliser des projets.
3. **Secure :** apprendre à protéger, auditer et analyser les systèmes.
4. **Become :** transformer les compétences en opportunités professionnelles.

## 1.4 Public cible

- Débutants souhaitant apprendre l'informatique.
- Étudiants en informatique et cybersécurité.
- Développeurs souhaitant renforcer leurs compétences.
- Administrateurs systèmes et réseaux.
- Futurs analystes SOC et spécialistes Blue Team.
- Personnes intéressées par le pentesting autorisé.
- Personnes souhaitant s'orienter vers la forensique numérique.
- Candidats préparant des certifications professionnelles.

## 1.5 Positionnement

RayLab doit se positionner comme une académie technique moderne, accessible et orientée vers la pratique.

Ses caractéristiques principales :

- Une pédagogie progressive.
- Une approche fondée sur les projets.
- Une orientation professionnelle.
- Une architecture technique évolutive.
- Une attention particulière à la sécurité.
- Une expérience utilisateur premium.

---

# 2. ÉTAT ACTUEL DU PROJET

## 2.1 Référence fonctionnelle

Le site https://raylab.pages.dev constitue la référence visuelle et fonctionnelle initiale de la V3.

Il présente notamment :

- Une page d'accueil.
- Une présentation de la vision et de la méthodologie.
- Un catalogue de cursus.
- Un laboratoire virtuel.
- Une section consacrée aux projets.
- Un centre de carrière et de certifications.
- Des informations sur le fonctionnement de la plateforme.

Le site affiche actuellement plusieurs cursus consacrés à Python, Linux, aux réseaux, à la cybersécurité défensive et offensive ainsi qu'à la préparation professionnelle.

Il présente également des projets pratiques autour du SOC, de l'audit Linux, du réseau, de l'authentification sécurisée et de la sécurité des applications.

**Important :** la présence d'une fonctionnalité dans l'interface ne signifie pas nécessairement que son architecture technique, sa sécurité ou son fonctionnement en production ont été validés. Chaque fonctionnalité existante devra faire l'objet d'un audit avant d'être considérée comme pleinement opérationnelle.

## 2.2 Travail de consolidation

La V3 devra notamment :

- Harmoniser les statistiques et le nombre de cursus affichés.
- Uniformiser les niveaux, durées et volumes de cours.
- Vérifier l'encodage des caractères français.
- Clarifier les fonctionnalités réellement disponibles dans le laboratoire virtuel.
- Vérifier les mécanismes d'isolation des environnements d'exécution.
- Harmoniser la navigation et les composants visuels.
- Améliorer la cohérence entre le catalogue, les projets et les parcours pédagogiques.

## 2.3 Classification des fonctionnalités

Chaque fonctionnalité devra posséder un statut explicite :

| Statut | Signification |
|---|---|
| Existante | Disponible et fonctionnelle |
| À vérifier | Présente mais non validée techniquement |
| À corriger | Fonctionnelle avec des défauts identifiés |
| À améliorer | Existe mais nécessite une évolution |
| Planifiée | Prévue dans une prochaine version |
| Future | Vision à long terme |

Cette classification devra être conservée dans la documentation technique et le suivi du développement.

---

# 3. ARCHITECTURE GÉNÉRALE DE LA PLATEFORME

RayLab sera organisée autour de plusieurs espaces interconnectés.

## 3.1 Espaces principaux

1. Site public.
2. Académies et cursus.
3. Espace personnel de l'apprenant.
4. Laboratoire virtuel.
5. Centre de projets.
6. Centre de carrière.
7. Espace certifications.
8. Administration.
9. Studio de création pédagogique.
10. Éventuellement, espace communautaire.

## 3.2 Navigation principale

La navigation publique devra comporter :

- Accueil.
- Vision.
- Académies.
- Laboratoire.
- Projets.
- Carrière.
- Certifications.
- Connexion.

Une fois connecté, l'utilisateur devra accéder à son tableau de bord personnel.

## 3.3 Architecture logique

L'architecture devra séparer clairement :

- L'interface utilisateur.
- La logique métier.
- Les services applicatifs.
- L'authentification.
- La gestion des autorisations.
- La persistance des données.
- Les services de laboratoire.
- Les outils d'administration.

Les fonctionnalités sensibles ne devront jamais dépendre uniquement de contrôles réalisés dans le navigateur.

---

# 4. IDENTITÉ VISUELLE ET DESIGN SYSTEM

## 4.1 Direction artistique

**Direction retenue : Dark Technical Editorial.**

L'interface doit évoquer un environnement professionnel d'ingénierie, de recherche et de cybersécurité.

Elle doit être :

- Sobre.
- Élégante.
- Moderne.
- Technique.
- Lisible.
- Immersive sans surcharge visuelle.

Éviter les clichés visuels de la cybersécurité : écrans remplis de code décoratif, crânes, masques de hackers, néons excessifs et effets de piratage artificiels.

## 4.2 Palette de couleurs

| Élément | Couleur |
|---|---|
| Obsidian | `#101216` |
| Graphite | `#20252C` |
| Ivory | `#F3F0E8` |
| Muted Gold | `#C6A66B` |
| Texte secondaire | Gris neutre accessible |
| Succès | Vert fonctionnel |
| Avertissement | Ambre |
| Erreur | Rouge accessible |

L'or doit être utilisé avec parcimonie pour les éléments importants, les indicateurs de progression et certains détails de marque.

## 4.3 Typographie

- Interface : Geist ou Inter.
- Titres : Geist avec une hiérarchie nette.
- Code : JetBrains Mono.
- Textes pédagogiques : police très lisible et confortable.

## 4.4 Composants

Le design system devra définir :

- Boutons.
- Champs de formulaire.
- Cartes de cours.
- Cartes de projets.
- Badges de compétences.
- Indicateurs de progression.
- Menus.
- Modales.
- Tableaux.
- Onglets.
- Alertes.
- Notifications.
- Éditeurs de code.
- Blocs de terminal.
- Blocs de documentation.
- Composants de quiz.
- Composants de navigation pédagogique.

## 4.5 Responsive design

L'interface devra fonctionner sur :

- Smartphones.
- Tablettes.
- Ordinateurs portables.
- Écrans de bureau.

L'expérience mobile ne devra pas être une simple réduction de l'interface desktop.

## 4.6 Accessibilité

Prévoir :

- Contrastes suffisants.
- Navigation au clavier.
- États de focus visibles.
- Libellés explicites.
- Textes alternatifs pour les images.
- Structure sémantique.
- Compatibilité avec les lecteurs d'écran.
- Respect des préférences de réduction des animations.

## 4.7 Thèmes

Le thème sombre sera le thème principal.

Un thème clair cohérent pourra être ajouté sans modifier la structure fonctionnelle.

---

# 5. PAGE D'ACCUEIL

## 5.1 Objectif

Présenter immédiatement la mission de RayLab, sa proposition de valeur et les possibilités offertes.

## 5.2 Sections

1. Header et navigation.
2. Hero section.
3. Présentation de la philosophie RayLab.
4. Méthode Learn. Build. Secure. Become.
5. Présentation des académies.
6. Projets représentatifs.
7. Aperçu du laboratoire.
8. Parcours professionnels.
9. Statistiques vérifiées.
10. Appel à l'inscription.
11. FAQ.
12. Footer.

## 5.3 Exigences

Le visiteur doit pouvoir :

- Comprendre la mission de RayLab.
- Explorer les cursus.
- Consulter les projets.
- Découvrir le laboratoire.
- Comprendre les possibilités professionnelles.
- Créer un compte.

Les statistiques affichées devront être calculées à partir de données fiables ou explicitement présentées comme des objectifs.

---

# 6. ACADÉMIES ET PARCOURS PÉDAGOGIQUES

## 6.1 Organisation

Les contenus seront organisés selon la hiérarchie suivante :

**Académie → Parcours → Cours → Modules → Leçons → Ressources et exercices.**

Un parcours pourra réunir plusieurs cours.

Un cours pourra contenir plusieurs modules.

Un module pourra contenir plusieurs leçons.

Une leçon pourra comporter des ressources, exercices, quiz et prérequis.

## 6.2 Académie Python

Objectif : permettre à l'apprenant de passer des bases de la programmation à la réalisation de programmes structurés.

### Niveau 1 — Fondamentaux

- Installation et environnement.
- Syntaxe.
- Variables.
- Types de données.
- Opérateurs.
- Conditions.
- Boucles.
- Entrées et sorties.
- Fonctions.

### Niveau 2 — Programmation structurée

- Collections.
- Listes et dictionnaires.
- Tuples et ensembles.
- Manipulation de chaînes.
- Fichiers.
- Gestion des exceptions.
- Modules et packages.

### Niveau 3 — Programmation orientée objet

- Classes et objets.
- Attributs et méthodes.
- Encapsulation.
- Héritage.
- Polymorphisme.
- Composition.
- Méthodes spéciales.

### Niveau 4 — Python avancé

- Itérateurs et générateurs.
- Décorateurs.
- Context managers.
- Typage.
- Tests.
- Journalisation.
- Environnements virtuels.
- Gestion des dépendances.
- Architecture de projets.

### Niveau 5 — Python professionnel

- API.
- HTTP.
- Bases de données.
- Automatisation.
- Traitement de données.
- Scripts systèmes.
- Tests automatisés.
- Qualité du code.
- Déploiement.

### Niveau 6 — Python appliqué à la sécurité

- Analyse de fichiers.
- Analyse de journaux.
- Automatisation de tâches SOC.
- Analyse de trafic réseau.
- Détection de comportements suspects.
- Outils d'audit défensif.
- Collecte et traitement d'artefacts.

## 6.3 Académie Linux et systèmes

Contenu :

- Introduction aux systèmes d'exploitation.
- Installation et configuration Linux.
- Arborescence.
- Permissions.
- Utilisateurs et groupes.
- Processus.
- Services.
- Gestion des paquets.
- Bash.
- Shell scripting.
- Journaux système.
- SSH.
- Gestion réseau.
- Administration.
- Sauvegardes.
- Supervision.
- Durcissement.
- Automatisation.

## 6.4 Académie Réseaux

Contenu :

- Modèle OSI.
- TCP/IP.
- IPv4 et IPv6.
- Sous-réseaux.
- Routage.
- Commutation.
- DNS.
- DHCP.
- HTTP et HTTPS.
- TLS.
- TCP et UDP.
- VLAN.
- Pare-feu.
- VPN.
- Analyse de paquets.
- Diagnostic réseau.
- Architecture réseau sécurisée.

## 6.5 Académie Cybersécurité défensive — Blue Team

Contenu :

- Fondamentaux de la sécurité.
- Gestion des risques.
- Gestion des vulnérabilités.
- Sécurité des systèmes.
- Sécurité réseau.
- Journaux et télémétrie.
- SIEM.
- Détection d'incidents.
- Analyse d'alertes.
- Threat intelligence.
- MITRE ATT&CK.
- Réponse aux incidents.
- Investigation.
- Rapport technique.
- Remédiation.

### Parcours SOC

1. Comprendre un SOC.
2. Collecter des événements.
3. Normaliser les journaux.
4. Identifier des indicateurs suspects.
5. Corréler les événements.
6. Analyser une alerte.
7. Documenter un incident.
8. Proposer une remédiation.

## 6.6 Académie Pentesting et sécurité offensive encadrée

L'objectif est de comprendre les vulnérabilités, de savoir les identifier et de produire des rapports d'audit professionnels.

Contenu :

- Fondamentaux du pentesting.
- Méthodologie d'audit.
- Reconnaissance autorisée.
- Énumération.
- Analyse de services.
- Sécurité Web.
- OWASP Top 10.
- Contrôle des accès.
- Analyse des vulnérabilités.
- Validation en laboratoire.
- Rapport de pentest.
- Recommandations de correction.

Les exercices offensifs devront être réalisés dans des environnements explicitement autorisés et isolés.

Les contenus relatifs aux malwares, aux mécanismes de persistance, aux reverse shells, à l'exfiltration ou au contournement des protections devront être orientés vers l'analyse défensive, la simulation contrôlée, la détection et la remédiation. La plateforme ne devra pas devenir un espace de diffusion d'outils furtifs utilisables contre des tiers.

## 6.7 Académie Forensique numérique

Contenu :

- Principes de la forensique.
- Préservation des preuves.
- Chaîne de conservation.
- Intégrité et empreintes cryptographiques.
- Acquisition d'images disque.
- Analyse de systèmes de fichiers.
- Artefacts Windows.
- Artefacts Linux.
- Analyse de journaux.
- Métadonnées.
- Analyse mémoire.
- Chronologie des événements.
- Investigation d'incidents.
- Documentation des résultats.
- Rédaction de rapports.

## 6.8 Académie Cloud et DevSecOps

Contenu :

- Fondamentaux du cloud.
- Infrastructure as Code.
- Conteneurs.
- Docker.
- CI/CD.
- Gestion des secrets.
- Contrôle des dépendances.
- Analyse statique.
- Sécurité des pipelines.
- Gestion des identités.
- Surveillance.
- Journalisation.
- Durcissement.
- Déploiement sécurisé.

## 6.9 Académie Intelligence artificielle appliquée

Évolution future :

- Fondamentaux de l'IA.
- Python pour l'IA.
- Utilisation d'API.
- Traitement de données.
- Automatisation intelligente.
- Analyse assistée de journaux.
- IA appliquée à la cybersécurité.
- Limites et risques des systèmes génératifs.

## 6.10 Système de niveaux

Chaque cours devra définir :

- Niveau débutant.
- Niveau intermédiaire.
- Niveau avancé.
- Prérequis.
- Objectifs pédagogiques.
- Durée indicative.
- Compétences acquises.
- Évaluations.
- Projet final.

Les niveaux devront être cohérents à l'échelle de toute la plateforme.

---

# 7. SYSTÈME DE LEÇONS

## 7.1 Structure d'une leçon

Une leçon pourra contenir :

1. Titre.
2. Objectifs.
3. Prérequis.
4. Introduction.
5. Explication détaillée.
6. Exemples.
7. Illustrations.
8. Blocs de code.
9. Exercices.
10. Ressources complémentaires.
11. Résumé.
12. Évaluation.
13. Prochaine étape.

## 7.2 Expérience de lecture

L'interface devra proposer :

- Navigation entre les leçons.
- Indicateur de progression.
- Sommaire.
- Mode lecture confortable.
- Mise en évidence du code.
- Copie des exemples.
- Notes personnelles.
- Favoris.
- Reprise automatique.

## 7.3 Ressources

Les leçons pourront intégrer :

- Documents PDF.
- Images.
- Diagrammes.
- Liens externes.
- Dépôts GitHub.
- Vidéos.
- Exemples de code.
- Fichiers d'exercice.

Les ressources devront être associées à leur leçon et disposer de métadonnées.

---

# 8. EXERCICES ET ÉVALUATIONS

## 8.1 Types d'exercices

- Questions à choix multiples.
- Vrai ou faux.
- Réponses courtes.
- Complétion de code.
- Analyse de sortie.
- Correction d'erreurs.
- Études de cas.
- Exercices pratiques.
- Mini-projets.

## 8.2 Quiz

Chaque quiz devra permettre :

- La définition du nombre de questions.
- Le paramétrage du score minimal.
- Le mélange éventuel des questions.
- La correction.
- L'explication des réponses.
- L'enregistrement des tentatives.
- Le suivi des résultats.

## 8.3 Évaluation

Les évaluations devront distinguer :

- Connaissance théorique.
- Compréhension.
- Application.
- Résolution de problèmes.
- Qualité de réalisation.
- Capacité à expliquer une solution.

## 8.4 Historique

L'apprenant devra pouvoir consulter ses tentatives et observer son évolution.

---

# 9. LABORATOIRE VIRTUEL

## 9.1 Vision

Le laboratoire constitue l'un des éléments différenciateurs majeurs de RayLab.

Il doit permettre de mettre en pratique les notions apprises sans imposer à l'apprenant de configurer systématiquement un environnement local.

## 9.2 Modules envisagés

### Python Playground

- Éditeur de code.
- Exécution de programmes autorisés.
- Affichage des résultats.
- Messages d'erreur.
- Exemples préconfigurés.
- Exercices guidés.
- Réinitialisation de l'environnement.

### Network Lab

- Compréhension des connexions TCP.
- Simulation de paquets.
- Analyse de trames.
- Visualisation de protocoles.
- Exercices de diagnostic réseau.

### SOC Lab

- Consultation de journaux fictifs.
- Recherche d'indicateurs suspects.
- Analyse de chronologies.
- Corrélation d'événements.
- Détection d'incidents.
- Création de règles de détection.

### Web Security Lab

- Applications volontairement vulnérables.
- Exercices OWASP.
- Identification des vulnérabilités.
- Analyse des conséquences.
- Correction du code.
- Validation de la correction.

### Digital Forensics Lab

- Fichiers d'investigation synthétiques.
- Journaux fictifs.
- Images disque d'entraînement.
- Analyse de métadonnées.
- Reconstitution de chronologies.
- Rapports d'investigation.

## 9.3 Architecture d'exécution

Les codes soumis par les apprenants ne devront jamais être exécutés directement sur le serveur principal de l'application.

Les environnements devront être :

- Isolés.
- Éphémères.
- Limités en ressources.
- Limités dans le temps.
- Dépourvus de secrets de production.
- Sans accès réseau par défaut.
- Réinitialisables.
- Surveillés.

Une architecture dédiée devra être étudiée pour l'exécution de code : conteneurs fortement isolés ou technologies de sandboxing adaptées.

L'exécution de code non fiable devra faire l'objet d'une analyse de sécurité spécifique avant sa mise en production.

## 9.4 Restrictions

- Pas d'accès arbitraire aux fichiers de l'hôte.
- Pas d'accès aux secrets applicatifs.
- Pas de réseau sortant par défaut.
- Pas de scan de systèmes tiers.
- Pas d'attaque contre des services réels.
- Pas de persistance entre sessions sans autorisation explicite.
- Pas de possibilité de compromettre l'infrastructure principale.

## 9.5 Progression

Les exercices du laboratoire pourront être associés aux leçons et aux projets.

Une réussite pourra alimenter automatiquement la progression de l'apprenant.

---

# 10. PROJETS ET PORTFOLIO TECHNIQUE

## 10.1 Objectif

Permettre à chaque apprenant de démontrer concrètement les compétences acquises.

## 10.2 Catalogue de projets

Exemples de projets :

1. Détecteur d'incidents SOC.
2. Analyseur de journaux Linux.
3. Scanner réseau limité à un environnement autorisé.
4. Audit de configuration Linux.
5. Service d'authentification sécurisé.
6. Analyseur de fichiers suspects.
7. Outil d'analyse de métadonnées.
8. Tableau de bord de supervision.
9. Application Web sécurisée.
10. Audit de sécurité d'une application.
11. Pipeline CI/CD sécurisé.
12. Rapport d'investigation numérique.
13. Outil de détection d'anomalies.
14. Laboratoire réseau documenté.

## 10.3 Fiche projet

Chaque projet devra présenter :

- Titre.
- Description.
- Difficulté.
- Durée estimée.
- Compétences requises.
- Objectifs.
- Prérequis.
- Consignes.
- Étapes.
- Livrables.
- Critères d'évaluation.
- Ressources.
- Technologies.
- Dépôt éventuel.

## 10.4 Soumission

L'apprenant pourra :

- Décrire sa réalisation.
- Fournir un lien GitHub.
- Ajouter des captures d'écran.
- Joindre des documents.
- Expliquer ses choix techniques.
- Présenter les difficultés rencontrées.

## 10.5 Portfolio

À terme, chaque utilisateur pourra générer une page publique présentant :

- Ses projets.
- Ses compétences.
- Ses réalisations.
- Ses certifications déclarées.
- Ses parcours terminés.

La publication devra être volontaire et configurable.

---

# 11. ESPACE APPRENANT

## 11.1 Tableau de bord

Le tableau de bord devra présenter :

- Bienvenue et profil.
- Progression générale.
- Parcours en cours.
- Cours récemment consultés.
- Prochaine leçon.
- Objectifs.
- Exercices à terminer.
- Derniers résultats.
- Projets en cours.
- Activité récente.

## 11.2 Profil

Le profil pourra contenir :

- Nom d'affichage.
- Photo facultative.
- Biographie.
- Pays ou région facultatif.
- Langue préférée.
- Compétences.
- Objectifs.
- Liens professionnels facultatifs.

## 11.3 Progression

La plateforme devra suivre :

- Les parcours commencés.
- Les cours commencés.
- Les leçons terminées.
- Les exercices réalisés.
- Les résultats aux quiz.
- Les projets soumis.
- Les compétences travaillées.

La progression devra être persistante et synchronisée entre les appareils.

## 11.4 Notes et favoris

L'utilisateur pourra :

- Ajouter des notes personnelles.
- Enregistrer une leçon.
- Mettre un projet en favori.
- Consulter ses ressources enregistrées.
- Retrouver rapidement son contenu.

## 11.5 Objectifs

Le système permettra de définir :

- Un objectif d'apprentissage.
- Une date cible.
- Une fréquence souhaitée.
- Une progression.
- Un état d'avancement.

## 11.6 Gamification

Évolution prévue :

- Badges.
- Points d'expérience.
- Séries d'apprentissage.
- Jalons.
- Récompenses pédagogiques.
- Historique des accomplissements.

La gamification devra encourager la régularité et la maîtrise réelle, pas simplement le clic ou la consommation de contenu.

---

# 12. CENTRE DE CARRIÈRE

## 12.1 Objectif

Aider les apprenants à transformer leurs compétences en opportunités professionnelles.

## 12.2 CV Builder

Fonctionnalités envisagées :

- Création de CV.
- Gestion des expériences.
- Gestion des formations.
- Gestion des compétences.
- Gestion des projets.
- Plusieurs modèles.
- Export PDF.
- Version française.
- Version anglaise.
- Version allemande.
- Conseils de présentation ATS.

Les conseils ATS devront rester transparents et ne pas promettre une compatibilité universelle.

## 12.3 LinkedIn et personal branding

- Optimisation du titre.
- Présentation professionnelle.
- Description des compétences.
- Présentation des projets.
- Conseils de visibilité.
- Construction d'une identité professionnelle.

## 12.4 Préparation aux entretiens

- Questions techniques.
- Questions comportementales.
- Exercices de présentation.
- Simulations d'entretien.
- Méthodes de résolution de problèmes.
- Retours pédagogiques.

## 12.5 Parcours professionnels

Exemples :

- Développeur Python.
- Administrateur Linux.
- Administrateur réseau.
- Analyste SOC.
- Analyste Blue Team.
- Pentester junior.
- Analyste en forensique numérique.
- Ingénieur DevSecOps.
- Ingénieur sécurité cloud.

Chaque parcours devra préciser les compétences, les expériences pratiques et les certifications pertinentes.

---

# 13. CENTRE DE CERTIFICATIONS

## 13.1 Objectif

Centraliser les informations utiles à la préparation des certifications professionnelles.

## 13.2 Certifications à documenter

Exemples :

- CompTIA Security+.
- CompTIA Network+.
- Cisco CCNA.
- LPIC-1.
- Certifications Linux.
- Certifications cloud.
- Certifications de sécurité défensive.
- Certifications de pentesting reconnues.

Les certifications devront être présentées avec :

- Organisme.
- Niveau.
- Compétences évaluées.
- Prérequis.
- Programme officiel.
- Ressources de préparation.
- Coût indicatif vérifié.
- Durée de validité, si applicable.

RayLab ne devra jamais prétendre délivrer une certification officielle lorsqu'elle ne dispose pas de l'accréditation correspondante.

## 13.3 Suivi personnel

L'apprenant pourra :

- Ajouter une certification visée.
- Définir une date cible.
- Suivre sa préparation.
- Enregistrer une certification obtenue.
- Ajouter une preuve facultative.

---

# 14. ESPACE COMMUNAUTAIRE — ÉVOLUTION FUTURE

Cette fonctionnalité n'est pas nécessaire au premier MVP.

Elle pourra comprendre :

- Espaces de discussion.
- Questions et réponses.
- Groupes d'apprentissage.
- Défis collectifs.
- Partage de projets.
- Retours entre apprenants.
- Événements pédagogiques.
- Mentorat.

Des mécanismes de modération devront être définis avant le lancement.

La communauté devra rester centrée sur l'apprentissage et la collaboration technique.

---

# 15. ASSISTANT PÉDAGOGIQUE IA — ÉVOLUTION FUTURE

## 15.1 Objectif

Proposer une assistance pédagogique contextualisée.

## 15.2 Fonctionnalités envisagées

- Explication de notions.
- Reformulation de cours.
- Aide à la compréhension d'erreurs.
- Indices progressifs pour les exercices.
- Génération de questions d'entraînement.
- Suggestions de ressources.
- Aide à la documentation de projets.
- Orientation vers des parcours adaptés.

## 15.3 Limites

L'assistant devra :

- Distinguer les faits des hypothèses.
- Ne pas inventer des résultats d'évaluation.
- Ne pas fournir les réponses aux exercices sans objectif pédagogique.
- Respecter les droits d'accès.
- Ne pas exposer les données d'autres utilisateurs.
- Être encadré dans les usages de cybersécurité.

Les réponses générées ne remplaceront pas la validation humaine des contenus pédagogiques importants.

---

# 16. STUDIO DE GESTION DES CONTENUS

## 16.1 Objectif

Fournir aux administrateurs et éditeurs un espace permettant de gérer les contenus sans modifier directement le code source.

## 16.2 Fonctionnalités

- Création de parcours.
- Création de cours.
- Gestion des modules.
- Création de leçons.
- Gestion des ressources.
- Création d'exercices.
- Création de quiz.
- Gestion des projets.
- Gestion des prérequis.
- Publication et dépublication.
- Prévisualisation.
- Historique des modifications.

## 16.3 Workflow éditorial

Un contenu pourra suivre les états :

Brouillon → En révision → Validé → Publié → Archivé.

## 16.4 Gestion des rôles

Rôles possibles :

- Super administrateur.
- Administrateur.
- Éditeur.
- Formateur.
- Apprenant.

Les permissions devront être contrôlées côté serveur.

---

# 17. ADMINISTRATION

## 17.1 Tableau de bord administratif

Indicateurs :

- Nombre d'utilisateurs.
- Inscriptions récentes.
- Utilisateurs actifs.
- Parcours populaires.
- Cours consultés.
- Progression moyenne.
- Exercices réalisés.
- Projets soumis.
- Activité de la plateforme.

## 17.2 Gestion des utilisateurs

- Consultation.
- Recherche.
- Filtrage.
- Modification des rôles autorisés.
- Suspension.
- Réactivation.
- Gestion des accès.

Les actions sensibles devront être journalisées.

## 17.3 Gestion du contenu

Les administrateurs devront pouvoir gérer tous les éléments pédagogiques depuis un espace dédié.

## 17.4 Journal d'activité

Les événements importants devront être enregistrés :

- Connexion.
- Changement de rôle.
- Publication.
- Modification de contenu.
- Soumission de projet.
- Action administrative sensible.

Les journaux devront être protégés contre les accès non autorisés et ne pas contenir de secrets.

---

# 18. ARCHITECTURE TECHNIQUE

## 18.1 Principes

L'architecture doit être :

- Modulaire.
- Sécurisée.
- Maintenable.
- Évolutive.
- Documentée.
- Compatible avec les contraintes de coût du projet.

Il faut éviter de complexifier prématurément l'infrastructure.

## 18.2 Frontend

Le frontend devra prendre en charge :

- Interface publique.
- Authentification côté interface.
- Espace apprenant.
- Académies.
- Cours.
- Exercices.
- Projets.
- Administration.
- Internationalisation.

La technologie exacte devra être confirmée en fonction du code existant et de la stratégie de déploiement.

## 18.3 Backend

Le backend sera responsable de :

- La logique métier.
- La validation des entrées.
- L'autorisation.
- La gestion des utilisateurs.
- La gestion pédagogique.
- La progression.
- Les soumissions.
- Les événements.
- Les interactions avec la base de données.

Les opérations sensibles devront être exécutées dans un environnement serveur de confiance.

## 18.4 Base de données — Turso

**Technologie retenue : Turso, compatible SQLite/libSQL.**

Le modèle de données devra rester compatible avec SQLite/libSQL.

Règles :

- Identifiants UUID ou ULID stockés en TEXT.
- Dates UTC au format ISO 8601 stockées en TEXT.
- Booléens représentés par INTEGER avec contraintes CHECK.
- Clés étrangères.
- Tables de liaison explicites.
- Index sur les colonnes de recherche et de relation.
- Transactions pour les opérations multiétapes.
- `PRAGMA foreign_keys = ON` sur chaque connexion concernée.

Les contraintes devront être testées dans un environnement SQLite/libSQL compatible avant déploiement.

Les migrations devront être versionnées et documentées.

## 18.5 Authentification

Turso ne remplace pas un fournisseur d'authentification complet.

La plateforme devra donc utiliser un fournisseur externe adapté.

La table utilisateur conservera une référence `auth_subject` permettant d'associer le compte applicatif à l'identité du fournisseur.

Prévoir :

- Inscription.
- Connexion.
- Déconnexion.
- Réinitialisation du mot de passe selon le fournisseur.
- Vérification de l'adresse e-mail.
- Gestion des sessions.
- Protection des comptes.
- Suppression ou désactivation du compte.

## 18.6 Autorisations

Les permissions devront être vérifiées côté serveur.

Exemples :

- Un apprenant ne peut pas modifier le contenu pédagogique.
- Un éditeur ne peut pas s'attribuer des privilèges administratifs.
- Un utilisateur ne peut consulter que ses données privées.
- Une soumission de projet ne peut être modifiée que par son propriétaire ou un rôle autorisé.

La présence d'une clé étrangère en base de données ne constitue pas une preuve d'autorisation.

## 18.7 Stockage de fichiers

Les fichiers pourront être stockés dans un service adapté.

Prévoir :

- Images.
- Documents.
- Ressources pédagogiques.
- Pièces jointes de projets.
- Livrables.

Les accès privés devront être protégés par des mécanismes d'autorisation ou des URL temporaires.

## 18.8 API

Les API devront :

- Valider les entrées.
- Contrôler les permissions.
- Appliquer des limites de fréquence.
- Gérer les erreurs.
- Documenter les formats.
- Éviter l'exposition des informations internes.

---

# 19. MODÈLE DE DONNÉES

Le schéma initial devra couvrir les entités suivantes.

## 19.1 Identité et rôles

- `users`
- `roles`
- `user_roles`

## 19.2 Contenus pédagogiques

- `learning_paths`
- `courses`
- `path_courses`
- `modules`
- `lessons`
- `lesson_resources`
- `skills`
- `course_skills`
- `lesson_prerequisites`

## 19.3 Progression

- `path_enrollments`
- `lesson_progress`
- `user_notes`
- `bookmarks`

## 19.4 Exercices et évaluations

- `exercises`
- `exercise_attempts`
- `quizzes`
- `quiz_questions`
- `quiz_attempts`

## 19.5 Projets

- `projects`
- `project_skills`
- `project_submissions`
- `project_bookmarks`

## 19.6 Carrière et certifications

- `career_paths`
- `career_path_skills`
- `certifications`
- `user_certifications`
- `user_goals`

## 19.7 Gamification et activité

- `achievements`
- `user_achievements`
- `activity_events`

## 19.8 Évolutions futures

Les modules communautaires, l'assistance IA, les laboratoires et les fonctions de portfolio pourront nécessiter des tables supplémentaires.

Ces extensions devront être introduites par migrations indépendantes.

Le schéma SQL et sa documentation technique constituent les documents complémentaires de référence.

---

# 20. SÉCURITÉ ET PROTECTION DES DONNÉES

## 20.1 Sécurité applicative

La plateforme devra intégrer :

- Validation côté serveur.
- Contrôle des autorisations.
- Protection contre les injections.
- Protection contre les attaques XSS.
- Protection CSRF lorsque nécessaire.
- Gestion sécurisée des sessions.
- Politique de sécurité des contenus.
- Limitation des requêtes.
- Gestion des secrets.
- Journalisation des actions sensibles.

## 20.2 Données personnelles

La plateforme devra appliquer les principes de minimisation des données et de protection dès la conception.

Prévoir :

- Politique de confidentialité.
- Gestion du consentement lorsque nécessaire.
- Accès aux données personnelles.
- Rectification.
- Suppression.
- Durées de conservation.
- Sécurisation des fichiers.
- Documentation des traitements.

La conformité au RGPD devra être vérifiée selon les traitements réellement mis en œuvre.

## 20.3 Sécurité du laboratoire

Le laboratoire devra disposer de contrôles spécifiques :

- Isolation des exécutions.
- Limites CPU et mémoire.
- Limites de temps.
- Quotas.
- Absence de secrets.
- Réseau désactivé par défaut.
- Nettoyage des environnements.
- Surveillance.
- Protection contre les abus.

## 20.4 Politique d'utilisation

RayLab doit promouvoir une cybersécurité responsable.

Les activités offensives doivent rester limitées aux systèmes appartenant à l'apprenant ou pour lesquels il dispose d'une autorisation explicite.

---

# 21. INTERNATIONALISATION

## 21.1 Langues

Ordre de priorité :

1. Français.
2. Anglais.
3. Allemand.

## 21.2 Exigences

- Interface traduisible.
- Contenus associés à une langue.
- Gestion des textes multilingues.
- Formatage localisé des dates.
- Formatage localisé des nombres.
- URLs cohérentes.
- Possibilité de choisir sa langue.

Les traductions techniques devront conserver une terminologie cohérente.

---

# 22. PERFORMANCE ET QUALITÉ

## 22.1 Performance

Objectifs :

- Chargement rapide des pages.
- Optimisation des images.
- Chargement différé des ressources.
- Limitation du JavaScript inutile.
- Pagination des listes importantes.
- Mise en cache appropriée.

## 22.2 SEO

Prévoir :

- Métadonnées.
- Titres structurés.
- URLs lisibles.
- Sitemap.
- Robots.txt.
- Open Graph.
- Données structurées lorsque pertinentes.

## 22.3 Qualité technique

Le projet devra disposer de :

- Tests unitaires.
- Tests d'intégration.
- Tests de parcours critiques.
- Vérifications de sécurité.
- Vérification des migrations.
- Gestion des erreurs.
- Journalisation.
- Documentation de déploiement.

---

# 23. MAQUETTES ET ÉCRANS À CONCEVOIR

Les écrans suivants devront faire l'objet de maquettes cohérentes avec le design system.

1. Landing Page.
2. Vision et présentation.
3. Catalogue des académies.
4. Catalogue des parcours.
5. Page de cours.
6. Tableau de bord apprenant.
7. Académie Python.
8. Lecteur de leçon.
9. Espace d'exercice.
10. Interface de quiz.
11. Laboratoire virtuel.
12. Catalogue de projets.
13. Détail d'un projet.
14. Soumission de projet.
15. Centre de carrière.
16. Roadmap professionnelle.
17. Centre de certifications.
18. Profil utilisateur.
19. Paramètres.
20. Connexion et inscription.
21. Tableau de bord administrateur.
22. Studio de gestion des contenus.
23. Interface communautaire future.
24. Assistant pédagogique futur.

Chaque maquette devra préciser les états principaux : normal, chargement, vide, erreur, succès et accès refusé lorsque cela s'applique.

---

# 24. ROADMAP DE DÉVELOPPEMENT

## Phase 0 — Audit et consolidation

Objectif : établir une base fiable.

- Audit du site existant.
- Inventaire des fonctionnalités.
- Vérification du code.
- Vérification des routes.
- Vérification de l'encodage.
- Audit de sécurité initial.
- Validation de l'architecture.
- Harmonisation du catalogue.

**Livrable :** état des lieux technique et fonctionnel.

## Phase 1 — Fondations de la plateforme

- Mise en place du design system.
- Architecture frontend/backend.
- Authentification.
- Base de données.
- Gestion des rôles.
- Navigation.
- Gestion des erreurs.
- Structure multilingue.

**Livrable :** plateforme fonctionnelle avec comptes utilisateurs.

## Phase 2 — Académie et espace apprenant

- Catalogue.
- Parcours.
- Cours.
- Modules.
- Leçons.
- Ressources.
- Progression.
- Notes.
- Favoris.
- Tableau de bord.

**Livrable :** expérience pédagogique complète de base.

## Phase 3 — Évaluations et projets

- Exercices.
- Quiz.
- Tentatives.
- Corrections.
- Catalogue de projets.
- Soumissions.
- Portfolio initial.

**Livrable :** apprentissage mesurable et démonstration des compétences.

## Phase 4 — Laboratoire virtuel sécurisé

- Architecture isolée.
- Python Playground.
- Exercices guidés.
- Simulations réseau.
- Journaux SOC.
- Environnements d'entraînement.
- Contrôles de sécurité.

**Livrable :** laboratoire utilisable dans des conditions de sécurité validées.

## Phase 5 — Carrière et certifications

- Centre de carrière.
- Parcours métiers.
- CV Builder.
- Préparation aux entretiens.
- Centre de certifications.
- Suivi des objectifs.

**Livrable :** accompagnement professionnel.

## Phase 6 — Administration avancée

- Studio de contenus.
- Gestion avancée des utilisateurs.
- Statistiques.
- Journal d'activité.
- Workflow éditorial.

**Livrable :** autonomie de gestion du contenu.

## Phase 7 — Fonctionnalités avancées

- Assistant IA.
- Communauté.
- Mentorat.
- Défis collectifs.
- Gamification avancée.
- Portfolio public enrichi.

**Livrable :** plateforme éducative enrichie.

## Phase 8 — Expansion

- Internationalisation complète.
- Nouveaux cursus.
- Partenariats.
- Événements.
- Éventuels services premium.
- Développement d'une application mobile si le besoin est confirmé.

---

# 25. PÉRIMÈTRE DU MVP

Le MVP doit être suffisamment complet pour offrir une véritable expérience d'apprentissage, sans tenter de construire immédiatement toute la vision.

## Inclus

- Site public.
- Identité visuelle cohérente.
- Inscription et connexion.
- Profils utilisateurs.
- Académies.
- Parcours.
- Cours.
- Modules et leçons.
- Ressources.
- Progression.
- Exercices simples.
- Quiz.
- Projets de départ.
- Tableau de bord.
- Administration pédagogique de base.

## Hors MVP

- Exécution arbitraire de code.
- Terminal Linux hébergé.
- Laboratoires de pentesting complexes.
- Communauté complète.
- Messagerie privée.
- Assistant IA intégré.
- Paiements.
- Application mobile native.
- Automatisation complète des certifications.

Ces éléments seront étudiés après stabilisation du socle.

---

# 26. CRITÈRES D'ACCEPTATION

Une fonctionnalité ne sera considérée comme terminée que si les conditions suivantes sont remplies :

- Elle répond à un besoin documenté.
- Son interface respecte le design system.
- Les données sont correctement persistées.
- Les autorisations sont vérifiées côté serveur.
- Les erreurs sont gérées.
- Les états de chargement sont prévus.
- Les tests nécessaires passent.
- La documentation est mise à jour.
- Les éventuels risques de sécurité sont évalués.

## Exemples de validation

### Authentification

- Un utilisateur peut créer un compte.
- Il peut se connecter et se déconnecter.
- Les sessions sont protégées.
- Les routes privées ne sont pas accessibles sans autorisation.

### Progression

- Une leçon terminée est enregistrée.
- La progression est conservée après reconnexion.
- Un utilisateur ne peut pas modifier la progression d'un autre.

### Administration

- Un éditeur peut modifier les contenus autorisés.
- Un apprenant ne peut pas accéder aux fonctions administratives.
- Les actions sensibles sont journalisées.

### Laboratoire

- Un exercice fonctionne dans l'environnement prévu.
- L'environnement est isolé.
- Les ressources sont limitées.
- L'exécution est interrompue lorsque les limites sont dépassées.
- Aucun secret de production n'est accessible.

---

# 27. INDICATEURS DE RÉUSSITE

Les indicateurs devront mesurer la qualité de l'apprentissage et la fiabilité de la plateforme.

Exemples :

- Nombre d'apprenants actifs.
- Taux de progression des parcours.
- Taux de réussite aux évaluations.
- Nombre de projets terminés.
- Nombre de projets documentés.
- Temps moyen de réalisation des parcours.
- Taux de retour des apprenants.
- Taux d'erreur technique.
- Disponibilité des services.
- Temps de chargement.
- Incidents de sécurité.

Les statistiques publiques devront être exactes et ne pas être artificiellement gonflées.

---

# 28. PRINCIPES DE GESTION DU PROJET

## 28.1 Développement progressif

Ne pas développer toutes les fonctionnalités simultanément.

Chaque phase doit fournir une base fonctionnelle testable.

## 28.2 Priorité à la fiabilité

La sécurité, la persistance des données et la qualité de l'expérience utilisateur priment sur l'accumulation de fonctionnalités.

## 28.3 Documentation

Chaque module important devra posséder :

- Une description.
- Son objectif.
- Ses dépendances.
- Ses interfaces.
- Ses règles métier.
- Ses tests.
- Ses limites connues.

## 28.4 Gestion des changements

Toute évolution importante devra préciser :

- Le besoin.
- Le périmètre.
- Les conséquences techniques.
- Les conséquences sur les données.
- Les risques.
- Les tests nécessaires.

## 28.5 Coûts

Le projet devra privilégier des solutions économiques au démarrage.

Toute nouvelle infrastructure devra être évaluée selon :

- Son coût.
- Sa sécurité.
- Sa maintenabilité.
- Sa capacité à évoluer.
- Son utilité réelle.

---

# 29. LIVRABLES ATTENDUS

Le projet RayLab V3 devra disposer des livrables suivants :

1. Cahier des charges fonctionnel et technique.
2. Audit de l'existant.
3. Architecture générale.
4. Design system.
5. Maquettes des écrans.
6. Modèle de données.
7. Schéma SQL compatible Turso.
8. Documentation API.
9. Documentation d'authentification et d'autorisations.
10. Documentation du laboratoire.
11. Plan de tests.
12. Plan de sécurité.
13. Roadmap.
14. Guide de déploiement.
15. Guide d'administration.
16. Documentation utilisateur.

---

# 30. CONCLUSION

RayLab doit évoluer d'un site éducatif spécialisé vers une véritable plateforme d'ingénierie et d'apprentissage technique.

Sa valeur ne reposera pas uniquement sur le nombre de cours disponibles, mais sur sa capacité à accompagner l'apprenant depuis les fondamentaux jusqu'à la réalisation de projets sérieux, documentés et valorisables professionnellement.

La vision à long terme repose sur une combinaison de :

- Formation technique.
- Apprentissage pratique.
- Laboratoires sécurisés.
- Projets concrets.
- Développement professionnel.
- Progression individualisée.
- Outils pédagogiques intelligents.

La construction devra rester progressive, mesurable et sécurisée.

**RayLab — Learn. Build. Secure. Become.**

*Comprendre les systèmes. Construire des solutions. Sécuriser le numérique. Devenir un professionnel capable d'agir.*
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-11-05T00:01:34+01:00.
</ADDITIONAL_METADATA>