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
