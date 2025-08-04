// Quiz de Alimentação Balanceada
class NutritionQuiz {
    constructor() {
        this.questions = [
            {
                question: "Quantos grupos alimentares principais devem estar presentes em uma alimentação balanceada?",
                options: [
                    "3 grupos (carboidratos, proteínas e gorduras)",
                    "5 grupos (cereais, frutas, vegetais, proteínas e laticínios)",
                    "7 grupos (incluindo doces e bebidas)",
                    "2 grupos (proteínas e carboidratos)"
                ],
                correct: 1,
                explanation: "Uma alimentação balanceada deve incluir os 5 grupos principais: cereais e grãos, frutas, vegetais, proteínas e laticínios, cada um fornecendo nutrientes essenciais diferentes."
            },
            {
                question: "Qual é a recomendação diária de consumo de frutas e vegetais?",
                options: [
                    "2 porções por dia",
                    "3 porções por dia",
                    "5 ou mais porções por dia",
                    "1 porção por dia"
                ],
                correct: 2,
                explanation: "A OMS recomenda o consumo de pelo menos 5 porções de frutas e vegetais por dia, totalizando cerca de 400g, para garantir vitaminas, minerais e fibras essenciais."
            },
            {
                question: "Qual macronutriente deve representar a maior porcentagem das calorias diárias?",
                options: [
                    "Proteínas (50-60%)",
                    "Gorduras (40-50%)",
                    "Carboidratos (45-65%)",
                    "Todos em partes iguais (33% cada)"
                ],
                correct: 2,
                explanation: "Os carboidratos devem representar 45-65% das calorias diárias, sendo a principal fonte de energia para o corpo e cérebro."
            },
            {
                question: "Qual é a principal função das fibras alimentares?",
                options: [
                    "Fornecer energia rápida",
                    "Construir músculos",
                    "Regular o trânsito intestinal e controlar glicemia",
                    "Armazenar vitaminas"
                ],
                correct: 2,
                explanation: "As fibras são essenciais para a saúde digestiva, regulam o trânsito intestinal, ajudam no controle da glicemia e do colesterol, e promovem saciedade."
            },
            {
                question: "Quantos litros de água uma pessoa adulta deve consumir diariamente?",
                options: [
                    "1 litro",
                    "2-2,5 litros",
                    "4-5 litros",
                    "500ml"
                ],
                correct: 1,
                explanation: "A recomendação geral é de 2 a 2,5 litros de água por dia, podendo variar conforme peso corporal, atividade física e condições climáticas."
            },
            {
                question: "Qual tipo de gordura deve ser evitado em uma alimentação saudável?",
                options: [
                    "Gorduras monoinsaturadas (azeite, abacate)",
                    "Gorduras poliinsaturadas (peixes, nozes)",
                    "Gorduras trans (alimentos processados)",
                    "Ômega-3 (peixes, linhaça)"
                ],
                correct: 2,
                explanation: "As gorduras trans, encontradas em alimentos ultraprocessados, devem ser evitadas pois aumentam o risco de doenças cardiovasculares e inflamação."
            },
            {
                question: "Qual é a melhor fonte de proteína completa de origem vegetal?",
                options: [
                    "Arroz branco",
                    "Combinação de arroz e feijão",
                    "Apenas feijão",
                    "Batata doce"
                ],
                correct: 1,
                explanation: "A combinação de arroz e feijão fornece todos os aminoácidos essenciais, formando uma proteína completa de alta qualidade nutricional."
            },
            {
                question: "Com que frequência devemos consumir alimentos ultraprocessados?",
                options: [
                    "Diariamente como base da alimentação",
                    "3-4 vezes por semana",
                    "Ocasionalmente, como exceção",
                    "Nunca, devem ser totalmente evitados"
                ],
                correct: 2,
                explanation: "Alimentos ultraprocessados devem ser consumidos ocasionalmente, pois são ricos em açúcar, sódio, gorduras ruins e pobres em nutrientes essenciais."
            },
            {
                question: "Qual é a importância do café da manhã em uma alimentação balanceada?",
                options: [
                    "Não é importante, pode ser pulado",
                    "Deve ser a maior refeição do dia",
                    "Fornece energia e nutrientes para iniciar o dia",
                    "Só é importante para crianças"
                ],
                correct: 2,
                explanation: "O café da manhã é fundamental para fornecer energia e nutrientes após o jejum noturno, melhorar o rendimento físico e mental, e regular o metabolismo."
            },
            {
                question: "Qual é a melhor estratégia para manter uma alimentação balanceada a longo prazo?",
                options: [
                    "Seguir dietas restritivas rigorosas",
                    "Eliminar completamente todos os doces",
                    "Fazer escolhas conscientes e equilibradas na maioria das vezes",
                    "Contar calorias obsessivamente"
                ],
                correct: 2,
                explanation: "A sustentabilidade vem do equilíbrio: fazer escolhas saudáveis na maioria das vezes, permitindo flexibilidade ocasional, e focando em hábitos duradouros."
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
        let nutritionLevel = '';
        
        if (percentage >= 90) {
            feedback = 'Excelente! Você é um expert em alimentação balanceada! Seus conhecimentos sobre nutrição são impressionantes.';
            emoji = '🏆';
            nutritionLevel = 'Expert em Nutrição';
        } else if (percentage >= 70) {
            feedback = 'Muito bom! Você tem um ótimo conhecimento sobre alimentação saudável. Continue assim!';
            emoji = '🥇';
            nutritionLevel = 'Conhecedor de Nutrição';
        } else if (percentage >= 50) {
            feedback = 'Bom trabalho! Você sabe o básico sobre alimentação balanceada, mas há espaço para aprender mais.';
            emoji = '👏';
            nutritionLevel = 'Aprendiz de Nutrição';
        } else {
            feedback = 'Que tal aprender mais sobre alimentação saudável? Temos artigos que podem ajudar você a melhorar seus conhecimentos!';
            emoji = '📚';
            nutritionLevel = 'Iniciante em Nutrição';
        }
        
        const resultHTML = `
            <div id="quiz-result">
                <h3>${emoji} Seu Resultado</h3>
                <h4>${nutritionLevel}</h4>
                <p id="quiz-score">${this.score}/${this.questions.length} (${percentage}%)</p>
                <p id="quiz-feedback">${feedback}</p>
                
                <div class="nutrition-tips" style="margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; text-align: left;">
                    <h5>💡 Dicas para uma Alimentação Balanceada:</h5>
                    <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                        <li>Consuma 5 porções de frutas e vegetais por dia</li>
                        <li>Prefira grãos integrais aos refinados</li>
                        <li>Inclua proteínas de qualidade em cada refeição</li>
                        <li>Beba pelo menos 2 litros de água por dia</li>
                        <li>Evite alimentos ultraprocessados</li>
                        <li>Faça refeições regulares e equilibradas</li>
                    </ul>
                </div>
                
                <div style="margin: 2rem 0;">
                    <a href="artigos.html" class="btn-primary" style="margin-right: 1rem;">Ler Artigos sobre Nutrição</a>
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
        this.score = 0;
        this.userAnswers = [];
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
    // Verificar se estamos na página do quiz de alimentação e se o elemento existe
    if (document.getElementById('quiz-questions')) {
        new NutritionQuiz();
    }
});

console.log('NutritionQuiz initialized. quiz-questions element:', document.getElementById('quiz-questions'));

