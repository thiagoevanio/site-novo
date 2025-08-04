// Quiz: Seu metabolismo é rápido ou lento? Descubra agora.
class MetabolismQuiz {
    constructor() {
        this.questions = [
            {
                question: "Como você descreveria seu apetite na maioria dos dias?",
                options: [
                    "Tenho muito apetite e sinto fome frequentemente",
                    "Tenho apetite normal, como em horários regulares",
                    "Tenho pouco apetite, às vezes esqueço de comer",
                    "Meu apetite varia muito de dia para dia"
                ],
                correct: -1,
                explanation: "Pessoas com metabolismo rápido tendem a sentir fome com mais frequência devido ao maior gasto energético."
            },
            {
                question: "Qual é sua facilidade para ganhar peso?",
                options: [
                    "Ganho peso muito facilmente, mesmo comendo pouco",
                    "Ganho peso gradualmente se comer em excesso",
                    "Tenho dificuldade para ganhar peso, mesmo comendo muito",
                    "Meu peso oscila facilmente para cima e para baixo"
                ],
                correct: -1,
                explanation: "A facilidade ou dificuldade para ganhar peso está diretamente relacionada à velocidade do seu metabolismo."
            },
            {
                question: "Como você se sente em relação ao frio?",
                options: [
                    "Sinto muito frio facilmente e preciso me agasalhar mais",
                    "Tenho sensibilidade normal ao frio",
                    "Raramente sinto frio, tenho o corpo sempre aquecido",
                    "Minha sensibilidade ao frio varia conforme meu humor"
                ],
                correct: -1,
                explanation: "Pessoas com metabolismo rápido tendem a ter temperatura corporal mais elevada e sentem menos frio."
            },
            {
                question: "Qual é seu nível de energia durante o dia?",
                options: [
                    "Tenho pouca energia e me sinto cansado(a) facilmente",
                    "Tenho energia moderada, com alguns altos e baixos",
                    "Tenho muita energia e raramente me sinto cansado(a)",
                    "Minha energia varia drasticamente ao longo do dia"
                ],
                correct: -1,
                explanation: "Metabolismo rápido geralmente está associado a níveis mais altos de energia e disposição."
            },
            {
                question: "Como é seu padrão de sono?",
                options: [
                    "Durmo muito e ainda acordo cansado(a)",
                    "Durmo cerca de 7-8 horas e acordo descansado(a)",
                    "Durmo pouco mas acordo disposto(a) e energizado(a)",
                    "Meu sono é irregular e varia muito"
                ],
                correct: -1,
                explanation: "Pessoas com metabolismo rápido frequentemente precisam de menos horas de sono para se sentirem descansadas."
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
            `Com base nas suas respostas, aqui está uma análise do seu metabolismo:\n\n` +
            `<strong>${results.summary}</strong>\n\n` +
            `${results.recommendation}`;
        
        const resultHTML = `
            <div id="quiz-result">
                <h3>🔥 Seu Resultado do Teste de Metabolismo!</h3>
                <p id="quiz-feedback">${feedback}</p>
                <div style="margin: 2rem 0;">
                    <button id="restart-quiz" class="btn-secondary">Tentar Novamente</button>
                </div>
            </div>
        `;
        
        document.getElementById("quiz-questions").innerHTML = ""; // Clear questions
        document.getElementById("quiz-result").innerHTML = resultHTML; // Set result HTML
        document.getElementById("quiz-result").style.display = "block"; // Show result
        document.getElementById("quiz-navigation").style.display = "none";
        
        document.getElementById("restart-quiz").addEventListener("click", () => {
            this.restartQuiz();
        });
        
        this.isQuizCompleted = true;
    }
    
    analyzeAnswers() {
        let fastMetabolismScore = 0;
        let slowMetabolismScore = 0;
        
        // Question 1: Apetite
        // 0: Muito apetite (rápido +2), 1: Normal (neutro), 2: Pouco apetite (lento +2), 3: Varia (neutro)
        if (this.userAnswers[0] === 0) fastMetabolismScore += 2;
        if (this.userAnswers[0] === 2) slowMetabolismScore += 2;

        // Question 2: Facilidade para ganhar peso
        // 0: Ganha fácil (lento +2), 1: Gradual (neutro), 2: Dificuldade (rápido +2), 3: Oscila (neutro)
        if (this.userAnswers[1] === 0) slowMetabolismScore += 2;
        if (this.userAnswers[1] === 2) fastMetabolismScore += 2;

        // Question 3: Sensibilidade ao frio
        // 0: Sente muito frio (lento +2), 1: Normal (neutro), 2: Raramente frio (rápido +2), 3: Varia (neutro)
        if (this.userAnswers[2] === 0) slowMetabolismScore += 2;
        if (this.userAnswers[2] === 2) fastMetabolismScore += 2;

        // Question 4: Nível de energia
        // 0: Pouca energia (lento +2), 1: Moderada (neutro), 2: Muita energia (rápido +2), 3: Varia (neutro)
        if (this.userAnswers[3] === 0) slowMetabolismScore += 2;
        if (this.userAnswers[3] === 2) fastMetabolismScore += 2;

        // Question 5: Padrão de sono
        // 0: Dorme muito e ainda acorda cansado(a) (lento +2), 1: Durmo cerca de 7-8 horas e acordo descansado(a) (neutro), 2: Durmo pouco mas acordo disposto(a) e energizado(a) (rápido +2), 3: Meu sono é irregular e varia muito (neutro)
        if (this.userAnswers[4] === 0) slowMetabolismScore += 2;
        if (this.userAnswers[4] === 2) fastMetabolismScore += 2;

        let summary = "";
        let recommendation = "";

        if (fastMetabolismScore > slowMetabolismScore + 2) {
            summary = "🚀 Você provavelmente tem um metabolismo RÁPIDO!";
            recommendation = `
                <strong>Características do seu perfil:</strong><br>
                • Queima calorias rapidamente<br>
                • Pode comer mais sem ganhar peso facilmente<br>
                • Tem boa disposição e energia<br><br>
                
                <strong>Dicas para você:</strong><br>
                • Faça refeições frequentes para manter a energia<br>
                • Inclua carboidratos complexos e proteínas em cada refeição<br>
                • Se quer ganhar peso, foque em alimentos nutritivos e calóricos<br>
                • Mantenha-se hidratado, pois seu corpo queima mais água<br>
                • Continue com exercícios regulares para manter a saúde
            `;
        } else if (slowMetabolismScore > fastMetabolismScore + 2) {
            summary = "🐌 Você provavelmente tem um metabolismo LENTO!";
            recommendation = `
                <strong>Características do seu perfil:</strong><br>
                • Queima calorias mais devagar<br>
                • Pode ganhar peso mais facilmente<br>
                • Precisa de mais cuidado com a alimentação<br><br>
                
                <strong>Dicas para você:</strong><br>
                • Faça exercícios regulares, especialmente musculação<br>
                • Coma proteínas em todas as refeições para acelerar o metabolismo<br>
                • Beba bastante água e chá verde<br>
                • Evite longos períodos sem comer<br>
                • Durma bem, pois o sono afeta o metabolismo<br>
                • Considere exercícios HIIT para estimular a queima de calorias
            `;
        } else {
            summary = "⚖️ Você tem um metabolismo MODERADO/EQUILIBRADO!";
            recommendation = `
                <strong>Características do seu perfil:</strong><br>
                • Seu metabolismo está na média<br>
                • Responde bem a mudanças na dieta e exercícios<br>
                • Tem flexibilidade para diferentes abordagens<br><br>
                
                <strong>Dicas para você:</strong><br>
                • Mantenha uma alimentação balanceada e regular<br>
                • Combine exercícios aeróbicos com musculação<br>
                • Monitore seu peso e ajuste a alimentação conforme necessário<br>
                • Mantenha bons hábitos de sono e hidratação<br>
                • Seja consistente com sua rotina de exercícios
            `;
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
    if (document.getElementById("quiz-questions") && (window.location.pathname.includes("quiz_metabolismo.html") || window.location.href.includes("quiz_metabolismo.html"))) {
        new MetabolismQuiz();
    }
});

