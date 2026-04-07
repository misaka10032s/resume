document.addEventListener("DOMContentLoaded", () => {
    const bootScreen = document.getElementById("boot-screen");
    const mainContent = document.getElementById("main-content");
    const typewriterElement = document.getElementById("typewriter");
    const skipBtn = document.getElementById("skip-btn");

    const bootSequence = [
        "Initialize system...",
        "Loading kernel modules [OK]",
        "Mounting file systems [OK]",
        "Starting networking service [OK]",
        "Fetching user profile: Yang, Zhen-Guan...",
        "Loading Vue3 components...",
        "Compiling C++ algorithms...",
        "Executing Python scripts...",
        "Access Granted. Welcome."
    ];

    let currentLine = 0;
    let currentChar = 0;
    let textHTML = "";
    let isSkipped = false;
    let typeTimeout;

    function skipAnimation() {
        if (isSkipped) return;
        isSkipped = true;
        clearTimeout(typeTimeout);
        bootScreen.style.opacity = "0";
        setTimeout(() => {
            bootScreen.classList.add("hidden");
            mainContent.classList.remove("hidden");
        }, 500);
    }

    function typeWriter() {
        if (isSkipped) return;
        if (currentLine < bootSequence.length) {
            if (currentChar < bootSequence[currentLine].length) {
                textHTML += bootSequence[currentLine].charAt(currentChar);
                typewriterElement.innerHTML = textHTML + '<span class="blink">_</span>';
                currentChar++;
                typeTimeout = setTimeout(typeWriter, Math.random() * 30 + 10);
            } else {
                textHTML += "<br>";
                typewriterElement.innerHTML = textHTML + '<span class="blink">_</span>';
                currentLine++;
                currentChar = 0;
                typeTimeout = setTimeout(typeWriter, Math.random() * 200 + 100);
            }
        } else {
            setTimeout(skipAnimation, 500);
        }
    }

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") skipAnimation();
    });

    skipBtn.addEventListener("click", skipAnimation);
    bootScreen.style.transition = "opacity 0.5s ease";
    setTimeout(typeWriter, 500);
});
