
// Calculadora de Frequência Cardíaca
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("fc-form");
    const resultadoDiv = document.getElementById("resultado-fc");
    const valorFcm = document.getElementById("valor-fcm");
    const zonaAlvoModerada = document.getElementById("zona-alvo-moderada");
    const zonaAlvoIntensa = document.getElementById("zona-alvo-intensa");
    const interpretacaoFc = document.getElementById("interpretacao-fc");
    
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        calcularFrequenciaCardiaca();
    });
    
    function calcularFrequenciaCardiaca() {
        const idade = parseInt(document.getElementById("idade").value);
        
        // Validações
        if (!idade) {
            mostrarNotificacao("Por favor, preencha a idade.", "erro");
            return;
        }
        
        if (idade < 10 || idade > 100) {
            mostrarNotificacao("Idade deve estar entre 10 e 100 anos.", "erro");
            return;
        }
        
        // Calcular FCM usando a fórmula clássica
        const fcm = 220 - idade;
        
        // Calcular zonas alvo
        const zonaLeve = {
            min: Math.round(fcm * 0.5),
            max: Math.round(fcm * 0.7)
        };
        
        const zonaIntensa = {
            min: Math.round(fcm * 0.7),
            max: Math.round(fcm * 0.85)
        };
        
        // Exibir resultado
        exibirResultado(fcm, zonaLeve, zonaIntensa, idade);
    }
    
    function exibirResultado(fcm, zonaLeve, zonaIntensa, idade) {
        valorFcm.textContent = fcm;
        zonaAlvoModerada.textContent = `${zonaLeve.min} - ${zonaLeve.max}`;
        zonaAlvoIntensa.textContent = `${zonaIntensa.min} - ${zonaIntensa.max}`;
        
        const interpretacao = obterInterpretacao(fcm, zonaLeve, zonaIntensa, idade);
        interpretacaoFc.innerHTML = interpretacao;
        
        // Mostrar resultado com animação
        toggleElement("resultado-fc", true);
        
        // Scroll suave para o resultado
        resultadoDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
        
        mostrarNotificacao("Frequência cardíaca calculada com sucesso!", "sucesso");
    }
    
    function obterInterpretacao(fcm, zonaLeve, zonaIntensa, idade) {
        let interpretacao = `
            <div class="interpretacao-principal">
                <p><strong>Análise da Frequência Cardíaca:</strong></p>
                <p>Sua frequência cardíaca máxima estimada é de <strong>${fcm} bpm</strong>.</p>
                <p>Para exercícios moderados, mantenha entre <strong>${zonaLeve.min}-${zonaLeve.max} bpm</strong>.</p>
                <p>Para exercícios intensos, mantenha entre <strong>${zonaIntensa.min}-${zonaIntensa.max} bpm</strong>.</p>
            </div>
        `;
        
        // Adicionar zonas detalhadas
        interpretacao += obterZonasDetalhadas(fcm);
        
        // Adicionar dicas específicas por idade
        interpretacao += obterDicasEspecificas(idade, fcm);
        
        // Aviso sobre precisão
        interpretacao += `
            <div class="aviso-precisao">
                <p><strong>📏 Sobre a Precisão:</strong> Esta é uma estimativa baseada na idade. Para medições mais precisas, considere um teste de esforço com um cardiologista ou use um monitor cardíaco durante os exercícios.</p>
            </div>
        `;
        
        // Aviso médico
        interpretacao += `
            <div class="aviso-medico">
                <p><strong>⚠️ Importante:</strong> Antes de iniciar qualquer programa de exercícios, especialmente se você tem condições de saúde preexistentes, consulte um médico. Esta calculadora é apenas informativa.</p>
            </div>
        `;
        
        return interpretacao;
    }
    
    function obterZonasDetalhadas(fcm) {
        const zonas = [
            { nome: "Muito Leve", min: Math.round(fcm * 0.5), max: Math.round(fcm * 0.6), cor: "#3498db", descricao: "Aquecimento e recuperação" },
            { nome: "Leve", min: Math.round(fcm * 0.6), max: Math.round(fcm * 0.7), cor: "#2ecc71", descricao: "Queima de gordura" },
            { nome: "Moderada", min: Math.round(fcm * 0.7), max: Math.round(fcm * 0.8), cor: "#f39c12", descricao: "Melhora aeróbica" },
            { nome: "Intensa", min: Math.round(fcm * 0.8), max: Math.round(fcm * 0.9), cor: "#e67e22", descricao: "Limiar anaeróbico" },
            { nome: "Máxima", min: Math.round(fcm * 0.9), max: fcm, cor: "#e74c3c", descricao: "Potência máxima" }
        ];
        
        let html = `
            <div class="zonas-detalhadas">
                <h4>📊 Zonas de Treino Detalhadas:</h4>
                <div class="zonas-grid">
        `;
        
        zonas.forEach(zona => {
            html += `
                <div class="zona-item">
                    <div class="zona-nome" style="color: ${zona.cor}">${zona.nome}</div>
                    <div class="zona-valor">${zona.min}-${zona.max} bpm</div>
                    <div class="zona-descricao">${zona.descricao}</div>
                </div>
            `;
        });
        
        html += "</div></div>";
        return html;
    }
    
    function obterDicasEspecificas(idade, fcm) {
        let dicas = '<div class="dicas-especificas"><h4>💡 Recomendações Personalizadas:</h4><ul>';
        
        if (idade < 20) {
            dicas += '<li>Jovens têm maior capacidade de recuperação. Varie os tipos de exercício.</li>';
            dicas += '<li>Foque no desenvolvimento de habilidades motoras e hábitos saudáveis.</li>';
        } else if (idade < 30) {
            dicas += '<li>Idade ideal para desenvolver base aeróbica e força muscular.</li>';
            dicas += '<li>Experimente diferentes modalidades esportivas.</li>';
        } else if (idade < 40) {
            dicas += '<li>Mantenha regularidade nos exercícios para preservar a capacidade cardiovascular.</li>';
            dicas += '<li>Inclua exercícios de força para manter massa muscular.</li>';
        } else if (idade < 50) {
            dicas += '<li>Priorize exercícios de baixo impacto se houver problemas articulares.</li>';
            dicas += '<li>Monitore mais de perto a frequência cardíaca durante exercícios.</li>';
        } else if (idade < 60) {
            dicas += '<li>Foque em exercícios que melhorem equilíbrio e flexibilidade.</li>';
            dicas += '<li>Considere atividades como caminhada, natação e yoga.</li>';
        } else {
            dicas += '<li>Priorize exercícios funcionais e de baixo impacto.</li>';
            dicas += '<li>Sempre aqueça bem antes dos exercícios e resfrie adequadamente.</li>';
            dicas += '<li>Considere exercícios em grupo para motivação social.</li>';
        }
        
        // Dicas gerais baseadas na FCM
        if (fcm > 180) {
            dicas += '<li>Sua FCM é alta. Aproveite para treinos de alta intensidade com supervisão.</li>';
        } else if (fcm < 160) {
            dicas += '<li>Sua FCM é mais baixa. Foque em exercícios de resistência e moderados.</li>';
        }
        
        // Dicas universais
        dicas += '<li>Use um monitor cardíaco para acompanhar sua FC em tempo real.</li>';
        dicas += '<li>Hidrate-se adequadamente antes, durante e após os exercícios.</li>';
        dicas += '<li>Respeite os dias de descanso para permitir recuperação adequada.</li>';
        dicas += '<li>Se sentir tontura, dor no peito ou falta de ar, pare imediatamente.</li>';
        
        dicas += '</ul></div>';
        
        return dicas;
    }
});

// Adicionar estilos específicos para a página de frequência cardíaca
document.addEventListener("DOMContentLoaded", function() {
    const style = document.createElement("style");
    style.textContent = `
        .zonas-detalhadas {
            background-color: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
        }
        
        .zonas-detalhadas h4 {
            color: var(--accent-primary);
            margin-bottom: var(--spacing-md);
            text-align: center;
        }
        
        .zonas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--spacing-sm);
        }
        
        .zona-item {
            background-color: var(--bg-card);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            text-align: center;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }
        
        .zona-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .zona-nome {
            font-weight: 600;
            margin-bottom: var(--spacing-xs);
            font-size: 0.9rem;
        }
        
        .zona-valor {
            color: var(--text-secondary);
            font-size: 0.8rem;
            margin-bottom: var(--spacing-xs);
            font-weight: 600;
        }
        
        .zona-descricao {
            color: var(--text-secondary);
            font-size: 0.7rem;
            line-height: 1.3;
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
        
        .tabela-fc h4 {
            color: var(--text-primary);
            margin-bottom: var(--spacing-sm);
            font-size: 1rem;
        }
        
        @media (max-width: 768px) {
            .zonas-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 480px) {
            .zonas-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});



