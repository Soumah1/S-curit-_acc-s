    PARTIE 5 - Analyse critique
Dans ce système, plusieurs modèles de contrôle d’accès sont utilisés ensemble. Cela permet de renforcer la sécurité tout en gardant une certaine flexibilité.

Le modèle RBAC est utile pour organiser les permissions selon les rôles. Cela simplifie la gestion, mais peut être limité si les rôles sont trop rigides.

Le modèle MAC est plus strict. Il protège bien les données sensibles, mais il peut bloquer des accès même quand cela pourrait être utile.

Le modèle DAC apporte de la flexibilité, car il permet de donner des accès spécifiques à certains utilisateurs. Par contre, il peut devenir risqué si les permissions sont mal gérées.

Il peut exister des conflits entre les modèles. Par exemple, un utilisateur peut avoir les permissions nécessaires selon le RBAC, mais être bloqué par le MAC si son niveau d’habilitation est insuffisant. Cela montre que le système applique une hiérarchie stricte entre les modèles.

Le 2FA ajoute une couche de sécurité supplémentaire, surtout pour les actions sensibles. Cela rend le système plus sûr, mais peut ralentir un peu l’accès.

Globalement, la combinaison de ces modèles permet d’avoir un bon équilibre entre sécurité et accessibilité. Le système est sécurisé, mais reste utilisable dans un contexte réel.

