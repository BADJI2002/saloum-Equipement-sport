// Menu hamburger
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});

// Données des produits
const produits = [
    // Homme / Kimono
    {
        id: 1,
        nom: "Kimono Karate Blanc - Qualité Pro",
        categorie: "homme",
        prix: 25000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.52 (1).jpeg",
        description: "Kimono qualité compétition, tissu résistant et léger"
    },
    {
        id: 2,
        nom: "Kimono Karate Noir - Premium",
        categorie: "homme",
        prix: 28000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.52 (2).jpeg",
        description: "Kimono noir qualité professionnelle"
    },
    {
        id: 3,
        nom: "Kimono Judo - Standard",
        categorie: "homme",
        prix: 30000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.52 (3).jpeg",
        description: "Kimono judo robuste pour entraînement"
    },
    {
        id: 4,
        nom: "Ceinture Noire - Karate",
        categorie: "homme",
        prix: 5000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.52 (4).jpeg",
        description: "Ceinture noire en coton qualité"
    },
    {
        id: 5,
        nom: "Ceinture Blanche - Karate",
        categorie: "homme",
        prix: 3500,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.52 (5).jpeg",
        description: "Ceinture blanche coton"
    },
    // Femme / Protections
    {
        id: 6,
        nom: "Gants de Boxe - Femme",
        categorie: "femme",
        prix: 15000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.53 (1).jpeg",
        description: "Gants cuir synthétique, plusieurs couleurs"
    },
    {
        id: 7,
        nom: "Protège Tibia - Femme",
        categorie: "femme",
        prix: 8000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.53 (2).jpeg",
        description: "Protection tibia et pied mousse"
    },
    {
        id: 8,
        nom: "Casque de Boxe - Femme",
        categorie: "femme",
        prix: 12000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.53 (3).jpeg",
        description: "Casque protection visage"
    },
    {
        id: 9,
        nom: "Kimono Femme - Karate",
        categorie: "femme",
        prix: 22000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.53 (4).jpeg",
        description: "Kimono femme coupe spéciale"
    },
    // Enfant / Matériel
    {
        id: 10,
        nom: "Kimono Enfant - Karate",
        categorie: "enfant",
        prix: 15000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.53 (5).jpeg",
        description: "Kimono enfant tailles 6-14 ans"
    },
    {
        id: 11,
        nom: "Gants de Boxe Enfant",
        categorie: "enfant",
        prix: 8000,
        image: "photo/gants_enfant.jpg",
        description: "Gants enfant légère protection"
    },
    {
        id: 12,
        nom: "Sac de Frappe Enfant",
        categorie: "enfant",
        prix: 18000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.53 (6).jpeg",
        description: "Sac de frappe synthétique"
    },
    {
        id: 13,
        nom: "Protège dents Enfant",
        categorie: "enfant",
        prix: 2500,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.53 (7).jpeg",
        description: "Protège dents thermoformable"
    },
    {
        id: 14,
        nom: "Bandages Boxe - Paire",
        categorie: "enfant",
        prix: 2000,
        image: "photo/WhatsApp Image 2026-04-23 at 10.18.53 (8).jpeg",
        description: "Bandages protection poignets"
    }
];

// Gestion du panier
let panier = JSON.parse(localStorage.getItem('panier')) || [];

