// Calculadora de Macronutrientes
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('macros-form');
    const resultadoDiv = document.getElementById('resultado-macros');
    const valorCalorias = document.getElementById('valor-calorias');
    const interpretacaoMacros = document.getElementById('interpretacao-macros');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularMacros();
    });
    
    function calcularMacros() {
        const sexo = document.getElementById('sexo').value;
        const idade = parseInt(document.getElementById('idade').value);
        const peso = parseFloat(document.getElementById('peso').value);
        const altura = parseFloat(document.getElementById('altura').value);
        const fatorAtividade = parseFloat(document.getElementById('atividade').value);
        const objetivo = document.getElementById('objetivo').value;
        const tipoDieta = document.getElementById('tipo-dieta').value;
        
        // Validações
        if (!sexo || !idade || !peso || !altura || !fatorAtividade || !objetivo || !tipoDieta) {
            mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
            return;
        }
        
        if (idade < 16 || idade > 80) {
            mostrarNotificacao('Idade deve estar entre 16 e 80 anos.', 'erro');
            return;
        }
        
        if (peso < 30 || peso > 200) {
            mostrarNotificacao('Peso deve estar entre 30 e 200 kg.', 'erro');
            return;
        }
        
        if (altura < 140 || altura > 220) {
            mostrarNotificacao('Altura deve estar entre 140 e 220 cm.', 'erro');
            return;
        }
        
        // Calcular TMB usando Harris-Benedict
        let tmb;
        if (sexo === 'masculino') {
            tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
        } else {
            tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
        }
        
        // Calcular GET (Gasto Energético Total)
        let get = tmb * fatorAtividade;
        
        // Ajustar calorias baseado no objetivo
        let calorias = ajustarCaloriasPorObjetivo(get, objetivo);
        
        // Obter distribuição de macronutrientes baseada no tipo de dieta
        const distribuicao = obterDistribuicaoMacros(tipoDieta, objetivo);
        
        // Calcular macronutrientes
        const macros = calcularDistribuicaoMacros(calorias, distribuicao);
        
        // Exibir resultado
        exibirResultado(calorias, macros, objetivo, tipoDieta, peso);
    }
    
    function ajustarCaloriasPorObjetivo(get, objetivo) {
        switch (objetivo) {
            case 'perder':
                return get * 0.85; // Déficit de 15%
            case 'manter':
                return get;
            case 'ganhar':
                return get * 1.15; // Superávit de 15%
            case 'recomposicao':
                return get * 0.95; // Déficit leve de 5%
            default:
                return get;
        }
    }
    
    function obterDistribuicaoMacros(tipoDieta, objetivo) {
        const distribuicoes = {
            'equilibrada': { proteina: 20, carboidrato: 50, gordura: 30 },
            'low-carb': { proteina: 25, carboidrato: 25, gordura: 50 },
            'alta-proteina': { proteina: 30, carboidrato: 40, gordura: 30 },
            'cetogenica': { proteina: 20, carboidrato: 5, gordura: 75 },
            'mediterranea': { proteina: 18, carboidrato: 45, gordura: 37 }
        };
        
        let distribuicao = distribuicoes[tipoDieta] || distribuicoes['equilibrada'];
        
        // Ajustes baseados no objetivo
        if (objetivo === 'ganhar' || objetivo === 'recomposicao') {
            // Aumentar proteína para ganho/manutenção de massa muscular
            distribuicao.proteina = Math.min(35, distribuicao.proteina + 5);
            distribuicao.carboidrato = Math.max(20, distribuicao.carboidrato - 3);
            distribuicao.gordura = Math.max(20, distribuicao.gordura - 2);
        }
        
        return distribuicao;
    }
    
    function calcularDistribuicaoMacros(calorias, distribuicao) {
        // Calorias por macronutriente
        const caloriasProteina = (calorias * distribuicao.proteina) / 100;
        const caloriasCarboidrato = (calorias * distribuicao.carboidrato) / 100;
        const caloriasGordura = (calorias * distribuicao.gordura) / 100;
        
        // Gramas por macronutriente (proteína e carbo = 4 cal/g, gordura = 9 cal/g)
        const gramasProteina = caloriasProteina / 4;
        const gramasCarboidrato = caloriasCarboidrato / 4;
        const gramasGordura = caloriasGordura / 9;
        
        return {
            proteina: {
                gramas: gramasProteina,
                calorias: caloriasProteina,
                percentual: distribuicao.proteina
            },
            carboidrato: {
                gramas: gramasCarboidrato,
                calorias: caloriasCarboidrato,
                percentual: distribuicao.carboidrato
            },
            gordura: {
                gramas: gramasGordura,
                calorias: caloriasGordura,
                percentual: distribuicao.gordura
            }
        };
    }
    
    function exibirResultado(calorias, macros, objetivo, tipoDieta, peso) {
        valorCalorias.textContent = Math.round(calorias) + ' kcal';
        
        // Atualizar valores dos macronutrientes
        document.getElementById('proteinas-g').textContent = Math.round(macros.proteina.gramas) + 'g';
        document.getElementById('proteinas-cal').textContent = Math.round(macros.proteina.calorias) + ' kcal';
        document.getElementById('proteinas-pct').textContent = macros.proteina.percentual + '%';
        
        document.getElementById('carboidratos-g').textContent = Math.round(macros.carboidrato.gramas) + 'g';
        document.getElementById('carboidratos-cal').textContent = Math.round(macros.carboidrato.calorias) + ' kcal';
        document.getElementById('carboidratos-pct').textContent = macros.carboidrato.percentual + '%';
        
        document.getElementById('gorduras-g').textContent = Math.round(macros.gordura.gramas) + 'g';
        document.getElementById('gorduras-cal').textContent = Math.round(macros.gordura.calorias) + ' kcal';
        document.getElementById('gorduras-pct').textContent = macros.gordura.percentual + '%';
        
        const interpretacao = obterInterpretacao(calorias, macros, objetivo, tipoDieta, peso);
        interpretacaoMacros.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-macros', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('Macronutrientes calculados com sucesso!', 'sucesso');
    }
    
    function obterInterpretacao(calorias, macros, objetivo, tipoDieta, peso) {
        const proteinaPorKg = macros.proteina.gramas / peso;
        
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Sua Distribuição Personalizada:</strong></p>
                <p>Para seu objetivo de <strong>${obterNomeObjetivo(objetivo)}</strong> com dieta <strong>${obterNomeDieta(tipoDieta)}</strong>, você deve consumir <strong>${Math.round(calorias)} calorias</strong> por dia.</p>
                <p>Sua ingestão de proteína será de <strong>${formatarNumero(proteinaPorKg, 1)}g por kg de peso corporal</strong>, que está ${avaliarProteina(proteinaPorKg)}.</p>
            </div>
        `;
        
        // Distribuição por refeições
        interpretacao += obterDistribuicaoRefeicoes(macros);
        
        // Dicas específicas por tipo de dieta
        interpretacao += obterDicasTipoDieta(tipoDieta, objetivo);
        
        // Fontes alimentares
        interpretacao += obterFontesAlimentares();
        
        // Timing de nutrientes
        interpretacao += obterTimingNutrientes(macros, objetivo);
        
        // Aviso nutricional
        interpretacao += `
            <div class="aviso-medico">
                <p><strong>⚠️ Importante:</strong> Esta é uma estimativa baseada em fórmulas padrão. Para um plano nutricional personalizado e acompanhamento adequado, consulte um nutricionista qualificado.</p>
            </div>
        `;
        
        return interpretacao;
    }
    
    function obterNomeObjetivo(objetivo) {
        const nomes = {
            'perder': 'perder peso',
            'manter': 'manter peso',
            'ganhar': 'ganhar peso',
            'recomposicao': 'recomposição corporal'
        };
        return nomes[objetivo] || objetivo;
    }
    
    function obterNomeDieta(tipoDieta) {
        const nomes = {
            'equilibrada': 'equilibrada',
            'low-carb': 'low carb',
            'alta-proteina': 'alta proteína',
            'cetogenica': 'cetogênica',
            'mediterranea': 'mediterrânea'
        };
        return nomes[tipoDieta] || tipoDieta;
    }
    
    function avaliarProteina(proteinaPorKg) {
        if (proteinaPorKg < 0.8) return 'abaixo do recomendado';
        if (proteinaPorKg <= 1.2) return 'adequada para sedentários';
        if (proteinaPorKg <= 1.6) return 'adequada para ativos';
        if (proteinaPorKg <= 2.2) return 'adequada para atletas';
        return 'muito alta - considere reduzir';
    }
    
    function obterDistribuicaoRefeicoes(macros) {
        const refeicoesProteina = Math.round(macros.proteina.gramas / 4); // 4 refeições
        const refeicoesCarboidrato = Math.round(macros.carboidrato.gramas / 4);
        const refeicoesGordura = Math.round(macros.gordura.gramas / 4);
        
        return `
            <div class="distribuicao-refeicoes">
                <h4>🍽️ Distribuição por Refeição (4 refeições/dia):</h4>
                <div class="refeicoes-grid">
                    <div class="refeicao-macro">
                        <span class="macro-nome">Proteínas:</span>
                        <span class="macro-valor">${refeicoesProteina}g por refeição</span>
                    </div>
                    <div class="refeicao-macro">
                        <span class="macro-nome">Carboidratos:</span>
                        <span class="macro-valor">${refeicoesCarboidrato}g por refeição</span>
                    </div>
                    <div class="refeicao-macro">
                        <span class="macro-nome">Gorduras:</span>
                        <span class="macro-valor">${refeicoesGordura}g por refeição</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    function obterDicasTipoDieta(tipoDieta, objetivo) {
        let dicas = '<div class="dicas-dieta"><h4>💡 Dicas para sua Dieta:</h4><ul>';
        
        switch (tipoDieta) {
            case 'equilibrada':
                dicas += '<li>Distribua os macronutrientes de forma equilibrada em todas as refeições.</li>';
                dicas += '<li>Prefira carboidratos complexos e proteínas de alto valor biológico.</li>';
                break;
                
            case 'low-carb':
                dicas += '<li>Foque em vegetais com baixo índice glicêmico como fonte de carboidratos.</li>';
                dicas += '<li>Aumente o consumo de gorduras boas (azeite, abacate, nozes).</li>';
                dicas += '<li>Monitore cetose se for muito restritiva em carboidratos.</li>';
                break;
                
            case 'alta-proteina':
                dicas += '<li>Distribua a proteína ao longo do dia para melhor absorção.</li>';
                dicas += '<li>Varie as fontes: carnes, ovos, laticínios, leguminosas.</li>';
                dicas += '<li>Mantenha hidratação adequada devido ao maior trabalho renal.</li>';
                break;
                
            case 'cetogenica':
                dicas += '<li>Mantenha carboidratos abaixo de 20-50g para manter cetose.</li>';
                dicas += '<li>Aumente gradualmente as gorduras para evitar desconforto digestivo.</li>';
                dicas += '<li>Monitore eletrólitos (sódio, potássio, magnésio).</li>';
                break;
                
            case 'mediterranea':
                dicas += '<li>Priorize azeite de oliva, peixes, frutas e vegetais.</li>';
                dicas += '<li>Inclua oleaginosas e grãos integrais regularmente.</li>';
                dicas += '<li>Modere o consumo de carnes vermelhas.</li>';
                break;
        }
        
        // Dicas específicas por objetivo
        if (objetivo === 'perder') {
            dicas += '<li>Mantenha déficit calórico moderado para preservar massa muscular.</li>';
            dicas += '<li>Priorize alimentos com alta saciedade (proteínas e fibras).</li>';
        } else if (objetivo === 'ganhar') {
            dicas += '<li>Distribua as calorias extras principalmente em carboidratos e proteínas.</li>';
            dicas += '<li>Faça refeições frequentes para facilitar o consumo calórico.</li>';
        }
        
        dicas += '</ul></div>';
        return dicas;
    }
    
    function obterFontesAlimentares() {
        return `
            <div class="fontes-alimentares">
                <h4>🥗 Principais Fontes Alimentares:</h4>
                <div class="fontes-grid">
                    <div class="fonte-categoria">
                        <h5>Proteínas:</h5>
                        <p>Carnes magras, peixes, ovos, laticínios, leguminosas, quinoa</p>
                    </div>
                    <div class="fonte-categoria">
                        <h5>Carboidratos:</h5>
                        <p>Arroz integral, aveia, batata-doce, frutas, vegetais, leguminosas</p>
                    </div>
                    <div class="fonte-categoria">
                        <h5>Gorduras:</h5>
                        <p>Azeite, abacate, nozes, castanhas, peixes gordos, sementes</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    function obterTimingNutrientes(macros, objetivo) {
        return `
            <div class="timing-nutrientes">
                <h4>⏰ Timing dos Nutrientes:</h4>
                <ul>
                    <li><strong>Pré-treino:</strong> Carboidratos (30-60g) 1-2h antes do exercício</li>
                    <li><strong>Pós-treino:</strong> Proteína (20-40g) + Carboidratos (30-60g) até 2h após</li>
                    <li><strong>Antes de dormir:</strong> Proteína de digestão lenta (caseína)</li>
                    <li><strong>Café da manhã:</strong> Proteína + Carboidratos para quebrar o jejum</li>
                    <li><strong>Gorduras:</strong> Distribua ao longo do dia, evite pré-treino</li>
                </ul>
            </div>
        `;
    }
});

// Adicionar estilos específicos para a página de macronutrientes
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .calorias-totais {
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            text-align: center;
            margin-bottom: var(--spacing-md);
        }
        
        .calorias-label {
            font-size: 1rem;
            margin-bottom: var(--spacing-xs);
            opacity: 0.9;
        }
        
        .calorias-valor {
            font-size: 2.5rem;
            font-weight: 700;
        }
        
        .macros-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .macro-item {
            background-color: var(--bg-card);
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            text-align: center;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }
        
        .macro-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px var(--shadow);
        }
        
        .macro-item.proteinas {
            border-color: #e74c3c;
        }
        
        .macro-item.carboidratos {
            border-color: #f39c12;
        }
        
        .macro-item.gorduras {
            border-color: #9b59b6;
        }
        
        .macro-nome {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: var(--spacing-sm);
            font-size: 1.1rem;
        }
        
        .macro-gramas {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: var(--spacing-xs);
        }
        
        .proteinas .macro-gramas {
            color: #e74c3c;
        }
        
        .carboidratos .macro-gramas {
            color: #f39c12;
        }
        
        .gorduras .macro-gramas {
            color: #9b59b6;
        }
        
        .macro-calorias {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: var(--spacing-xs);
        }
        
        .macro-percentual {
            background-color: var(--bg-secondary);
            padding: var(--spacing-xs);
            border-radius: var(--border-radius);
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .calorias-macro {
            margin-top: var(--spacing-sm);
        }
        
        .cal-item {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-xs) 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .cal-item:last-child {
            border-bottom: none;
        }
        
        .cal-macro {
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .cal-valor {
            color: var(--accent-primary);
            font-weight: 600;
        }
        
        .distribuicao-refeicoes {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .distribuicao-refeicoes h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-md);
            text-align: center;
        }
        
        .refeicoes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-sm);
        }
        
        .refeicao-macro {
            display: flex;
            justify-content: space-between;
            background-color: var(--bg-card);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            border: 1px solid var(--border-color);
        }
        
        .dicas-dieta {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .dicas-dieta h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .dicas-dieta ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .dicas-dieta li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .fontes-alimentares {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .fontes-alimentares h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-md);
            text-align: center;
        }
        
        .fontes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-md);
        }
        
        .fonte-categoria {
            background-color: var(--bg-card);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            border: 1px solid var(--border-color);
        }
        
        .fonte-categoria h5 {
            color: var(--text-primary);
            margin-bottom: var(--spacing-xs);
            font-size: 1rem;
        }
        
        .fonte-categoria p {
            color: var(--text-secondary);
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .timing-nutrientes {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .timing-nutrientes h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .timing-nutrientes ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .timing-nutrientes li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        @media (max-width: 768px) {
            .macros-grid {
                grid-template-columns: 1fr;
            }
            
            .refeicoes-grid {
                grid-template-columns: 1fr;
            }
            
            .fontes-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

