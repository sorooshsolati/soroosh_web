/* =========================================
   SOROUSH PORTFOLIO
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const header = document.querySelector(".header");
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");


    /* =========================
       MOBILE MENU
    ========================= */

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navMenu.classList.contains("active")) {

                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }

            } else {

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        /* Close menu after clicking a link */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =========================
       HEADER ON SCROLL
    ========================= */

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".glass-card, .section-title, .hero-content, .hero-visual"
    );


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =========================
       CURRENT NAV LINK
    ========================= */

    const sections = document.querySelectorAll("section[id]");


    function updateActiveLink() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;


            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");


            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.offsetTop -
                        headerHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =========================
       FOOTER YEAR
    ========================= */

    const yearElement =
        document.querySelector(
            "#current-year"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================
       BUTTON RIPPLE EFFECT
    ========================= */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");


                ripple.classList.add("ripple");


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;


                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `${event.clientX -
                    rect.left -
                    size / 2}px`;


                ripple.style.top =
                    `${event.clientY -
                    rect.top -
                    size / 2}px`;


                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


    /* =========================
       CODE WINDOW TYPING
    ========================= */

    const codeWindow =
        document.querySelector(
            ".code-content"
        );


    if (codeWindow) {

        codeWindow.style.opacity = "0";


        setTimeout(() => {

            codeWindow.style.transition =
                "opacity 1s ease";


            codeWindow.style.opacity = "1";

        }, 500);

    }


    /* =========================
       MOUSE PARALLAX
    ========================= */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.innerWidth > 900
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) * 8;


                const rotateX =
                    ((y / rect.height) - 0.5) * -8;


                const codeWindow =
                    heroVisual.querySelector(
                        ".code-window"
                    );


                if (codeWindow) {

                    codeWindow.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                const codeWindow =
                    heroVisual.querySelector(
                        ".code-window"
                    );


                if (codeWindow) {

                    codeWindow.style.transform =
                        "perspective(1000px) rotateY(-5deg)";

                }

            }
        );

    }

});


/* =========================================================
   CONTACT MODAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const modal =
            document.getElementById(
                "contact-modal"
            );


        const modalClose =
            document.getElementById(
                "modal-close"
            );


        const modalBackdrop =
            document.querySelector(
                ".contact-modal-backdrop"
            );


        const copyPhone =
            document.getElementById(
                "copy-phone"
            );


        const phoneNumber =
            document.getElementById(
                "phone-number"
            );


        const copyMessage =
            document.getElementById(
                "copy-message"
            );


        if (!modal) return;


        /* -----------------------------------------
           OPEN MODAL
        ----------------------------------------- */

        function openContactModal() {

            modal.classList.add("active");

            document.body.style.overflow =
                "hidden";

        }


        /* -----------------------------------------
           CLOSE MODAL
        ----------------------------------------- */

        function closeContactModal() {

            modal.classList.remove("active");

            document.body.style.overflow =
                "";

        }


        /* -----------------------------------------
           PROJECT BUTTONS
        ----------------------------------------- */

        const projectLinks =
            document.querySelectorAll(
                ".project-link"
            );


        projectLinks.forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openContactModal();

                }
            );

        });


        /* -----------------------------------------
           SOCIAL ICONS
        ----------------------------------------- */

        const socialLinks =
            document.querySelectorAll(
                ".social-links a"
            );


        socialLinks.forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openContactModal();

                }
            );

        });


        /* -----------------------------------------
           CLOSE
        ----------------------------------------- */

        if (modalClose) {

            modalClose.addEventListener(
                "click",
                closeContactModal
            );

        }


        if (modalBackdrop) {

            modalBackdrop.addEventListener(
                "click",
                closeContactModal
            );

        }


        /* -----------------------------------------
           ESC KEY
        ----------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains("active")
                ) {

                    closeContactModal();

                }

            }
        );


        /* -----------------------------------------
           COPY PHONE
        ----------------------------------------- */

        if (copyPhone && phoneNumber) {

            copyPhone.addEventListener(
                "click",
                async () => {

                    try {

                        await navigator.clipboard.writeText(
                            phoneNumber.textContent.trim()
                        );


                        if (copyMessage) {

                            copyMessage.classList.add(
                                "show"
                            );


                            setTimeout(() => {

                                copyMessage.classList.remove(
                                    "show"
                                );

                            }, 2000);

                        }

                    } catch (error) {

                        console.log(
                            "Copy failed:",
                            error
                        );

                    }

                }
            );

        }

    }
);