// Afficher les produits
function afficherProduits(categorie = 'tous') {
    const container = document.querySelector('.produits-container');
    if (!container) return;

    let produitsFiltres = categorie === 'tous' 
        ? produits 
        : produits.filter(p => p.categorie === categorie);

    container.innerHTML = produitsFiltres.map(produit => `
        <div class="carte-produit">
            <div class="image-produit">
                <img src="${produit.image}" alt="${produit.nom}" onerror="this.src='photo/acceuil.png'">
            </div>
            <div class="info-produit">
                <h3>${produit.nom}</h3>
                <p class="description">${produit.description}</p>
                <p class="prix">${produit.prix.toLocaleString('fr-FR')} CFA</p>
                <button onclick="ajouterAuPanier(${produit.id})" class="btn-ajouter">
                    Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
}

// Ajouter un produit au panier
function ajouterAuPanier(id) {
    const produit = produits.find(p => p.id === id);
    if (!produit) return;

    const existant = panier.find(p => p.id === id);
    if (existant) {
        existant.quantite++;
    } else {
        panier.push({ ...produit, quantite: 1 });
    }

    sauvegarderPanier();
    mettreAJourBadge();
    afficherNotification(`${produit.nom} ajouté au panier!`);
}

// Supprimer un produit du panier
function supprimerDuPanier(id) {
    panier = panier.filter(p => p.id !== id);
    sauvegarderPanier();
    mettreAJourBadge();
    afficherPanier();
}

// Modifier la quantité
function modifierQuantite(id, changement) {
    const produit = panier.find(p => p.id === id);
    if (produit) {
        produit.quantite += changement;
        if (produit.quantite <= 0) {
            supprimerDuPanier(id);
        } else {
            sauvegarderPanier();
            afficherPanier();
        }
    }
    mettreAJourBadge();
}

// Sauvegarder le panier
function sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(panier));
}

// Mettre à jour le badge
function mettreAJourBadge() {
    const badge = document.querySelector('.badge');
    if (badge) {
        const total = panier.reduce((sum, p) => sum + p.quantite, 0);
        badge.textContent = total;
    }
}

// Calculer le total
function calculerTotal() {
    return panier.reduce((sum, p) => sum + (p.prix * p.quantite), 0);
}

// Afficher le panier (modal)
function afficherPanier() {
    let modal = document.getElementById('modal-panier');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-panier';
        modal.className = 'modal-panier';
        document.body.appendChild(modal);
    }

    if (panier.length === 0) {
        modal.innerHTML = `
            <div class="contenu-panier">
                <span class="fermer-panier" onclick="fermerPanier()">&times;</span>
                <h2>Votre Panier</h2>
                <p class="panier-vide">Votre panier est vide</p>
                <button class="btn-continuer" onclick="fermerPanier()">Continuer vos achats</button>
            </div>
        `;
    } else {
        const total = calculerTotal();
        modal.innerHTML = `
            <div class="contenu-panier">
                <span class="fermer-panier" onclick="fermerPanier()">&times;</span>
                <h2>Votre Panier</h2>
                <div class="liste-panier">
                    ${panier.map(p => `
                        <div class="item-panier">
                            <img src="${p.image}" alt="${p.nom}" onerror="this.src='photo/acceuil.png'">
                            <div class="details-item">
                                <h4>${p.nom}</h4>
                                <p class="prix-item">${p.prix.toLocaleString('fr-FR')} CFA</p>
                            </div>
                            <div class="quantite-controls">
                                <button onclick="modifierQuantite(${p.id}, -1)">-</button>
                                <span>${p.quantite}</span>
                                <button onclick="modifierQuantite(${p.id}, 1)">+</button>
                            </div>
                            <button class="supprimer-item" onclick="supprimerDuPanier(${p.id})">&times;</button>
                        </div>
                    `).join('')}
                </div>
                <div class="total-panier">
                    <h3>Total: ${total.toLocaleString('fr-FR')} CFA</h3>
                </div>
                <button class="btn-commander" onclick="afficherFormulaireCommande()">
                    Passer la commande
                </button>
            </div>
        `;
    }

    modal.style.display = 'flex';
}

// Fermer le panier
function fermerPanier() {
    const modal = document.getElementById('modal-panier');
    if (modal) modal.style.display = 'none';
}

// Afficher le formulaire de commande
function afficherFormulaireCommande() {
    const total = calculerTotal();
    const modal = document.getElementById('modal-panier');
    
    if (modal) {
        modal.innerHTML = `
            <div class="contenu-panier contenu-commande">
                <span class="fermer-panier" onclick="fermerPanier()">&times;</span>
                <h2>Finaliser votre Commande</h2>
                <div class="recapitulatif">
                    <h3>Récapitulatif de commande</h3>
                    ${panier.map(p => `
                        <div class="item-recap">
                            <span>${p.nom} x${p.quantite}</span>
                            <span>${(p.prix * p.quantite).toLocaleString('fr-FR')} CFA</span>
                        </div>
                    `).join('')}
                    <div class="total-final">
                        <strong>Total: ${total.toLocaleString('fr-FR')} CFA</strong>
                    </div>
                </div>
                
                <form id="form-commande" onsubmit="soumettreCommande(event)">
                    <div class="form-group">
                        <label for="nom">Nom complet *</label>
                        <input type="text" id="nom" name="nom" required>
                    </div>
                    <div class="form-group">
                        <label for="telephone">Téléphone *</label>
                        <input type="tel" id="telephone" name="telephone" required placeholder="77 123 45 67">
                    </div>
                    <div class="form-group">
                        <label for="adresse">Adresse de livraison</label>
                        <input type="text" id="adresse" name="adresse" placeholder="Ville, Quartier, Rue">
                    </div>
                    
                    <div class="mode-paiement">
                        <h3>Mode de paiement</h3>
                        <label class="option-paiement">
                            <input type="radio" name="paiement" value="wave" required>
                            <span class="radio-custom"></span>
                            <div class="paiement-info">
                                <strong>💳 Paiement Wave</strong>
                                <p>Paiement immédiat via Wave</p>
                            </div>
                        </label>
                        <label class="option-paiement">
                            <input type="radio" name="paiement" value="livraison">
                            <span class="radio-custom"></span>
                            <div class="paiement-info">
                                <strong>🚚 Paiement à la réception</strong>
                                <p>Payer lors de la livraison du colis</p>
                            </div>
                        </label>
                    </div>
                    
                    <button type="submit" class="btn-valider">Valider la commande</button>
                </form>
            </div>
        `;
    }
}

// Données de commande temporaire pour paiement Wave
let donneesCommandeTemporaire = null;

// Variable globale pour le paiement en cours
let paiementWaveEnCours = null;

// Variable pour suivre si le paiement Wave a été effectué
let paiementWaveEffectue = false;

// Soumettre la commande
function soumettreCommande(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const modePaiement = formData.get('paiement');
    const total = calculerTotal();
    
    // Stocker les données de commande temporairement
    donneesCommandeTemporaire = {
        nom: formData.get('nom'),
        telephone: formData.get('telephone'),
        adresse: formData.get('adresse') || 'Non spécifiée',
        modePaiement: modePaiement,
        total: total,
        articles: [...panier]
    };
    
    if (modePaiement === 'wave') {
        // Paiement Wave - redirection obligatoire
        afficherInstructionsWave(total);
    } else {
        // Paiement à la réception - envoyer directement
        envoyerCommandeWhatsApp(donneesCommandeTemporaire);
    }
}

// Confirmer le paiement Wave et envoyer la commande
function confirmerPaiementWave() {
    if (!donneesCommandeTemporaire) {
        afficherNotification('Erreur: données de commande manquantes');
        return;
    }
    
    // Ajouter le statut payé
    donneesCommandeTemporaire.paye = true;
    donneesCommandeTemporaire.datePaiement = new Date().toLocaleString('fr-FR');
    
    // Envoyer la commande
    envoyerCommandeWhatsApp(donneesCommandeTemporaire);
}

// Afficher les instructions de paiement Wave
function afficherInstructionsWave(total) {
    const modal = document.getElementById('modal-panier');
    if (!modal) return;
    
    // Réinitialiser le statut de paiement Wave
    paiementWaveEffectue = false;
    
    // Stocker les données pour après paiement
    window.paiementWaveEnCours = {
        total: total,
        donnees: donneesCommandeTemporaire
    };
    
    modal.innerHTML = `
        <div class="contenu-panier contenu-commande">
            <span class="fermer-panier" onclick="annulerCommande()">&times;</span>
            <h2>💳 Paiement Wave</h2>
            <div class="instructions-wave">
                <p class="montant-total">Montant à payer: <strong>${total.toLocaleString('fr-FR')} CFA</strong></p>
                
                <div class="instructions-paiement">
                    <h3>🔗 Redirection vers Wave</h3>
                    <p>Vous allez être redirigé vers l'interface de paiement Wave pour effectuer votre paiement en toute sécurité.</p>
                    <p class="info-securite">🔒 Paiement sécurisé via Wave</p>
                </div>
                
                <div class="confirmation-wave">
                    <p>📝 <strong>Important:</strong> Après le paiement, vous serez automatiquement redirigé vers WhatsApp pour confirmer votre commande.</p>
                    <p class="info-confirmation">Conservez votre reçu de paiement pour la livraison.</p>
                </div>
                
                <a href="https://wave.com/pay/779783473?amount=${total}" target="_blank" class="btn-valider btn-wave-payer" onclick="marquerPaiementWaveEffectue()">
                    💳 Payer avec Wave
                </a>
                
                <div class="confirmation-apres-paiement">
                    <p>✅ <strong>Cliquez ici après avoir payé:</strong></p>
                    <button class="btn-valider btn-confirmer-paiement" id="btn-confirmer-wave" onclick="confirmerApresPaiementWave()" disabled>
                        ✅ Confirmer le paiement - Valider la commande
                    </button>
                    <p class="info-btn-confirmer" id="info-btn-confirmer" style="color: #ff6b6b; font-size: 0.9em; margin-top: 5px;">
                        ⚠️ Veuillez d'abord cliquer sur "Payer avec Wave" et effectuer le paiement
                    </p>
                </div>
                
                <button class="btn-annuler" onclick="annulerCommande()">
                    Annuler
                </button>
            </div>
        </div>
    `;
}

// Marquer le paiement Wave comme effectué
function marquerPaiementWaveEffectue() {
    paiementWaveEffectue = true;
    
    // Activer le bouton de confirmation
    const btnConfirmer = document.getElementById('btn-confirmer-wave');
    if (btnConfirmer) {
        btnConfirmer.disabled = false;
        btnConfirmer.style.opacity = '1';
        btnConfirmer.style.cursor = 'pointer';
    }
    
    // Mettre à jour le message d'info
    const infoBtn = document.getElementById('info-btn-confirmer');
    if (infoBtn) {
        infoBtn.innerHTML = '✅ Paiement Wave détecté! Vous pouvez maintenant confirmer votre commande.';
        infoBtn.style.color = '#51cf66';
    }
    
    afficherNotification('✅ Redirection vers Wave... Effectuez votre paiement.');
}

// Confirmer après paiement Wave (bouton obligatoire)
function confirmerApresPaiementWave() {
    // Vérification stricte: le paiement Wave DOIT être confirmé
    if (!paiementWaveEffectue) {
        afficherNotification('❌ Erreur: Veuillez d\'abord effectuer le paiement Wave!');
        return;
    }
    
    if (!donneesCommandeTemporaire) {
        afficherNotification('Erreur: données de commande manquantes');
        return;
    }
    
    // Marquer comme payé via Wave
    donneesCommandeTemporaire.paye = true;
    donneesCommandeTemporaire.modePaiement = 'wave';
    donneesCommandeTemporaire.datePaiement = new Date().toLocaleString('fr-FR');
    
    // Envoyer la commande à WhatsApp
    envoyerCommandeWhatsApp(donneesCommandeTemporaire);
    
    // Réinitialiser le statut de paiement
    paiementWaveEffectue = false;
}

// Confirmer la paiement Wave et envoyer la commande
function confirmerPaiementWave() {
    if (!donneesCommandeTemporaire) {
        afficherNotification('Erreur: données de commande manquantes');
        return;
    }
    
    // Vérifier que le paiement a été effectué
    if (!paiementWaveEffectue) {
        afficherNotification('❌ Erreur: Veuillez d\'abord effectuer le paiement Wave!');
        return;
    }
    
    // Ajouter le statut payé
    donneesCommandeTemporaire.paye = true;
    donneesCommandeTemporaire.datePaiement = new Date().toLocaleString('fr-FR');
    
    // Envoyer la commande
    envoyerCommandeWhatsApp(donneesCommandeTemporaire);
    
    // Réinitialiser le statut de paiement
    paiementWaveEffectue = false;
}

function annulerCommande() {
    donneesCommandeTemporaire = null;
    fermerPanier();
    afficherNotification('Commande annulée');
}

// Configuration UltraMsg (À remplir avec vos données)
// Allez sur https://ultramsg.com pour obtenir ces informations
const ULTRAMSG_TOKEN = '35nh7ivngcqyq1mg'; // À remplacer
const ULTRAMSG_INSTANCE = 'instance171458'; // À remplacer (voir votre dashboard UltraMsg)
const NUMERO_WHATSAPP_DESTINATAIRE = '+221779783473'; // Votre numéro WhatsApp

// Envoyer la commande via WhatsApp (API UltraMsg)
function envoyerCommandeWhatsApp(commande) {
    const { nom, telephone, adresse, modePaiement, total, articles, paye, datePaiement } = commande;

    // Vérification stricte pour Wave: le paiement DOIT être marqué comme payé
    if (modePaiement === 'wave' && !paye) {
        afficherNotification('❌ Erreur: La validation Wave est requise avant de passer la commande!');
        return;
    }

    // Vérifier que la configuration UltraMsg est complète
    if (!ULTRAMSG_TOKEN || ULTRAMSG_TOKEN.length < 10 || !ULTRAMSG_INSTANCE || ULTRAMSG_INSTANCE.length < 5) {
        afficherNotification('⚠️ Configuration UltraMsg incomplète. Vérifiez votre TOKEN et INSTANCE ID.');
        console.error('Configuration UltraMsg manquante:', { token: ULTRAMSG_TOKEN, instance: ULTRAMSG_INSTANCE });
        return;
    }

    // Construire le message pour WhatsApp
    let message = `*NOUVELLE COMMANDE - SALOUM EQUIPEMENT SPORT*\n\n`;
    message += `*Client:* ${nom}\n`;
    message += `*Téléphone:* ${telephone}\n`;
    message += `*Adresse:* ${adresse}\n\n`;
    message += `*Articles:*\n`;

    articles.forEach(p => {
        message += `- ${p.nom} x${p.quantite} = ${(p.prix * p.quantite).toLocaleString('fr-FR')} CFA\n`;
    });

    message += `\n*Total:* ${total.toLocaleString('fr-FR')} CFA\n`;
    message += `*Mode de paiement:* ${modePaiement === 'wave' ? '💳 Wave (PAYE)' : '🚚 Paiement à la réception'}`;

    if (paye) {
        message += `\n*Paiement:* ✅ Confirmé le ${datePaiement}`;
    }

    // Afficher un message de chargement
    afficherNotification('⏳ Envoi de votre commande en cours...');

    // Envoyer via l'API UltraMsg
    envoyerViaUltraMsg(message);

    // Vider le panier
    panier = [];
    sauvegarderPanier();
    mettreAJourBadge();
    fermerPanier();

    // Réinitialiser les données temporaires
    donneesCommandeTemporaire = null;
}

// Fonction pour envoyer via UltraMsg API
function envoyerViaUltraMsg(message) {
    // Format correct pour UltraMsg API
    const url = `https://api.ultramsg.com/${ULTRAMSG_INSTANCE}/messages/chat`;

    // Créer les données selon la documentation UltraMsg
    const params = new URLSearchParams({
        token: ULTRAMSG_TOKEN,
        to: NUMERO_WHATSAPP_DESTINATAIRE,
        body: message
    });

    console.log('Tentative d\'envoi UltraMsg:', {
        url: url,
        token: ULTRAMSG_TOKEN.substring(0, 10) + '...', // Masquer le token complet
        instance: ULTRAMSG_INSTANCE,
        to: NUMERO_WHATSAPP_DESTINATAIRE,
        messageLength: message.length
    });

    // Utiliser fetch avec le bon format
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    })
    .then(response => {
        console.log('Réponse HTTP:', response.status, response.statusText);
        return response.text(); // D'abord récupérer en texte
    })
    .then(text => {
        console.log('Réponse brute:', text);
        try {
            const result = JSON.parse(text);
            console.log('Réponse JSON:', result);

            if (result.sent || result.success || result.id) {
                afficherNotification('✅ Commande envoyée avec succès sur WhatsApp!');
            } else {
                afficherNotification('❌ Erreur lors de l\'envoi: ' + (result.error || 'Erreur inconnue'));
                console.error('Erreur UltraMsg détaillée:', result);
            }
        } catch (parseError) {
            console.error('Erreur de parsing JSON:', parseError);
            afficherNotification('❌ Erreur de réponse du serveur. Vérifiez vos paramètres.');
        }
    })
    .catch(error => {
        console.error('Erreur réseau détaillée:', error);
        afficherNotification('❌ Erreur de connexion. Vérifiez votre connexion internet.');
    });
}

