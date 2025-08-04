// Calculadora de Glicemia
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('glicemia-form');
    const resultadoDiv = document.getElementById('resultado-glicemia');
    const tipoExame = document.getElementById('tipo-exame');
    const grupoValorGlicose = document.getElementById('grupo-valor-glicose');
    const grupoValorHba1c = document.getElementById('grupo-valor-hba1c');
    const valorGlicose = document.getElementById('valor-glicose');
    const valorHba1c = document.getElementById('valor-hba1c');
    const labelExame = document.getElementById('label-exame');
    const valorResultado = document.getElementById('valor-resultado');
    const unidadeResultado = document.getElementById('unidade-resultado');
    const classificacaoGlicemia = document.getElementById('classificacao-glicemia');
    const interpretacaoGlicemia = document.getElementById('interpretacao-glicemia');
    
    // Alternar campos baseado no tipo de exame
    tipoExame.addEventListener('change', function() {
        if (this.value === 'hba1c') {
            grupoValorGlicose.style.display = 'none';
            grupoValorHba1c.style.display = 'block';
            valorGlicose.required = false;
            valorHba1c.required = true;
        } else {
            grupoValorGlicose.style.display = 'block';
            grupoValorHba1c.style.display = 'none';
            valorGlicose.required = true;
            valorHba1c.required = false;
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        interpretarGlicemia();
    });
    
    function interpretarGlicemia() {
        const tipo = tipoExame.value;
        const idade = parseInt(document.getElementById('idade').value);
        const historico = document.getElementById('historico').value;
        const sintomas = document.getElementById('sintomas').value;
        
        let valor, unidade;
        
        if (tipo === 'hba1c') {
            valor = parseFloat(valorHba1c.value);
            unidade = '%';
        } else {
            valor = parseFloat(valorGlicose.value);
            unidade = 'mg/dL';
        }
        
        // Validações
        if (!tipo || !idade || !historico || !sintomas || !valor) {
            mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
            return;
        }
        
        if (idade < 18 || idade > 100) {
            mostrarNotificacao('Idade deve estar entre 18 e 100 anos.', 'erro');
            return;
        }
        
        if (tipo === 'hba1c') {
            if (valor < 3 || valor > 20) {
                mostrarNotificacao('Valor de HbA1c deve estar entre 3% e 20%.', 'erro');
                return;
            }
        } else {
            if (valor < 30 || valor > 600) {
                mostrarNotificacao('Valor de glicose deve estar entre 30 e 600 mg/dL.', 'erro');
                return;
            }
        }
        
        // Interpretar resultado
        const classificacao = obterClassificacao(valor, tipo);
        
        // Exibir resultado
        exibirResultado(valor, unidade, tipo, classificacao, idade, historico, sintomas);
    }
    
    function obterClassificacao(valor, tipo) {
        let classificacao = {};
        
        switch (tipo) {
            case 'jejum':
                if (valor < 100) {
                    classificacao = { nome: 'Normal', cor: '#2ecc71', nivel: 'normal' };
                } else if (valor < 126) {
                    classificacao = { nome: 'Pré-diabetes', cor: '#f39c12', nivel: 'pre-diabetes' };
                } else {
                    classificacao = { nome: 'Diabetes', cor: '#e74c3c', nivel: 'diabetes' };
                }
                break;
                
            case 'casual':
                if (valor < 140) {
                    classificacao = { nome: 'Provável Normal', cor: '#2ecc71', nivel: 'normal' };
                } else if (valor < 200) {
                    classificacao = { nome: 'Investigar', cor: '#f39c12', nivel: 'investigar' };
                } else {
                    classificacao = { nome: 'Sugestivo de Diabetes', cor: '#e74c3c', nivel: 'diabetes' };
                }
                break;
                
            case 'pos-prandial':
            case 'totg':
                if (valor < 140) {
                    classificacao = { nome: 'Normal', cor: '#2ecc71', nivel: 'normal' };
                } else if (valor < 200) {
                    classificacao = { nome: 'Pré-diabetes', cor: '#f39c12', nivel: 'pre-diabetes' };
                } else {
                    classificacao = { nome: 'Diabetes', cor: '#e74c3c', nivel: 'diabetes' };
                }
                break;
                
            case 'hba1c':
                if (valor < 5.7) {
                    classificacao = { nome: 'Normal', cor: '#2ecc71', nivel: 'normal' };
                } else if (valor < 6.5) {
                    classificacao = { nome: 'Pré-diabetes', cor: '#f39c12', nivel: 'pre-diabetes' };
                } else {
                    classificacao = { nome: 'Diabetes', cor: '#e74c3c', nivel: 'diabetes' };
                }
                break;
        }
        
        return classificacao;
    }
    
    function exibirResultado(valor, unidade, tipo, classificacao, idade, historico, sintomas) {
        // Definir label do exame
        const tiposExame = {
            'jejum': 'Glicemia de Jejum',
            'casual': 'Glicemia Casual',
            'pos-prandial': 'Glicemia Pós-Prandial',
            'totg': 'TOTG (2h)',
            'hba1c': 'Hemoglobina Glicada'
        };
        
        labelExame.textContent = tiposExame[tipo];
        valorResultado.textContent = formatarNumero(valor, unidade === '%' ? 1 : 0);
        unidadeResultado.textContent = unidade;
        
        classificacaoGlicemia.innerHTML = `
            <div class="classificacao-resultado" style="background-color: ${classificacao.cor}; color: white;">
                <strong>${classificacao.nome}</strong>
            </div>
        `;
        
        const interpretacao = obterInterpretacao(valor, unidade, tipo, classificacao, idade, historico, sintomas);
        interpretacaoGlicemia.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-glicemia', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('Glicemia interpretada com sucesso!', 'sucesso');
    }
    
    function obterInterpretacao(valor, unidade, tipo, classificacao, idade, historico, sintomas) {
        const tipoTexto = {
            'jejum': 'jejum',
            'casual': 'casual',
            'pos-prandial': 'pós-prandial',
            'totg': 'TOTG',
            'hba1c': 'hemoglobina glicada'
        };
        
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Interpretação do Seu Exame:</strong></p>
                <p>Seu exame de ${tipoTexto[tipo]} apresentou valor de <strong>${formatarNumero(valor, unidade === '%' ? 1 : 0)} ${unidade}</strong>, classificado como <strong>${classificacao.nome}</strong>.</p>
            </div>
        `;
        
        // Análise específica por classificação
        interpretacao += analisarClassificacao(classificacao, tipo, valor, unidade);
        
        // Análise de fatores de risco
        interpretacao += analisarFatoresRisco(idade, historico, sintomas, classificacao);
        
        // Recomendações específicas
        interpretacao += obterRecomendacoes(classificacao.nivel, tipo, sintomas);
        
        // Próximos passos
        interpretacao += obterProximosPassos(classificacao.nivel, tipo);
        
        // Aviso médico
        interpretacao += `
            <div class="aviso-medico">
                <p><strong>⚠️ Importante:</strong> Esta interpretação é apenas informativa. Valores alterados devem ser confirmados com novos exames e sempre avaliados por um médico endocrinologista. Não interrompa medicamentos sem orientação médica.</p>
            </div>
        `;
        
        return interpretacao;
    }
    
    function analisarClassificacao(classificacao, tipo, valor, unidade) {
        let analise = '';
        
        switch (classificacao.nivel) {
            case 'normal':
                analise = `
                    <div class="analise-classificacao normal">
                        <h4>✅ Resultado Normal</h4>
                        <p>Parabéns! Seu resultado está dentro da faixa normal, indicando bom controle glicêmico.</p>
                        <p>Continue mantendo hábitos saudáveis para preservar este resultado.</p>
                    </div>
                `;
                break;
                
            case 'pre-diabetes':
                analise = `
                    <div class="analise-classificacao pre-diabetes">
                        <h4>⚠️ Pré-diabetes Detectado</h4>
                        <p>Seu resultado indica pré-diabetes, uma condição onde a glicose está elevada mas ainda não caracteriza diabetes.</p>
                        <p><strong>Boa notícia:</strong> O pré-diabetes é reversível com mudanças no estilo de vida!</p>
                        <ul>
                            <li>Risco de desenvolver diabetes tipo 2 nos próximos 10 anos</li>
                            <li>Possibilidade de reversão com intervenções adequadas</li>
                            <li>Necessidade de acompanhamento médico regular</li>
                        </ul>
                    </div>
                `;
                break;
                
            case 'diabetes':
                analise = `
                    <div class="analise-classificacao diabetes">
                        <h4>🔴 Diabetes Detectado</h4>
                        <p>Seu resultado sugere diabetes mellitus. É fundamental buscar acompanhamento médico imediatamente.</p>
                        <p><strong>Importante:</strong> O diabetes é uma condição séria mas controlável com tratamento adequado.</p>
                        <ul>
                            <li>Necessidade de confirmação com novos exames</li>
                            <li>Avaliação médica urgente para início do tratamento</li>
                            <li>Possíveis complicações se não tratado adequadamente</li>
                            <li>Vida normal possível com controle adequado</li>
                        </ul>
                    </div>
                `;
                break;
                
            case 'investigar':
                analise = `
                    <div class="analise-classificacao investigar">
                        <h4>🔍 Necessita Investigação</h4>
                        <p>O resultado da glicemia casual está elevado e requer investigação adicional.</p>
                        <p>Recomenda-se realizar exames complementares para diagnóstico preciso:</p>
                        <ul>
                            <li>Glicemia de jejum</li>
                            <li>Teste oral de tolerância à glicose (TOTG)</li>
                            <li>Hemoglobina glicada (HbA1c)</li>
                        </ul>
                    </div>
                `;
                break;
        }
        
        return analise;
    }
    
    function analisarFatoresRisco(idade, historico, sintomas, classificacao) {
        let fatoresRisco = [];
        let pontuacaoRisco = 0;
        
        // Análise da idade
        if (idade >= 45) {
            fatoresRisco.push('Idade acima de 45 anos');
            pontuacaoRisco += 1;
        }
        
        // Análise do histórico
        switch (historico) {
            case 'historico-familiar':
                fatoresRisco.push('Histórico familiar de diabetes');
                pontuacaoRisco += 2;
                break;
            case 'pre-diabetes':
                fatoresRisco.push('Histórico pessoal de pré-diabetes');
                pontuacaoRisco += 3;
                break;
            case 'diabetes-gestacional':
                fatoresRisco.push('Histórico de diabetes gestacional');
                pontuacaoRisco += 2;
                break;
        }
        
        // Análise dos sintomas
        switch (sintomas) {
            case 'sede-excessiva':
                fatoresRisco.push('Sede excessiva (polidipsia)');
                pontuacaoRisco += 2;
                break;
            case 'urinacao-frequente':
                fatoresRisco.push('Urinação frequente (poliúria)');
                pontuacaoRisco += 2;
                break;
            case 'fadiga':
                fatoresRisco.push('Fadiga e cansaço');
                pontuacaoRisco += 1;
                break;
            case 'multiplos-sintomas':
                fatoresRisco.push('Múltiplos sintomas de diabetes');
                pontuacaoRisco += 3;
                break;
        }
        
        let nivelRisco = '';
        if (pontuacaoRisco === 0) {
            nivelRisco = 'Baixo';
        } else if (pontuacaoRisco <= 2) {
            nivelRisco = 'Moderado';
        } else if (pontuacaoRisco <= 4) {
            nivelRisco = 'Alto';
        } else {
            nivelRisco = 'Muito Alto';
        }
        
        return `
            <div class="analise-fatores-risco">
                <h4>📊 Análise de Fatores de Risco:</h4>
                <p><strong>Nível de risco:</strong> ${nivelRisco}</p>
                ${fatoresRisco.length > 0 ? `
                    <p><strong>Fatores identificados:</strong></p>
                    <ul>
                        ${fatoresRisco.map(fator => `<li>${fator}</li>`).join('')}
                    </ul>
                ` : '<p>Nenhum fator de risco adicional identificado.</p>'}
            </div>
        `;
    }
    
    function obterRecomendacoes(nivel, tipo, sintomas) {
        let recomendacoes = '<div class="recomendacoes"><h4>💡 Recomendações:</h4><ul>';
        
        switch (nivel) {
            case 'normal':
                recomendacoes += '<li>Mantenha uma alimentação equilibrada e rica em fibras.</li>';
                recomendacoes += '<li>Pratique exercícios físicos regularmente (150 min/semana).</li>';
                recomendacoes += '<li>Mantenha peso adequado.</li>';
                recomendacoes += '<li>Realize exames de rotina anualmente.</li>';
                break;
                
            case 'pre-diabetes':
                recomendacoes += '<li><strong>Urgente:</strong> Mudanças no estilo de vida podem reverter o quadro.</li>';
                recomendacoes += '<li>Perca 5-10% do peso corporal se estiver acima do peso.</li>';
                recomendacoes += '<li>Reduza carboidratos refinados e açúcares.</li>';
                recomendacoes += '<li>Aumente atividade física para 150-300 min/semana.</li>';
                recomendacoes += '<li>Monitore glicemia regularmente.</li>';
                break;
                
            case 'diabetes':
                recomendacoes += '<li><strong>Urgente:</strong> Procure um endocrinologista imediatamente.</li>';
                recomendacoes += '<li>Inicie monitoramento glicêmico regular.</li>';
                recomendacoes += '<li>Siga rigorosamente orientações médicas.</li>';
                recomendacoes += '<li>Aprenda sobre contagem de carboidratos.</li>';
                recomendacoes += '<li>Monitore pressão arterial e colesterol.</li>';
                break;
                
            case 'investigar':
                recomendacoes += '<li>Realize exames complementares para diagnóstico.</li>';
                recomendacoes += '<li>Evite jejum prolongado antes dos próximos exames.</li>';
                recomendacoes += '<li>Informe ao médico sobre medicamentos em uso.</li>';
                break;
        }
        
        // Recomendações específicas para sintomas
        if (sintomas !== 'sem-sintomas') {
            recomendacoes += '<li>Relate todos os sintomas ao médico durante a consulta.</li>';
            recomendacoes += '<li>Monitore e anote frequência e intensidade dos sintomas.</li>';
        }
        
        recomendacoes += '</ul></div>';
        return recomendacoes;
    }
    
    function obterProximosPassos(nivel, tipo) {
        let passos = '<div class="proximos-passos"><h4>🎯 Próximos Passos:</h4><ul>';
        
        switch (nivel) {
            case 'normal':
                passos += '<li>Mantenha acompanhamento médico anual.</li>';
                passos += '<li>Repita exames conforme orientação médica.</li>';
                if (tipo !== 'hba1c') {
                    passos += '<li>Considere fazer HbA1c para avaliação mais completa.</li>';
                }
                break;
                
            case 'pre-diabetes':
                passos += '<li>Agende consulta com endocrinologista em até 30 dias.</li>';
                passos += '<li>Procure nutricionista para orientação alimentar.</li>';
                passos += '<li>Repita exames em 3-6 meses para acompanhar evolução.</li>';
                passos += '<li>Considere programa de prevenção de diabetes.</li>';
                break;
                
            case 'diabetes':
                passos += '<li><strong>Urgente:</strong> Agende consulta médica em até 7 dias.</li>';
                passos += '<li>Confirme diagnóstico com novos exames.</li>';
                passos += '<li>Inicie educação em diabetes.</li>';
                passos += '<li>Avalie necessidade de medicação.</li>';
                passos += '<li>Faça exames complementares (função renal, olhos, pés).</li>';
                break;
                
            case 'investigar':
                passos += '<li>Agende consulta médica em até 15 dias.</li>';
                passos += '<li>Realize glicemia de jejum e HbA1c.</li>';
                passos += '<li>Considere TOTG se indicado pelo médico.</li>';
                break;
        }
        
        passos += '</ul></div>';
        return passos;
    }
});

// Adicionar estilos específicos para a página de glicemia
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .resultado-glicemia-principal {
            margin-bottom: var(--spacing-md);
        }
        
        .valor-exame {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            text-align: center;
            margin-bottom: var(--spacing-md);
        }
        
        .valor-label {
            font-size: 1rem;
            margin-bottom: var(--spacing-xs);
            opacity: 0.9;
        }
        
        .valor-resultado {
            font-size: 2.5rem;
            font-weight: 700;
        }
        
        .valor-unidade {
            font-size: 1rem;
            opacity: 0.9;
        }
        
        .classificacao-glicemia {
            margin-bottom: var(--spacing-md);
        }
        
        .classificacao-resultado {
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .valores-referencia {
            margin-top: var(--spacing-sm);
        }
        
        .valores-referencia h4 {
            color: var(--text-primary);
            margin: var(--spacing-md) 0 var(--spacing-xs) 0;
            font-size: 1rem;
        }
        
        .valores-referencia h4:first-child {
            margin-top: 0;
        }
        
        .ref-item {
            padding: var(--spacing-xs) var(--spacing-sm);
            margin-bottom: var(--spacing-xs);
            border-radius: var(--border-radius);
            font-weight: 600;
        }
        
        .ref-item.normal {
            background-color: rgba(46, 204, 113, 0.1);
            color: #27ae60;
        }
        
        .ref-item.pre-diabetes {
            background-color: rgba(243, 156, 18, 0.1);
            color: #e67e22;
        }
        
        .ref-item.diabetes {
            background-color: rgba(231, 76, 60, 0.1);
            color: #c0392b;
        }
        
        .analise-classificacao {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .analise-classificacao h4 {
            margin-bottom: var(--spacing-sm);
        }
        
        .analise-classificacao.normal h4 { color: #2ecc71; }
        .analise-classificacao.pre-diabetes h4 { color: #f39c12; }
        .analise-classificacao.diabetes h4 { color: #e74c3c; }
        .analise-classificacao.investigar h4 { color: #3498db; }
        
        .analise-classificacao ul {
            margin: var(--spacing-sm) 0;
            padding-left: var(--spacing-md);
        }
        
        .analise-classificacao li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .analise-fatores-risco {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .analise-fatores-risco h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .analise-fatores-risco ul {
            margin: var(--spacing-sm) 0;
            padding-left: var(--spacing-md);
        }
        
        .analise-fatores-risco li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .recomendacoes {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .recomendacoes h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .recomendacoes ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .recomendacoes li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .recomendacoes strong {
            color: var(--text-primary);
        }
        
        .proximos-passos {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .proximos-passos h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .proximos-passos ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .proximos-passos li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .proximos-passos strong {
            color: var(--text-primary);
        }
    `;
    document.head.appendChild(style);
});

