// Calculadora de IMC
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('imc-form');
    const resultadoDiv = document.getElementById('resultado-imc');
    const valorIMC = document.getElementById('valor-imc');
    const categoriaIMC = document.getElementById('categoria-imc');
    const interpretacaoIMC = document.getElementById('interpretacao-imc');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularIMC();
    });
    
    function calcularIMC() {
        const peso = parseFloat(document.getElementById('peso').value);
        const alturaCm = parseFloat(document.getElementById('altura').value);
        
        // Validações
        if (!peso || !alturaCm || peso <= 0 || alturaCm <= 0) {
            mostrarNotificacao('Por favor, insira valores válidos para peso e altura.', 'erro');
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
        
        // Converter altura para metros
        const alturaM = alturaCm / 100;
        
        // Calcular IMC
        const imc = peso / (alturaM * alturaM);
        
        // Exibir resultado
        exibirResultado(imc);
    }
    
    function exibirResultado(imc) {
        const categoria = obterCategoria(imc);
        const interpretacao = obterInterpretacao(imc, categoria);
        
        valorIMC.textContent = formatarNumero(imc, 1);
        categoriaIMC.innerHTML = `<strong>Classificação:</strong> ${categoria.nome}`;
        categoriaIMC.style.color = categoria.cor;
        interpretacaoIMC.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement('resultado-imc', true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        mostrarNotificacao('IMC calculado com sucesso!', 'sucesso');
    }
    
    function obterCategoria(imc) {
        if (imc < 18.5) {
            return {
                nome: 'Abaixo do peso',
                cor: '#3498db',
                risco: 'baixo'
            };
        } else if (imc < 25) {
            return {
                nome: 'Peso normal',
                cor: '#2ecc71',
                risco: 'normal'
            };
        } else if (imc < 30) {
            return {
                nome: 'Sobrepeso',
                cor: '#f39c12',
                risco: 'aumentado'
            };
        } else if (imc < 35) {
            return {
                nome: 'Obesidade Grau I',
                cor: '#e67e22',
                risco: 'moderado'
            };
        } else if (imc < 40) {
            return {
                nome: 'Obesidade Grau II',
                cor: '#e74c3c',
                risco: 'alto'
            };
        } else {
            return {
                nome: 'Obesidade Grau III',
                cor: '#c0392b',
                risco: 'muito alto'
            };
        }
    }
    
    function obterInterpretacao(imc, categoria) {
        let interpretacao = '';
        
        switch (categoria.risco) {
            case 'baixo':
                interpretacao = `
                    <p><strong>Interpretação:</strong> Seu IMC indica que você está abaixo do peso considerado saudável.</p>
                    <div class="dicas">
                        <h4>💡 Dicas importantes:</h4>
                        <ul>
                            <li>Consulte um nutricionista para avaliar sua alimentação</li>
                            <li>Verifique se há causas médicas para o baixo peso</li>
                            <li>Considere exercícios de fortalecimento muscular</li>
                            <li>Mantenha uma alimentação equilibrada e nutritiva</li>
                        </ul>
                    </div>
                `;
                break;
                
            case 'normal':
                interpretacao = `
                    <p><strong>Interpretação:</strong> Parabéns! Seu IMC está dentro da faixa considerada saudável.</p>
                    <div class="dicas">
                        <h4>💡 Para manter o peso ideal:</h4>
                        <ul>
                            <li>Continue com uma alimentação equilibrada</li>
                            <li>Pratique atividades físicas regularmente</li>
                            <li>Mantenha-se hidratado</li>
                            <li>Faça check-ups médicos regulares</li>
                        </ul>
                    </div>
                `;
                break;
                
            case 'aumentado':
                interpretacao = `
                    <p><strong>Interpretação:</strong> Seu IMC indica sobrepeso. É importante tomar medidas para retornar ao peso saudável.</p>
                    <div class="dicas">
                        <h4>💡 Recomendações:</h4>
                        <ul>
                            <li>Consulte um nutricionista para um plano alimentar</li>
                            <li>Inicie atividades físicas gradualmente</li>
                            <li>Reduza o consumo de alimentos processados</li>
                            <li>Aumente o consumo de frutas e vegetais</li>
                            <li>Controle o tamanho das porções</li>
                        </ul>
                    </div>
                `;
                break;
                
            case 'moderado':
                interpretacao = `
                    <p><strong>Interpretação:</strong> Seu IMC indica obesidade grau I. É importante buscar orientação profissional.</p>
                    <div class="dicas">
                        <h4>💡 Ações recomendadas:</h4>
                        <ul>
                            <li>Consulte um médico e nutricionista urgentemente</li>
                            <li>Considere acompanhamento psicológico</li>
                            <li>Inicie mudanças graduais na alimentação</li>
                            <li>Pratique exercícios de baixo impacto</li>
                            <li>Monitore outros indicadores de saúde</li>
                        </ul>
                    </div>
                `;
                break;
                
            case 'alto':
                interpretacao = `
                    <p><strong>Interpretação:</strong> Seu IMC indica obesidade grau II. É fundamental buscar acompanhamento médico.</p>
                    <div class="dicas">
                        <h4>💡 Cuidados necessários:</h4>
                        <ul>
                            <li>Procure acompanhamento médico especializado</li>
                            <li>Considere tratamento multidisciplinar</li>
                            <li>Monitore pressão arterial e glicemia</li>
                            <li>Exercícios supervisionados por profissional</li>
                            <li>Avalie riscos cardiovasculares</li>
                        </ul>
                    </div>
                `;
                break;
                
            case 'muito alto':
                interpretacao = `
                    <p><strong>Interpretação:</strong> Seu IMC indica obesidade grau III. É essencial buscar tratamento médico imediato.</p>
                    <div class="dicas">
                        <h4>💡 Atenção especial:</h4>
                        <ul>
                            <li>Procure um médico especialista em obesidade</li>
                            <li>Considere tratamentos especializados</li>
                            <li>Monitore complicações associadas</li>
                            <li>Avalie opções de cirurgia bariátrica</li>
                            <li>Suporte psicológico é fundamental</li>
                        </ul>
                    </div>
                `;
                break;
        }
        
        interpretacao += `
            <div class="aviso-medico">
                <p><strong>⚠️ Importante:</strong> O IMC é apenas uma ferramenta de triagem. Para uma avaliação completa da sua saúde, consulte sempre um profissional médico qualificado.</p>
            </div>
        `;
        
        return interpretacao;
    }
});

