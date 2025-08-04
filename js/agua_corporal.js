// Calculadora de Água Corporal
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('agua-corporal-form');
    const resultadoDiv = document.getElementById('resultado-agua-corporal');
    const valorPercentualAgua = document.getElementById('valor-percentual-agua');
    const valorLitrosAgua = document.getElementById('valor-litros-agua');
    const hidratacaoStatus = document.getElementById('hidratacao-status');
    const interpretacaoAguaCorporal = document.getElementById('interpretacao-agua-corporal');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularAguaCorporal();
    });
    
    function calcularAguaCorporal() {
        const sexo = document.getElementById('sexo').value;
        const idade = parseInt(document.getElementById('idade').value);
        const peso = parseFloat(document.getElementById('peso').value);
        const altura = parseFloat(document.getElementById('altura').value);
        const nivelAtividade = document.getElementById('nivel-atividade').value;
        const composicao = document.getElementById('composicao').value;
        
        // Validações
        if (!sexo || !idade || !peso || !altura || !nivelAtividade || !composicao) {
            mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
            return;
        }
        
        if (idade < 18 || idade > 100) {
            mostrarNotificacao('Idade deve estar entre 18 e 100 anos.', 'erro');
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
        
        // Calcular água corporal total usando fórmulas de Watson
        const aguaCorporalLitros = calcularAguaCorporalWatson(sexo, idade, peso, altura);
        
        // Ajustar baseado na composição corporal e nível de atividade
        const aguaCorporalAjustada = ajustarAguaCorporal(aguaCorporalLitros, composicao, nivelAtividade);
        
        // Calcular percentual
        const percentualAgua = (aguaCorporalAjustada / peso) * 100;
        
        // Exibir resultado
        exibirResultado(percentualAgua, aguaCorporalAjustada, sexo, idade, peso, composicao, nivelAtividade);
    }
    
    function calcularAguaCorporalWatson(sexo, idade, peso, altura) {
        // Fórmulas de Watson para água corporal total
        let aguaCorporal;
        
        if (sexo === 'masculino') {
            // Homens: 2.447 - (0.09156 × idade) + (0.1074 × altura) + (0.3362 × peso)
            aguaCorporal = 2.447 - (0.09156 * idade) + (0.1074 * altura) + (0.3362 * peso);
        } else {
            // Mulheres: -2.097 + (0.1069 × altura) + (0.2466 × peso)
            aguaCorporal = -2.097 + (0.1069 * altura) + (0.2466 * peso);
        }
        
        return Math.max(0, aguaCorporal);
    }
    
    function ajustarAguaCorporal(aguaBase, composicao, nivelAtividade) {
        let fatorComposicao = 1.0;
        let fatorAtividade = 1.0;
        
        // Ajuste por composição corporal
        switch (composicao) {
            case 'magro':
                fatorComposicao = 1.05; // Mais músculo = mais água
                break;
            case 'normal':
                fatorComposicao = 1.0;
                break;
            case 'sobrepeso':
                fatorComposicao = 0.95; // Mais gordura = menos água
                break;
            case 'obeso':
                fatorComposicao = 0.90;
                break;
        }
        
        // Ajuste por nível de atividade
        switch (nivelAtividade) {
            case 'sedentario':
                fatorAtividade = 0.98;
                break;
            case 'leve':
                fatorAtividade = 1.0;
                break;
            case 'moderado':
                fatorAtividade = 1.02;
                break;
            case 'intenso':
                fatorAtividade = 1.04;
                break;
            case 'atleta':
                fatorAtividade = 1.06; // Atletas têm mais massa muscular
                break;
        }
        
        return aguaBase * fatorComposicao * fatorAtividade;
    }
    
    function exibirResultado(percentualAgua, litrosAgua, sexo, idade, peso, composicao, nivelAtividade) {
        valorPercentualAgua.textContent = formatarNumero(percentualAgua, 1);
        valorLitrosAgua.textContent = formatarNumero(litrosAgua, 1);
        
        const status = avaliarHidratacao(percentualAgua, sexo, idade);
        hidratacaoStatus.innerHTML = `
            <div class="status-hidratacao" style="background-color: ${status.cor}; color: white;">
                <strong>${status.nome}</strong>
            </div>
        `;
        
        const interpretacao = obterInterpretacao(percentualAgua, litrosAgua, status, sexo, idade, peso, composicao, nivelAtividade);
        interpretacaoAguaCorporal.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-agua-corporal', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('Água corporal calculada com sucesso!', 'sucesso');
    }
    
    function avaliarHidratacao(percentual, sexo, idade) {
        // Faixas normais baseadas em sexo e idade
        let faixaMinima, faixaMaxima;
        
        if (sexo === 'masculino') {
            if (idade < 40) {
                faixaMinima = 63;
                faixaMaxima = 73;
            } else if (idade < 60) {
                faixaMinima = 55;
                faixaMaxima = 65;
            } else {
                faixaMinima = 47;
                faixaMaxima = 57;
            }
        } else {
            if (idade < 40) {
                faixaMinima = 55;
                faixaMaxima = 65;
            } else if (idade < 60) {
                faixaMinima = 47;
                faixaMaxima = 57;
            } else {
                faixaMinima = 39;
                faixaMaxima = 49;
            }
        }
        
        if (percentual < faixaMinima - 5) {
            return { nome: 'Muito Baixo', cor: '#e74c3c', nivel: 'critico' };
        } else if (percentual < faixaMinima) {
            return { nome: 'Baixo', cor: '#f39c12', nivel: 'atencao' };
        } else if (percentual <= faixaMaxima) {
            return { nome: 'Normal', cor: '#2ecc71', nivel: 'normal' };
        } else if (percentual <= faixaMaxima + 5) {
            return { nome: 'Alto', cor: '#3498db', nivel: 'bom' };
        } else {
            return { nome: 'Muito Alto', cor: '#9b59b6', nivel: 'excelente' };
        }
    }
    
    function obterInterpretacao(percentual, litros, status, sexo, idade, peso, composicao, nivelAtividade) {
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Análise da Sua Água Corporal:</strong></p>
                <p>Seu corpo contém aproximadamente <strong>${formatarNumero(percentual, 1)}%</strong> de água, o que equivale a <strong>${formatarNumero(litros, 1)} litros</strong>.</p>
                <p>Para ${sexo === 'masculino' ? 'um homem' : 'uma mulher'} de ${idade} anos, este valor está classificado como <strong>${status.nome}</strong>.</p>
            </div>
        `;
        
        // Análise do status
        interpretacao += analisarStatus(status, percentual, sexo, idade);
        
        // Fatores que influenciam
        interpretacao += analisarFatores(composicao, nivelAtividade);
        
        // Dicas para manter hidratação adequada
        interpretacao += obterDicasHidratacao(status.nivel);
        
        // Sinais de desidratação
        interpretacao += obterSinaisDesidratacao();
        
        return interpretacao;
    }
    
    function analisarStatus(status, percentual, sexo, idade) {
        let analise = '';
        
        switch (status.nivel) {
            case 'critico':
                analise = `
                    <div class="analise-status critico">
                        <h4>⚠️ Atenção: Água Corporal Muito Baixa</h4>
                        <p>Seu percentual de água corporal está significativamente abaixo do normal. Isso pode indicar:</p>
                        <ul>
                            <li>Desidratação severa</li>
                            <li>Excesso de gordura corporal</li>
                            <li>Problemas de retenção de líquidos</li>
                            <li>Necessidade de avaliação médica</li>
                        </ul>
                        <p><strong>Recomendação:</strong> Consulte um médico para avaliação completa.</p>
                    </div>
                `;
                break;
                
            case 'atencao':
                analise = `
                    <div class="analise-status atencao">
                        <h4>📊 Água Corporal Abaixo do Ideal</h4>
                        <p>Seu percentual está um pouco abaixo da faixa normal. Possíveis causas:</p>
                        <ul>
                            <li>Hidratação insuficiente</li>
                            <li>Composição corporal com mais gordura</li>
                            <li>Necessidade de aumentar ingestão de líquidos</li>
                        </ul>
                        <p><strong>Recomendação:</strong> Aumente a ingestão de água e monitore.</p>
                    </div>
                `;
                break;
                
            case 'normal':
                analise = `
                    <div class="analise-status normal">
                        <h4>✅ Água Corporal Normal</h4>
                        <p>Parabéns! Seu percentual de água corporal está dentro da faixa normal para sua idade e sexo.</p>
                        <p>Isso indica boa hidratação e composição corporal adequada.</p>
                        <p><strong>Recomendação:</strong> Mantenha os hábitos atuais de hidratação.</p>
                    </div>
                `;
                break;
                
            case 'bom':
                analise = `
                    <div class="analise-status bom">
                        <h4>💪 Água Corporal Acima da Média</h4>
                        <p>Excelente! Seu percentual está acima da média, indicando:</p>
                        <ul>
                            <li>Boa hidratação</li>
                            <li>Composição corporal com mais massa magra</li>
                            <li>Hábitos saudáveis de hidratação</li>
                        </ul>
                        <p><strong>Recomendação:</strong> Continue mantendo esses excelentes hábitos.</p>
                    </div>
                `;
                break;
                
            case 'excelente':
                analise = `
                    <div class="analise-status excelente">
                        <h4>🏆 Água Corporal Excelente</h4>
                        <p>Fantástico! Seu percentual está no nível de atletas, indicando:</p>
                        <ul>
                            <li>Hidratação ótima</li>
                            <li>Alta proporção de massa muscular</li>
                            <li>Excelente condicionamento físico</li>
                        </ul>
                        <p><strong>Recomendação:</strong> Mantenha esse excelente padrão.</p>
                    </div>
                `;
                break;
        }
        
        return analise;
    }
    
    function analisarFatores(composicao, nivelAtividade) {
        const composicaoTexto = {
            'magro': 'baixo percentual de gordura',
            'normal': 'percentual normal de gordura',
            'sobrepeso': 'sobrepeso',
            'obeso': 'obesidade'
        };
        
        const atividadeTexto = {
            'sedentario': 'sedentário',
            'leve': 'levemente ativo',
            'moderado': 'moderadamente ativo',
            'intenso': 'muito ativo',
            'atleta': 'atleta'
        };
        
        return `
            <div class="analise-fatores">
                <h4>🔍 Fatores que Influenciam Seu Resultado:</h4>
                <ul>
                    <li><strong>Composição corporal:</strong> ${composicaoTexto[composicao]} - músculos contêm mais água que gordura</li>
                    <li><strong>Nível de atividade:</strong> ${atividadeTexto[nivelAtividade]} - exercícios regulares aumentam massa muscular</li>
                    <li><strong>Idade:</strong> percentual de água diminui naturalmente com o envelhecimento</li>
                    <li><strong>Sexo:</strong> homens geralmente têm mais água corporal que mulheres</li>
                </ul>
            </div>
        `;
    }
    
    function obterDicasHidratacao(nivel) {
        let dicas = '<div class="dicas-hidratacao"><h4>💧 Dicas para Manter Hidratação Adequada:</h4><ul>';
        
        // Dicas gerais
        dicas += '<li>Beba água regularmente ao longo do dia, não apenas quando sentir sede.</li>';
        dicas += '<li>Monitore a cor da urina - deve estar amarelo claro.</li>';
        dicas += '<li>Aumente a ingestão em dias quentes ou durante exercícios.</li>';
        
        // Dicas específicas por nível
        if (nivel === 'critico' || nivel === 'atencao') {
            dicas += '<li><strong>Urgente:</strong> Aumente significativamente a ingestão de líquidos.</li>';
            dicas += '<li>Considere bebidas isotônicas se pratica exercícios intensos.</li>';
            dicas += '<li>Evite álcool e cafeína em excesso, pois são diuréticos.</li>';
        } else if (nivel === 'normal') {
            dicas += '<li>Mantenha o consumo atual de líquidos.</li>';
            dicas += '<li>Inclua alimentos ricos em água como frutas e vegetais.</li>';
        } else {
            dicas += '<li>Continue com os excelentes hábitos de hidratação.</li>';
            dicas += '<li>Seja um exemplo para outros sobre hidratação adequada.</li>';
        }
        
        dicas += '<li>Carregue sempre uma garrafa de água com você.</li>';
        dicas += '<li>Estabeleça lembretes para beber água se necessário.</li>';
        dicas += '</ul></div>';
        
        return dicas;
    }
    
    function obterSinaisDesidratacao() {
        return `
            <div class="sinais-desidratacao">
                <h4>🚨 Sinais de Desidratação:</h4>
                <div class="sinais-grid">
                    <div class="sinais-leves">
                        <h5>Leves:</h5>
                        <ul>
                            <li>Sede</li>
                            <li>Urina amarela escura</li>
                            <li>Boca seca</li>
                            <li>Fadiga leve</li>
                        </ul>
                    </div>
                    <div class="sinais-moderados">
                        <h5>Moderados:</h5>
                        <ul>
                            <li>Dor de cabeça</li>
                            <li>Tontura</li>
                            <li>Pele ressecada</li>
                            <li>Diminuição da urina</li>
                        </ul>
                    </div>
                    <div class="sinais-severos">
                        <h5>Severos:</h5>
                        <ul>
                            <li>Confusão mental</li>
                            <li>Batimentos acelerados</li>
                            <li>Pressão baixa</li>
                            <li>Ausência de urina</li>
                        </ul>
                    </div>
                </div>
                <p><strong>⚠️ Importante:</strong> Sinais severos requerem atenção médica imediata.</p>
            </div>
        `;
    }
});

// Adicionar estilos específicos para a página de água corporal
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .resultado-agua-corporal-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .hidratacao-status {
            margin-bottom: var(--spacing-md);
        }
        
        .status-hidratacao {
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .faixas-agua {
            margin-top: var(--spacing-sm);
        }
        
        .faixas-agua h4 {
            color: var(--text-primary);
            margin-bottom: var(--spacing-xs);
            font-size: 1rem;
        }
        
        .faixa-item {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-xs) 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .faixa-item:last-child {
            border-bottom: none;
        }
        
        .faixa-idade {
            color: var(--text-secondary);
        }
        
        .faixa-valor {
            color: var(--accent-primary);
            font-weight: 600;
        }
        
        .analise-status {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .analise-status h4 {
            margin-bottom: var(--spacing-sm);
        }
        
        .analise-status.critico h4 { color: #e74c3c; }
        .analise-status.atencao h4 { color: #f39c12; }
        .analise-status.normal h4 { color: #2ecc71; }
        .analise-status.bom h4 { color: #3498db; }
        .analise-status.excelente h4 { color: #9b59b6; }
        
        .analise-status ul {
            margin: var(--spacing-sm) 0;
            padding-left: var(--spacing-md);
        }
        
        .analise-status li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .analise-fatores {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .analise-fatores h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .analise-fatores ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .analise-fatores li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .analise-fatores strong {
            color: var(--text-primary);
        }
        
        .dicas-hidratacao {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .dicas-hidratacao h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .dicas-hidratacao ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .dicas-hidratacao li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .dicas-hidratacao strong {
            color: var(--text-primary);
        }
        
        .sinais-desidratacao {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .sinais-desidratacao h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-md);
        }
        
        .sinais-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .sinais-leves h5 { color: #f39c12; }
        .sinais-moderados h5 { color: #e67e22; }
        .sinais-severos h5 { color: #e74c3c; }
        
        .sinais-grid h5 {
            margin-bottom: var(--spacing-xs);
            font-size: 1rem;
        }
        
        .sinais-grid ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .sinais-grid li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.4;
            font-size: 0.9rem;
        }
        
        .sinais-desidratacao p {
            color: var(--text-secondary);
            margin: 0;
            font-style: italic;
        }
        
        @media (max-width: 768px) {
            .resultado-agua-corporal-grid {
                grid-template-columns: 1fr;
            }
            
            .sinais-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

