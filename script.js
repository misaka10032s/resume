document.addEventListener("DOMContentLoaded", () => {
    const bootScreen = document.getElementById("boot-screen");
    const mainContent = document.getElementById("main-content");
    const typewriterElement = document.getElementById("typewriter");

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

    function typeWriter() {
        if (currentLine < bootSequence.length) {
            if (currentChar < bootSequence[currentLine].length) {
                textHTML += bootSequence[currentLine].charAt(currentChar);
                typewriterElement.innerHTML = textHTML + '<span class="blink">_</span>';
                currentChar++;
                // Randomize typing speed for realism
                setTimeout(typeWriter, Math.random() * 30 + 10); 
            } else {
                textHTML += "<br>";
                typewriterElement.innerHTML = textHTML + '<span class="blink">_</span>';
                currentLine++;
                currentChar = 0;
                // Pause at the end of a line
                setTimeout(typeWriter, Math.random() * 200 + 100);
            }
        } else {
            // Boot sequence finished, transition to main content
            setTimeout(() => {
                bootScreen.style.opacity = "0";
                setTimeout(() => {
                    bootScreen.classList.add("hidden");
                    mainContent.classList.remove("hidden");
                }, 500); // Wait for fade out
            }, 500); // Wait a bit before fading
        }
    }

    // Start the boot sequence
    setTimeout(typeWriter, 500);
    
    // Add smooth transition for boot screen
    bootScreen.style.transition = "opacity 0.5s ease";
});