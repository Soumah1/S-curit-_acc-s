# CYB1133 – Système de contrôle d’accès sécurisé

## 📌 Description du projet

Ce projet s’inscrit dans le cadre du cours **CYB1133 – Sécurité des données et contrôle d’accès**.
L’objectif est de concevoir et modéliser un système de contrôle d’accès sécurisé pour une entreprise technologique offrant des services à une clientèle.

Le système permet de déterminer si un utilisateur peut accéder à une ressource donnée en fonction de plusieurs mécanismes de sécurité.

---

## 🎯 Objectifs

* Modéliser un système de contrôle d’accès réaliste
* Implémenter et combiner les modèles :

  * **DAC (Discretionary Access Control)**
  * **RBAC (Role-Based Access Control)**
  * **MAC (Mandatory Access Control)**
* Ajouter un mécanisme de **double authentification (2FA)**
* Analyser les décisions d’accès dans différents scénarios

---

## 🏢 Contexte

Le système est conçu pour une entreprise technologique manipulant des ressources sensibles :

* Code source
* Données clients
* Documentation interne
* Serveurs et infrastructure
* Journaux de sécurité

Les accès doivent être strictement contrôlés selon le rôle, le niveau de sécurité et les permissions accordées.

---

## 🔐 Modèles de sécurité utilisés

### 🔹 RBAC (Role-Based Access Control)

Les permissions sont attribuées en fonction du rôle de l’utilisateur (admin, développeur, manager, etc.).

### 🔹 MAC (Mandatory Access Control)

Les ressources sont classifiées (Public, Interne, Confidentiel, Très confidentiel) et l’accès dépend du niveau d’habilitation de l’utilisateur.

### 🔹 DAC (Discretionary Access Control)

Le propriétaire d’une ressource peut accorder ou retirer des permissions à d’autres utilisateurs.

### 🔹 2FA (Double authentification)

Un code OTP est requis pour les accès sensibles (base de données, gestion des utilisateurs, etc.).

---

## 🧠 Logique de décision d’accès

Le système applique une vérification en plusieurs étapes :

1. Vérification du niveau de sécurité (**MAC**)
2. Vérification des permissions liées au rôle (**RBAC**)
3. Vérification des droits délégués (**DAC**)
4. Vérification du code OTP si nécessaire (**2FA**)

➡️ L’accès est autorisé uniquement si toutes les conditions sont satisfaites.

---

## 📁 Structure du projet

```bash
cyb1133-access-control-system/
├── README.md
├── .gitignore
├── docs/
│   ├── rapport.pdf
│   ├── modelisation/
│   │   ├── rbac.png
│   │   ├── mac.png
│   │   ├── dac.png
│   │   ├── sequence.png
│   │   ├── uml_classes.png
│   ├── annexes/
│       ├── tables_rbac.docx
│       ├── tables_mac.docx
│       ├── tables_dac.docx
```

---

## 📊 Contenu des dossiers

* **docs/modelisation/** : diagrammes (RBAC, MAC, DAC, UML, séquence)
* **docs/annexes/** : tableaux détaillés utilisés dans la modélisation
* **docs/rapport.pdf** : rapport final du projet

---

## 🧪 Scénarios couverts

Le système permet de traiter différents cas :

* Accès autorisé (toutes les conditions validées)
* Refus par MAC (niveau insuffisant)
* Refus par RBAC (rôle non autorisé)
* Refus par DAC (permission non accordée)
* Refus par 2FA (OTP invalide)
* Accès limité aux données propres du client
* Accès restreint par projet

---

## 👥 Auteurs

* Abdoulaye Soumah
* Ramatoulaye bah
* Ndèye Oulimata Badiane

---

##  Remarque

Ce projet met l’accent sur la **modélisation des mécanismes de sécurité** et leur cohérence dans un contexte organisationnel réel.
