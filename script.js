/* ==========================================================================
   MÓDULO DE ACESSIBILIDADE - TRABALHO ESCOLAR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------------------------
       1. CONTROLE DE TAMANHO DE FONTE
       ---------------------------------------------------------------------- */
    const root = document.documentElement;
    const btnAumentar = document.getElementById('btn-aumentar-fonte');
    const btnDiminuir = document.getElementById('btn-diminuir-fonte');
    const btnResetar = document.getElementById('btn-resetar-fonte');

    let fatorAtual = 1.0;
    const passo = 0.1;
    const maxFator = 1.5;
    const minFator = 0.8;

    function atualizarTamanhoFonte() {
        root.style.setProperty('--fator-fonte', fatorAtual);
    }

    btnAumentar.addEventListener('click', () => {
        if (fatorAtual < maxFator) {
            fatorAtual += passo;
            atualizarTamanhoFonte();
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if (fatorAtual > minFator) {
            fatorAtual -= passo;
            atualizarTamanhoFonte();
        }
    });

    btnResetar.addEventListener('click', () => {
        fatorAtual = 1.0;
        atualizarTamanhoFonte();
    });

    /* ----------------------------------------------------------------------
       2. MODO DE ALTO CONTRASTE
       ---------------------------------------------------------------------- */
    const btnAltoContraste = document.getElementById('btn-alto-contraste');

    btnAltoContraste.addEventListener('click', () => {
        document.body.classList.toggle('alto-contraste');
        
        const ativo = document.body.classList.contains('alto-contraste');
        btnAltoContraste.textContent = ativo ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste';
    });

    /* ----------------------------------------------------------------------
       3. LEITURA POR VOZ (WEB SPEECH API)
       ---------------------------------------------------------------------- */
    const btnVozLer = document.getElementById('btn-voz-ler');
    const btnVozPausar = document.getElementById('btn-voz-pausar');
    const btnVozContinuar = document.getElementById('btn-voz-continuar');
    const btnVozParar = document.getElementById('btn-voz-parar');

    const synth = window.speechSynthesis;
    let utterance = null;

    function extrairTextoPrincipal() {
        // Coleta apenas o texto das seções do conteúdo principal, ignorando o painel de acessibilidade
        const secoes = document.querySelectorAll('main section:not(#painel-acessibilidade)');
        let textoTotal = "";
        
        secoes.forEach(secao => {
            textoTotal += secao.innerText + " . ";
        });

        return textoTotal;
    }

    btnVozLer.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) {
            alert("A leitura por voz não é suportada neste navegador.");
            return;
        }

        synth.cancel(); // Cancela leituras anteriores se houver

        const texto = extrairTextoPrincipal();
        utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;

        synth.speak(utterance);
    });

    btnVozPausar.addEventListener('click', () => {
        if (synth.speaking && !synth.paused) {
            synth.pause();
        }
    });

    btnVozContinuar.addEventListener('click', () => {
        if (synth.paused) {
            synth.resume();
        }
    });

    btnVozParar.addEventListener('click', () => {
        if (synth.speaking || synth.paused) {
            synth.cancel();
        }
    });
});