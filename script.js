document.addEventListener("DOMContentLoaded", () => {
    const bootScreen = document.getElementById("boot-screen");
    const mainContent = document.getElementById("main-content");
    const typewriterElement = document.getElementById("typewriter");
    const skipBtn = document.getElementById("skip-btn");

    // Boot sequence messages
    const bootSequence = [
        "Initialize system...",
        "Loading kernel modules [OK]",
        "Mounting file systems [OK]",
        "Starting networking service [OK]",
        "Fetching user profile: Yang, Chen-Kuan...",
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

    // Listen for ESC key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            skipAnimation();
        }
    });

    // Listen for Click on skip button
    skipBtn.addEventListener("click", skipAnimation);

    // Start the boot sequence
    setTimeout(typeWriter, 500);
    
    // Add smooth transition for boot screen
    bootScreen.style.transition = "opacity 0.5s ease";
});