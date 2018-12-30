(() => {
	const mobileWidth = 680;

	const addMenuBackground = () => {
		const pageWidth = window.innerWidth;
		const bodyOffset =
			document.body.scrollTop || document.documentElement.scrollTop;
		const navigation = document.querySelector("header nav");

		if (pageWidth > mobileWidth) {
			bodyOffset > 0
				? navigation.classList.add("awesome-navigation-fixed")
				: navigation.classList.remove("awesome-navigation-fixed");
		}
	};

	const reorderResponsiveMenu = () => {
		const pageWidth = window.innerWidth;
		const navigationContainer = document.querySelector(
			"header nav .awesome-container"
		);
		const navigation = document.querySelector(
			"header nav .awesome-navigation"
		);
		const mobileNavigation = document.querySelector(
			"body > .awesome-navigation"
		);

		if (pageWidth <= mobileWidth) {
			document.body.insertAdjacentElement("afterbegin", navigation);
		} else if (pageWidth > mobileWidth && mobileNavigation) {
			navigationContainer.insertAdjacentElement(
				"beforeend",
				mobileNavigation
			);
		}
	};

	const mobileMenuToggle = () => {
		const menuToggle = document.querySelector(".awesome-navigation-toggle");
		menuToggle.addEventListener("click", () => {
			const mobileNavigation = document.querySelector(
				"body > .awesome-navigation"
			);
			mobileNavigation.classList.toggle("awesome-navigation-opened");
		});
	};

	const onNavItemClick = () => {
		const navItemList = document.querySelectorAll(".awesome-section-link");
		const navItems = [...navItemList];

		navItems.forEach(item => {
			item.addEventListener("click", event => {
				event.preventDefault();
				const sectionId =
					event.target.getAttribute("href") ||
					event.target.dataset.href;

				scrollToSection(sectionId);
			});
		});
	};

	const scrollToSection = sectionId => {
		let sectionPosition;
		let sectionOffset;

		const navigationHeight = document.querySelector("header nav")
			.offsetHeight;
		const pageWidth = window.innerWidth;

		if (sectionId !== "#") {
			sectionOffset = document.querySelector(sectionId).offsetTop;
			sectionPosition =
				pageWidth > mobileWidth
					? sectionOffset - navigationHeight
					: sectionOffset;
		} else {
			sectionPosition = 0;
		}

		window.scrollTo({
			behavior: "smooth",
			left: 0,
			top: sectionPosition
		});
	};

	const onTestimonialChange = () => {
		let firstChild;
		let lastChild;

		const previousArrow = document.querySelector(
			"#awesome-testimonials-previous"
		);
		const nextArrow = document.querySelector("#awesome-testimonials-next");
		const testimonials = document.querySelector(".awesome-testimonials ul");

		document.addEventListener("click", () => {
			if (event.target === previousArrow) {
				lastChild = testimonials.lastElementChild;
				testimonials.insertAdjacentElement("afterbegin", lastChild);
			} else if (event.target === nextArrow) {
				firstChild = testimonials.firstElementChild;
				testimonials.insertAdjacentElement("beforeend", firstChild);
			}
		});
	};

	const onGalleryImageClick = () => {
		const galleryImageList = document.querySelectorAll(
			"#awesome-gallery li"
		);
		const galleryImages = [...galleryImageList];
		galleryImages.forEach(image => {
			image.addEventListener("click", event => {
				galleryImageOpen(event.target);
			});
		});
	};

	const galleryImageOpen = image => {
		const imageSource = image.getAttribute("src");
		const openedImage = `<div class='awesome-backdrop'><img src='${imageSource}' alt=''><span class='awesome-backdrop-close'>x</span></div>`;

		document.body.insertAdjacentHTML("beforeend", openedImage);
		galleryImageClose();
	};

	const galleryImageClose = () => {
		const closeButton = document.querySelector(".awesome-backdrop-close");
		closeButton.addEventListener("click", () => {
			const backdrop = document.querySelector(".awesome-backdrop");
			backdrop.remove();
		});
	};

	window.addEventListener("scroll", () => {
		addMenuBackground();
	});

	window.addEventListener("resize", () => {
		reorderResponsiveMenu();
	});

	reorderResponsiveMenu();

	mobileMenuToggle();

	onNavItemClick();

	onTestimonialChange();

	onGalleryImageClick();
})();
