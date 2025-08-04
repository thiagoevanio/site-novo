// Calculadora de TMB
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tmb-form');
    const resultadoDiv = document.getElementById('resultado-tmb');
    const valorTMB = document.getElementById('valor-tmb');
    const valorGET = document.getElementById('valor-get');
    const interpretacaoTMB = document.getElementById('interpretacao-tmb');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularTMB();
    });
    
    function calcularTMB() {
        const sexo = document.getElementById('sexo').value;
        const idade = parseInt(document.getElementById('idade').value);
        const peso = parseFloat(document.getElementById('peso').value);
        const alturaCm = parseFloat(document.getElementById('altura').value);
        const fatorAtividade = parseFloat(document.getElementById('atividade').value);
        
        // Validações
        if (!sexo || !idade || !peso || !alturaCm || !fatorAtividade) {
            mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
            return;
        }
        
        if (idade < 10 || idade > 120) {
            mostrarNotificacao('Idade deve estar entre 10 e 120 anos.', 'erro');
            return;
        }
        
        if (peso < 1 || peso > 300) {
            mostrarNotificacao('Peso deve estar entre 1 e 300 kg.', 'erro');
            return;
        }
        
        if (alturaCm < 50 || alturaCm > 250) {
            mostrarNotificacao('Altura deve estar entre 50 e 250 cm.', 'erro');
            return;
        }
        
        // Calcular TMB usando a equação de Harris-Benedict revisada
        let tmb;
        if (sexo === 'masculino') {
            tmb = 88.362 + (13.397 * peso) + (4.799 * alturaCm) - (5.677 * idade);
        } else {
            tmb = 447.593 + (9.247 * peso) + (3.098 * alturaCm) - (4.330 * idade);
        }
        
        // Calcular GET (Gasto Energético Total)
        const get = tmb * fatorAtividade;
        
        // Exibir resultado
        exibirResultado(tmb, get, sexo, idade, peso, alturaCm, fatorAtividade);
    }
    
    function exibirResultado(tmb, get, sexo, idade, peso, altura, fatorAtividade) {
        valorTMB.textContent = Math.round(tmb);
        valorGET.textContent = Math.round(get);
        
        const interpretacao = obterInterpretacao(tmb, get, sexo, idade, peso, altura, fatorAtividade);
        interpretacaoTMB.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-tmb', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('TMB calculada com sucesso!', 'sucesso');
    }
    
    function obterInterpretacao(tmb, get, sexo, idade, peso, altura, fatorAtividade) {
        const nivelAtividade = obterNivelAtividade(fatorAtividade);
        
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Interpretação dos Resultados:</strong></p>
                <p>Sua Taxa Metabólica Basal (TMB) é de <strong>${Math.round(tmb)} calorias por dia</strong>. Esta é a quantidade mínima de energia que seu corpo precisa para manter as funções vitais em repouso absoluto.</p>
                <p>Considerando seu nível de atividade física (${nivelAtividade}), seu Gasto Energético Total (GET) é de <strong>${Math.round(get)} calorias por dia</strong>.</p>
            </div>
        `;
        
        // Adicionar dicas baseadas no objetivo
        interpretacao += `
            <div class="objetivos-caloricos">
                <h4>🎯 Orientações Calóricas por Objetivo:</h4>
                <div class="objetivo-grid">
                    <div class="objetivo-item">
                        <div class="objetivo-titulo">Perder Peso</div>
                        <div class="objetivo-valor">${Math.round(get * 0.8)} - ${Math.round(get * 0.9)} cal/dia</div>
                        <div class="objetivo-desc">Déficit de 10-20%</div>
                    </div>
                    <div class="objetivo-item">
                        <div class="objetivo-titulo">Manter Peso</div>
                        <div class="objetivo-valor">${Math.round(get)} cal/dia</div>
                        <div class="objetivo-desc">Manutenção</div>
                    </div>
                    <div class="objetivo-item">
                        <div class="objetivo-titulo">Ganhar Peso</div>
                        <div class="objetivo-valor">${Math.round(get * 1.1)} - ${Math.round(get * 1.2)} cal/dia</div>
                        <div class="objetivo-desc">Superávit de 10-20%</div>
                    </div>
                </div>
            </div>
        `;
        
        // Adicionar dicas específicas
        interpretacao += obterDicasEspecificas(tmb, sexo, idade);
        
        // Adicionar aviso médico
        interpretacao += `
            <div class="aviso-medico">
                <p><strong>⚠️ Importante:</strong> Estes valores são estimativas baseadas em fórmulas científicas. Para um plano nutricional personalizado, consulte um nutricionista qualificado.</p>
            </div>
        `;
        
        return interpretacao;
    }
    
    function obterNivelAtividade(fator) {
        switch (fator) {
            case 1.2: return 'Sedentário';
            case 1.375: return 'Levemente ativo';
            case 1.55: return 'Moderadamente ativo';
            case 1.725: return 'Muito ativo';
            case 1.9: return 'Extremamente ativo';
            default: return 'Não definido';
        }
    }
    
    function obterDicasEspecificas(tmb, sexo, idade) {
        let dicas = '<div class="dicas-especificas"><h4>💡 Dicas Personalizadas:</h4><ul>';
        
        // Dicas baseadas na idade
        if (idade < 25) {
            dicas += '<li>Seu metabolismo está no auge. Aproveite para estabelecer hábitos saudáveis.</li>';
        } else if (idade < 40) {
            dicas += '<li>Mantenha atividade física regular para preservar sua TMB.</li>';
        } else if (idade < 60) {
            dicas += '<li>Exercícios de força são essenciais para manter massa muscular e TMB.</li>';
        } else {
            dicas += '<li>Foque em exercícios de resistência e proteína adequada para preservar massa muscular.</li>';
        }
        
        // Dicas baseadas no sexo
        if (sexo === 'feminino') {
            dicas += '<li>Mulheres podem ter variações na TMB durante o ciclo menstrual.</li>';
            dicas += '<li>Após a menopausa, a TMB tende a diminuir. Exercícios são ainda mais importantes.</li>';
        } else {
            dicas += '<li>Homens geralmente têm TMB mais alta devido à maior massa muscular.</li>';
        }
        
        // Dicas gerais
        dicas += '<li>Proteínas têm maior efeito termogênico - incluir em todas as refeições.</li>';
        dicas += '<li>Hidratação adequada é essencial para um metabolismo eficiente.</li>';
        dicas += '<li>Sono de qualidade (7-9h) é fundamental para manter a TMB.</li>';
        dicas += '<li>Evite dietas muito restritivas que podem diminuir a TMB.</li>';
        
        dicas += '</ul></div>';
        
        return dicas;
    }
});

// Adicionar estilos específicos para a página de TMB
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .resultado-tmb-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .resultado-item {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            text-align: center;
        }
        
        .resultado-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
        }
        
        .resultado-valor {
            font-size: 2rem;
            font-weight: 700;
            color: var(--accent-primary);
            margin-bottom: var(--spacing-xs);
        }
        
        .resultado-unidade {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .interpretacao-principal {
            margin-bottom: var(--spacing-md);
        }
        
        .interpretacao-principal p {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: var(--spacing-sm);
        }
        
        .objetivos-caloricos {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .objetivos-caloricos h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-md);
            text-align: center;
        }
        
        .objetivo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--spacing-sm);
        }
        
        .objetivo-item {
            background-color: var(--bg-card);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            text-align: center;
            border: 1px solid var(--border-color);
        }
        
        .objetivo-titulo {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: var(--spacing-xs);
            font-size: 0.9rem;
        }
        
        .objetivo-valor {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--accent-primary);
            margin-bottom: var(--spacing-xs);
        }
        
        .objetivo-desc {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .dicas-especificas {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .dicas-especificas h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .dicas-especificas ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .dicas-especificas li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        @media (max-width: 768px) {
            .resultado-tmb-grid {
                grid-template-columns: 1fr;
            }
            
            .objetivo-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

