// Gerenciamento de Acessibilidade - Escala de Fonte Reativa
document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const increaseBtn = document.getElementById('increase-font');
    const decreaseBtn = document.getElementById('decrease-font');
    const resetBtn = document.getElementById('reset-font');

    let currentScale = 100; 

    const updateFontSize = (newScale) => {
        if (newScale >= 70 && newScale <= 150) {
            currentScale = newScale;
            htmlElement.style.setProperty('--font-scale', `${currentScale}%`);
            console.log(`[AGRO_CORE_SYS]: Font scale updated to ${currentScale}%`);
        }
    };

    increaseBtn.addEventListener('click', () => updateFontSize(currentScale + 10));
    decreaseBtn.addEventListener('click', () => updateFontSize(currentScale - 10));
    resetBtn.addEventListener('click', () => updateFontSize(100));
});