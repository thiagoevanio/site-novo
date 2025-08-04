// Quiz de Tipo de Treino
class WorkoutQuiz {
    constructor() {
        this.questions = [
            {
                question: "Qual é o seu principal objetivo com o exercício físico?",
                options: [
                    "Perder peso e queimar gordura",
                    "Ganhar massa muscular",
                    "Melhorar condicionamento cardiovascular",
                    "Aumentar flexibilidade e bem-estar"
                ],
                weights: {
                    cardio: [3, 1, 3, 2],
                    musculacao: [1, 3, 1, 1],
                    funcional: [2, 2, 2, 3],
                    yoga: [1, 1, 1, 3]
                }
            },
            {
                question: "Quanto tempo você tem disponível para treinar por dia?",
                options: [
                    "Menos de 30 minutos",
                    "30 a 45 minutos",
                    "45 a 60 minutos",
                    "Mais de 60 minutos"
                ],
                weights: {
                    cardio: [3, 2, 2, 1],
                    musculacao: [1, 2, 3, 3],
                    funcional: [2, 3, 2, 2],
                    yoga: [2, 3, 3, 2]
                }
            },
            {
                question: "Qual é o seu nível atual de condicionamento físico?",
                options: [
                    "Sedentário - não pratico exercícios",
                    "Iniciante - pratico ocasionalmente",
                    "Intermediário - pratico regularmente",
                    "Avançado - atlético"
                ],
                weights: {
                    cardio: [3, 3, 2, 1],
                    musculacao: [1, 2, 3, 3],
                    funcional: [2, 3, 3, 2],
                    yoga: [3, 2, 2, 1]
                }
            },
            {
                question: "Você prefere treinar:",
                options: [
                    "Sozinho(a) e no meu ritmo",
                    "Em grupo com outras pessoas",
                    "Com acompanhamento de instrutor",
                    "Tanto faz, me adapto facilmente"
                ],
                weights: {
                    cardio: [3, 1, 2, 2],
                    musculacao: [3, 1, 2, 2],
                    funcional: [2, 3, 2, 2],
                    yoga: [2, 3, 2, 3]
                }
            },
            {
                question: "Qual ambiente você prefere para se exercitar?",
                options: [
                    "Academia com equipamentos",
                    "Ao ar livre (parques, ruas)",
                    "Em casa com equipamentos básicos",
                    "Estúdios especializados"
                ],
                weights: {
                    cardio: [2, 3, 2, 1],
                    musculacao: [3, 1, 2, 1],
                    funcional: [2, 2, 3, 2],
                    yoga: [1, 2, 2, 3]
                }
            },
            {
                question: "Como você lida com exercícios de alta intensidade?",
                options: [
                    "Adoro desafios intensos",
                    "Gosto, mas com moderação",
                    "Prefiro intensidade baixa a moderada",
                    "Evito exercícios muito intensos"
                ],
                weights: {
                    cardio: [3, 2, 1, 1],
                    musculacao: [3, 3, 2, 1],
                    funcional: [3, 2, 2, 1],
                    yoga: [1, 1, 2, 3]
                }
            },
            {
                question: "Qual aspecto é mais importante para você no treino?",
                options: [
                    "Resultados rápidos e visíveis",
                    "Construção gradual de força",
                    "Melhora da saúde geral",
                    "Relaxamento e redução do estresse"
                ],
                weights: {
                    cardio: [3, 1, 2, 1],
                    musculacao: [2, 3, 1, 1],
                    funcional: [2, 2, 3, 2],
                    yoga: [1, 1, 2, 3]
                }
            },
            {
                question: "Você tem alguma limitação física ou lesão?",
                options: [
                    "Não, estou em perfeitas condições",
                    "Pequenas limitações ocasionais",
                    "Algumas limitações que preciso considerar",
                    "Limitações significativas que requerem cuidado"
                ],
                weights: {
                    cardio: [3, 2, 1, 1],
                    musculacao: [3, 2, 2, 1],
                    funcional: [2, 3, 2, 2],
                    yoga: [2, 2, 3, 3]
                }
            },
            {
                question: "Qual é a sua motivação principal para se exercitar?",
                options: [
                    "Melhorar a aparência física",
                    "Aumentar força e performance",
                    "Manter a saúde e prevenir doenças",
                    "Reduzir estresse e melhorar humor"
                ],
                weights: {
                    cardio: [3, 1, 2, 2],
                    musculacao: [3, 3, 1, 1],
                    funcional: [2, 2, 3, 2],
                    yoga: [1, 1, 2, 3]
                }
            },
            {
                question: "Como você prefere variar seus treinos?",
                options: [
                    "Gosto de rotina consistente",
                    "Pequenas variações ocasionais",
                    "Mudanças regulares para não enjoar",
                    "Sempre experimentando coisas novas"
                ],
                weights: {
                    cardio: [2, 2, 3, 2],
                    musculacao: [3, 2, 2, 1],
                    funcional: [2, 2, 3, 3],
                    yoga: [3, 3, 2, 2]
                }
            }
        ];
        
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.scores = {
            cardio: 0,
            musculacao: 0,
            funcional: 0,
            yoga: 0
        };
        this.isQuizCompleted = false;
        
        this.workoutTypes = {
            cardio: {
                name: "Treino Cardiovascular",
                description: "Exercícios aeróbicos como corrida, ciclismo, natação e dança são ideais para você!",
                benefits: [
                    "Excelente para queima de gordura",
                    "Melhora do condicionamento cardiovascular",
                    "Aumento da resistência",
                    "Liberação de endorfinas"
                ],
                examples: "Corrida, ciclismo, natação, dança, step, spinning",
                tips: "Comece gradualmente e aumente a intensidade progressivamente. Varie as modalidades para não enjoar!"
            },
            musculacao: {
                name: "Musculação",
                description: "Treinos com pesos e resistência são perfeitos para seus objetivos!",
                benefits: [
                    "Ganho de massa muscular",
                    "Aumento da força",
                    "Melhora do metabolismo",
                    "Fortalecimento ósseo"
                ],
                examples: "Levantamento de peso, exercícios com halteres, máquinas, exercícios compostos",
                tips: "Foque na técnica correta antes de aumentar a carga. Descanse adequadamente entre os treinos!"
            },
            funcional: {
                name: "Treino Funcional",
                description: "Exercícios funcionais que trabalham o corpo de forma integrada são ideais para você!",
                benefits: [
                    "Melhora da coordenação",
                    "Fortalecimento do core",
                    "Movimentos mais naturais",
                    "Versatilidade de exercícios"
                ],
                examples: "CrossFit, TRX, kettlebell, exercícios com peso corporal, circuitos",
                tips: "Varie os movimentos e intensidades. Foque na qualidade dos movimentos!"
            },
            yoga: {
                name: "Yoga e Pilates",
                description: "Práticas que combinam movimento, respiração e mindfulness são perfeitas para você!",
                benefits: [
                    "Aumento da flexibilidade",
                    "Redução do estresse",
                    "Melhora da postura",
                    "Equilíbrio corpo-mente"
                ],
                examples: "Hatha Yoga, Vinyasa, Pilates, meditação em movimento, alongamento",
                tips: "Pratique regularmente, mesmo que por pouco tempo. Foque na respiração e na consciência corporal!"
            }
        };
        
        this.init();
    }
    
