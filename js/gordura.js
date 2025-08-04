// Calculadora de Gordura Corporal
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('gordura-form');
    const sexoSelect = document.getElementById('sexo');
    const quadrilGroup = document.getElementById('quadril-group');
    const resultadoDiv = document.getElementById('resultado-gordura');
    const valorGordura = document.getElementById('valor-gordura');
    const valorMagra = document.getElementById('valor-magra');
    const interpretacaoGordura = document.getElementById('interpretacao-gordura');
    
    // Mostrar/ocultar campo quadril baseado no sexo
    sexoSelect.addEventListener('change', function() {
        if (this.value === 'feminino') {
            quadrilGroup.style.display = 'block';
            document.getElementById('quadril').required = true;
        } else {
            quadrilGroup.style.display = 'none';
            document.getElementById('quadril').required = false;
            document.getElementById('quadril').value = '';
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularGordura();
    });
    
    function calcularGordura() {
        const sexo = document.getElementById('sexo').value;
        const idade = parseInt(document.getElementById('idade').value);
        const peso = parseFloat(document.getElementById('peso').value);
        const altura = parseFloat(document.getElementById('altura').value);
        const cintura = parseFloat(document.getElementById('cintura').value);
        const pescoco = parseFloat(document.getElementById('pescoco').value);
        const quadril = sexo === 'feminino' ? parseFloat(document.getElementById('quadril').value) : 0;
        
        // Validações
        if (!sexo || !idade || !peso || !altura || !cintura || !pescoco) {
            mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'erro');
            return;
        }
        
        if (sexo === 'feminino' && !quadril) {
            mostrarNotificacao('Para mulheres, a medida do quadril é obrigatória.', 'erro');
            return;
        }
        
        if (idade < 18 || idade > 80) {
            mostrarNotificacao('Esta calculadora é válida para idades entre 18 e 80 anos.', 'erro');
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
        
        // Calcular percentual de gordura usando fórmula da Marinha Americana
        let percentualGordura;
        
        if (sexo === 'masculino') {
            // Fórmula para homens
            percentualGordura = 495 / (1.0324 - 0.19077 * Math.log10(cintura - pescoco) + 0.15456 * Math.log10(altura)) - 450;
        } else {
            // Fórmula para mulheres
            percentualGordura = 495 / (1.29579 - 0.35004 * Math.log10(cintura + quadril - pescoco) + 0.22100 * Math.log10(altura)) - 450;
        }
        
        // Garantir que o resultado esteja dentro de limites razoáveis
        percentualGordura = Math.max(3, Math.min(50, percentualGordura));
        
        // Calcular massa magra
        const massaGorda = (peso * percentualGordura) / 100;
        const massaMagra = peso - massaGorda;
        
        // Exibir resultado
        exibirResultado(percentualGordura, massaMagra, sexo, idade, peso);
    }
    
    function exibirResultado(percentualGordura, massaMagra, sexo, idade, peso) {
        valorGordura.textContent = formatarNumero(percentualGordura, 1);
        valorMagra.textContent = formatarNumero(massaMagra, 1);
        
        const interpretacao = obterInterpretacao(percentualGordura, massaMagra, sexo, idade, peso);
        interpretacaoGordura.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-gordura', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('Gordura corporal calculada com sucesso!', 'sucesso');
    }
    
    function obterInterpretacao(percentualGordura, massaMagra, sexo, idade, peso) {
        const categoria = obterCategoria(percentualGordura, sexo);
        const massaGorda = peso - massaMagra;
        
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Análise da Composição Corporal:</strong></p>
                <p>Seu percentual de gordura corporal é de <strong>${formatarNumero(percentualGordura, 1)}%</strong>, classificado como <strong style="color: ${categoria.cor}">${categoria.nome}</strong>.</p>
                <p>Sua composição corporal: <strong>${formatarNumero(massaGorda, 1)}kg de gordura</strong> e <strong>${formatarNumero(massaMagra, 1)}kg de massa magra</strong>.</p>
            </div>
        `;
        
        // Adicionar faixas de referência
        interpretacao += obterFaixasReferencia(sexo, percentualGordura);
        
        // Adicionar dicas específicas
        interpretacao += obterDicasEspecificas(categoria, sexo, idade, percentualGordura);
        
        // Aviso sobre precisão
        interpretacao += `
            <div class="aviso-precisao">
                <p><strong>📏 Sobre a Precisão:</strong> Esta é uma estimativa baseada em circunferências corporais. Para medições mais precisas, considere métodos como DEXA, bioimpedância profissional ou pesagem hidrostática.</p>
            </div>
        `;
        
        // Aviso médico
        interpretacao += `
            <div class="aviso-medico">
                <p><strong>⚠️ Importante:</strong> O percentual de gordura corporal é apenas um indicador de saúde. Para uma avaliação completa da composição corporal e orientações personalizadas, consulte um profissional de saúde.</p>
            </div>
        `;
        
        return interpretacao;
    }
    
    function obterCategoria(percentual, sexo) {
        if (sexo === 'masculino') {
            if (percentual < 6) return { nome: 'Muito Baixo', cor: '#3498db', risco: 'baixo' };
            if (percentual <= 13) return { nome: 'Atleta', cor: '#2ecc71', risco: 'excelente' };
            if (percentual <= 17) return { nome: 'Fitness', cor: '#27ae60', risco: 'bom' };
            if (percentual <= 24) return { nome: 'Aceitável', cor: '#f39c12', risco: 'aceitavel' };
            return { nome: 'Obesidade', cor: '#e74c3c', risco: 'alto' };
        } else {
            if (percentual < 16) return { nome: 'Muito Baixo', cor: '#3498db', risco: 'baixo' };
            if (percentual <= 20) return { nome: 'Atleta', cor: '#2ecc71', risco: 'excelente' };
            if (percentual <= 24) return { nome: 'Fitness', cor: '#27ae60', risco: 'bom' };
            if (percentual <= 31) return { nome: 'Aceitável', cor: '#f39c12', risco: 'aceitavel' };
            return { nome: 'Obesidade', cor: '#e74c3c', risco: 'alto' };
        }
    }
    
    function obterFaixasReferencia(sexo, percentualAtual) {
        const faixas = sexo === 'masculino' ? 
            [
                { nome: 'Atleta', min: 6, max: 13, cor: '#2ecc71' },
                { nome: 'Fitness', min: 14, max: 17, cor: '#27ae60' },
                { nome: 'Aceitável', min: 18, max: 24, cor: '#f39c12' },
                { nome: 'Obesidade', min: 25, max: 50, cor: '#e74c3c' }
            ] : [
                { nome: 'Atleta', min: 16, max: 20, cor: '#2ecc71' },
                { nome: 'Fitness', min: 21, max: 24, cor: '#27ae60' },
                { nome: 'Aceitável', min: 25, max: 31, cor: '#f39c12' },
                { nome: 'Obesidade', min: 32, max: 50, cor: '#e74c3c' }
            ];
        
        let html = `
            <div class="faixas-referencia">
                <h4>📊 Faixas de Referência (${sexo === 'masculino' ? 'Homens' : 'Mulheres'}):</h4>
                <div class="faixas-grid">
        `;
        
        faixas.forEach(faixa => {
            const isAtual = percentualAtual >= faixa.min && percentualAtual <= faixa.max;
            html += `
                <div class="faixa-item ${isAtual ? 'atual' : ''}">
                    <div class="faixa-nome" style="color: ${faixa.cor}">${faixa.nome}</div>
                    <div class="faixa-valor">${faixa.min}-${faixa.max}%</div>
                    ${isAtual ? '<div class="faixa-atual">Você está aqui</div>' : ''}
                </div>
            `;
        });
        
        html += '</div></div>';
        return html;
    }
    
    function obterDicasEspecificas(categoria, sexo, idade, percentual) {
        let dicas = '<div class="dicas-especificas"><h4>💡 Recomendações Personalizadas:</h4><ul>';
        
        switch (categoria.risco) {
            case 'baixo':
                dicas += '<li>Seu percentual está muito baixo. Consulte um nutricionista para avaliar se é saudável.</li>';
                dicas += '<li>Gordura corporal muito baixa pode afetar hormônios e funções vitais.</li>';
                dicas += '<li>Considere aumentar ligeiramente o percentual de gordura de forma saudável.</li>';
                break;
                
            case 'excelente':
                dicas += '<li>Excelente! Você está na faixa de atletas. Mantenha seus hábitos atuais.</li>';
                dicas += '<li>Continue com exercícios regulares e alimentação equilibrada.</li>';
                dicas += '<li>Monitore regularmente para manter este nível saudável.</li>';
                break;
                
            case 'bom':
                dicas += '<li>Muito bom! Você está em ótima forma física.</li>';
                dicas += '<li>Mantenha atividade física regular e dieta balanceada.</li>';
                dicas += '<li>Considere exercícios de força para manter massa muscular.</li>';
                break;
                
            case 'aceitavel':
                dicas += '<li>Está dentro da faixa aceitável, mas há espaço para melhorias.</li>';
                dicas += '<li>Considere aumentar atividade física e melhorar a dieta.</li>';
                dicas += '<li>Exercícios aeróbicos e musculação podem ajudar a reduzir gordura.</li>';
                break;
                
            case 'alto':
                dicas += '<li>É recomendável reduzir o percentual de gordura para melhorar a saúde.</li>';
                dicas += '<li>Consulte um nutricionista e educador físico para um plano personalizado.</li>';
                dicas += '<li>Foque em déficit calórico moderado e exercícios regulares.</li>';
                dicas += '<li>Monitore outros indicadores de saúde (pressão, glicemia, colesterol).</li>';
                break;
        }
        
        // Dicas específicas por sexo
        if (sexo === 'feminino') {
            dicas += '<li>Mulheres naturalmente têm percentual de gordura maior que homens.</li>';
            if (idade > 40) {
                dicas += '<li>Após os 40, o metabolismo tende a diminuir. Exercícios de força são essenciais.</li>';
            }
        } else {
            dicas += '<li>Homens tendem a acumular gordura na região abdominal.</li>';
            if (idade > 40) {
                dicas += '<li>Após os 40, há tendência de perda de massa muscular. Priorize exercícios de força.</li>';
            }
        }
        
        // Dicas gerais
        dicas += '<li>Hidratação adequada é fundamental para um metabolismo eficiente.</li>';
        dicas += '<li>Sono de qualidade (7-9h) influencia hormônios que regulam gordura corporal.</li>';
        dicas += '<li>Evite dietas muito restritivas que podem causar perda de massa muscular.</li>';
        
        dicas += '</ul></div>';
        
        return dicas;
    }
});

// Adicionar estilos específicos para a página de gordura corporal
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .resultado-gordura-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .faixas-referencia {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .faixas-referencia h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-md);
            text-align: center;
        }
        
        .faixas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: var(--spacing-sm);
        }
        
        .faixa-item {
            background-color: var(--bg-card);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            text-align: center;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }
        
        .faixa-item.atual {
            border-color: var(--accent-primary);
            box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
            transform: scale(1.05);
        }
        
        .faixa-nome {
            font-weight: 600;
            margin-bottom: var(--spacing-xs);
            font-size: 0.9rem;
        }
        
        .faixa-valor {
            color: var(--text-secondary);
            font-size: 0.8rem;
            margin-bottom: var(--spacing-xs);
        }
        
        .faixa-atual {
            background-color: var(--accent-primary);
            color: white;
            padding: 2px 6px;
            border-radius: 10px;
            font-size: 0.7rem;
            font-weight: 600;
        }
        
        .aviso-precisao {
            background-color: #e8f4fd;
            border: 1px solid var(--accent-primary);
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .aviso-precisao p {
            color: #1565c0;
            margin: 0;
            line-height: 1.5;
        }
        
        [data-theme="dark"] .aviso-precisao {
            background-color: #1a2332;
            border-color: var(--accent-primary);
        }
        
        [data-theme="dark"] .aviso-precisao p {
            color: #64b5f6;
        }
        
        .tabela-gordura h4 {
            color: var(--text-primary);
            margin-bottom: var(--spacing-sm);
            font-size: 1rem;
        }
        
        @media (max-width: 768px) {
            .resultado-gordura-grid {
                grid-template-columns: 1fr;
            }
            
            .faixas-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 480px) {
            .faixas-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

