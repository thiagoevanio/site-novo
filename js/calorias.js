// Calculadora de Gasto Calórico
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calorias-form');
    const resultadoDiv = document.getElementById('resultado-calorias');
    const valorCaloriasQueimadas = document.getElementById('valor-calorias-queimadas');
    const valorCaloriasHora = document.getElementById('valor-calorias-hora');
    const interpretacaoCalorias = document.getElementById('interpretacao-calorias');
    
    // Valores MET para diferentes atividades
    const metValues = {
        // Exercícios Aeróbicos
        'caminhada_lenta': 2.5,
        'caminhada_moderada': 3.5,
        'caminhada_rapida': 4.5,
        'corrida_lenta': 8.0,
        'corrida_moderada': 10.0,
        'corrida_rapida': 12.0,
        'ciclismo_lento': 4.0,
        'ciclismo_moderado': 6.0,
        'ciclismo_rapido': 8.0,
        'natacao_lenta': 6.0,
        'natacao_moderada': 8.0,
        'natacao_rapida': 10.0,
        
        // Exercícios de Força
        'musculacao_leve': 3.0,
        'musculacao_moderada': 5.0,
        'musculacao_intensa': 6.0,
        'crossfit': 10.0,
        'calistenia': 4.0,
        
        // Esportes
        'futebol': 7.0,
        'basquete': 6.0,
        'volei': 4.0,
        'tenis': 7.0,
        'ping_pong': 4.0,
        
        // Atividades Recreativas
        'danca': 4.5,
        'yoga': 2.5,
        'pilates': 3.0,
        'alongamento': 2.0,
        
        // Atividades Domésticas
        'limpeza_casa': 3.0,
        'jardinagem': 4.0,
        'cozinhar': 2.0,
        'subir_escadas': 8.0
    };
    
    const nomeAtividades = {
        'caminhada_lenta': 'Caminhada Lenta',
        'caminhada_moderada': 'Caminhada Moderada',
        'caminhada_rapida': 'Caminhada Rápida',
        'corrida_lenta': 'Corrida Lenta',
        'corrida_moderada': 'Corrida Moderada',
        'corrida_rapida': 'Corrida Rápida',
        'ciclismo_lento': 'Ciclismo Lento',
        'ciclismo_moderado': 'Ciclismo Moderado',
        'ciclismo_rapido': 'Ciclismo Rápido',
        'natacao_lenta': 'Natação Lenta',
        'natacao_moderada': 'Natação Moderada',
        'natacao_rapida': 'Natação Rápida',
        'musculacao_leve': 'Musculação Leve',
        'musculacao_moderada': 'Musculação Moderada',
        'musculacao_intensa': 'Musculação Intensa',
        'crossfit': 'CrossFit',
        'calistenia': 'Calistenia',
        'futebol': 'Futebol',
        'basquete': 'Basquete',
        'volei': 'Vôlei',
        'tenis': 'Tênis',
        'ping_pong': 'Ping Pong',
        'danca': 'Dança',
        'yoga': 'Yoga',
        'pilates': 'Pilates',
        'alongamento': 'Alongamento',
        'limpeza_casa': 'Limpeza de Casa',
        'jardinagem': 'Jardinagem',
        'cozinhar': 'Cozinhar',
        'subir_escadas': 'Subir Escadas'
    };
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularGastoCalorico();
    });
    
    function calcularGastoCalorico() {
        const peso = parseFloat(document.getElementById('peso').value);
        const atividade = document.getElementById('atividade').value;
        const duracao = parseInt(document.getElementById('duracao').value);
        
        // Validações
        if (!peso || !atividade || !duracao) {
            mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
            return;
        }
        
        if (peso < 30 || peso > 200) {
            mostrarNotificacao('Peso deve estar entre 30 e 200 kg.', 'erro');
            return;
        }
        
        if (duracao < 1 || duracao > 480) {
            mostrarNotificacao('Duração deve estar entre 1 e 480 minutos.', 'erro');
            return;
        }
        
        // Obter valor MET da atividade
        const met = metValues[atividade];
        if (!met) {
            mostrarNotificacao('Atividade não encontrada.', 'erro');
            return;
        }
        
        // Calcular calorias queimadas
        // Fórmula: Calorias = MET × Peso (kg) × Tempo (horas)
        const tempoHoras = duracao / 60;
        const caloriasQueimadas = met * peso * tempoHoras;
        const caloriasPorHora = met * peso;
        
        // Exibir resultado
        exibirResultado(caloriasQueimadas, caloriasPorHora, atividade, duracao, peso, met);
    }
    
    function exibirResultado(caloriasQueimadas, caloriasPorHora, atividade, duracao, peso, met) {
        valorCaloriasQueimadas.textContent = Math.round(caloriasQueimadas);
        valorCaloriasHora.textContent = Math.round(caloriasPorHora);
        
        const interpretacao = obterInterpretacao(caloriasQueimadas, caloriasPorHora, atividade, duracao, peso, met);
        interpretacaoCalorias.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-calorias', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('Gasto calórico calculado com sucesso!', 'sucesso');
    }
    
    function obterInterpretacao(caloriasQueimadas, caloriasPorHora, atividade, duracao, peso, met) {
        const nomeAtividade = nomeAtividades[atividade] || atividade;
        const intensidade = obterIntensidade(met);
        
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Análise do Seu Gasto Calórico:</strong></p>
                <p>Praticando <strong>${nomeAtividade}</strong> por <strong>${duracao} minutos</strong>, você queimou aproximadamente <strong>${Math.round(caloriasQueimadas)} calorias</strong>.</p>
                <p>Esta atividade tem intensidade <strong>${intensidade.nome}</strong> (${met} METs) e queima <strong>${Math.round(caloriasPorHora)} calorias por hora</strong> para seu peso.</p>
            </div>
        `;
        
        // Comparações interessantes
        interpretacao += obterComparacoes(caloriasQueimadas);
        
        // Equivalências alimentares
        interpretacao += obterEquivalenciasAlimentares(caloriasQueimadas);
        
        // Dicas para maximizar o gasto
        interpretacao += obterDicasMaximizar(atividade, met, intensidade);
        
        // Outras atividades similares
        interpretacao += obterAtividadesSimilares(met, atividade);
        
        return interpretacao;
    }
    
    function obterIntensidade(met) {
        if (met < 3) return { nome: 'Baixa', cor: '#3498db' };
        if (met < 6) return { nome: 'Moderada', cor: '#f39c12' };
        if (met < 9) return { nome: 'Alta', cor: '#e67e22' };
        return { nome: 'Muito Alta', cor: '#e74c3c' };
    }
    
    function obterComparacoes(calorias) {
        const temposCaminhada = Math.round((calorias / (3.5 * 70)) * 60); // Assumindo 70kg
        const temposSubirEscadas = Math.round((calorias / (8.0 * 70)) * 60);
        
        return `
            <div class="comparacoes">
                <h4>📊 Comparações Interessantes:</h4>
                <ul>
                    <li>Equivale a ${temposCaminhada} minutos de caminhada moderada</li>
                    <li>Ou ${temposSubirEscadas} minutos subindo escadas</li>
                    <li>Representa ${formatarNumero(calorias / 7700, 2)}kg de gordura queimada*</li>
                    <li>É ${formatarNumero(calorias / 2000, 1)}% das calorias diárias médias</li>
                </ul>
                <small>*1kg de gordura = aproximadamente 7700 calorias</small>
            </div>
        `;
    }
    
    function obterEquivalenciasAlimentares(calorias) {
        const equivalencias = [
            { alimento: 'fatias de pão integral', calorias: 80, emoji: '🍞' },
            { alimento: 'bananas médias', calorias: 105, emoji: '🍌' },
            { alimento: 'maçãs médias', calorias: 95, emoji: '🍎' },
            { alimento: 'copos de leite desnatado', calorias: 85, emoji: '🥛' },
            { alimento: 'ovos cozidos', calorias: 70, emoji: '🥚' },
            { alimento: 'colheres de arroz', calorias: 25, emoji: '🍚' }
        ];
        
        let html = `
            <div class="equivalencias-alimentares">
                <h4>🍽️ Equivale a queimar:</h4>
                <div class="equivalencias-grid">
        `;
        
        equivalencias.forEach(item => {
            const quantidade = Math.round(calorias / item.calorias);
            if (quantidade > 0 && quantidade < 20) {
                html += `
                    <div class="equivalencia-item">
                        <span class="equivalencia-emoji">${item.emoji}</span>
                        <span class="equivalencia-quantidade">${quantidade}</span>
                        <span class="equivalencia-alimento">${item.alimento}</span>
                    </div>
                `;
            }
        });
        
        html += '</div></div>';
        return html;
    }
    
    function obterDicasMaximizar(atividade, met, intensidade) {
        let dicas = '<div class="dicas-maximizar"><h4>💡 Dicas para Maximizar o Gasto:</h4><ul>';
        
        if (intensidade.nome === 'Baixa') {
            dicas += '<li>Aumente a intensidade gradualmente para queimar mais calorias.</li>';
            dicas += '<li>Adicione intervalos de maior intensidade durante a atividade.</li>';
        } else if (intensidade.nome === 'Moderada') {
            dicas += '<li>Mantenha essa intensidade por mais tempo para melhores resultados.</li>';
            dicas += '<li>Combine com exercícios de força para efeito EPOC.</li>';
        } else {
            dicas += '<li>Excelente intensidade! Mantenha a regularidade.</li>';
            dicas += '<li>Varie os exercícios para evitar adaptação do corpo.</li>';
        }
        
        // Dicas específicas por tipo de atividade
        if (atividade.includes('corrida')) {
            dicas += '<li>Varie terrenos (subidas queimam mais calorias).</li>';
            dicas += '<li>Experimente treinos intervalados (HIIT).</li>';
        } else if (atividade.includes('musculacao')) {
            dicas += '<li>Reduza o tempo de descanso entre séries.</li>';
            dicas += '<li>Inclua exercícios compostos (agachamento, deadlift).</li>';
        } else if (atividade.includes('caminhada')) {
            dicas += '<li>Use bastões de caminhada para envolver mais músculos.</li>';
            dicas += '<li>Procure terrenos com inclinação.</li>';
        }
        
        dicas += '<li>Mantenha-se hidratado durante toda a atividade.</li>';
        dicas += '<li>Combine diferentes tipos de exercício na semana.</li>';
        dicas += '</ul></div>';
        
        return dicas;
    }
    
    function obterAtividadesSimilares(metAtual, atividadeAtual) {
        const similares = [];
        
        Object.entries(metValues).forEach(([atividade, met]) => {
            if (atividade !== atividadeAtual && Math.abs(met - metAtual) <= 1) {
                similares.push({
                    nome: nomeAtividades[atividade],
                    met: met
                });
            }
        });
        
        if (similares.length === 0) return '';
        
        let html = `
            <div class="atividades-similares">
                <h4>🔄 Atividades com Gasto Similar:</h4>
                <div class="similares-grid">
        `;
        
        similares.slice(0, 4).forEach(atividade => {
            html += `
                <div class="similar-item">
                    <span class="similar-nome">${atividade.nome}</span>
                    <span class="similar-met">${atividade.met} METs</span>
                </div>
            `;
        });
        
        html += '</div></div>';
        return html;
    }
});

// Adicionar estilos específicos para a página de gasto calórico
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .resultado-calorias-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .atividades-ranking {
            margin-top: var(--spacing-sm);
        }
        
        .ranking-item {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-xs) 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .ranking-item:last-child {
            border-bottom: none;
        }
        
        .atividade {
            color: var(--text-primary);
        }
        
        .met {
            color: var(--accent-primary);
            font-weight: 600;
        }
        
        .comparacoes {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .comparacoes h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .comparacoes ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .comparacoes li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .comparacoes small {
            color: var(--text-secondary);
            font-style: italic;
            margin-top: var(--spacing-sm);
            display: block;
        }
        
        .equivalencias-alimentares {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .equivalencias-alimentares h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-md);
            text-align: center;
        }
        
        .equivalencias-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--spacing-sm);
        }
        
        .equivalencia-item {
            background-color: var(--bg-card);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            text-align: center;
            border: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .equivalencia-emoji {
            font-size: 1.5rem;
            margin-bottom: var(--spacing-xs);
        }
        
        .equivalencia-quantidade {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--accent-primary);
            margin-bottom: var(--spacing-xs);
        }
        
        .equivalencia-alimento {
            font-size: 0.8rem;
            color: var(--text-secondary);
            text-align: center;
        }
        
        .dicas-maximizar {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .dicas-maximizar h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .dicas-maximizar ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .dicas-maximizar li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .atividades-similares {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .atividades-similares h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-md);
            text-align: center;
        }
        
        .similares-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: var(--spacing-sm);
        }
        
        .similar-item {
            background-color: var(--bg-card);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            border: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .similar-nome {
            color: var(--text-primary);
            font-size: 0.9rem;
        }
        
        .similar-met {
            color: var(--accent-primary);
            font-weight: 600;
            font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
            .resultado-calorias-grid {
                grid-template-columns: 1fr;
            }
            
            .equivalencias-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .similares-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 480px) {
            .equivalencias-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

