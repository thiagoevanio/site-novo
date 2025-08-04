// Quiz: Qual esporte combina com sua personalidade?
class SportQuiz {
    constructor() {
        this.questions = [
            {
                question: "Qual ambiente você prefere para se exercitar?",
                options: [
                    "Ao ar livre, em contato com a natureza",
                    "Em um ambiente fechado, com equipamentos e estrutura",
                    "Em equipe, com muita interação social",
                    "Sozinho, focado no meu desempenho"
                ],
                correct: -1, // No correct answer for personality quizzes
                explanation: "Sua preferência de ambiente pode indicar esportes como corrida (ar livre), musculação (ambiente fechado), futebol (equipe) ou natação (sozinho)."
            },
            {
                question: "Como você lida com a competição?",
                options: [
                    "Adoro competir e dar o meu melhor para vencer",
                    "Gosto de competir, mas o importante é participar e se divertir",
                    "Prefiro atividades sem competição, focando no meu bem-estar",
                    "A competição me motiva a superar meus limites"
                ],
                correct: -1,
                explanation: "Sua atitude em relação à competição pode direcionar para esportes individuais ou coletivos, de alta ou baixa intensidade competitiva."
            },
            {
                question: "Qual a sua principal motivação para praticar um esporte?",
                options: [
                    "Melhorar minha saúde e condicionamento físico",
                    "Aliviar o estresse e relaxar",
                    "Conhecer pessoas novas e socializar",
                    "Superar desafios e alcançar metas"
                ],
                correct: -1,
                explanation: "Sua motivação principal pode indicar esportes com foco em saúde (caminhada), relaxamento (yoga), socialização (vôlei) ou performance (triatlo)."
            },
            {
                question: "Você prefere esportes que exigem mais...",
                options: [
                    "Força e resistência",
                    "Agilidade e coordenação",
                    "Estratégia e raciocínio",
                    "Flexibilidade e equilíbrio"
                ],
                correct: -1,
                explanation: "Cada esporte demanda diferentes habilidades físicas e mentais. Escolha o que mais se alinha com suas aptidões."
            },
            {
                question: "Como você se sente em relação a esportes de contato físico?",
                options: [
                    "Adoro, me sinto energizado e desafiado",
                    "Não me importo, desde que seja seguro e controlado",
                    "Prefiro evitar, não gosto de contato físico",
                    "Depende do esporte e da intensidade"
                ],
                correct: -1,
                explanation: "Sua preferência por contato físico pode indicar esportes como rugby (contato intenso), basquete (contato moderado) ou natação (sem contato)."
            },
            {
                question: "Qual o seu ritmo ideal de atividade física?",
                options: [
                    "Intenso e rápido, para suar bastante",
                    "Moderado e constante, para manter o fôlego",
                    "Leve e relaxante, para descontrair",
                    "Variado, alternando intensidade e tipo de exercício"
                ],
                correct: -1,
                explanation: "Seu ritmo preferido pode indicar esportes de alta intensidade (HIIT), moderada (ciclismo), leve (pilates) ou uma combinação."
            },
            {
                question: "Você se considera uma pessoa mais...",
                options: [
                    "Extrovertida e sociável",
                    "Introvertida e focada",
                    "Calma e paciente",
                    "Aventureira e destemida"
                ],
                correct: -1,
                explanation: "Sua personalidade pode influenciar a escolha de esportes coletivos (extrovertido), individuais (introvertido), de precisão (calmo) ou radicais (aventureiro)."
            },
            {
                question: "Qual a importância da disciplina e rotina para você na prática esportiva?",
                options: [
                    "Essencial, sigo um plano rigoroso",
                    "Importante, mas gosto de flexibilidade",
                    "Não muito, prefiro espontaneidade",
                    "Me ajuda a manter o foco e alcançar resultados"
                ],
                correct: -1,
                explanation: "Sua relação com a disciplina pode indicar esportes que exigem rotina (musculação) ou mais liberdade (caminhada exploratória)."
            },
            {
                question: "Você se importa em suar e se cansar bastante durante o exercício?",
                options: [
                    "Sim, é sinal de que estou me esforçando",
                    "Não me importo, faz parte do processo",
                    "Prefiro atividades que me deixem menos exausto",
                    "Depende do meu humor no dia"
                ],
                correct: -1,
                explanation: "Sua tolerância ao esforço físico pode indicar esportes de alta intensidade (crossfit) ou de menor impacto (yoga)."
            },
            {
                question: "Qual o seu objetivo a longo prazo com a prática de um esporte?",
                options: [
                    "Participar de competições e ganhar títulos",
                    "Manter um estilo de vida ativo e saudável",
                    "Aprender novas habilidades e me desenvolver",
                    "Ter um hobby divertido e prazeroso"
                ],
                correct: -1,
                explanation: "Seu objetivo final pode guiar a escolha de um esporte com foco em performance, saúde, aprendizado ou lazer."
            }
        ];
        
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.isQuizCompleted = false;
        
        this.init();
    }
    
