 import React, { useState } from 'react';
import { Shield, Lock, Unlock, Database, FileText, LogOut, AlertTriangle, Key, Activity, Users } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// --- CONFIGURATION DES UTILISATEURS TECHNOVA ---
const USERS_DB = {
  "Jean": { role: "Administrateur système", habilitation: "Très confidentiel", color: "#ff4d4d", otp_secret: "JBSWY3DPEHPK3PXP" },
  "Marc": { role: "Administrateur système", habilitation: "Très confidentiel", color: "#ff4d4d", otp_secret: "V2C7P6X4NB3W7QZA" },
  "Aziz": { role: "Développeur", habilitation: "Confidentiel", color: "#4da6ff", otp_secret: "KRSXG5CTMVRXGZLU" },
  "Paul": { role: "Stagiaire", habilitation: "Public", color: "#a6a6a6", otp_secret: "MFSXG43FZSAXGZLU" },
  "Anta": { role: "Technicien support", habilitation: "Interne", color: "#ffcc00", otp_secret: "NBSWY3DPEHPK3PXP" },
  "Analyste": { role: "Analyste cybersécurité", habilitation: "Très confidentiel", color: "#00f2ff", otp_secret: "GE5TINZSGAYTAMZS" }
};

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [showMFA, setShowMFA] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [logs, setLogs] = useState([]);

  // Système de logs pour la démonstration
  const addLog = (message, type = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ time, message, type }, ...prev].slice(0, 5));
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    const cleanName = username.trim();
    const found = USERS_DB[cleanName];
    
    if (found) {
      setUser({ nom: cleanName, ...found });
      addLog(`ACCÈS ACCORDÉ : Session démarrée pour ${cleanName}.`, "success");
    } else {
      addLog(`ALERTE : Tentative d'accès non autorisé (${cleanName}).`, "warning");
      alert("⚠️ Utilisateur non reconnu dans la base TECHNOVA.");
    }
  };

  // --- ÉCRAN DE CONNEXION ---
  if (!user) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.glassCard}>
          <div style={styles.logoContainer}>
            <Shield size={60} color="#00f2ff" />
            <div style={styles.pulseRing}></div>
          </div>
          <h1 style={styles.cyberTitle}>TECHNOVA <span style={{color:'#00f2ff'}}>SERVICES</span></h1>
          <p style={styles.subtitle}>UNITÉ DE CONTRÔLE D'ACCÈS RÉSEAU</p>
          
          <form onSubmit={handleLogin} style={{width: '100%'}}>
            <input 
              style={styles.cyberInput}
              type="text"
              placeholder="IDENTIFIANT (ex: Jean)" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <button type="submit" style={styles.btnCyber}>INITIALISER LA CONNEXION</button>
          </form>
          <div style={styles.footer}>SÉCURITÉ CRYPTOGRAPHIQUE - V3.4</div>
        </div>
      </div>
    );
  }

  // --- TABLEAU DE BORD PRINCIPAL ---
  return (
    <div style={styles.dashboard}>
      <header style={styles.nav}>
        <div style={styles.brand}><Activity size={20} color={user.color} /> <strong>TECHNOVA SERVICES</strong></div>
        <div style={styles.userStatus}>
          <span style={{...styles.statusDot, background: user.color}}></span>
          <span style={{marginRight: '10px'}}>{user.nom} <small style={{opacity:0.6}}>({user.role})</small></span>
          <button onClick={() => {setUser(null); setIsUnlocked(false); setLogs([]);}} style={styles.logout} title="Déconnexion"><LogOut size={18} /></button>
        </div>
      </header>

      <main style={styles.main}>
        {/* STATISTIQUES SYSTÈME */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}><Activity size={14} color="#00ff00" /> RÉSEAU : <strong>STABLE</strong></div>
          <div style={styles.statBox}><Unlock size={14} color="#ffcc00" /> HABILITATION : <strong>{user.habilitation.toUpperCase()}</strong></div>
          <div style={styles.statBox}><Shield size={14} color="#00f2ff" /> PARE-FEU : <strong>ACTIF</strong></div>
        </div>

        <div style={styles.grid}>
          {/* CARTE 1 : ACCÈS PUBLIC */}
          <div style={styles.cyberCard}>
            <FileText size={28} color="#ccc" />
            <h3>DOCUMENTS PUBLICS</h3>
            <p>Accès libre aux protocoles et directives de TechNova.</p>
            <button style={styles.actionBtn} onClick={() => addLog("LECTURE : Wiki Standard")}>CONSULTER</button>
          </div>

          {/* CARTE 2 : UNITÉ DE PRODUCTION (MAC) */}
          {user.habilitation !== "Public" ? (
            <div style={styles.cyberCard}>
              <Database size={28} color="#00f2ff" />
              <h3>UNITÉ DE PRODUCTION</h3>
              <p>Monitoring des clusters de serveurs en temps réel.</p>
              <button style={styles.actionBtn} onClick={() => addLog("ACCÈS : Monitoring Production")}>ACCÉDER</button>
            </div>
          ) : (
            <div style={styles.lockedCard} onClick={() => addLog("REFUS MAC : Niveau trop bas", "warning")}>
              <Lock size={28} color="#444" />
              <h3>UNITÉ DE PRODUCTION</h3>
              <p>NIVEAU MAC INSUFFISANT</p>
            </div>
          )}

          {/* CARTE 3 : DONNÉES CRITIQUES (RBAC + MFA) */}
          {["Administrateur système", "Analyste cybersécurité"].includes(user.role) ? (
            <div style={{...styles.cyberCard, borderLeft: `4px solid ${isUnlocked ? '#00ff00' : '#ff4d4d'}`}}>
              <AlertTriangle size={28} color={isUnlocked ? "#00ff00" : "#ff4d4d"} />
              <h3>DONNÉES CRITIQUES</h3>
              {isUnlocked ? (
                <div style={styles.successMsg}>✅ ACCÈS SERVEUR ÉTABLI</div>
              ) : (
                <>
                  <p>Accès restreint aux serveurs centraux. MFA requis.</p>
                  <button style={styles.mfaBtn} onClick={() => {setShowMFA(true); addLog("MFA : Validation TOTP requise", "warning")}}>DÉVERROUILLER</button>
                </>
              )}
            </div>
          ) : (
            <div style={styles.lockedCard} onClick={() => addLog("REFUS RBAC : Rôle non autorisé", "warning")}>
              <Lock size={28} color="#444" />
              <h3>DONNÉES CRITIQUES</h3>
              <p>RÉSERVÉ ADMINISTRATION</p>
            </div>
          )}

          {/* CARTE 4 : ENRÔLEMENT QR (Si besoin de MFA) */}
          {(user.role === "Administrateur système" || user.role === "Analyste cybersécurité") && (
            <div style={styles.cyberCard}>
              <Key size={28} color="#00f2ff" />
              <h3>ENRÔLEMENT MFA</h3>
              <div style={styles.qrWrapper}>
                <QRCodeSVG 
                  value={`otpauth://totp/TechNova:${user.nom}?secret=${user.otp_secret}&issuer=TechNova`} 
                  size={100}
                />
              </div>
              <p style={{fontSize: '10px', marginTop: '10px', color: '#666'}}>Scannez avec Google Authenticator</p>
            </div>
          )}
        </div>
      </main>

      {/* CONSOLE D'AUDIT LIVE */}
      <div style={styles.auditConsole}>
        <div style={styles.consoleHeader}>LOGS D'AUDIT EN DIRECT - TECHNOVA SERVICES</div>
        {logs.length === 0 ? <div style={{fontSize: '11px', color: '#333'}}>En attente d'activité...</div> : logs.map((log, i) => (
          <div key={i} style={{fontSize: '11px', color: log.type === "warning" ? "#ff4d4d" : log.type === "success" ? "#00ff00" : "#00f2ff", marginBottom: '2px'}}>
            [{log.time}] {log.message}
          </div>
        ))}
      </div>

      {/* MODAL D'AUTHENTIFICATION MFA */}
      {showMFA && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <Shield size={40} color="#ff4d4d" />
            <h3>IDENTIFICATION TOTP</h3>
            <p style={{fontSize: '13px', color: '#888'}}>Entrez le code pour {user.nom}</p>
            <input style={styles.otpInput} placeholder="• • • • • •" maxLength="6" autoFocus />
            <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
              <button style={styles.mfaBtn} onClick={() => {setIsUnlocked(true); setShowMFA(false); addLog("MFA SUCCÈS : Identité confirmée", "success")}}>VALIDER</button>
              <button style={styles.cancelBtn} onClick={() => setShowMFA(false)}>ANNULER</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- DESIGN ÉLITE (STYLES) ---
const styles = {
  loginPage: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#050608', color: '#fff', fontFamily: 'monospace' },
  glassCard: { background: 'rgba(255, 255, 255, 0.02)', padding: '50px', borderRadius: '24px', border: '1px solid rgba(0, 242, 255, 0.2)', textAlign: 'center', width: '400px', backdropFilter: 'blur(10px)', boxShadow: '0 0 30px rgba(0, 242, 255, 0.05)' },
  logoContainer: { position: 'relative', display: 'inline-block', marginBottom: '20px' },
  cyberTitle: { letterSpacing: '5px', margin: '15px 0', fontSize: '24px' },
  subtitle: { fontSize: '10px', opacity: 0.5, marginBottom: '30px', letterSpacing: '2px' },
  cyberInput: { width: '100%', background: '#000', border: '1px solid #222', color: '#00f2ff', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', outline: 'none' },
  btnCyber: { width: '100%', padding: '15px', background: 'transparent', border: '1px solid #00f2ff', color: '#00f2ff', cursor: 'pointer', fontWeight: 'bold' },
  dashboard: { minHeight: '100vh', background: '#0a0b10', color: '#eee', fontFamily: 'sans-serif' },
  nav: { height: '65px', background: '#0f111a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', borderBottom: '1px solid #1f2230' },
  statusDot: { width: '8px', height: '8px', borderRadius: '50%', marginRight: '10px', display: 'inline-block' },
  logout: { background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '5px' },
  main: { padding: '30px 40px' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '30px' },
  statBox: { background: '#131524', padding: '8px 15px', borderRadius: '6px', fontSize: '11px', border: '1px solid #1f2230', display: 'flex', alignItems: 'center', gap: '8px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' },
  cyberCard: { background: '#0f111a', padding: '25px', borderRadius: '12px', border: '1px solid #1f2230' },
  lockedCard: { background: '#07080c', padding: '25px', borderRadius: '12px', border: '1px dashed #222', textAlign: 'center', opacity: 0.5, cursor: 'not-allowed' },
  actionBtn: { width: '100%', padding: '10px', marginTop: '20px', background: '#1f2230', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer' },
  mfaBtn: { width: '100%', padding: '10px', marginTop: '20px', background: '#ff4d4d', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  successMsg: { color: '#00ff00', fontWeight: 'bold', marginTop: '15px', textAlign: 'center' },
  qrWrapper: { background: '#fff', padding: '10px', borderRadius: '8px', display: 'inline-block', marginTop: '15px' },
  auditConsole: { position: 'fixed', bottom: '20px', left: '40px', right: '40px', background: '#050608', border: '1px solid #1f2230', padding: '15px', borderRadius: '10px', fontFamily: 'monospace' },
  consoleHeader: { color: '#444', fontSize: '9px', marginBottom: '5px', letterSpacing: '1px' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(5px)' },
  modal: { background: '#0f111a', padding: '40px', borderRadius: '20px', border: '1px solid #333', textAlign: 'center', width: '340px' },
  otpInput: { width: '100%', background: '#000', border: '1px solid #333', color: '#fff', padding: '15px', marginTop: '20px', fontSize: '24px', textAlign: 'center', letterSpacing: '5px' },
  cancelBtn: { width: '100%', padding: '10px', marginTop: '20px', background: 'transparent', border: '1px solid #333', color: '#555', borderRadius: '6px', cursor: 'pointer' },
  footer: { marginTop: '20px', fontSize: '9px', color: '#333' }
};

export default App;