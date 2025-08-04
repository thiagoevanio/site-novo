// Desafios saudáveis para cada dia do mês
const desafiosSaudaveis = [
    "Beba 2L de água hoje",
    "Caminhe por 20 minutos",
    "Coma 5 porções de frutas/vegetais",
    "Durma 8 horas",
    "Faça 10 minutos de alongamento",
    "Evite açúcar refinado hoje",
    "Pratique 5 minutos de meditação",
    "Suba escadas ao invés do elevador",
    "Coma um café da manhã nutritivo",
    "Faça uma pausa de 5 min a cada hora",
    "Beba um copo de água ao acordar",
    "Caminhe durante o almoço",
    "Coma uma salada no almoço",
    "Pratique respiração profunda",
    "Evite bebidas açucaradas",
    "Faça 20 polichinelos",
    "Leia por 15 minutos",
    "Coma uma fruta como lanche",
    "Desconecte-se das telas 1h antes de dormir",
    "Faça uma atividade ao ar livre",
    "Beba chá verde",
    "Pratique gratidão - liste 3 coisas boas",
    "Coma peixe ou proteína magra",
    "Faça 15 minutos de exercício",
    "Evite comida processada",
    "Tome sol por 15 minutos",
    "Faça uma refeição sem pressa",
    "Pratique uma nova receita saudável",
    "Durma e acorde no mesmo horário",
    "Celebre suas conquistas do mês",
    "Planeje metas saudáveis para o próximo mês"
];

// Variáveis globais
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Nomes dos meses
const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Função para obter desafios completados do localStorage
function getCompletedChallenges() {
    const stored = localStorage.getItem('desafiosCompletados');
    return stored ? JSON.parse(stored) : {};
}

// Função para salvar desafios completados no localStorage
function saveCompletedChallenges(completed) {
    localStorage.setItem('desafiosCompletados', JSON.stringify(completed));
}

// Função para marcar/desmarcar um desafio como completado
function toggleChallenge(dateKey) {
    const completed = getCompletedChallenges();
    
    if (completed[dateKey]) {
        delete completed[dateKey];
    } else {
        completed[dateKey] = true;
    }
    
    saveCompletedChallenges(completed);
    renderCalendar();
}

// Função para obter o número de dias no mês
function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

// Função para obter o primeiro dia da semana do mês (0 = domingo)
function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
}

// Função para renderizar o calendário
function renderCalendar() {
    const monthYearElement = document.getElementById('currentMonthYear');
    const calendarGrid = document.getElementById('calendarGrid');
    const completed = getCompletedChallenges();
    
    // Atualizar título do mês/ano
    monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Limpar grid
    calendarGrid.innerHTML = '';
    
    // Obter informações do mês
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    
    // Adicionar dias vazios no início
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty-day';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Adicionar dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Criar chave única para o dia
        const dateKey = `${currentYear}-${currentMonth}-${day}`;
        
        // Verificar se o desafio foi completado
        const isCompleted = completed[dateKey];
        if (isCompleted) {
            dayElement.classList.add('completed');
        }
        
        // Obter desafio do dia (usar módulo para repetir desafios se necessário)
        const challengeIndex = (day - 1) % desafiosSaudaveis.length;
        const challenge = desafiosSaudaveis[challengeIndex];
        
        // Criar conteúdo do dia
        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-challenge">${challenge}</div>
            ${isCompleted ? '<div class="day-status">✓ Completado</div>' : ''}
        `;
        
        // Adicionar evento de clique
        dayElement.addEventListener('click', () => {
            toggleChallenge(dateKey);
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

// Função para navegar para o mês anterior
function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

// Função para navegar para o próximo mês
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar event listeners para os botões de navegação
    document.getElementById('prevMonth').addEventListener('click', previousMonth);
    document.getElementById('nextMonth').addEventListener('click', nextMonth);
    
    // Renderizar calendário inicial
    renderCalendar();
});

