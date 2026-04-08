import random

# ==========================================================
# 1. PARAMÉTRAGE (Données issues de la modélisation)
# ==========================================================

# Niveaux de sécurité pour le modèle MAC
MAC_LEVELS = {
    "Public": 0,
    "Interne": 1,
    "Confidentiel": 2,
    "Très confidentiel": 3
}

# Permissions associées aux rôles pour le modèle RBAC
RBAC_PERMISSIONS = {
    "Administrateur système": ["read", "write", "create", "delete", "deploy", "approve", "share", "manage_users", "assign_roles", "view_logs", "restore_backup"],
    "Gestionnaire de projet": ["read", "write", "create", "approve", "share"],
    "Développeur": ["read", "write", "create", "deploy"],
    "Analyste cybersécurité": ["read", "approve", "view_logs"],
    "Technicien support": ["read", "write"],
    "Stagiaire": ["read"],
    "Client": ["read"]
}

# Éléments qui déclenchent obligatoirement le 2FA
SENSITIVE_RESOURCES = ["Base de données clients", "Journaux de sécurité", "Sauvegardes", "Serveurs critiques"]
SENSITIVE_ACTIONS = ["manage_users", "assign_roles", "deploy", "delete", "restore_backup"]

# ==========================================================
# 2. LOGIQUE DE CONTRÔLE D'ACCÈS (Étudiant B)
# ==========================================================

def verifier_mac(user, resource):
    """Vérifie la hiérarchie des niveaux de sécurité."""
    u_lvl = MAC_LEVELS[user['habilitation']]
    r_lvl = MAC_LEVELS[resource['classification']]
    if u_lvl >= r_lvl:
        return True, "MAC OK : Niveau suffisant"
    return False, f"MAC REFUSÉ : Grade {user['habilitation']} insuffisant pour du {resource['classification']}"

def verifier_rbac(user, action):
    """Vérifie si le rôle métier autorise l'action."""
    if action in RBAC_PERMISSIONS.get(user['role'], []):
        return True, f"RBAC OK : Permission '{action}' accordée au rôle {user['role']}"
    return False, f"RBAC REFUSÉ : Le rôle {user['role']} ne permet pas de faire '{action}'"

def verifier_dac(user, resource, action):
    """Vérifie la propriété ou la délégation d'accès."""
    # Le proprio a tous les droits par défaut
    if user['id'] == resource['owner_id']:
        return True, "DAC OK : Utilisateur propriétaire"
    # On check la liste d'accès spécifique (ACL) définie par le proprio
    if user['id'] in resource.get('acl', {}).get(action, []):
        return True, "DAC OK : Accès autorisé par délégation"
    return False, "DAC REFUSÉ : Pas de permission spécifique sur cette ressource"

def verifier_2fa(user, resource, action):
    """Module de double authentification par OTP."""
    if resource['nom'] in SENSITIVE_RESOURCES or action in SENSITIVE_ACTIONS:
        print(f"\n[!] 2FA REQUIS pour {user['nom']} (Accès sensible détecté)")
        otp = str(random.randint(100000, 999999))
        print(f"--- CODE REÇU : {otp} ---") # Simule l'envoi du code
        
        reponse = input("Saisir le code OTP pour valider : ")
        if reponse == otp:
            return True, "2FA VALIDE : Identité confirmée"
        return False, "2FA ÉCHOUÉ : Code de sécurité incorrect"
    return True, "2FA non requis"

# ==========================================================
# 3. FONCTION CENTRALE CAN_ACCESS (Partie 2 du projet) 
# ==========================================================

def can_access(user, resource, action):
    """Exécute les vérifications dans l'ordre séquentiel."""
    print(f"\n>>> ANALYSE : {user['nom']} ({user['role']}) veut '{action}' sur '{resource['nom']}'")
    
    # Étape 1 : MAC
    ok, msg = verifier_mac(user, resource)
    print(f"  [1] {msg}")
    if not ok: return False, "Bloqué par MAC"

    # Étape 2 : RBAC
    ok, msg = verifier_rbac(user, action)
    print(f"  [2] {msg}")
    if not ok: return False, "Bloqué par RBAC"

    # Étape 3 : DAC
    ok, msg = verifier_dac(user, resource, action)
    print(f"  [3] {msg}")
    if not ok: return False, "Bloqué par DAC"

    # Étape 4 : 2FA
    ok, msg = verifier_2fa(user, resource, action)
    print(f"  [4] {msg}")
    if not ok: return False, "Bloqué par 2FA"

    return True, "AUTORISÉ"

# ==========================================================
# 4. SCÉNARIOS DE TEST (Partie 4 du projet)
# ==========================================================

if __name__ == "__main__":
    # Définition des acteurs pour les tests
    admin = {"id": "u01", "nom": "Admin_Jean", "role": "Administrateur système", "habilitation": "Très confidentiel"}
    dev_aziz = {"id": "u02", "nom": "Aziz", "role": "Développeur", "habilitation": "Confidentiel"}
    stagiaire = {"id": "u03", "nom": "Stagiaire_Paul", "role": "Stagiaire", "habilitation": "Public"}
    support = {"id": "u04", "nom": "Anta", "role": "Technicien support", "habilitation": "Interne"}

    # Définition des ressources
    db_clients = {"nom": "Base de données clients", "classification": "Très confidentiel", "owner_id": "u01", "acl": {}}
    projet_alpha = {"nom": "Projet Alpha", "classification": "Confidentiel", "owner_id": "u01", "acl": {"read": ["u02", "u04"], "write": ["u02"]}}
    doc_interne = {"nom": "Documentation interne", "classification": "Interne", "owner_id": "u02", "acl": {"read": ["u03"]}}

    print("=== DÉBUT DES SCÉNARIOS DE TEST ===")

    # Scénario 1 : Succès total (Admin accède à tout avec 2FA)
    can_access(admin, db_clients, "read")

    # Scénario 2 : Échec MAC (Stagiaire veut lire un truc Confidentiel)
    can_access(stagiaire, projet_alpha, "read")

    # Scénario 3 : Échec RBAC (Développeur veut supprimer des comptes)
    can_access(dev_aziz, projet_alpha, "manage_users")

    # Scénario 4 : Échec DAC (Support veut écrire sur Projet Alpha sans permission)
    can_access(support, projet_alpha, "write")

    # Scénario 5 : Succès DAC par délégation (Support lit Projet Alpha grâce à l'ACL)
    can_access(support, projet_alpha, "read")
    # Scénario : Aziz accède au Code Source
    # Aziz est Développeur (Rôle OK) et Confidentiel (Grade OK pour Interne)
    print("\n--- TEST : SUCCÈS DÉVELOPPEUR ---")
    can_access(dev_aziz, doc_interne, "read")
    print("\n--- TEST SUPPLÉMENTAIRE : DÉLÉGATION DAC ---")
    can_access(stagiaire, doc_interne, "read")

    print("\n=== TESTS TERMINÉS ===")