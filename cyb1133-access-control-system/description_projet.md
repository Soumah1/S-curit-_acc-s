

# 1. Modélisation du système

## 1.1 Contexte de l’entreprise

Dans le cadre de ce projet, nous considérons une entreprise technologique fictive nommée **TechNova Services**. Cette entreprise fournit des services numériques à une clientèle variée, notamment le développement d’applications web, la maintenance de plateformes, l’hébergement de services, le support technique ainsi que la gestion de données clients.

Comme toute organisation offrant des services technologiques, l’entreprise manipule des ressources de différentes sensibilités : code source, documentation interne, informations clients, journaux de sécurité, comptes utilisateurs et serveurs internes. Il est donc nécessaire de mettre en place un système de contrôle d’accès permettant de décider de manière rigoureuse quels utilisateurs peuvent accéder à quelles ressources, selon quelles conditions et pour quelles actions.

L’objectif de la modélisation est de définir les éléments du système ainsi que les règles de sécurité qui encadrent les accès. Le système reposera sur une combinaison de trois modèles de contrôle d’accès : **DAC**, **RBAC** et **MAC**, auxquels s’ajoute un mécanisme de **double authentification (2FA)** pour les opérations sensibles. 

---

# 2. Identification des acteurs

## 2.1 Texte

Les acteurs représentent les différentes catégories d’utilisateurs pouvant interagir avec le système. Dans une entreprise de services technologiques, les accès doivent être adaptés à la fonction de chaque utilisateur, à son niveau de responsabilité et à la nature de ses tâches. Nous avons retenu les acteurs suivants : administrateur système, gestionnaire de projet, développeur, analyste en cybersécurité, technicien de support, stagiaire et client.

Chaque acteur possède un rôle spécifique dans l’organisation. Certains disposent d’un accès large aux ressources critiques, tandis que d’autres ne peuvent consulter qu’un sous-ensemble limité d’informations. Cette distinction est essentielle pour appliquer le principe du moindre privilège, selon lequel chaque utilisateur ne reçoit que les droits strictement nécessaires à l’exécution de ses fonctions.

## 2.2 Tableau des acteurs

| Acteur                    | Description                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| Administrateur système    | Gère les serveurs, l’infrastructure, les comptes utilisateurs et les permissions critiques |
| Gestionnaire de projet    | Coordonne les projets, supervise les équipes et suit les dossiers clients                  |
| Développeur               | Développe, modifie et déploie les applications de l’entreprise                             |
| Analyste en cybersécurité | Vérifie les journaux, analyse les incidents et supervise la sécurité                       |
| Technicien de support     | Assiste les clients et traite les incidents techniques                                     |
| Stagiaire                 | Intervient sur des tâches limitées sous supervision                                        |
| Client                    | Accède uniquement à ses propres services ou données via un portail dédié                   |

---

# 3. Identification des ressources

## 3.1 Texte

Les ressources sont les éléments que le système doit protéger. Dans une entreprise technologique, ces ressources peuvent être des fichiers, des bases de données, des plateformes applicatives, des journaux ou des comptes utilisateurs. Toutes les ressources n’ont pas le même niveau de sensibilité : certaines peuvent être accessibles à un grand nombre d’employés, alors que d’autres doivent être strictement réservées à un nombre restreint d’utilisateurs autorisés.

La modélisation des ressources est essentielle, car elle permet de déterminer quelles règles de contrôle d’accès devront être appliquées selon la nature de la ressource, son propriétaire, son niveau de classification et son caractère sensible ou non.

## 3.2 Tableau des ressources

| Ressource                | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| Code source              | Fichiers et modules utilisés pour développer les applications           |
| Dépôt Git                | Espace de stockage et de versionnement du code                          |
| Documentation interne    | Procédures, guides techniques, architecture et documentation interne    |
| Dossiers projets clients | Documents relatifs aux projets réalisés pour les clients                |
| Base de données clients  | Informations personnelles, techniques et contractuelles des clients     |
| Serveurs internes        | Infrastructure hébergeant les services de l’entreprise                  |
| Journaux de sécurité     | Historique des accès, événements système et incidents                   |
| Comptes utilisateurs     | Informations d’authentification, rôles et états des comptes             |
| Sauvegardes              | Copies de sécurité des données critiques                                |
| Portail client           | Interface d’accès offerte aux clients pour consulter leurs informations |

---

# 4. Identification des actions

## 4.1 Texte

