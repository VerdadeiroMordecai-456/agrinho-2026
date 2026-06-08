document.addEventListener("DOMContentLoaded", () => {
    
    // --- MODO CLARO / ESCURO COM LOCAL STORAGE ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });

    // --- MENU RESPONSIVO ---
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Fechar menu ao clicar em algum link móvel
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // --- GERADOR DE DICAS APRIMORADO ---
    const tips = [
        "A rotação de culturas melhora a saúde do solo e quebra o ciclo de pragas de forma natural.",
        "A captação e uso de água da chuva reduz drasticamente o consumo dos lençóis freáticos rurais.",
        "Plantar faixas de vegetação nativa atrai polinizadores naturais, aumentando a produtividade de frutos.",
        "O uso de adubação verde protege a superfície do solo contra erosões e fornece nitrogênio orgânico.",
        "Sistemas de irrigação por gotejamento evitam a evaporação precoce e economizam até 60% de recursos hídricos."
    ];

    const tipText = document.getElementById("tip-text");
    const tipBtn = document.getElementById("new-tip-btn");

    tipBtn.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * tips.length);
        tipText.style.opacity = 0;
        setTimeout(() => {
            tipText.innerText = tips[randomIndex];
            tipText.style.opacity = 1;
        }, 200);
    });

    // --- ANIMADOR DE NÚMEROS (DASHBOARD) ---
    const counters = document.querySelectorAll(".counter-number");
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const speed = 150; // Quanto menor, mais rápido
            const increment = target / speed;

            const updateCount = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString("pt-BR");
                }
            };
            updateCount();
        });
    };

    // Ativa animação quando a seção entra em tela (Intersection Observer)
    const dashboardSection = document.getElementById("dashboard");
    const observerOptions = { threshold: 0.3 };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(dashboardSection);

    // --- CRIAÇÃO DO GRÁFICO DINÂMICO ---
    const graphData = [
        { ano: "2021", valor: 35 },
        { ano: "2022", valor: 48 },
        { ano: "2023", valor: 60 },
        { ano: "2024", valor: 72 },
        { ano: "2025", valor: 85 },
        { ano: "2026", valor: 94 }
    ];

    const graphContainer = document.getElementById("evolution-graph");
    const labelsContainer = document.getElementById("graph-labels");

    graphData.forEach(item => {
        // Criar barra do gráfico
        const bar = document.createElement("div");
        bar.classList.add("graph-bar");
        bar.style.height = `${item.valor}%`;
        
        const barValue = document.createElement("span");
        barValue.classList.add("graph-bar-value");
        barValue.innerText = `${item.valor}%`;
        
        bar.appendChild(barValue);
        graphContainer.appendChild(bar);

        // Criar label do ano
        const label = document.createElement("span");
        label.innerText = item.ano;
        labelsContainer.appendChild(label);
    });

    // --- QUIZ INTERATIVO ---
    const quizData = [
        {
            q: "Qual prática melhor evita a exaustão nutricional do solo?",
            options: ["Uso intensivo de fertilizantes químicos", "Monocultura contínua", "Rotação de Culturas", "Queimada controlada"],
            correct: 2
        },
        {
            q: "A Agricultura de Precisão utiliza primordialmente qual dessas ferramentas?",
            options: ["Tração animal pura", "Drones, sensores IoT e dados de Satélite", "Manejo manual sem mapeamento", "Calendários astronômicos antigos"],
            correct: 1
        },
        {
            q: "Qual o maior ganho ambiental do sistema de Plantio Direto?",
            options: ["Aumento da queima de biomassa", "Redução drástica da erosão do solo", "Eliminação total de polinizadores", "Expansão desordenada de terras"],
            correct: 1
        }
    ];

    let currentQuestionIdx = 0;
    let score = 0;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const quizResult = document.getElementById("quiz-result");
    const resultText = document.getElementById("result-text");
    const restartBtn = document.getElementById("restart-quiz-btn");
    const questionBox = document.getElementById("question-box");

    function loadQuestion() {
        if (currentQuestionIdx < quizData.length) {
            const currentQ = quizData[currentQuestionIdx];
            questionText.innerText = currentQ.q;
            optionsContainer.innerHTML = "";

            currentQ.options.forEach((opt, idx) => {
                const btn = document.createElement("button");
                btn.classList.add("option-btn");
                btn.innerText = opt;
                btn.addEventListener("click", () => handleAnswer(idx, btn));
                optionsContainer.appendChild(btn);
            });
        } else {
            showQuizResult();
        }
    }

    function handleAnswer(selectedIdx, clickedButton) {
        const correctIdx = quizData[currentQuestionIdx].correct;
        const allButtons = optionsContainer.querySelectorAll(".option-btn");
        
        // Desabilitar cliques adicionais temporariamente
        allButtons.forEach(b => b.style.pointerEvents = "