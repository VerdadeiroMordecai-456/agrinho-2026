// Gerenciamento de Acessibilidade - Escala de Fonte Relativa
document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const increaseBtn = document.getElementById('increase-font');
    const decreaseBtn = document.getElementById('decrease-font');
    const resetBtn = document.getElementById('reset-font');

    // Escala inicial em porcentagem
    let currentScale = 100; 

    // Função para atualizar o tamanho e aplicar as mudanças no layout
    const updateFontSize = (newScale) => {
        // Limites de segurança para não quebrar o layout (entre 70% e 150%)
        if (newScale >= 70 && newScale <= 150) {
            currentScale = newScale;
            htmlElement.style.setProperty('--font-scale', `${currentScale}%`);
            
            // Log visual no console simulando sistema cyberpunk
            console.log(`[AGRO_CORE_SYS]: Font scale updated to ${currentScale}%`);
        }
    };

    // EventListeners para os botões
    increaseBtn.addEventListener('click', () => updateFontSize(currentScale + 10));
    decreaseBtn.addEventListener('click', () => updateFontSize(currentScale - 10));
    resetBtn.addEventListener('click', () => updateFontSize(100));
});