    init() {
        this.createQuizHTML();
        this.bindEvents();
        this.showQuestion();
    }
    
    createQuizHTML() {
        const quizContainer = document.getElementById('quiz-questions');
        if (!quizContainer) return;
        
        // Criar barra de progresso
        const progressHTML = `
            <div class="quiz-progress">
                <div class="quiz-progress-bar" id="quiz-progress-bar" style="width: 0%"></div>
            </div>
        `;
        
        quizContainer.innerHTML = progressHTML;
    }
    
    showQuestion() {
        const quizContainer = document.getElementById('quiz-questions');
        const question = this.questions[this.currentQuestion];
        
        // Atualizar barra de progresso
        const progressBar = document.getElementById('quiz-progress-bar');
        const progress = ((this.currentQuestion) / this.questions.length) * 100;
        progressBar.style.width = progress + '%';
        
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
                    `).join('')}
                </div>
            </div>
        `;
        
        quizContainer.innerHTML = questionHTML;
        
        // Atualizar botões de navegação
        this.updateNavigation();
        
        // Bind eventos para as opções
        this.bindOptionEvents();
    }
    
    bindOptionEvents() {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                // Remover seleção anterior
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Adicionar seleção atual
                option.classList.add('selected');
                
                // Salvar resposta
                const selectedOption = parseInt(option.dataset.option);
                this.userAnswers[this.currentQuestion] = selectedOption;
                
                // Habilitar botão próximo/finalizar
                const nextBtn = document.getElementById('next-question');
                const submitBtn = document.getElementById('submit-quiz');
                
                if (this.currentQuestion === this.questions.length - 1) {
                    submitBtn.style.display = 'inline-block';
                    nextBtn.style.display = 'none';
                } else {
                    nextBtn.style.display = 'inline-block';
                    nextBtn.disabled = false;
                }
            });
        });
    }
    
    updateNavigation() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        const submitBtn = document.getElementById('submit-quiz');
        
        // Botão anterior
        if (this.currentQuestion > 0) {
            prevBtn.style.display = 'inline-block';
        } else {
            prevBtn.style.display = 'none';
        }
        
        // Botão próximo/finalizar
        if (this.currentQuestion === this.questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'none'; // Será mostrado quando uma opção for selecionada
        } else {
            nextBtn.style.display = 'none'; // Será mostrado quando uma opção for selecionada
            submitBtn.style.display = 'none';
        }
        
        // Se já tem resposta salva, mostrar botão apropriado
        if (this.userAnswers[this.currentQuestion] !== undefined) {
            if (this.currentQuestion === this.questions.length - 1) {
                submitBtn.style.display = 'inline-block';
            } else {
                nextBtn.style.display = 'inline-block';
            }
            
            // Marcar opção selecionada
            const options = document.querySelectorAll('.quiz-option');
            if (options[this.userAnswers[this.currentQuestion]]) {
                options[this.userAnswers[this.currentQuestion]].classList.add('selected');
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
    
    calculateScores() {
        // Resetar pontuações
        this.scores = {
            cardio: 0,
            musculacao: 0,
            funcional: 0,
            yoga: 0
        };
        
        // Calcular pontuações baseadas nas respostas
        this.userAnswers.forEach((answer, questionIndex) => {
            const question = this.questions[questionIndex];
            const weights = question.weights;
            
            Object.keys(weights).forEach(workoutType => {
                this.scores[workoutType] += weights[workoutType][answer];
            });
        });
    }
    
    getRecommendedWorkout() {
        this.calculateScores();
        
        // Encontrar o tipo de treino com maior pontuação
        let maxScore = 0;
        let recommendedType = 'funcional';
        
        Object.keys(this.scores).forEach(type => {
            if (this.scores[type] > maxScore) {
                maxScore = this.scores[type];
                recommendedType = type;
            }
        });
        
        return this.workoutTypes[recommendedType];
    }
    
    showResults() {
        const recommendedWorkout = this.getRecommendedWorkout();
        
        const resultHTML = `
            <div id="quiz-result">
                <h3>🏋️ Seu Tipo de Treino Ideal</h3>
                <div class="workout-result">
                    <h4>${recommendedWorkout.name}</h4>
                    <p class="workout-description">${recommendedWorkout.description}</p>
                    
                    <div class="workout-benefits">
                        <h5>Principais Benefícios:</h5>
                        <ul>
                            ${recommendedWorkout.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="workout-examples">
                        <h5>Exemplos de Exercícios:</h5>
                        <p>${recommendedWorkout.examples}</p>
                    </div>
                    
                    <div class="workout-tips">
                        <h5>Dicas Importantes:</h5>
                        <p>${recommendedWorkout.tips}</p>
                    </div>
                </div>
                
                <div style="margin: 2rem 0;">
                    <a href="artigos.html" class="btn-primary" style="margin-right: 1rem;">Ler Artigos sobre Exercícios</a>
                    <button id="restart-quiz" class="btn-secondary">Fazer Quiz Novamente</button>
                </div>
            </div>
        `;
        
        document.getElementById('quiz-questions').innerHTML = resultHTML;
        document.getElementById('quiz-navigation').style.display = 'none';
        
        // Bind evento para reiniciar
        document.getElementById('restart-quiz').addEventListener('click', () => {
            this.restartQuiz();
        });
        
        this.isQuizCompleted = true;
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.scores = {
            cardio: 0,
            musculacao: 0,
            funcional: 0,
            yoga: 0
        };
        this.isQuizCompleted = false;
        
        // Re-renderizar o HTML do quiz
        this.createQuizHTML(); 
        
        document.getElementById("quiz-navigation").style.display = "flex";
        document.getElementById("quiz-result").style.display = "none";
        
        this.showQuestion();
    }
    
    bindEvents() {
        const nextBtn = document.getElementById('next-question');
        const prevBtn = document.getElementById('prev-question');
        const submitBtn = document.getElementById('submit-quiz');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevQuestion());
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.showResults());
        }
    }
}

// Inicializar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página do quiz de treino e se o elemento existe
    if (document.getElementById('quiz-questions')) {
        new WorkoutQuiz();
    }
});

console.log('WorkoutQuiz initialized. quiz-questions element:', document.getElementById('quiz-questions'));

