// Calculadora de IMC Infantil
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('imc-infantil-form');
    const resultadoDiv = document.getElementById('resultado-imc-infantil');
    const valorImcInfantil = document.getElementById('valor-imc-infantil');
    const valorPercentil = document.getElementById('valor-percentil');
    const classificacaoInfantil = document.getElementById('classificacao-infantil');
    const interpretacaoImcInfantil = document.getElementById('interpretacao-imc-infantil');
    
    // Dados simplificados de percentis por idade (baseados em curvas OMS/CDC)
    // Em uma implementação real, seria necessário uma tabela mais completa
    const percentisMasculino = {
        2: { p5: 14.7, p15: 15.3, p50: 16.2, p85: 17.3, p95: 18.2, p97: 18.6 },
        3: { p5: 14.3, p15: 14.8, p50: 15.7, p85: 16.9, p95: 17.9, p97: 18.3 },
        4: { p5: 14.0, p15: 14.5, p50: 15.3, p85: 16.6, p95: 17.8, p97: 18.3 },
        5: { p5: 13.8, p15: 14.2, p50: 15.0, p85: 16.5, p95: 17.9, p97: 18.5 },
        6: { p5: 13.7, p15: 14.1, p50: 14.9, p85: 16.6, p95: 18.2, p97: 18.9 },
        7: { p5: 13.7, p15: 14.2, p50: 15.0, p85: 16.8, p95: 18.7, p97: 19.5 },
        8: { p5: 13.8, p15: 14.3, p50: 15.2, p85: 17.2, p95: 19.4, p97: 20.3 },
        9: { p5: 14.0, p15: 14.5, p50: 15.5, p85: 17.7, p95: 20.2, p97: 21.2 },
        10: { p5: 14.2, p15: 14.8, p50: 15.9, p85: 18.3, p95: 21.1, p97: 22.2 },
        11: { p5: 14.5, p15: 15.1, p50: 16.4, p85: 19.0, p95: 22.1, p97: 23.3 },
        12: { p5: 14.8, p15: 15.5, p50: 17.0, p85: 19.8, p95: 23.1, p97: 24.4 },
        13: { p5: 15.2, p15: 16.0, p50: 17.6, p85: 20.6, p95: 24.1, p97: 25.5 },
        14: { p5: 15.6, p15: 16.5, p50: 18.3, p85: 21.4, p95: 25.0, p97: 26.5 },
        15: { p5: 16.0, p15: 17.0, p50: 19.0, p85: 22.2, p95: 25.9, p97: 27.4 },
        16: { p5: 16.4, p15: 17.5, p50: 19.6, p85: 22.9, p95: 26.6, p97: 28.2 },
        17: { p5: 16.8, p15: 17.9, p50: 20.2, p85: 23.5, p95: 27.2, p97: 28.8 },
        18: { p5: 17.0, p15: 18.2, p50: 20.7, p85: 24.0, p95: 27.6, p97: 29.2 },
        19: { p5: 17.2, p15: 18.4, p50: 21.1, p85: 24.4, p95: 28.0, p97: 29.6 }
    };
    
    const percentisFeminino = {
        2: { p5: 14.4, p15: 15.0, p50: 16.0, p85: 17.1, p95: 18.0, p97: 18.4 },
        3: { p5: 14.1, p15: 14.6, p50: 15.5, p85: 16.7, p95: 17.7, p97: 18.1 },
        4: { p5: 13.8, p15: 14.3, p50: 15.1, p85: 16.4, p95: 17.6, p97: 18.0 },
        5: { p5: 13.6, p15: 14.1, p50: 14.9, p85: 16.3, p95: 17.7, p97: 18.2 },
        6: { p5: 13.5, p15: 14.0, p50: 14.8, p85: 16.4, p95: 18.0, p97: 18.6 },
        7: { p5: 13.5, p15: 14.0, p50: 14.9, p85: 16.6, p95: 18.4, p97: 19.1 },
        8: { p5: 13.6, p15: 14.1, p50: 15.1, p85: 17.0, p95: 19.0, p97: 19.8 },
        9: { p5: 13.7, p15: 14.3, p50: 15.4, p85: 17.5, p95: 19.7, p97: 20.6 },
        10: { p5: 13.9, p15: 14.6, p50: 15.8, p85: 18.1, p95: 20.4, p97: 21.4 },
        11: { p5: 14.2, p15: 15.0, p50: 16.3, p85: 18.8, p95: 21.2, p97: 22.3 },
        12: { p5: 14.6, p15: 15.4, p50: 16.9, p85: 19.6, p95: 22.1, p97: 23.2 },
        13: { p5: 15.0, p15: 15.9, p50: 17.5, p85: 20.3, p95: 22.8, p97: 24.0 },
        14: { p5: 15.4, p15: 16.4, p50: 18.1, p85: 21.0, p95: 23.5, p97: 24.7 },
        15: { p5: 15.8, p15: 16.8, p50: 18.6, p85: 21.6, p95: 24.0, p97: 25.2 },
        16: { p5: 16.1, p15: 17.1, p50: 19.0, p85: 22.1, p95: 24.4, p97: 25.6 },
        17: { p5: 16.3, p15: 17.4, p50: 19.4, p85: 22.5, p95: 24.7, p97: 25.9 },
        18: { p5: 16.5, p15: 17.6, p50: 19.6, p85: 22.8, p95: 25.0, p97: 26.1 },
        19: { p5: 16.6, p15: 17.7, p50: 19.8, p85: 23.0, p95: 25.1, p97: 26.2 }
    };
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularImcInfantil();
    });
    
    function calcularImcInfantil() {
        const sexo = document.getElementById('sexo').value;
        const idadeAnos = parseInt(document.getElementById('idade-anos').value);
        const idadeMeses = parseInt(document.getElementById('idade-meses').value);
        const peso = parseFloat(document.getElementById('peso').value);
        const alturaCm = parseFloat(document.getElementById('altura').value);
        
        // Validações
        if (!sexo || !idadeAnos || !peso || !alturaCm) {
            mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'erro');
            return;
        }
        
        if (idadeAnos < 2 || idadeAnos > 19) {
            mostrarNotificacao('Esta calculadora é válida para idades entre 2 e 19 anos.', 'erro');
            return;
        }
        
        if (peso < 5 || peso > 150) {
            mostrarNotificacao('Peso deve estar entre 5 e 150 kg.', 'erro');
            return;
        }
        
        if (alturaCm < 60 || alturaCm > 200) {
            mostrarNotificacao('Altura deve estar entre 60 e 200 cm.', 'erro');
            return;
        }
        
        // Calcular IMC
        const alturaM = alturaCm / 100;
        const imc = peso / (alturaM * alturaM);
        
        // Calcular idade total em meses para interpolação mais precisa
        const idadeTotalMeses = (idadeAnos * 12) + idadeMeses;
        
        // Obter percentil
        const percentil = calcularPercentil(imc, idadeAnos, sexo);
        
        // Exibir resultado
        exibirResultado(imc, percentil, sexo, idadeAnos, idadeMeses);
    }
    
    function calcularPercentil(imc, idade, sexo) {
        const tabela = sexo === 'masculino' ? percentisMasculino : percentisFeminino;
        const dadosIdade = tabela[idade];
        
        if (!dadosIdade) {
            return 50; // Valor padrão se não houver dados
        }
        
        // Determinar percentil baseado nos valores de referência
        if (imc < dadosIdade.p5) {
            return Math.max(1, Math.round((imc / dadosIdade.p5) * 5));
        } else if (imc < dadosIdade.p15) {
            return Math.round(5 + ((imc - dadosIdade.p5) / (dadosIdade.p15 - dadosIdade.p5)) * 10);
        } else if (imc < dadosIdade.p50) {
            return Math.round(15 + ((imc - dadosIdade.p15) / (dadosIdade.p50 - dadosIdade.p15)) * 35);
        } else if (imc < dadosIdade.p85) {
            return Math.round(50 + ((imc - dadosIdade.p50) / (dadosIdade.p85 - dadosIdade.p50)) * 35);
        } else if (imc < dadosIdade.p95) {
            return Math.round(85 + ((imc - dadosIdade.p85) / (dadosIdade.p95 - dadosIdade.p85)) * 10);
        } else if (imc < dadosIdade.p97) {
            return Math.round(95 + ((imc - dadosIdade.p95) / (dadosIdade.p97 - dadosIdade.p95)) * 2);
        } else {
            return Math.min(99, Math.round(97 + ((imc - dadosIdade.p97) / dadosIdade.p97) * 2));
        }
    }
    
    function exibirResultado(imc, percentil, sexo, idadeAnos, idadeMeses) {
        valorImcInfantil.textContent = formatarNumero(imc, 1);
        valorPercentil.textContent = percentil;
        
        const classificacao = obterClassificacao(percentil);
        classificacaoInfantil.innerHTML = `
            <div class="classificacao-resultado" style="background-color: ${classificacao.cor}; color: white;">
                <strong>${classificacao.nome}</strong>
            </div>
        `;
        
        const interpretacao = obterInterpretacao(imc, percentil, classificacao, sexo, idadeAnos, idadeMeses);
        interpretacaoImcInfantil.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-imc-infantil', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('IMC infantil calculado com sucesso!', 'sucesso');
    }
    
    function obterClassificacao(percentil) {
        if (percentil < 5) {
            return { nome: 'Baixo Peso', cor: '#3498db', risco: 'baixo' };
        } else if (percentil < 85) {
            return { nome: 'Peso Normal', cor: '#2ecc71', risco: 'normal' };
        } else if (percentil < 97) {
            return { nome: 'Sobrepeso', cor: '#f39c12', risco: 'moderado' };
        } else {
            return { nome: 'Obesidade', cor: '#e74c3c', risco: 'alto' };
        }
    }
    
    function obterInterpretacao(imc, percentil, classificacao, sexo, idadeAnos, idadeMeses) {
        const idadeTexto = idadeMeses > 0 ? `${idadeAnos} anos e ${idadeMeses} meses` : `${idadeAnos} anos`;
        
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Análise do IMC Infantil:</strong></p>
                <p>Para uma criança do sexo ${sexo} com ${idadeTexto}, o IMC de <strong>${formatarNumero(imc, 1)}</strong> corresponde ao <strong>percentil ${percentil}</strong>.</p>
                <p>Isso significa que esta criança tem IMC ${percentil < 50 ? 'menor' : 'maior'} que ${percentil}% das crianças da mesma idade e sexo.</p>
            </div>
        `;
        
        // Explicação do percentil
        interpretacao += obterExplicacaoPercentil(percentil);
        
        // Orientações específicas por classificação
        interpretacao += obterOrientacoesClassificacao(classificacao, idadeAnos);
        
        // Dicas gerais para crescimento saudável
        interpretacao += obterDicasCrescimento(idadeAnos);
        
        // Aviso médico
        interpretacao += `
            <div class="aviso-medico">
                <p><strong>⚠️ Importante:</strong> O IMC infantil deve sempre ser interpretado por um pediatra, considerando o histórico de crescimento, desenvolvimento puberal e outros fatores. Esta calculadora é apenas uma ferramenta de triagem.</p>
            </div>
        `;
        
        return interpretacao;
    }
    
    function obterExplicacaoPercentil(percentil) {
        let explicacao = '';
        
        if (percentil < 5) {
            explicacao = 'Percentil abaixo de 5 indica que a criança pode estar com baixo peso para a idade. É importante investigar possíveis causas.';
        } else if (percentil < 25) {
            explicacao = 'Percentil entre 5-25 está na faixa normal, mas no lado mais baixo. Monitore o crescimento regularmente.';
        } else if (percentil < 75) {
            explicacao = 'Percentil entre 25-75 indica peso normal e crescimento adequado para a idade.';
        } else if (percentil < 85) {
            explicacao = 'Percentil entre 75-85 está na faixa normal, mas no lado mais alto. Continue monitorando.';
        } else if (percentil < 95) {
            explicacao = 'Percentil entre 85-95 indica sobrepeso. É importante adotar medidas preventivas.';
        } else {
            explicacao = 'Percentil acima de 95 indica obesidade. Recomenda-se acompanhamento médico especializado.';
        }
        
        return `
            <div class="explicacao-percentil">
                <h4>📊 Entendendo o Percentil:</h4>
                <p>${explicacao}</p>
            </div>
        `;
    }
    
    function obterOrientacoesClassificacao(classificacao, idade) {
        let orientacoes = '<div class="orientacoes-classificacao"><h4>💡 Orientações Específicas:</h4><ul>';
        
        switch (classificacao.risco) {
            case 'baixo':
                orientacoes += '<li>Consulte um pediatra para investigar possíveis causas do baixo peso.</li>';
                orientacoes += '<li>Avalie a alimentação - pode precisar aumentar calorias de forma saudável.</li>';
                orientacoes += '<li>Verifique se há problemas de absorção ou outras condições médicas.</li>';
                orientacoes += '<li>Monitore o crescimento em altura também, não apenas peso.</li>';
                break;
                
            case 'normal':
                orientacoes += '<li>Parabéns! O peso está adequado para a idade.</li>';
                orientacoes += '<li>Mantenha uma alimentação equilibrada e variada.</li>';
                orientacoes += '<li>Continue incentivando atividades físicas regulares.</li>';
                orientacoes += '<li>Monitore o crescimento nas consultas de rotina.</li>';
                break;
                
            case 'moderado':
                orientacoes += '<li>Atenção: a criança está com sobrepeso para a idade.</li>';
                orientacoes += '<li>Revise os hábitos alimentares - reduza açúcares e processados.</li>';
                orientacoes += '<li>Aumente atividades físicas de forma gradual e divertida.</li>';
                orientacoes += '<li>Consulte um pediatra e nutricionista para orientação.</li>';
                orientacoes += '<li>Envolva toda a família nas mudanças de hábitos.</li>';
                break;
                
            case 'alto':
                orientacoes += '<li>A criança está com obesidade - acompanhamento médico é essencial.</li>';
                orientacoes += '<li>Procure um pediatra especializado em obesidade infantil.</li>';
                orientacoes += '<li>Mudanças alimentares devem ser supervisionadas por nutricionista.</li>';
                orientacoes += '<li>Atividade física deve ser introduzida gradualmente.</li>';
                orientacoes += '<li>Avalie fatores psicológicos e familiares envolvidos.</li>';
                orientacoes += '<li>Monitore complicações como diabetes e hipertensão.</li>';
                break;
        }
        
        orientacoes += '</ul></div>';
        return orientacoes;
    }
    
    function obterDicasCrescimento(idade) {
        let dicas = '<div class="dicas-crescimento"><h4>🌱 Dicas para Crescimento Saudável:</h4><ul>';
        
        // Dicas gerais
        dicas += '<li><strong>Alimentação:</strong> Ofereça variedade de frutas, vegetais, grãos integrais e proteínas.</li>';
        dicas += '<li><strong>Hidratação:</strong> Água deve ser a bebida principal, evite refrigerantes.</li>';
        dicas += '<li><strong>Sono:</strong> Garanta 9-11 horas de sono por noite para produção do hormônio do crescimento.</li>';
        
        // Dicas específicas por idade
        if (idade < 6) {
            dicas += '<li><strong>Pré-escolar:</strong> Estabeleça rotinas de refeição e evite distrações durante as refeições.</li>';
            dicas += '<li><strong>Atividade:</strong> Brincadeiras ativas e livres são mais importantes que esportes estruturados.</li>';
        } else if (idade < 12) {
            dicas += '<li><strong>Escolar:</strong> Ensine sobre escolhas alimentares saudáveis e envolva na preparação das refeições.</li>';
            dicas += '<li><strong>Esportes:</strong> Incentive participação em atividades físicas que a criança goste.</li>';
        } else {
            dicas += '<li><strong>Adolescente:</strong> Respeite a autonomia crescente, mas mantenha orientação sobre saúde.</li>';
            dicas += '<li><strong>Imagem corporal:</strong> Foque na saúde, não na aparência, para evitar transtornos alimentares.</li>';
        }
        
        dicas += '<li><strong>Exemplo familiar:</strong> Pais são o principal modelo de hábitos saudáveis.</li>';
        dicas += '<li><strong>Limite telas:</strong> Máximo 2 horas por dia de entretenimento em telas.</li>';
        
        dicas += '</ul></div>';
        return dicas;
    }
});

// Adicionar estilos específicos para a página de IMC infantil
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .resultado-imc-infantil-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }
        
        .classificacao-infantil {
            margin-bottom: var(--spacing-md);
        }
        
        .classificacao-resultado {
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .percentis-info {
            margin-top: var(--spacing-sm);
        }
        
        .percentil-item {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-xs) 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .percentil-item:last-child {
            border-bottom: none;
        }
        
        .percentil-nome {
            font-weight: 600;
        }
        
        .percentil-nome.baixo-peso { color: #3498db; }
        .percentil-nome.peso-normal { color: #2ecc71; }
        .percentil-nome.sobrepeso { color: #f39c12; }
        .percentil-nome.obesidade { color: #e74c3c; }
        
        .percentil-valor {
            color: var(--text-secondary);
            font-weight: 600;
        }
        
        .explicacao-percentil {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .explicacao-percentil h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .explicacao-percentil p {
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.6;
        }
        
        .orientacoes-classificacao {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .orientacoes-classificacao h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .orientacoes-classificacao ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .orientacoes-classificacao li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .dicas-crescimento {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .dicas-crescimento h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .dicas-crescimento ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .dicas-crescimento li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .dicas-crescimento strong {
            color: var(--text-primary);
        }
        
        @media (max-width: 768px) {
            .resultado-imc-infantil-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

