     PARTIE 4 - Scénarios de test
Dans cette partie, on a testé le système avec plusieurs situations pour vérifier comment il réagit selon les règles définies (MAC, RBAC, DAC et 2FA). Les scénarios ont été exécutés dans le programme afin d’observer le comportement réel du système.
Chaque scénario représente un cas réel où un utilisateur tente d’accéder à une ressource.

Scénario 1 : Accès administrateur avec 2FA
Dans ce scénario, un administrateur système tente d’accéder à la base de données clients, qui est une ressource très sensible.
Le système vérifie d’abord le niveau de sécurité (MAC), puis les permissions du rôle (RBAC), et enfin la propriété de la ressource (DAC). Toutes les conditions sont respectées.
Cependant, comme la ressource est sensible, une authentification à deux facteurs est demandée. Une fois le code validé, l’accès est autorisé.
Donc ici, on voit que même si tout est correct, le 2FA ajoute une sécurité supplémentaire.

Scénario 2 : Refus à cause du MAC
Un stagiaire tente d’accéder à une ressource classifiée comme confidentielle.
Le système refuse directement l’accès dès la première étape, car son niveau d’habilitation est trop faible.
Cela montre que le modèle MAC bloque l’accès avant même de vérifier les autres règles.

Scénario 3 : Refus à cause du RBAC
Dans ce cas, un développeur tente d’effectuer une action qui ne fait pas partie de ses permissions.
Même si son niveau de sécurité est suffisant, son rôle ne lui permet pas de faire cette action.
Le système refuse donc l’accès à l’étape RBAC.

Scénario 4 : Refus à cause du DAC
Un technicien support tente d’écrire sur une ressource interne.
Le système accepte le niveau de sécurité et les permissions du rôle, mais refuse l’accès car l’utilisateur n’est pas autorisé dans la liste d’accès (ACL).
Cela montre que même si tout semble correct, le DAC peut encore bloquer l’accès.

Scénario 5 : Accès autorisé grâce au DAC
Le même utilisateur tente cette fois de lire la ressource.
Cette action est autorisée dans l’ACL, donc le système accepte l’accès.
On voit ici que le DAC permet de donner des permissions spécifiques à certains utilisateurs.
