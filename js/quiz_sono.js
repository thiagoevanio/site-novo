// Quiz: Você dorme o suficiente? Faça o teste.
class SleepQuiz {
    constructor() {
        this.questions = [
            {
                question: "Quantas horas você dorme em média por noite?",
                options: [
                    "Menos de 5 horas",
                    "5-6 horas",
                    "7-9 horas",
                    "Mais de 9 horas"
                ],
                correct: -1,
                explanation: "A maioria dos adultos precisa de 7 a 9 horas de sono por noite."
            },
            {
                question: "Com que frequência você se sente cansado(a) durante o dia, mesmo após uma noite de sono?",
                options: [
                    "Nunca ou raramente",
                    "Às vezes",
                    "Frequentemente",
                    "Quase todos os dias"
                ],
                correct: -1,
                explanation: "Sentir-se cansado(a) regularmente pode ser um sinal de sono insuficiente ou de má qualidade."
            },
            {
                question: "Você tem dificuldade para adormecer ou permanecer dormindo?",
                options: [
                    "Nunca ou raramente",
                    "Às vezes",
                    "Frequentemente",
                    "Quase todas as noites"
                ],
                correct: -1,
                explanation: "Problemas para iniciar ou manter o sono são indicadores de possíveis distúrbios do sono."
            },
            {
                question: "Você acorda revigorado(a) e com energia na maioria das manhãs?",
                options: [
                    "Sempre",
                    "Na maioria das vezes",
                    "Raramente",
                    "Nunca"
                ],
                correct: -1,
                explanation: "Acordar revigorado(a) é um sinal de que você está tendo um sono reparador."
            },
            {
                question: "Você costuma usar eletrônicos (celular, tablet, computador) na cama antes de dormir?",
                options: [
                    "Nunca",
                    "Raramente",
                    "Às vezes",
                    "Frequentemente"
                ],
                correct: -1,
                explanation: "A luz azul emitida por eletrônicos pode interferir na produção de melatonina, o hormônio do sono."
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
        const results = this.analyzeAnswers();
        
        let feedback = 
            `Com base nas suas respostas, aqui está uma análise do seu sono:\n\n` +
            `<strong>${results.summary}</strong>\n\n` +
            `Recomendação: ${results.recommendation}`;
        
        const resultHTML = `
            <div id="quiz-result">
                <h3>😴 Seu Resultado do Teste de Sono!</h3>
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
        let score = 0;
        // Question 1: How many hours do you sleep on average per night?
        // 0: <5h (0 pts), 1: 5-6h (1 pt), 2: 7-9h (2 pts), 3: >9h (1 pt)
        if (this.userAnswers[0] === 1) score += 1;
        if (this.userAnswers[0] === 2) score += 2;
        if (this.userAnswers[0] === 3) score += 1;

        // Question 2: How often do you feel tired during the day, even after a night's sleep?
        // 0: Never/Rarely (2 pts), 1: Sometimes (1 pt), 2: Frequently (0 pts), 3: Almost every day (0 pts)
        if (this.userAnswers[1] === 0) score += 2;
        if (this.userAnswers[1] === 1) score += 1;

        // Question 3: Do you have difficulty falling or staying asleep?
        // 0: Never/Rarely (2 pts), 1: Sometimes (1 pt), 2: Frequently (0 pts), 3: Almost every night (0 pts)
        if (this.userAnswers[2] === 0) score += 2;
        if (this.userAnswers[2] === 1) score += 1;

        // Question 4: Do you wake up refreshed and energized most mornings?
        // 0: Always (2 pts), 1: Most of the time (1 pt), 2: Rarely (0 pts), 3: Never (0 pts)
        if (this.userAnswers[3] === 0) score += 2;
        if (this.userAnswers[3] === 1) score += 1;

        // Question 5: Do you usually use electronics (cell phone, tablet, computer) in bed before sleeping?
        // 0: Never (2 pts), 1: Rarely (1 pt), 2: Sometimes (0 pts), 3: Frequently (0 pts)
        if (this.userAnswers[4] === 0) score += 2;
        if (this.userAnswers[4] === 1) score += 1;

        let summary = "";
        let recommendation = "";

        if (score >= 8) {
            summary = "Parabéns! Você parece ter hábitos de sono muito saudáveis e provavelmente dorme o suficiente para se sentir bem.";
            recommendation = "Continue com seus bons hábitos! Mantenha sua rotina de sono e ambiente propício para um descanso de qualidade.";
        } else if (score >= 5) {
            summary = "Você tem bons hábitos de sono, mas pode haver espaço para melhorias. Pequenos ajustes podem fazer uma grande diferença.";
            recommendation = "Considere revisar sua rotina de sono. Tente ir para a cama e acordar em horários mais consistentes, mesmo nos fins de semana. Evite cafeína e refeições pesadas antes de dormir.";
        } else {
            summary = "Parece que você pode estar enfrentando desafios com seu sono. É importante dar atenção a isso para sua saúde geral.";
            recommendation = "Recomendamos que você avalie seus hábitos de sono com mais cuidado. Crie um ambiente escuro, silencioso e fresco para dormir. Evite eletrônicos antes de deitar e considere procurar um profissional de saúde se as dificuldades persistirem.";
        }

        return { summary: summary, recommendation: recommendation };
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
    if (document.getElementById("quiz-questions") && (window.location.pathname.includes("quiz_sono.html") || window.location.href.includes("quiz_sono.html"))) {
        new SleepQuiz();
    }
});


