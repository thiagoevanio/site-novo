// Calculadora de Água
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('agua-form');
    const resultadoDiv = document.getElementById('resultado-agua');
    const valorAguaTotal = document.getElementById('valor-agua-total');
    const valorAguaPura = document.getElementById('valor-agua-pura');
    const interpretacaoAgua = document.getElementById('interpretacao-agua');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularAgua();
    });
    
    function calcularAgua() {
        const peso = parseFloat(document.getElementById('peso').value);
        const idade = parseInt(document.getElementById('idade').value);
        const atividade = document.getElementById('atividade').value;
        const clima = document.getElementById('clima').value;
        const condicoes = document.getElementById('condicoes').value;
        
        // Validações
        if (!peso || !idade || !atividade || !clima) {
            mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'erro');
            return;
        }
        
        if (peso < 1 || peso > 300) {
            mostrarNotificacao('Peso deve estar entre 1 e 300 kg.', 'erro');
            return;
        }
        
        if (idade < 1 || idade > 120) {
            mostrarNotificacao('Idade deve estar entre 1 e 120 anos.', 'erro');
            return;
        }
        
        // Cálculo base: 35ml por kg de peso
        let aguaBase = peso * 35; // ml
        
        // Ajustes por idade
        if (idade < 18) {
            aguaBase *= 1.1; // Crianças e adolescentes precisam de mais água
        } else if (idade > 65) {
            aguaBase *= 1.05; // Idosos têm menor sensação de sede
        }
        
        // Ajustes por atividade física
        const fatorAtividade = obterFatorAtividade(atividade);
        aguaBase *= fatorAtividade;
        
        // Ajustes por clima
        const fatorClima = obterFatorClima(clima);
        aguaBase *= fatorClima;
        
        // Ajustes por condições especiais
        const fatorCondicoes = obterFatorCondicoes(condicoes);
        aguaBase *= fatorCondicoes;
        
        // Converter para litros
        const aguaTotalLitros = aguaBase / 1000;
        
        // Água pura (80% do total, pois 20% vem dos alimentos)
        const aguaPuraLitros = aguaTotalLitros * 0.8;
        
        // Exibir resultado
        exibirResultado(aguaTotalLitros, aguaPuraLitros, peso, idade, atividade, clima, condicoes);
    }
    
    function obterFatorAtividade(atividade) {
        switch (atividade) {
            case 'baixo': return 1.0;
            case 'moderado': return 1.2;
            case 'alto': return 1.5;
            case 'muito_alto': return 1.8;
            default: return 1.0;
        }
    }
    
    function obterFatorClima(clima) {
        switch (clima) {
            case 'frio': return 0.9;
            case 'ameno': return 1.0;
            case 'quente': return 1.3;
            case 'muito_quente': return 1.6;
            default: return 1.0;
        }
    }
    
    function obterFatorCondicoes(condicoes) {
        switch (condicoes) {
            case 'normal': return 1.0;
            case 'gravidez': return 1.3;
            case 'amamentacao': return 1.5;
            case 'febre': return 1.4;
            case 'altitude': return 1.2;
            default: return 1.0;
        }
    }
    
    function exibirResultado(aguaTotal, aguaPura, peso, idade, atividade, clima, condicoes) {
        valorAguaTotal.textContent = formatarNumero(aguaTotal, 1);
        valorAguaPura.textContent = formatarNumero(aguaPura, 1);
        
        const interpretacao = obterInterpretacao(aguaTotal, aguaPura, peso, idade, atividade, clima, condicoes);
        interpretacaoAgua.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-agua', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('Necessidade de água calculada com sucesso!', 'sucesso');
    }
    
    function obterInterpretacao(aguaTotal, aguaPura, peso, idade, atividade, clima, condicoes) {
        const copos200ml = Math.round(aguaPura * 5); // 1 litro = 5 copos de 200ml
        const garrafas500ml = Math.round(aguaPura * 2); // 1 litro = 2 garrafas de 500ml
        
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Sua necessidade diária de hidratação:</strong></p>
                <p>Você deve consumir aproximadamente <strong>${formatarNumero(aguaTotal, 1)} litros</strong> de líquidos por dia, sendo <strong>${formatarNumero(aguaPura, 1)} litros</strong> de água pura.</p>
                <p>Isso equivale a aproximadamente <strong>${copos200ml} copos de 200ml</strong> ou <strong>${garrafas500ml} garrafas de 500ml</strong> de água por dia.</p>
            </div>
        `;
        
        // Distribuição ao longo do dia
        interpretacao += obterDistribuicaoHoraria(aguaPura);
        
        // Dicas específicas baseadas nos fatores
        interpretacao += obterDicasEspecificas(atividade, clima, condicoes, idade);
        
        // Sinais de hidratação adequada
        interpretacao += `
            <div class="sinais-hidratacao">
                <h4>✅ Sinais de Hidratação Adequada:</h4>
                <ul>
                    <li>Urina clara ou amarelo claro</li>
                    <li>Ausência de sede excessiva</li>
                    <li>Pele elástica (teste do beliscão)</li>
                    <li>Energia e disposição normais</li>
                    <li>Mucosas úmidas (boca, olhos)</li>
                </ul>
            </div>
        `;
        
        // Aviso médico
        interpretacao += `
            <div class="aviso-medico">
                <p><strong>⚠️ Importante:</strong> Estas são recomendações gerais. Pessoas com problemas renais, cardíacos ou outras condições médicas devem consultar um médico para orientações específicas sobre hidratação.</p>
            </div>
        `;
        
        return interpretacao;
    }
    
    function obterDistribuicaoHoraria(aguaPura) {
        const manha = Math.round(aguaPura * 0.3 * 10) / 10;
        const tarde = Math.round(aguaPura * 0.4 * 10) / 10;
        const noite = Math.round(aguaPura * 0.3 * 10) / 10;
        
        return `
            <div class="distribuicao-horaria">
                <h4>⏰ Distribuição Sugerida ao Longo do Dia:</h4>
                <div class="horario-grid">
                    <div class="horario-item">
                        <div class="horario-periodo">Manhã (6h-12h)</div>
                        <div class="horario-quantidade">${formatarNumero(manha, 1)}L</div>
                        <div class="horario-dica">Inclui 1-2 copos ao acordar</div>
                    </div>
                    <div class="horario-item">
                        <div class="horario-periodo">Tarde (12h-18h)</div>
                        <div class="horario-quantidade">${formatarNumero(tarde, 1)}L</div>
                        <div class="horario-dica">Período de maior atividade</div>
                    </div>
                    <div class="horario-item">
                        <div class="horario-periodo">Noite (18h-22h)</div>
                        <div class="horario-quantidade">${formatarNumero(noite, 1)}L</div>
                        <div class="horario-dica">Evite 2h antes de dormir</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function obterDicasEspecificas(atividade, clima, condicoes, idade) {
        let dicas = '<div class="dicas-especificas"><h4>💡 Dicas Personalizadas:</h4><ul>';
        
        // Dicas por atividade
        if (atividade === 'alto' || atividade === 'muito_alto') {
            dicas += '<li>Beba 150-250ml a cada 15-20 minutos durante exercícios intensos.</li>';
            dicas += '<li>Considere bebidas isotônicas em treinos longos (>1 hora).</li>';
        }
        
        // Dicas por clima
        if (clima === 'quente' || clima === 'muito_quente') {
            dicas += '<li>Aumente o consumo em dias muito quentes ou com alta umidade.</li>';
            dicas += '<li>Prefira água fresca, mas não gelada demais.</li>';
        }
        
        // Dicas por condições especiais
        if (condicoes === 'gravidez') {
            dicas += '<li>A hidratação adequada é essencial para o desenvolvimento do bebê.</li>';
            dicas += '<li>Pode ajudar a reduzir náuseas matinais.</li>';
        } else if (condicoes === 'amamentacao') {
            dicas += '<li>A produção de leite materno requer hidratação extra.</li>';
            dicas += '<li>Beba um copo de água a cada mamada.</li>';
        } else if (condicoes === 'febre') {
            dicas += '<li>A febre aumenta significativamente a perda de água.</li>';
            dicas += '<li>Considere soluções de reidratação oral se necessário.</li>';
        }
        
        // Dicas por idade
        if (idade < 18) {
            dicas += '<li>Crianças e adolescentes têm maior necessidade relativa de água.</li>';
            dicas += '<li>Incentive o consumo regular, especialmente na escola.</li>';
        } else if (idade > 65) {
            dicas += '<li>Idosos têm menor sensação de sede - beba mesmo sem sentir sede.</li>';
            dicas += '<li>Monitore a cor da urina como indicador de hidratação.</li>';
        }
        
        // Dicas gerais
        dicas += '<li>Tenha sempre uma garrafa de água por perto como lembrete visual.</li>';
        dicas += '<li>Sabores naturais (limão, hortelã) podem tornar a água mais atrativa.</li>';
        dicas += '<li>Alimentos ricos em água (melancia, pepino) também contribuem.</li>';
        
        dicas += '</ul></div>';
        
        return dicas;
    }
});

