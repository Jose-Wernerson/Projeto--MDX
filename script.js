const menuLinks = document.querySelectorAll(".menu-header a");
const menuToggle = document.querySelector(".menu-toggle");
const menuHeader = document.querySelector(".menu-header");

function smoothScroll(event) {
	const href = event.currentTarget.getAttribute("href");
	if (!href.startsWith("#")) return;
	event.preventDefault();
	const targetElement = document.getElementById(href.substring(1));
	if (targetElement) {
		targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
	}
}

// biome-ignore lint/complexity/noForEach: <explanation>
menuLinks.forEach((link) => {
	link.addEventListener("click", smoothScroll);
	link.addEventListener("click", () => {
		if (menuHeader) menuHeader.classList.remove("open");
	});
});

if (menuToggle && menuHeader) {
	menuToggle.addEventListener("click", () => {
		menuHeader.classList.toggle("open");
	});
}

const fadeObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				fadeObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.1 },
);

document.querySelectorAll(".fade-in").forEach((el) => fadeObserver.observe(el));

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Cookie Consent (LGPD) ──────────────────────────────────
const COOKIE_CONSENT_KEY = "mdx_cookie_consent";

function loadAnalytics() {
	// Cole aqui o snippet do Google Analytics 4 / Google Ads (gtag.js)
	// quando tiver o Measurement ID. Só roda depois do usuário aceitar cookies.
}

function showCookieBanner() {
	const banner = document.createElement("div");
	banner.className = "cookie-banner";
	banner.innerHTML = `
		<p>Usamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao continuar, você concorda com nossa <a href="politica-de-privacidade.html">Política de Privacidade</a>.</p>
		<div class="cookie-banner-actions">
			<button type="button" class="cookie-btn cookie-reject">Recusar</button>
			<button type="button" class="cookie-btn cookie-accept">Aceitar</button>
		</div>
	`;
	document.body.appendChild(banner);

	banner.querySelector(".cookie-accept").addEventListener("click", () => {
		localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
		banner.remove();
		loadAnalytics();
	});
	banner.querySelector(".cookie-reject").addEventListener("click", () => {
		localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
		banner.remove();
	});
}

const cookieConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
if (cookieConsent === "accepted") {
	loadAnalytics();
} else if (cookieConsent !== "rejected") {
	showCookieBanner();
}