// Fonction de test pour vérifier la configuration UltraMsg
function testerUltraMsg() {
    console.log('=== TEST ULTRAMSG ===');
    console.log('Token:', ULTRAMSG_TOKEN ? 'Configuré (' + ULTRAMSG_TOKEN.length + ' caractères)' : 'MANQUANT');
    console.log('Instance:', ULTRAMSG_INSTANCE);
    console.log('Numéro destinataire:', NUMERO_WHATSAPP_DESTINATAIRE);

    if (!ULTRAMSG_TOKEN || !ULTRAMSG_INSTANCE) {
        console.error('❌ Configuration incomplète');
        return;
    }

    // Tester avec un message simple
    const testMessage = 'Test de configuration UltraMsg - ' + new Date().toLocaleString('fr-FR');

    envoyerViaUltraMsg(testMessage);
}

// Notification
function afficherNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Filtrer par catégorie
function filtrerParCategorie(categorie) {
    afficherProduits(categorie);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    afficherProduits();
    mettreAJourBadge();
    
    // Gestionnaire pour le lien du panier
    const lienPanier = document.querySelector('a[href="#panier"]');
    if (lienPanier) {
        lienPanier.addEventListener('click', function(e) {
            e.preventDefault();
            afficherPanier();
        });
    }
    
    // Gestionnaires pour les catégories
    document.querySelectorAll('[data-categorie]').forEach(lien => {
        lien.addEventListener('click', function(e) {
            e.preventDefault();
            const categorie = this.getAttribute('data-categorie');
            filtrerParCategorie(categorie);
            document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