// Adicionar estilos específicos para a página de água
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .resultado-agua-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .distribuicao-horaria {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .distribuicao-horaria h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-md);
            text-align: center;
        }
        
        .horario-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-sm);
        }
        
        .horario-item {
            background-color: var(--bg-card);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            text-align: center;
            border: 1px solid var(--border-color);
        }
        
        .horario-periodo {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: var(--spacing-xs);
            font-size: 0.9rem;
        }
        
        .horario-quantidade {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--accent-primary);
            margin-bottom: var(--spacing-xs);
        }
        
        .horario-dica {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .sinais-hidratacao {
            background-color: #e8f5e8;
            border: 1px solid var(--accent-secondary);
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .sinais-hidratacao h4 {
            color: var(--accent-secondary);
            margin-bottom: var(--spacing-sm);
        }
        
        .sinais-hidratacao ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .sinais-hidratacao li {
            color: #2d5a2d;
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        [data-theme="dark"] .sinais-hidratacao {
            background-color: #1a2d1a;
            border-color: var(--accent-secondary);
        }
        
        [data-theme="dark"] .sinais-hidratacao li {
            color: #90ee90;
        }
        
        @media (max-width: 768px) {
            .resultado-agua-grid {
                grid-template-columns: 1fr;
            }
            
            .horario-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