/* =========================================================
   LOAD SAVED CONTENT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const savedContent =
            JSON.parse(
                localStorage.getItem(
                    "siteContent"
                ) || "{}"
            );


        const heroBefore =
            document.getElementById(
                "hero-before"
            );


        const heroHighlight =
            document.getElementById(
                "hero-highlight"
            );


        const heroAfter =
            document.getElementById(
                "hero-after"
            );


        if (
            heroBefore &&
            savedContent.heroBefore
        ) {

            heroBefore.textContent =
                savedContent.heroBefore;

        }


        if (
            heroHighlight &&
            savedContent.heroHighlight
        ) {

            heroHighlight.textContent =
                savedContent.heroHighlight;

        }


        if (
            heroAfter &&
            savedContent.heroAfter
        ) {

            heroAfter.textContent =
                savedContent.heroAfter;

        }

    }
);


/* =========================================================
   SAVE CONTACT FORM MESSAGES
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const contactForm =
            document.getElementById(
                "contact-form"
            );


        if (!contactForm) return;


        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();


                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    alert(
                        "لطفاً تمام فیلدها را تکمیل کنید."
                    );

                    return;

                }


                const messages =
                    JSON.parse(
                        localStorage.getItem(
                            "siteMessages"
                        ) || "[]"
                    );


                const newMessage = {

                    id: Date.now(),

                    name: name,

                    email: email,

                    message: message,

                    date:
                        new Date()
                            .toLocaleString(
                                "fa-IR"
                            ),

                    read: false

                };


                messages.unshift(
                    newMessage
                );


                localStorage.setItem(
                    "siteMessages",
                    JSON.stringify(messages)
                );


                contactForm.reset();


                alert(
                    "پیام شما با موفقیت ارسال شد ❤️"
                );

            }
        );

    }
);


/* =========================================================
   VISITOR ANALYTICS
   SOROUSH PORTFOLIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * فقط در صفحه اصلی سایت آمار ثبت می‌کنیم.
         * این باعث می‌شود ورود به admin.html
         * خودش بازدید سایت حساب نشود.
         */

        const isHomePage =
            document.querySelector(
                ".hero"
            ) ||
            document.querySelector(
                "#home"
            );


        if (!isHomePage) return;


        /*
         * تشخیص مدیر
         *
         * اگر قبلاً از طریق login وارد پنل شده باشی،
         * sessionStorage فعال خواهد بود.
         */

        const isAdmin =
            sessionStorage.getItem(
                "adminLoggedIn"
            ) === "true";


        /*
         * تاریخ امروز
         */

        const today =
            getLocalDateKey();


        /*
         * دریافت آمار قبلی
         */

        let analytics =
            JSON.parse(
                localStorage.getItem(
                    "siteAnalytics"
                ) || "{}"
            );


        /*
         * ساختار اولیه
         */

        if (
            typeof analytics !== "object" ||
            analytics === null
        ) {

            analytics = {};

        }


        analytics.totalViews =
            Number(
                analytics.totalViews || 0
            );


        analytics.uniqueVisitors =
            Number(
                analytics.uniqueVisitors || 0
            );


        analytics.adminViews =
            Number(
                analytics.adminViews || 0
            );


        analytics.userViews =
            Number(
                analytics.userViews || 0
            );


        if (
            !analytics.daily ||
            typeof analytics.daily !== "object"
        ) {

            analytics.daily = {};

        }


        /*
         * ========================================
         * TOTAL PAGE VIEWS
         * ========================================
         */

        analytics.totalViews++;


        /*
         * ========================================
         * ADMIN / USER
         * ========================================
         */

        if (isAdmin) {

            analytics.adminViews++;

        } else {

            analytics.userViews++;

        }


        /*
         * ========================================
         * UNIQUE VISITOR
         * ========================================
         *
         * یک visitor ID برای مرورگر ساخته می‌شود.
         *
         * اگر کاربر 10 بار سایت را باز کند:
         *
         * totalViews = +10
         * userViews  = +10
         * unique     = +1
         *
         */

        if (!isAdmin) {

            let visitorId =
                localStorage.getItem(
                    "siteVisitorId"
                );


            if (!visitorId) {

                visitorId =
                    createVisitorId();


                localStorage.setItem(
                    "siteVisitorId",
                    visitorId
                );


                analytics.uniqueVisitors++;

            }

        }


        /*
         * ========================================
         * DAILY ANALYTICS
         * ========================================
         */

        if (
            !analytics.daily[today] ||
            typeof analytics.daily[today] !== "object"
        ) {

            analytics.daily[today] = {

                total: 0,

                admin: 0,

                users: 0

            };

        }


        analytics.daily[today].total =
            Number(
                analytics.daily[today].total || 0
            );


        analytics.daily[today].admin =
            Number(
                analytics.daily[today].admin || 0
            );


        analytics.daily[today].users =
            Number(
                analytics.daily[today].users || 0
            );


        analytics.daily[today].total++;


        if (isAdmin) {

            analytics.daily[today].admin++;

        } else {

            analytics.daily[today].users++;

        }


        /*
         * ========================================
         * SAVE
         * ========================================
         */

        localStorage.setItem(
            "siteAnalytics",
            JSON.stringify(
                analytics
            )
        );


    }
);


/* =========================================================
   CREATE VISITOR ID
========================================================= */

function createVisitorId() {

    /*
     * اگر مرورگر crypto.randomUUID
     * را پشتیبانی کند
     */

    if (
        window.crypto &&
        typeof window.crypto.randomUUID ===
            "function"
    ) {

        return window.crypto.randomUUID();

    }


    /*
     * روش جایگزین برای مرورگرهای قدیمی
     */

    return (
        "visitor_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 12)
    );

}


/* =========================================================
   LOCAL DATE KEY
   YYYY-MM-DD
========================================================= */

function getLocalDateKey() {

    const date =
        new Date();


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        `${year}-${month}-${day}`
    );

}