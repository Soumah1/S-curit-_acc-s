# 1. Modélisation du système

## 1.1 Contexte de l’entreprise

Dans le cadre de ce projet, nous considérons une entreprise technologique fictive nommée **TechNova Services**. Cette entreprise fournit des services numériques à une clientèle variée, notamment le développement d’applications web, la maintenance de plateformes, l’hébergement de services, le support technique ainsi que la gestion de données clients.

L’entreprise manipule des ressources de différentes sensibilités : code source, documentation interne, informations clients, journaux de sécurité, comptes utilisateurs et serveurs internes.

Afin d’assurer la sécurité de ces ressources, un système de contrôle d’accès est mis en place. Celui-ci repose sur une combinaison des modèles **DAC**, **RBAC** et **MAC**, ainsi que sur un mécanisme de **double authentification (2FA)**.

---

# 2. Identification des acteurs

## 2.1 Texte

Les acteurs représentent les différentes catégories d’utilisateurs du système. Afin de simplifier la modélisation tout en conservant une structure réaliste, nous avons retenu cinq rôles principaux.

## 2.2 Tableau des acteurs

| Acteur          | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| Administrateur  | Gère l’infrastructure, les comptes et les permissions critiques             |
| Chef d’équipe   | Supervise les projets et valide certaines opérations                         |
| Technicien      | Réalise les opérations techniques et le support                             |
| Stagiaire       | Effectue des tâches limitées sous supervision                               |
| Client          | Accède uniquement à ses propres données via un portail                      |

---

# 3. Identification des ressources

## 3.1 Texte

Les ressources sont les éléments protégés par le système. Elles possèdent différents niveaux de sensibilité.

## 3.2 Tableau des ressources

| Ressource                | Description                                                             |
|------------------------|-------------------------------------------------------------------------|
| Code source            | Fichiers de développement des applications                              |
| Documentation interne  | Guides techniques et procédures internes                                |
| Dossiers clients       | Informations relatives aux projets clients                              |
| Base de données clients| Données sensibles des clients                                           |
| Serveurs               | Infrastructure technique                                                |
| Journaux de sécurité   | Historique des accès et incidents                                       |
| Comptes utilisateurs   | Informations d’authentification                                         |
| Sauvegardes            | Copies de sécurité des données                                          |
| Portail client         | Interface d’accès pour les clients                                      |

---

# 4. Identification des actions

## 4.1 Texte

Les actions représentent les opérations possibles sur les ressources. Afin de simplifier le système, un ensemble réduit d’actions a été retenu.

## 4.2 Tableau des actions

| Action           | Description                                 |
|------------------|---------------------------------------------|
| read             | Lire une ressource                          |
| write            | Modifier une ressource                      |
| create           | Ajouter une nouvelle ressource              |
| delete           | Supprimer une ressource                     |
| manage_roles     | Gérer les rôles et permissions              |
| manage_system    | Gérer les éléments critiques du système     |

---

# 5. Modélisation RBAC

## 5.1 Texte

Le modèle RBAC attribue les permissions en fonction du rôle de l’utilisateur.

## 5.2 Tableau RBAC

| Rôle            | Read | Write | Create | Delete | Manage Roles | Manage System |
|-----------------|-----:|------:|-------:|-------:|-------------:|--------------:|
| Administrateur  | Oui  | Oui   | Oui    | Oui    | Oui          | Oui           |
| Chef d’équipe   | Oui  | Oui   | Oui    | Non    | Non          | Non           |
| Technicien      | Oui  | Oui   | Non    | Non    | Non          | Non           |
| Stagiaire       | Limité | Limité | Non | Non    | Non          | Non           |
| Client          | Limité | Non  | Non    | Non    | Non          | Non           |

## 5.3 Interprétation

Les permissions critiques sont réservées à l’administrateur. Les autres rôles disposent d’un accès limité selon leurs responsabilités.

---

# 6. Modélisation MAC

## 6.1 Texte

Le modèle MAC repose sur des niveaux de classification des ressources et des niveaux d’habilitation des utilisateurs.

## 6.2 Niveaux de classification

| Niveau            | Description                      |
|-----------------|----------------------------------|
| Public          | Accessible sans restriction      |
| Interne         | Réservé aux employés             |
| Confidentiel    | Données sensibles                |
| Très confidentiel | Données critiques              |

## 6.3 Niveaux d’habilitation

| Acteur         | Niveau |
|----------------|--------|
| Administrateur | Très confidentiel |
| Chef d’équipe  | Confidentiel |
| Technicien     | Interne |
| Stagiaire      | Public / Interne |
| Client         | Public (ses données uniquement) |

## 6.4 Règle

Un utilisateur ne peut accéder à une ressource que si son niveau est suffisant.

---

# 7. Modélisation DAC

## 7.1 Texte

Le modèle DAC permet au propriétaire d’une ressource de déléguer des accès.

## 7.2 Exemple

| Utilisateur        | Read | Write | Delete |
|--------------------|-----:|------:|-------:|
| Chef (propriétaire)| Oui  | Oui   | Oui    |
| Technicien         | Oui  | Oui   | Non    |
| Stagiaire          | Non  | Non   | Non    |
| Client             | Limité | Non | Non    |

---

# 8. Modélisation du 2FA

## 8.1 Texte

Le système intègre un mécanisme de double authentification pour renforcer la sécurité.

Le 2FA est appliqué selon deux niveaux :

- Obligatoire pour l’administrateur (toutes les connexions)
- Obligatoire pour les actions sensibles
- Optionnel pour certains employés
- Non requis pour les actions simples

## 8.2 Tableau 2FA

| Cas d’accès                          | 2FA |
|-------------------------------------|-----|
| Connexion administrateur            | Oui |
| Gestion des comptes                 | Oui |
| Accès base de données               | Oui |
| Suppression critique                | Oui |
| Actions normales technicien         | Optionnel |
| Lecture simple                      | Non |
| Accès client                        | Non |

---

# 9. Intégration des modèles

## 9.1 Texte

La décision d’accès repose sur une vérification en plusieurs étapes :

1. Vérification MAC
2. Vérification RBAC
3. Vérification DAC
4. Vérification 2FA si nécessaire

## 9.2 Tableau de décision

| Vérification | Refus si |
|------------|---------|
| MAC        | Niveau insuffisant |
| RBAC       | Rôle insuffisant |
| DAC        | Permission absente |
| 2FA        | Code invalide |

---

# 10. Cas de figure

## 10.1 Exemples

- Accès autorisé
- Refus MAC
- Refus RBAC
- Refus DAC
- Refus 2FA

---

# 11. Conclusion

Cette modélisation propose un système de sécurité basé sur une approche multicouche combinant RBAC, MAC et DAC, renforcée par le 2FA.

La simplification des rôles et des actions permet une meilleure lisibilité, tout en conservant un niveau de sécurité réaliste et cohérent avec un environnement organisationnel manipulant des données sensibles.
