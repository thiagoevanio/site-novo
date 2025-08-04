// Calculadora de Frequência Cardíaca
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('frequencia-form');
    const resultadoDiv = document.getElementById('resultado-frequencia');
    const valorFcMaxima = document.getElementById('valor-fc-maxima');
    const zonasTreino = document.getElementById('zonas-treino');
    const interpretacaoFrequencia = document.getElementById('interpretacao-frequencia');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularFrequenciaCardiaca();
    });
    
    function calcularFrequenciaCardiaca() {
        const idade = parseInt(document.getElementById('idade').value);
        const fcRepouso = parseInt(document.getElementById('fc-repouso').value) || null;
        const nivelFitness = document.getElementById('nivel-fitness').value;
        const objetivo = document.getElementById('objetivo').value;
        
        // Validações
        if (!idade || !nivelFitness || !objetivo) {
            mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'erro');
            return;
        }
        
        if (idade < 10 || idade > 100) {
            mostrarNotificacao('Idade deve estar entre 10 e 100 anos.', 'erro');
            return;
        }
        
        if (fcRepouso && (fcRepouso < 40 || fcRepouso > 120)) {
            mostrarNotificacao('FC de repouso deve estar entre 40 e 120 bpm.', 'erro');
            return;
        }
        
        // Calcular FC máxima
        const fcMaxima = calcularFcMaxima(idade, nivelFitness);
        
        // Estimar FC de repouso se não fornecida
        const fcRepousoEstimada = fcRepouso || estimarFcRepouso(idade, nivelFitness);
        
        // Calcular zonas de treino
        const zonas = calcularZonasTreino(fcMaxima, fcRepousoEstimada);
        
        // Exibir resultado
        exibirResultado(fcMaxima, fcRepousoEstimada, zonas, objetivo, nivelFitness, idade);
    }
    
    function calcularFcMaxima(idade, nivelFitness) {
        // Fórmula base: 220 - idade (com ajustes por nível de fitness)
        let fcMaxima = 220 - idade;
        
        // Ajustes baseados no nível de condicionamento
        switch (nivelFitness) {
            case 'iniciante':
                fcMaxima -= 5; // Sedentários tendem a ter FC máxima ligeiramente menor
                break;
            case 'intermediario':
                // Sem ajuste
                break;
            case 'avancado':
                fcMaxima += 3; // Atletas podem ter FC máxima ligeiramente maior
                break;
            case 'atleta':
                fcMaxima += 5;
                break;
        }
        
        return Math.round(fcMaxima);
    }
    
    function estimarFcRepouso(idade, nivelFitness) {
        let fcRepouso = 70; // Valor médio
        
        // Ajustes por idade
        if (idade < 30) fcRepouso -= 5;
        else if (idade > 50) fcRepouso += 5;
        
        // Ajustes por nível de fitness
        switch (nivelFitness) {
            case 'iniciante':
                fcRepouso += 10;
                break;
            case 'intermediario':
                fcRepouso += 5;
                break;
            case 'avancado':
                fcRepouso -= 5;
                break;
            case 'atleta':
                fcRepouso -= 15;
                break;
        }
        
        return Math.round(fcRepouso);
    }
    
    function calcularZonasTreino(fcMaxima, fcRepouso) {
        const zonas = [
            { nome: 'Recuperação', min: 50, max: 60, cor: '#2ecc71', descricao: 'Recuperação ativa e aquecimento' },
            { nome: 'Queima de Gordura', min: 60, max: 70, cor: '#f39c12', descricao: 'Zona aeróbica para emagrecimento' },
            { nome: 'Aeróbico', min: 70, max: 80, cor: '#e67e22', descricao: 'Melhoria cardiovascular' },
            { nome: 'Anaeróbico', min: 80, max: 90, cor: '#e74c3c', descricao: 'Treino de alta intensidade' },
            { nome: 'VO2 Max', min: 90, max: 100, cor: '#9b59b6', descricao: 'Capacidade máxima de oxigênio' }
        ];
        
        return zonas.map(zona => {
            // Usar fórmula de Karvonen para maior precisão
            const fcMinima = Math.round(((fcMaxima - fcRepouso) * (zona.min / 100)) + fcRepouso);
            const fcMaximaZona = Math.round(((fcMaxima - fcRepouso) * (zona.max / 100)) + fcRepouso);
            
            return {
                ...zona,
                fcMinima,
                fcMaximaZona
            };
        });
    }
    
    function exibirResultado(fcMaxima, fcRepouso, zonas, objetivo, nivelFitness, idade) {
        valorFcMaxima.textContent = fcMaxima;
        
        // Exibir zonas de treino
        let zonasHtml = '';
        zonas.forEach((zona, index) => {
            const isObjetivo = verificarZonaObjetivo(objetivo, index);
            zonasHtml += `
                <div class="zona-treino ${isObjetivo ? 'zona-objetivo' : ''}" style="border-left-color: ${zona.cor}">
                    <div class="zona-header">
                        <span class="zona-nome" style="color: ${zona.cor}">${zona.nome}</span>
                        <span class="zona-percentual">${zona.min}-${zona.max}%</span>
                    </div>
                    <div class="zona-fc">${zona.fcMinima} - ${zona.fcMaximaZona} bpm</div>
                    <div class="zona-descricao">${zona.descricao}</div>
                    ${isObjetivo ? '<div class="zona-recomendada">✓ Recomendada para seu objetivo</div>' : ''}
                </div>
            `;
        });
        zonasTreino.innerHTML = zonasHtml;
        
        const interpretacao = obterInterpretacao(fcMaxima, fcRepouso, zonas, objetivo, nivelFitness, idade);
        interpretacaoFrequencia.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-frequencia', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('Frequência cardíaca calculada com sucesso!', 'sucesso');
    }
    
    function verificarZonaObjetivo(objetivo, zonaIndex) {
        const objetivoZonas = {
            'recuperacao': [0], // Zona 1
            'queima-gordura': [1], // Zona 2
            'aerobico': [2], // Zona 3
            'anaerobico': [3], // Zona 4
            'vo2max': [4] // Zona 5
        };
        
        return objetivoZonas[objetivo]?.includes(zonaIndex) || false;
    }
    
    function obterInterpretacao(fcMaxima, fcRepouso, zonas, objetivo, nivelFitness, idade) {
        const objetivoNome = obterNomeObjetivo(objetivo);
        const nivelNome = obterNomeNivel(nivelFitness);
        
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Análise da Sua Frequência Cardíaca:</strong></p>
                <p>Com ${idade} anos e nível <strong>${nivelNome}</strong>, sua FC máxima estimada é <strong>${fcMaxima} bpm</strong> e FC de repouso é <strong>${fcRepouso} bpm</strong>.</p>
                <p>Para seu objetivo de <strong>${objetivoNome}</strong>, foque nas zonas destacadas acima.</p>
            </div>
        `;
        
        // Análise da FC de repouso
        interpretacao += analisarFcRepouso(fcRepouso, idade, nivelFitness);
        
        // Dicas específicas por objetivo
        interpretacao += obterDicasObjetivo(objetivo, zonas);
        
        // Dicas de monitoramento
        interpretacao += obterDicasMonitoramento();
        
        // Aviso médico
        interpretacao += `
            <div class="aviso-medico">
                <p><strong>⚠️ Importante:</strong> Estes valores são estimativas. Se você tem problemas cardíacos, toma medicamentos ou sente desconforto durante exercícios, consulte um médico antes de iniciar qualquer programa de treino.</p>
            </div>
        `;
        
        return interpretacao;
    }
    
    function obterNomeObjetivo(objetivo) {
        const nomes = {
            'recuperacao': 'recuperação ativa',
            'queima-gordura': 'queima de gordura',
            'aerobico': 'condicionamento aeróbico',
            'anaerobico': 'treino anaeróbico',
            'vo2max': 'melhoria do VO2 Max'
        };
        return nomes[objetivo] || objetivo;
    }
    
    function obterNomeNivel(nivel) {
        const nomes = {
            'iniciante': 'iniciante',
            'intermediario': 'intermediário',
            'avancado': 'avançado',
            'atleta': 'atleta'
        };
        return nomes[nivel] || nivel;
    }
    
    function analisarFcRepouso(fcRepouso, idade, nivelFitness) {
        let analise = '';
        let categoria = '';
        let cor = '';
        
        if (fcRepouso < 60) {
            categoria = 'Excelente';
            cor = '#2ecc71';
            analise = 'Sua FC de repouso está excelente, indicando ótimo condicionamento cardiovascular.';
        } else if (fcRepouso < 70) {
            categoria = 'Boa';
            cor = '#27ae60';
            analise = 'Sua FC de repouso está boa, mostrando bom condicionamento.';
        } else if (fcRepouso < 80) {
            categoria = 'Regular';
            cor = '#f39c12';
            analise = 'Sua FC de repouso está na média. Há espaço para melhorias com exercícios regulares.';
        } else {
            categoria = 'Precisa melhorar';
            cor = '#e74c3c';
            analise = 'Sua FC de repouso está elevada. Exercícios aeróbicos regulares podem ajudar a reduzi-la.';
        }
        
        return `
            <div class="analise-fc-repouso">
                <h4>💓 Análise da FC de Repouso:</h4>
                <p><strong style="color: ${cor}">${categoria}</strong> - ${analise}</p>
                <p><small>FC de repouso normal: 60-100 bpm. Atletas: 40-60 bpm.</small></p>
            </div>
        `;
    }
    
    function obterDicasObjetivo(objetivo, zonas) {
        let dicas = '<div class="dicas-objetivo"><h4>💡 Dicas para Seu Objetivo:</h4><ul>';
        
        switch (objetivo) {
            case 'recuperacao':
                dicas += '<li>Mantenha-se na Zona 1 (50-60%) para recuperação ativa.</li>';
                dicas += '<li>Ideal para dias de descanso ativo entre treinos intensos.</li>';
                dicas += '<li>Caminhada leve, yoga ou alongamento são perfeitos.</li>';
                break;
                
            case 'queima-gordura':
                dicas += '<li>Foque na Zona 2 (60-70%) para máxima queima de gordura.</li>';
                dicas += '<li>Mantenha exercícios por 30-60 minutos nesta zona.</li>';
                dicas += '<li>Caminhada rápida, ciclismo leve ou natação são ideais.</li>';
                dicas += '<li>Exercite-se em jejum matinal para potencializar a queima.</li>';
                break;
                
            case 'aerobico':
                dicas += '<li>Treine na Zona 3 (70-80%) para melhorar capacidade cardiovascular.</li>';
                dicas += '<li>Sessões de 20-45 minutos são ideais.</li>';
                dicas += '<li>Corrida moderada, ciclismo ou natação contínua.</li>';
                dicas += '<li>Monitore para não ultrapassar a zona e virar anaeróbico.</li>';
                break;
                
            case 'anaerobico':
                dicas += '<li>Use a Zona 4 (80-90%) em intervalos curtos (2-8 minutos).</li>';
                dicas += '<li>Intercale com períodos de recuperação na Zona 1-2.</li>';
                dicas += '<li>Melhora potência e velocidade rapidamente.</li>';
                dicas += '<li>Limite a 1-2 sessões por semana para evitar overtraining.</li>';
                break;
                
            case 'vo2max':
                dicas += '<li>Zona 5 (90-100%) apenas em intervalos muito curtos (30s-3min).</li>';
                dicas += '<li>Requer recuperação completa entre intervalos.</li>';
                dicas += '<li>Use apenas 1x por semana e com boa base aeróbica.</li>';
                dicas += '<li>Ideal para atletas experientes buscando performance máxima.</li>';
                break;
        }
        
        dicas += '</ul></div>';
        return dicas;
    }
    
    function obterDicasMonitoramento() {
        return `
            <div class="dicas-monitoramento">
                <h4>📱 Dicas de Monitoramento:</h4>
                <ul>
                    <li><strong>Monitor cardíaco:</strong> Mais preciso, especialmente para treinos intensos.</li>
                    <li><strong>Smartwatch:</strong> Conveniente para uso diário e acompanhamento.</li>
                    <li><strong>Método manual:</strong> Conte pulso por 15s e multiplique por 4.</li>
                    <li><strong>Percepção de esforço:</strong> Aprenda a "sentir" as zonas com a prática.</li>
                    <li><strong>Teste de fala:</strong> Na Zona 2, você deve conseguir conversar.</li>
                    <li><strong>Variabilidade:</strong> FC pode variar por stress, sono, hidratação.</li>
                </ul>
            </div>
        `;
    }
});

// Adicionar estilos específicos para a página de frequência cardíaca
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fc-maxima {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            text-align: center;
            margin-bottom: var(--spacing-md);
        }
        
        .fc-label {
            font-size: 1rem;
            margin-bottom: var(--spacing-xs);
            opacity: 0.9;
        }
        
        .fc-valor {
            font-size: 2.5rem;
            font-weight: 700;
        }
        
        .fc-unidade {
            font-size: 1rem;
            opacity: 0.9;
        }
        
        .zonas-treino {
            margin-bottom: var(--spacing-md);
        }
        
        .zona-treino {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-left: 4px solid;
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            margin-bottom: var(--spacing-sm);
            transition: all 0.3s ease;
        }
        
        .zona-treino:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 15px var(--shadow);
        }
        
        .zona-treino.zona-objetivo {
            background-color: #f8f9fa;
            border-left-width: 6px;
            box-shadow: 0 2px 10px rgba(52, 152, 219, 0.1);
        }
        
        [data-theme="dark"] .zona-treino.zona-objetivo {
            background-color: #2c3e50;
        }
        
        .zona-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-xs);
        }
        
        .zona-nome {
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .zona-percentual {
            background-color: var(--bg-secondary);
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--text-secondary);
        }
        
        .zona-fc {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--spacing-xs);
        }
        
        .zona-descricao {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: var(--spacing-xs);
        }
        
        .zona-recomendada {
            background-color: var(--accent-primary);
            color: white;
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--border-radius);
            font-size: 0.8rem;
            font-weight: 600;
            display: inline-block;
        }
        
        .zonas-info {
            margin-top: var(--spacing-sm);
        }
        
        .zona-info {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-xs) 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .zona-info:last-child {
            border-bottom: none;
        }
        
        .zona-1 { color: #2ecc71; }
        .zona-2 { color: #f39c12; }
        .zona-3 { color: #e67e22; }
        .zona-4 { color: #e74c3c; }
        .zona-5 { color: #9b59b6; }
        
        .analise-fc-repouso {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .analise-fc-repouso h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .analise-fc-repouso p {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .analise-fc-repouso small {
            color: var(--text-secondary);
            font-style: italic;
        }
        
        .dicas-objetivo {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .dicas-objetivo h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .dicas-objetivo ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .dicas-objetivo li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .dicas-monitoramento {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .dicas-monitoramento h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .dicas-monitoramento ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .dicas-monitoramento li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .dicas-monitoramento strong {
            color: var(--text-primary);
        }
        
        @media (max-width: 768px) {
            .zona-header {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--spacing-xs);
            }
            
            .zona-percentual {
                align-self: flex-end;
            }
        }
    `;
    document.head.appendChild(style);
});