Les actions correspondent aux opérations qu’un utilisateur peut vouloir effectuer sur une ressource. Une même ressource peut être consultée, modifiée, supprimée ou partagée, selon le rôle de l’utilisateur et les règles de sécurité en vigueur. La définition claire des actions permet d’associer correctement les permissions aux rôles et d’encoder les règles de décision dans le système de contrôle d’accès.

## 4.2 Tableau des actions

| Action         | Description                                 |
| -------------- | ------------------------------------------- |
| read           | Lire une ressource                          |
| write          | Modifier une ressource                      |
| create         | Créer une nouvelle ressource                |
| delete         | Supprimer une ressource                     |
| deploy         | Déployer une application ou une mise à jour |
| approve        | Approuver une opération ou une demande      |
| share          | Déléguer ou partager un accès               |
| manage_users   | Créer, modifier ou désactiver des comptes   |
| assign_roles   | Attribuer ou modifier des rôles             |
| view_logs      | Consulter les journaux de sécurité          |
| restore_backup | Restaurer une sauvegarde                    |

---

# 5. Modélisation RBAC

## 5.1 Texte

Le modèle **RBAC (Role-Based Access Control)** repose sur l’idée que les permissions sont accordées en fonction du rôle occupé par l’utilisateur dans l’organisation. Ainsi, ce n’est pas directement l’identité de la personne qui détermine ses droits, mais plutôt la fonction qu’elle exerce.

Dans notre système, chaque acteur est associé à un rôle défini. À chaque rôle correspond un ensemble de permissions permettant d’exécuter certaines actions sur les ressources. Ce modèle simplifie l’administration des accès et reflète le fonctionnement réel d’une entreprise, où les responsabilités sont réparties selon les postes occupés.

Le RBAC permet également de structurer le système selon une logique hiérarchique. Par exemple, l’administrateur système dispose des permissions les plus étendues, alors que le stagiaire et le client possèdent des droits plus limités.

## 5.2 Tableau RBAC : rôles et permissions

| Rôle                   |       Read |           Write | Create | Delete | Deploy | Approve | Share | Manage Users | Assign Roles | View Logs | Restore Backup |
| ---------------------- | ---------: | --------------: | -----: | -----: | -----: | ------: | ----: | -----------: | -----------: | --------: | -------------: |
| Administrateur système |        Oui |             Oui |    Oui |    Oui |    Oui |     Oui |   Oui |          Oui |          Oui |       Oui |            Oui |
| Gestionnaire de projet |        Oui |             Oui |    Oui |    Non |    Non |     Oui |   Oui |          Non |          Non |       Non |            Non |
| Développeur            |        Oui |             Oui |    Oui |    Non |    Oui |     Non |   Non |          Non |          Non |       Non |            Non |
| Analyste cybersécurité |        Oui |             Non |    Non |    Non |    Non |     Oui |   Non |          Non |          Non |       Oui |            Non |
| Technicien support     |        Oui |      Oui limité |    Non |    Non |    Non |     Non |   Non |          Non |          Non |       Non |            Non |
| Stagiaire              | Oui limité | Oui très limité |    Non |    Non |    Non |     Non |   Non |          Non |          Non |       Non |            Non |
| Client                 | Oui limité |             Non |    Non |    Non |    Non |     Non |   Non |          Non |          Non |       Non |            Non |

## 5.3 Texte d’interprétation

Cette matrice montre que les permissions les plus critiques, telles que la gestion des comptes, l’attribution des rôles, la restauration des sauvegardes ou la consultation des journaux de sécurité, sont réservées à des rôles hautement privilégiés. À l’inverse, les rôles moins sensibles, comme le stagiaire ou le client, ne disposent que d’un accès partiel, généralement limité à la lecture ou à des modifications très encadrées.

---

# 6. Modélisation MAC

## 6.1 Texte

Le modèle **MAC (Mandatory Access Control)** repose sur des niveaux de classification obligatoires. Chaque ressource est associée à un niveau de sensibilité, et chaque utilisateur possède un niveau d’habilitation maximal. L’accès n’est autorisé que si l’utilisateur dispose du niveau requis pour consulter ou manipuler la ressource.

Ce modèle est particulièrement pertinent dans un contexte organisationnel où certaines données, comme les bases de données clients, les journaux de sécurité ou les sauvegardes, doivent être protégées plus strictement que la documentation interne ou le site public.

