/* SODEBAT site v2 (25/11/2026) */
(function () {
  const CFG = 'https://leslita06.github.io/sodebat-configurateur/';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ic = (id) => `<svg><use href="#i-${id}"/></svg>`;

  /* Bâtiments */
  const BAT = [
    { k: 'residentiel', ic: 'build', t: 'Immeubles résidentiels', h: 'Des résidents qui montent leurs courses, des enfants, des personnes âgées : l\'ascenseur fait partie du quotidien.',
      pts: ['Cabine 6 à 8 personnes, portes automatiques', 'Fonctionnement silencieux, de jour comme de nuit', 'Contrat de maintenance partagé entre copropriétaires', 'Modernisation possible sans changer la gaine'],
      eq: ['Ascenseur électrique 630 kg', 'Monte-charge pour les livraisons'], img: 'real-capucine.jpg', ref: 'Résidence Capucine' },
    { k: 'bureaux', ic: 'office', t: 'Bureaux et sièges', h: 'Le flux de 8 h, les visiteurs, l\'image de l\'entreprise : l\'ascenseur est le premier espace que l\'on voit.',
      pts: ['Capacité dimensionnée pour l\'heure de pointe', 'Finitions haut standing : inox, verre, bois', 'Cabines dimensionnées pour les visiteurs et le personnel', 'Intervention rapide pour éviter l\'arrêt d\'un étage'],
      eq: ['Ascenseur tertiaire 1 000 à 1 275 kg', 'Escalators et travelators'], img: 'real-fiba.jpg', ref: 'Immeuble Fiba Afrique' },
    { k: 'hotel', ic: 'hotel', t: 'Hôtels et commerces', h: 'Clients, bagages, chariots, livraisons : chaque appareil a son rôle et ne doit jamais s\'arrêter en pleine saison.',
      pts: ['Cabine clients soignée, ascenseur de service séparé', 'Escalators pour les centres commerciaux', 'Monte-plats entre cuisine et salle', 'SAV 24h/24, y compris le week-end'],
      eq: ['Ascenseur clients et de service', 'Escalators, monte-plats'], img: 'real-vallons.jpg', ref: 'Immeuble Hôtel des Vallons' },
    { k: 'sante', ic: 'health', t: 'Santé', h: 'Un brancard, un lit, un patient : la cabine doit être large, douce à l\'arrêt et facile à nettoyer.',
      pts: ['Monte-malades aux dimensions d\'un lit', 'Arrêt précis au niveau, sans marche', 'Parois et sols faciles à désinfecter', 'Priorité aux interventions d\'urgence'],
      eq: ['Monte-malades', 'Ascenseur 1 275 kg'], img: 'sol-monte-malades.jpg', ref: null },
    { k: 'villa', ic: 'villa', t: 'Villas', h: 'Un ascenseur compact et silencieux pour une maison sur plusieurs niveaux, même avec peu d\'espace.',
      pts: ['Ascenseur compact et esthétique, faible encombrement', 'Conforme aux normes d\'accessibilité', 'Finitions sur mesure, assorties à la maison', 'Garantie constructeur et extension par contrat'],
      eq: ['Ascenseur de villa 2 à 4 personnes'], img: 'cabine-3d-3.jpg', ref: null },
    { k: 'public', ic: 'public', t: 'Bâtiments publics', h: 'Écoles, ministères, mairies : un usage intense, un accès pour tous et une sécurité sans compromis.',
      pts: ['Accessibilité des personnes à mobilité réduite', 'Équipements robustes pour un usage intensif', 'Réponse aux appels d\'offres publics', 'Maintenance contractuelle et traçable'],
      eq: ['Ascenseur PMR', 'Monte-charge'], img: 'real-goodwill.jpg', ref: 'Immeuble Goodwill' },
  ];
  const tabs = $('#bat-tabs'), panel = $('#bat-panel');
  tabs.innerHTML = BAT.map((b, i) => `<button role="tab" data-k="${b.k}" aria-selected="${i === 0}">${ic(b.ic)}<span>${b.t}</span></button>`).join('');
  function showBat(k) {
    const b = BAT.find(x => x.k === k) || BAT[0];
    $$('button', tabs).forEach(x => x.setAttribute('aria-selected', x.dataset.k === b.k));
    panel.innerHTML = `<div class="bp-txt"><h3>${b.t}</h3><p class="bp-h">${b.h}</p>
      <ul class="bp-l">${b.pts.map(p => `<li>${ic('check')}${p}</li>`).join('')}</ul>
      <div class="bp-eq">${b.eq.map(e => `<span>${e}</span>`).join('')}</div>
      <div class="bp-cta"><a class="bt" href="${CFG}?batiment=${b.k}" target="_blank" rel="noopener">${ic('calc')}Estimer pour ce bâtiment</a><a class="lnk" href="#contact">Demander une visite${ic('arrow')}</a></div></div>
      <figure class="bp-img"><img src="assets/img/${b.img}" alt="${b.ref ? 'Réalisation SODEBAT : ' + b.ref : b.t}" loading="lazy">${b.ref ? `<figcaption>${b.ref}</figcaption>` : ''}</figure>`;
  }
  tabs.addEventListener('click', e => { const t = e.target.closest('button'); if (t) showBat(t.dataset.k); });
  showBat('residentiel');
  $$('[data-bat]').forEach(a => a.addEventListener('click', () => { showBat(a.dataset.bat); closeAll(); }));

  /* Solutions */
  const SOL = [
    ['ascenseur', 'lift', 'Ascenseurs', 'Résidentiel, tertiaire, villa : du compact 2 personnes au 1 275 kg.'],
    ['escalator', 'esc', 'Escalators', 'Centres commerciaux, aéroports, gares : un flux continu.'],
    ['travelator', 'walk', 'Travelators', 'Trottoirs roulants plats ou inclinés, chariots compris.'],
    ['monte-charge', 'box', 'Monte-charges', 'De 500 kg à plusieurs tonnes, pour entrepôts et ateliers.'],
    ['monte-plats', 'dish', 'Monte-plats', 'Entre cuisine et salle, pour restaurants et hôtels.'],
    ['monte-malades', 'bed', 'Monte-malades', 'Aux dimensions d\'un lit, pour cliniques et hôpitaux.'],
    ['nacelle', 'gondola', 'Nacelles', 'Nacelles suspendues pour l\'entretien des façades.'],
  ];
  $('#sol-grid').innerHTML = SOL.map(([k, i, t, d]) => `<article class="sol" id="sol-${k}"><div class="sol-img"><img src="assets/img/sol-${k}.jpg" alt="${t}" loading="lazy"></div><div class="sol-b"><span class="ic ic-s">${ic(i)}</span><h3>${t}</h3><p>${d}</p></div></article>`).join('')
    + `<a class="sol sol-cfg" href="${CFG}" target="_blank" rel="noopener"><span class="ic ic-w">${ic('calc')}</span><h3>Quel équipement pour mon bâtiment ?</h3><p>Répondez à 4 questions : nous vous proposons l'équipement et une fourchette de prix indicative.</p><span class="lnk lnk-w">Estimer mon projet${ic('arrow')}</span></a>`;

  /* Réalisations */
  const REAL = [['vallons', 'Immeuble Hôtel des Vallons', 'Hôtel et bureaux'], ['curve', 'Immeuble Curve', 'Bureaux'], ['fiba', 'Immeuble Fiba Afrique', 'Siège'],
    ['capucine', 'Résidence Capucine', 'Résidentiel'], ['goodwill', 'Immeuble Goodwill', 'Immeuble'], ['zfit', 'Zfit Spa', 'Loisirs'], ['gulmu', 'Immeuble GULMU', 'Immeuble']];
  $('#real').innerHTML = REAL.map(([k, t, c], i) => `<figure class="rc${i === 0 ? ' rc-big' : ''}"><img src="assets/img/real-${k}.jpg" alt="Ascenseur installé par SODEBAT, ${t}" loading="lazy"><figcaption><small>${c}</small><b>${t}</b></figcaption></figure>`).join('');

  /* Clients */
  const CL = ['sunu', 'ecobank', 'cie', 'sodeci', 'allianz', 'sogea-satom', 'port-abidjan', 'pisam', 'ci-energies', 'setao', 'aeria', 'addoha', 'fer', 'saham', 'aici'];
  const NM = { sunu: 'SUNU Assurances', ecobank: 'Ecobank', cie: 'CIE', sodeci: 'SODECI', allianz: 'Allianz', 'sogea-satom': 'SOGEA SATOM', 'port-abidjan': 'Port Autonome d\'Abidjan', pisam: 'PISAM', 'ci-energies': 'CI-Energies', setao: 'SETAO', aeria: 'AERIA', addoha: 'Addoha', fer: 'Fonds d\'Entretien Routier', saham: 'Saham Assurance', aici: 'AICI' };
  const one = CL.map(c => `<span class="cl"><img src="assets/clients/${c}.png" alt="${NM[c]}" loading="lazy"></span>`).join('');
  $('#mq').innerHTML = one + one.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');

  /* FAQ */
  const FAQ = [
    ['Combien de temps dure l\'installation d\'un ascenseur ?', 'Cela dépend de l\'équipement et du bâtiment. En général, entre 3 et 6 semaines, préparation, pose et mise en service comprises.'],
    ['Proposez-vous des ascenseurs pour les maisons individuelles ?', 'Oui. Nous disposons d\'ascenseurs compacts et esthétiques, adaptés aux résidences privées même avec un espace réduit, sûrs et conformes aux normes d\'accessibilité.'],
    ['Faites-vous la maintenance d\'ascenseurs d\'autres marques ?', 'Oui. Notre équipe intervient sur tous types d\'équipements, y compris ceux que nous n\'avons pas installés, avec des contrats adaptés à chaque situation.'],
    ['Intervenez-vous partout en Côte d\'Ivoire ?', 'Oui. Nos équipes sont déployées sur tout le territoire, avec des techniciens basés dans plusieurs régions, et dans certains pays de la sous-région sur demande.'],
    ['Quelles garanties offrez-vous ?', 'Tous nos équipements sont couverts par une garantie constructeur, avec des extensions possibles via nos contrats de maintenance.'],
    ['L\'estimation en ligne vaut-elle devis ?', 'Non. Elle donne une fourchette indicative pour préparer votre budget. Le prix ferme est établi après la visite technique.'],
  ];
  $('#faq-l').innerHTML = FAQ.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<span class="fq-ic">${ic('plus')}</span></summary><p>${a}</p></details>`).join('');

  /* Méga-menu */
  const megas = $$('[data-mega]');
  function closeAll() { megas.forEach(m => { m.classList.remove('on'); $('.mb', m).setAttribute('aria-expanded', 'false'); }); }
  megas.forEach(m => {
    const b = $('.mb', m);
    b.addEventListener('click', e => { e.stopPropagation(); const on = !m.classList.contains('on'); closeAll(); if (on) { m.classList.add('on'); b.setAttribute('aria-expanded', 'true'); } });
    m.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover)').matches) { closeAll(); m.classList.add('on'); b.setAttribute('aria-expanded', 'true'); } });
    m.addEventListener('mouseleave', () => { if (matchMedia('(hover:hover)').matches) closeAll(); });
    $$('.mega a', m).forEach(a => a.addEventListener('click', closeAll));
  });
  document.addEventListener('click', e => { if (!e.target.closest('[data-mega]')) closeAll(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeAll(); drawer(false); } });

  /* Tiroir mobile */
  const dr = $('#drawer'), sc = $('#scrim'), bu = $('#burger');
  function drawer(on) { dr.classList.toggle('on', on); sc.classList.toggle('on', on); bu.setAttribute('aria-expanded', on); document.body.style.overflow = on ? 'hidden' : ''; }
  bu.addEventListener('click', () => drawer(true)); $('#close').addEventListener('click', () => drawer(false)); sc.addEventListener('click', () => drawer(false));
  $$('a', dr).forEach(a => a.addEventListener('click', () => drawer(false)));

  /* Barre de navigation au défilement */
  const nav = $('#nav');
  const onS = () => nav.classList.toggle('sc', scrollY > 8); addEventListener('scroll', onS, { passive: true }); onS();

  /* Compteurs : la valeur finale est déjà écrite dans le HTML ; animation douce seulement si visible */
  if (!window.__CAPTURE && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return; io.unobserve(en.target);
      const el = en.target, n = +el.dataset.n, t0 = performance.now();
      const step = t => { const p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: .6 });
    $$('[data-n]').forEach(el => io.observe(el));
  }
})();
