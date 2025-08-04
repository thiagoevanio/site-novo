// Mini Quiz de Saúde
class HealthQuiz {
    constructor() {
        this.questions = [
            {
                question: "Quantos litros de água um adulto deve beber por dia em média?",
                options: [
                    "1-1.5 litros",
                    "2-2.5 litros",
                    "3-4 litros",
                    "5-6 litros"
                ],
                correct: 1,
                explanation: "A recomendação geral é de 2 a 2.5 litros por dia, mas pode variar conforme peso, atividade física e clima."
            },
            {
                question: "Qual é a faixa de IMC considerada normal para adultos?",
                options: [
                    "16,0 - 18,4",
                    "18,5 - 24,9",
                    "25,0 - 29,9",
                    "30,0 - 34,9"
                ],
                correct: 1,
                explanation: "O IMC entre 18,5 e 24,9 é considerado peso normal pela Organização Mundial da Saúde."
            },
            {
                question: "Quantos minutos de atividade física moderada são recomendados por semana?",
                options: [
                    "75 minutos",
                    "100 minutos",
                    "150 minutos",
                    "300 minutos"
                ],
                correct: 2,
                explanation: "A OMS recomenda pelo menos 150 minutos de atividade física moderada por semana para adultos."
            },
            {
                question: "Qual nutriente é a principal fonte de energia para o cérebro?",
                options: [
                    "Proteínas",
                    "Gorduras",
                    "Carboidratos",
                    "Vitaminas"
                ],
                correct: 2,
                explanation: "Os carboidratos, especialmente a glicose, são a principal fonte de energia para o cérebro."
            },
            {
                question: "Quantas horas de sono são recomendadas para adultos por noite?",
                options: [
                    "5-6 horas",
                    "7-9 horas",
                    "10-12 horas",
                    "4-5 horas"
                ],
                correct: 1,
                explanation: "Adultos precisam de 7 a 9 horas de sono por noite para uma boa saúde física e mental."
            },
            {
                question: "Qual o principal benefício de uma dieta rica em fibras?",
                options: [
                    "Aumento da massa muscular",
                    "Melhora da visão",
                    "Regulação do trânsito intestinal",
                    "Fortalecimento dos ossos"
                ],
                correct: 2,
                explanation: "Fibras são essenciais para a saúde digestiva e regulação do trânsito intestinal."
            },
            {
                question: "Qual a importância da vitamina D para o bem-estar?",
                options: [
                    "Aumento da energia",
                    "Saúde óssea e imunidade",
                    "Melhora da memória",
                    "Redução do estresse"
                ],
                correct: 1,
                explanation: "A vitamina D é crucial para a saúde dos ossos, sistema imunológico e bem-estar geral."
            },
            {
                question: "Qual tipo de gordura é considerado mais saudável para o coração?",
                options: [
                    "Gorduras trans",
                    "Gorduras saturadas",
                    "Gorduras monoinsaturadas e poliinsaturadas",
                    "Colesterol"
                ],
                correct: 2,
                explanation: "Gorduras monoinsaturadas e poliinsaturadas (encontradas em abacate, azeite, nozes) são benéficas para a saúde cardiovascular."
            },
            {
                question: "Qual a melhor forma de reduzir o estresse no dia a dia?",
                options: [
                    "Ignorar os problemas",
                    "Praticar exercícios físicos e meditação",
                    "Trabalhar mais horas",
                    "Consumir alimentos processados"
                ],
                correct: 1,
                explanation: "Exercícios físicos, meditação e técnicas de relaxamento são eficazes na redução do estresse."
            },
            {
                question: "Qual a frequência ideal de consumo de frutas e vegetais por dia?",
                options: [
                    "1-2 porções",
                    "3-4 porções",
                    "5 ou mais porções",
                    "Não é necessário diariamente"
                ],
                correct: 2,
                explanation: "A recomendação é consumir 5 ou mais porções de frutas e vegetais por dia para uma dieta equilibrada."
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
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
    
    calculateScore() {
        this.score = 0;
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.score++;
            }
        });
    }
    
    showResults() {
        this.calculateScore();
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        let feedback = '';
        let emoji = '';
        
        if (percentage >= 80) {
            feedback = 'Excelente! Você tem um ótimo conhecimento sobre saúde. Continue assim!';
            emoji = '🏆';
        } else if (percentage >= 60) {
            feedback = 'Muito bom! Você sabe bastante sobre saúde, mas sempre há espaço para aprender mais.';
            emoji = '👏';
        } else if (percentage >= 40) {
            feedback = 'Bom começo! Que tal explorar nossos artigos para aprender mais sobre saúde?';
            emoji = '📚';
        } else {
            feedback = 'Não desanime! Temos muitos artigos e ferramentas para ajudar você a aprender sobre saúde.';
            emoji = '💪';
        }
        
        const resultHTML = `
            <div id="quiz-result">
                <h3>${emoji} Seu Resultado</h3>
                <p id="quiz-score">${this.score}/${this.questions.length} (${percentage}%)</p>
                <p id="quiz-feedback">${feedback}</p>
                <div style="margin: 2rem 0;">
                    <a href="artigos.html" class="btn-primary" style="margin-right: 1rem;">Ler Artigos</a>
                    <button id="restart-quiz" class="btn-secondary">Tentar Novamente</button>
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
        this.score = 0;
        this.userAnswers = [];
        this.isQuizCompleted = false;
        
        // Re-renderizar o HTML do quiz para garantir que todos os elementos estejam no estado inicial
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
    // Verificar se estamos na página inicial e se o elemento do quiz existe
    if (document.getElementById('quiz-questions')) {
        new HealthQuiz();
    }
});



console.log('HealthQuiz initialized. quiz-questions element:', document.getElementById('quiz-questions'));