Le MAC ajoute une couche de sécurité importante au système, car il empêche l’accès à des informations sensibles même dans les cas où le rôle ou une délégation donnerait autrement une impression de permission.

## 6.2 Tableau des niveaux de classification

| Niveau            | Signification                                          |
| ----------------- | ------------------------------------------------------ |
| Public            | Ressource non sensible, accessible sans risque majeur  |
| Interne           | Ressource réservée au personnel de l’entreprise        |
| Confidentiel      | Ressource sensible liée à l’entreprise ou aux clients  |
| Très confidentiel | Ressource critique nécessitant une protection maximale |

## 6.3 Tableau des niveaux d’habilitation des acteurs

| Acteur                 | Niveau d’habilitation maximal |
| ---------------------- | ----------------------------- |
| Administrateur système | Très confidentiel             |
| Analyste cybersécurité | Très confidentiel             |
| Gestionnaire de projet | Confidentiel                  |
| Développeur            | Interne / Confidentiel limité |
| Technicien support     | Interne                       |
| Stagiaire              | Public / Interne limité       |
| Client                 | Public + ses propres données  |

## 6.4 Tableau de classification des ressources

| Ressource                | Niveau de classification |
| ------------------------ | ------------------------ |
| Site vitrine public      | Public                   |
| Documentation interne    | Interne                  |
| Code source              | Interne                  |
| Dossiers projets clients | Confidentiel             |
| Comptes utilisateurs     | Confidentiel             |
| Portail client personnel | Confidentiel             |
| Base de données clients  | Très confidentiel        |
| Journaux de sécurité     | Très confidentiel        |
| Sauvegardes              | Très confidentiel        |
| Serveurs critiques       | Très confidentiel        |

## 6.5 Texte d’interprétation

La règle appliquée est la suivante : un utilisateur ne peut accéder à une ressource que si son niveau d’habilitation est supérieur ou égal au niveau de classification de cette ressource. Par exemple, un stagiaire ne peut pas accéder à la base de données clients, car celle-ci est classée “Très confidentiel”, alors que son niveau d’habilitation est limité à “Public / Interne limité”.

---

# 7. Modélisation DAC

## 7.1 Texte

Le modèle **DAC (Discretionary Access Control)** repose sur la notion de propriété de la ressource. Dans ce modèle, le propriétaire d’un fichier, d’un dossier ou d’un document peut accorder ou retirer des droits d’accès à d’autres utilisateurs.

Dans le contexte de l’entreprise, ce mécanisme est utile pour les dossiers de projet, certains documents techniques ou certains espaces collaboratifs. Par exemple, un gestionnaire de projet peut autoriser un développeur à modifier un dossier client donné, ou un développeur peut partager un document technique avec un collègue.

Le DAC introduit donc une logique de délégation d’accès, mais cette délégation reste toujours soumise aux autres mécanismes de sécurité, notamment RBAC et MAC.

## 7.2 Tableau DAC — Exemple : dossier projet client Alpha

| Utilisateur                       |       Read | Write | Delete | Share |
| --------------------------------- | ---------: | ----: | -----: | ----: |
| Gestionnaire Alpha (propriétaire) |        Oui |   Oui |    Oui |   Oui |
| Développeur Aziz                  |        Oui |   Oui |    Non |   Non |
| Support Anta                      |        Oui |   Non |    Non |   Non |
| Analyste cybersécurité            |        Oui |   Non |    Non |   Non |
| Stagiaire                         |        Non |   Non |    Non |   Non |
| Client Oumar                      | Oui limité |   Non |    Non |   Non |

## 7.3 Tableau DAC — Exemple : document technique interne

| Utilisateur              |       Read | Write | Delete | Share |
| ------------------------ | ---------: | ----: | -----: | ----: |
| Développeur propriétaire |        Oui |   Oui |    Oui |   Oui |
| Autre développeur        |        Oui |   Oui |    Non |   Non |
| Gestionnaire             |        Oui |   Non |    Non |   Non |
| Stagiaire                | Oui limité |   Non |    Non |   Non |

## 7.4 Texte d’interprétation

Ces matrices montrent que la possession d’une ressource confère des droits particuliers à son propriétaire, notamment la capacité de partager la ressource ou de déléguer certains droits à d’autres utilisateurs. Toutefois, même lorsqu’une permission est accordée par DAC, elle ne devient réellement valide que si les contraintes RBAC et MAC sont également satisfaites.

---

# 8. Modélisation du 2FA

## 8.1 Texte

