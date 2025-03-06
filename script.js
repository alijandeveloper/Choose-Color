document.addEventListener("DOMContentLoaded", () => {
    const colorPicker = document.getElementById("colorPicker");
    const hexCode = document.getElementById("hexCode");
    const rgbCode = document.getElementById("rgbCode");
    const hslCode = document.getElementById("hslCode");
    const randomColorBtn = document.getElementById("randomColor");
    const colorHistory = document.getElementById("colorHistory");
    const colorShades = document.getElementById("colorShades");
    const copyButtons = document.querySelectorAll(".copy-btn");

    function updateColorInfo(color) {
        hexCode.textContent = color;
        rgbCode.textContent = hexToRgb(color);
        hslCode.textContent = hexToHsl(color);
        document.body.style.backgroundColor = color;
        addToHistory(color);
        generateShades(color);
    }

    function hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function hexToHsl(hex) {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    function addToHistory(color) {
        const box = document.createElement("div");
        box.classList.add("color-box");
        box.style.backgroundColor = color;
        box.addEventListener("click", () => updateColorInfo(color));
        colorHistory.prepend(box);
    }

    function generateShades(color) {
        colorShades.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
            let shade = lightenDarkenColor(color, i * -20);
            const box = document.createElement("div");
            box.classList.add("color-box");
            box.style.backgroundColor = shade;
            box.addEventListener("click", () => updateColorInfo(shade));
            colorShades.appendChild(box);
        }
    }