// Adicionar estilos específicos para a página de IMC
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .ferramenta-content {
            padding: var(--spacing-xl) 0;
        }
        
        .ferramenta-header {
            text-align: center;
            margin-bottom: var(--spacing-xl);
        }
        
        .ferramenta-icon {
            font-size: 4rem;
            margin-bottom: var(--spacing-md);
        }
        
        .ferramenta-header h1 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
            font-size: var(--font-size-h1);
        }
        
        .ferramenta-subtitle {
            color: var(--text-secondary);
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .ferramenta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-xl);
            margin-bottom: var(--spacing-xl);
        }
        
        .calculadora-card {
            background-color: var(--bg-card);
            padding: var(--spacing-lg);
            border-radius: var(--border-radius-lg);
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 20px var(--shadow);
        }
        
        .calculadora-card h2 {
            color: var(--text-primary);
            margin-bottom: var(--spacing-lg);
            text-align: center;
        }
        
        .info-card {
            background-color: var(--bg-card);
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            border: 1px solid var(--border-color);
            margin-bottom: var(--spacing-md);
            box-shadow: 0 2px 10px var(--shadow);
        }
        
        .info-card h3 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .info-card p {
            color: var(--text-secondary);
            line-height: 1.6;
            margin: 0;
        }
        
        .info-card ul {
            color: var(--text-secondary);
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .info-card li {
            margin-bottom: var(--spacing-xs);
        }
        
        .formula {
            background-color: var(--bg-secondary);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            text-align: center;
            font-weight: 600;
            color: var(--accent-primary);
            margin-top: var(--spacing-sm);
        }
        
        .tabela-imc {
            margin-top: var(--spacing-sm);
        }
        
        .tabela-row {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-xs) 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .tabela-row:last-child {
            border-bottom: none;
        }
        
        .categoria {
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .valor {
            color: var(--text-secondary);
        }
        
        .conteudo-educativo {
            margin-bottom: var(--spacing-xl);
        }
        
        .conteudo-educativo h2 {
            text-align: center;
            color: var(--text-primary);
            margin-bottom: var(--spacing-lg);
        }
        
        .educativo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--spacing-md);
        }
        
        .educativo-card {
            background-color: var(--bg-card);
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            border: 1px solid var(--border-color);
            box-shadow: 0 2px 10px var(--shadow);
        }
        
        .educativo-card h3 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
            font-size: 1.1rem;
        }
        
        .educativo-card p {
            color: var(--text-secondary);
            line-height: 1.6;
            margin: 0;
        }
        
        .leia-tambem {
            background-color: var(--bg-secondary);
            padding: var(--spacing-lg);
            border-radius: var(--border-radius-lg);
        }
        
        .leia-tambem h3 {
            color: var(--text-primary);
            margin-bottom: var(--spacing-md);
            text-align: center;
        }
        
        .artigos-relacionados {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-sm);
        }
        
        .artigo-link {
            display: block;
            background-color: var(--bg-card);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            border: 1px solid var(--border-color);
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .artigo-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px var(--shadow);
        }
        
        .artigo-titulo {
            display: block;
            color: var(--accent-primary);
            font-weight: 600;
            margin-bottom: var(--spacing-xs);
        }
        
        .artigo-descricao {
            display: block;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .dicas {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-top: var(--spacing-md);
        }
        
        .dicas h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .dicas ul {
            margin: 0;
            padding-left: var(--spacing-md);
        }
        
        .dicas li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
        }
        
        .aviso-medico {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            margin-top: var(--spacing-md);
        }
        
        .aviso-medico p {
            color: #856404;
            margin: 0;
            font-weight: 600;
        }
        
        [data-theme="dark"] .aviso-medico {
            background-color: #3d3d00;
            border-color: #666600;
        }
        
        [data-theme="dark"] .aviso-medico p {
            color: #ffeb3b;
        }
        
        @media (max-width: 768px) {
            .ferramenta-grid {
                grid-template-columns: 1fr;
                gap: var(--spacing-lg);
            }
            
            .educativo-grid {
                grid-template-columns: 1fr;
            }
            
            .artigos-relacionados {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