    init() {
        this.createQuizHTML();
        this.bindEvents();
        this.showQuestion();
    }
    
    createQuizHTML() {
        const quizContainer = document.getElementById("quiz-questions");
        if (!quizContainer) return;
        
        const progressHTML = `
            <div class="quiz-progress">
                <div class="quiz-progress-bar" id="quiz-progress-bar" style="width: 0%"></div>
            </div>
        `;
        
        quizContainer.innerHTML = progressHTML;
    }
    
    showQuestion() {
        const quizContainer = document.getElementById("quiz-questions");
        const question = this.questions[this.currentQuestion];
        
        const progressBar = document.getElementById("quiz-progress-bar");
        const progress = ((this.currentQuestion) / this.questions.length) * 100;
        progressBar.style.width = progress + "%";
        
        const questionHTML = `
            <div class="quiz-progress">
                <div class="quiz-progress-bar" id="quiz-progress-bar" style="width: ${progress}%"></div>
            </div>
            <div class="quiz-question">
                <h3>Pergunta ${this.currentQuestion + 1} de ${this.questions.length}</h3>
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option" data-option="${index}">
                            <div class="quiz-option-text">${option}</div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
        
        quizContainer.innerHTML = questionHTML;
        
        this.updateNavigation();
        this.bindOptionEvents();
    }
    
    bindOptionEvents() {
        const options = document.querySelectorAll(".quiz-option");
        options.forEach(option => {
            option.addEventListener("click", (e) => {
                options.forEach(opt => opt.classList.remove("selected"));
                option.classList.add("selected");
                
                const selectedOption = parseInt(option.dataset.option);
                this.userAnswers[this.currentQuestion] = selectedOption;
                
                const nextBtn = document.getElementById("next-question");
                const submitBtn = document.getElementById("submit-quiz");
                
                if (this.currentQuestion === this.questions.length - 1) {
                    submitBtn.style.display = "inline-block";
                    nextBtn.style.display = "none";
                } else {
                    nextBtn.style.display = "inline-block";
                    nextBtn.disabled = false;
                }
            });
        });
    }
    
    updateNavigation() {
        const prevBtn = document.getElementById("prev-question");
        const nextBtn = document.getElementById("next-question");
        const submitBtn = document.getElementById("submit-quiz");
        
        if (this.currentQuestion > 0) {
            prevBtn.style.display = "inline-block";
        } else {
            prevBtn.style.display = "none";
        }
        
        if (this.currentQuestion === this.questions.length - 1) {
            nextBtn.style.display = "none";
            submitBtn.style.display = "none";
        } else {
            nextBtn.style.display = "none";
            submitBtn.style.display = "none";
        }
        
        if (this.userAnswers[this.currentQuestion] !== undefined) {
            if (this.currentQuestion === this.questions.length - 1) {
                submitBtn.style.display = "inline-block";
            } else {
                nextBtn.style.display = "inline-block";
            }
            
            const options = document.querySelectorAll(".quiz-option");
            if (options[this.userAnswers[this.currentQuestion]]) {
                options[this.userAnswers[this.currentQuestion]].classList.add("selected");
            }
        }
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }
    
    showResults() {
        // Lógica para determinar o esporte ideal com base nas respostas
        const results = this.analyzeAnswers();
        
        let feedback = 
            `Com base nas suas respostas, o esporte que mais combina com você é: <strong>${results.sport}</strong>!\n\n` +
            `Isso porque você demonstrou preferência por ${results.reason}.\n\n` +
            `Experimente e divirta-se!`;
        
        const resultHTML = `
            <div id="quiz-result">
                <h3>🎉 Seu Esporte Ideal!</h3>
                <p id="quiz-feedback">${feedback}</p>
                <div style="margin: 2rem 0;">
                    <button id="restart-quiz" class="btn-secondary">Tentar Novamente</button>
                </div>
            </div>
        `;
        
        document.getElementById("quiz-questions").innerHTML = resultHTML;
        document.getElementById("quiz-navigation").style.display = "none";
        
        document.getElementById("restart-quiz").addEventListener("click", () => {
            this.restartQuiz();
        });
        
        this.isQuizCompleted = true;
    }
    
    analyzeAnswers() {
        const scores = {
            "Esportes Individuais (Corrida, Natação, Ciclismo)": 0,
            "Esportes Coletivos (Futebol, Vôlei, Basquete)": 0,
            "Esportes de Força (Musculação, Levantamento de Peso)": 0,
            "Esportes de Agilidade e Coordenação (Tênis, Badminton)": 0,
            "Esportes de Luta (Boxe, Judô)": 0,
            "Esportes de Aventura (Trilha, Escalada)": 0,
            "Esportes de Baixo Impacto (Yoga, Pilates)": 0
        };

        this.userAnswers.forEach((answer, index) => {
            switch (index) {
                case 0: // Ambiente
                    if (answer === 0) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 2;
                    if (answer === 1) scores["Esportes de Força (Musculação, Levantamento de Peso)"] += 2;
                    if (answer === 2) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 2;
                    if (answer === 3) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 1;
                    break;
                case 1: // Competição
                    if (answer === 0) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 2; scores["Esportes de Luta (Boxe, Judô)"] += 2;
                    if (answer === 1) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1;
                    if (answer === 2) scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 2;
                    if (answer === 3) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 2; scores["Esportes de Força (Musculação, Levantamento de Peso)"] += 1;
                    break;
                case 2: // Motivação
                    if (answer === 0) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 2; scores["Esportes de Força (Musculação, Levantamento de Peso)"] += 2;
                    if (answer === 1) scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 2;
                    if (answer === 2) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 2;
                    if (answer === 3) scores["Esportes de Aventura (Trilha, Escalada)"] += 2; scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 1;
                    break;
                case 3: // Habilidades
                    if (answer === 0) scores["Esportes de Força (Musculação, Levantamento de Peso)"] += 2; scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 1;
                    if (answer === 1) scores["Esportes de Agilidade e Coordenação (Tênis, Badminton)"] += 2; scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1;
                    if (answer === 2) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1; scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 1;
                    if (answer === 3) scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 2;
                    break;
                case 4: // Contato Físico
                    if (answer === 0) scores["Esportes de Luta (Boxe, Judô)"] += 2; scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1;
                    if (answer === 1) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1;
                    if (answer === 2) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 2; scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 2;
                    break;
                case 5: // Ritmo
                    if (answer === 0) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 2; scores["Esportes de Força (Musculação, Levantamento de Peso)"] += 2;
                    if (answer === 1) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 1; scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1;
                    if (answer === 2) scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 2;
                    if (answer === 3) scores["Esportes de Aventura (Trilha, Escalada)"] += 1;
                    break;
                case 6: // Personalidade
                    if (answer === 0) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 2;
                    if (answer === 1) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 2; scores["Esportes de Força (Musculação, Levantamento de Peso)"] += 1;
                    if (answer === 2) scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 2;
                    if (answer === 3) scores["Esportes de Aventura (Trilha, Escalada)"] += 2;
                    break;
                case 7: // Disciplina e Rotina
                    if (answer === 0) scores["Esportes de Força (Musculação, Levantamento de Peso)"] += 2; scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 1;
                    if (answer === 1) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1;
                    if (answer === 2) scores["Esportes de Aventura (Trilha, Escalada)"] += 1;
                    if (answer === 3) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 1; scores["Esportes de Força (Musculação, Levantamento de Peso)"] += 1;
                    break;
                case 8: // Suor e Cansaço
                    if (answer === 0) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 2; scores["Esportes de Força (Musculação, Levantamento de Peso)"] += 2; scores["Esportes de Luta (Boxe, Judô)"] += 2;
                    if (answer === 1) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1;
                    if (answer === 2) scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 2;
                    break;
                case 9: // Objetivo a Longo Prazo
                    if (answer === 0) scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 1; scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1; scores["Esportes de Luta (Boxe, Judô)"] += 1;
                    if (answer === 1) scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 1; scores["Esportes Individuais (Corrida, Natação, Ciclismo)"] += 1;
                    if (answer === 2) scores["Esportes de Agilidade e Coordenação (Tênis, Badminton)"] += 1; scores["Esportes de Aventura (Trilha, Escalada)"] += 1;
                    if (answer === 3) scores["Esportes Coletivos (Futebol, Vôlei, Basquete)"] += 1; scores["Esportes de Baixo Impacto (Yoga, Pilates)"] += 1;
                    break;
            }
        });

        let bestSport = "";
        let maxScore = -1;
        let reason = "";

        for (const sport in scores) {
            if (scores[sport] > maxScore) {
                maxScore = scores[sport];
                bestSport = sport;
            }
        }

        // Determinar a razão com base no esporte escolhido
        if (bestSport.includes("Individuais")) {
            reason = "preferência por atividades que permitem foco pessoal e superação individual";
        } else if (bestSport.includes("Coletivos")) {
            reason = "gosto por interação social, trabalho em equipe e competição amigável";
        } else if (bestSport.includes("Força")) {
            reason = "busca por desenvolvimento de força, resistência e disciplina";
        } else if (bestSport.includes("Agilidade")) {
            reason = "apreciação por atividades que exigem reflexos rápidos e coordenação motora";
        } else if (bestSport.includes("Luta")) {
            reason = "interesse em desafios físicos intensos e desenvolvimento de autodefesa";
        } else if (bestSport.includes("Aventura")) {
            reason = "espírito aventureiro, gosto por desafios ao ar livre e exploração";
        } else if (bestSport.includes("Baixo Impacto")) {
            reason = "busca por bem-estar, flexibilidade, equilíbrio e redução de estresse";
        } else {
            reason = "suas características únicas";
        }

        return { sport: bestSport, reason: reason };
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.isQuizCompleted = false;
        
        this.createQuizHTML(); 
        
        document.getElementById("quiz-navigation").style.display = "flex";
        document.getElementById("quiz-result").style.display = "none";
        
        this.showQuestion();
    }
    
    bindEvents() {
        const nextBtn = document.getElementById("next-question");
        const prevBtn = document.getElementById("prev-question");
        const submitBtn = document.getElementById("submit-quiz");
        
        if (nextBtn) {
            nextBtn.addEventListener("click", () => this.nextQuestion());
        }
        
        if (prevBtn) {
            prevBtn.addEventListener("click", () => this.prevQuestion());
        }
        
        if (submitBtn) {
            submitBtn.addEventListener("click", () => this.showResults());
        }
    }
}

// Inicializar o quiz quando a página carregar
document.addEventListener("DOMContentLoaded", function() {
    // Verificar se estamos na página correta para este quiz
    if (document.getElementById("quiz-questions") && (window.location.pathname.includes("quiz_esporte.html") || window.location.href.includes("quiz_esporte.html"))) {
        new SportQuiz();
    }
});


