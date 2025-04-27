const menuLinks = document.querySelectorAll(".menu-header a");

function smoothScroll(event) {
	event.preventDefault();
	const targetId = event.currentTarget.getAttribute("href").substring(1);
	const targetElement = document.getElementById(targetId);

	if (targetElement) {
		targetElement.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}
}
// biome-ignore lint/complexity/noForEach: <explanation>
menuLinks.forEach((link) => {
	link.addEventListener("click", smoothScroll);
});