Le projet impose l’ajout d’un mécanisme de **double authentification (2FA)** pour les accès sensibles. Cette mesure consiste à exiger, en plus de l’authentification classique par identifiant et mot de passe, un second facteur sous forme de code OTP pour certaines ressources critiques ou certaines actions à haut risque.

L’objectif du 2FA est de renforcer la sécurité en réduisant le risque qu’un compte compromis donne immédiatement accès à des données ou fonctions critiques. Ainsi, même si un utilisateur possède les bons droits selon MAC, RBAC et DAC, l’accès pourra être refusé si la deuxième étape d’authentification n’est pas validée.

## 8.2 Tableau des accès nécessitant 2FA

| Ressource / Action                    | 2FA requis |
| ------------------------------------- | ---------- |
| Base de données clients               | Oui        |
| Gestion des comptes utilisateurs      | Oui        |
| Attribution ou modification des rôles | Oui        |
| Consultation des journaux de sécurité | Oui        |
| Déploiement en production             | Oui        |
| Suppression d’une ressource critique  | Oui        |
| Restauration d’une sauvegarde         | Oui        |
| Lecture de la documentation interne   | Non        |
| Consultation du site public           | Non        |

---

# 9. Intégration des modèles

## 9.1 Texte

Le système de contrôle d’accès proposé ne repose pas sur un seul modèle, mais sur une combinaison de plusieurs mécanismes complémentaires. Lorsqu’un utilisateur demande l’accès à une ressource pour exécuter une action, la décision finale est prise selon une logique séquentielle :

1. Vérification du niveau de sécurité selon le modèle MAC
2. Vérification des permissions liées au rôle selon le modèle RBAC
3. Vérification des droits délégués ou accordés selon le modèle DAC
4. Vérification du code OTP si la ressource ou l’action est sensible

Cette approche multicouche permet de renforcer la sécurité globale du système et de gérer aussi bien les cas d’accès ordinaires que les accès critiques ou délégués.

## 9.2 Tableau synthèse de décision

| Vérification | Question posée                            | Refus si               |
| ------------ | ----------------------------------------- | ---------------------- |
| MAC          | L’utilisateur a-t-il le niveau requis ?   | niveau insuffisant     |
| RBAC         | Le rôle permet-il cette action ?          | rôle insuffisant       |
| DAC          | Le propriétaire a-t-il accordé ce droit ? | permission absente     |
| 2FA          | Le code OTP est-il valide ?               | OTP invalide ou absent |

---

# 10. Cas de figure à mentionner dans la modélisation

## 10.1 Texte

Pour démontrer la cohérence de la modélisation, plusieurs cas de figure peuvent être considérés :

* accès autorisé lorsque toutes les conditions sont satisfaites ;
* refus d’accès lorsque le niveau MAC est insuffisant ;
* refus d’accès lorsque le rôle ne permet pas l’action ;
* refus d’accès lorsque la permission n’a pas été déléguée ;
* refus d’accès lorsque le 2FA échoue ;
* accès limité aux propres données du client ;
* accès réservé aux membres d’un projet spécifique ;
* délégation temporaire d’accès par le propriétaire d’une ressource.

## 10.2 Tableau synthèse des cas

| Cas                     | MAC | RBAC | DAC | 2FA        | Décision |
| ----------------------- | --- | ---- | --- | ---------- | -------- |
| Accès normal conforme   | Oui | Oui  | Oui | Oui / N.A. | Autorisé |
| Niveau insuffisant      | Non | -    | -   | -          | Refusé   |
| Rôle insuffisant        | Oui | Non  | -   | -          | Refusé   |
| Permission non accordée | Oui | Oui  | Non | -          | Refusé   |
| OTP invalide            | Oui | Oui  | Oui | Non        | Refusé   |

---

# 11. Conclusion de la modélisation

La modélisation proposée permet de représenter de manière structurée le système de sécurité d’une entreprise technologique offrant des services à une clientèle. Elle identifie clairement les acteurs, les ressources, les actions, les rôles, les niveaux d’accès et les mécanismes de contrôle associés.

L’utilisation combinée des modèles **RBAC**, **MAC** et **DAC**, renforcée par un mécanisme **2FA**, permet d’assurer un contrôle d’accès cohérent, réaliste et adapté à un environnement organisationnel manipulant des données sensibles. Cette modélisation constitue la base logique sur laquelle pourra ensuite être construite l’implémentation de la fonction centrale de décision d’accès demandée dans le projet. 

---
