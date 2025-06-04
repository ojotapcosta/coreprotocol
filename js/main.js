// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa AOS
  AOS.init();

  // Função de digitação
  function typeText() {
    const phrase = "Soluções financeiras blockchain para quem quer\ninvestir com simplicidade e sem barreiras técnicas.";
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    let currentText = '';
    let currentIndex = 0;
    
    function type() {
      if (currentIndex < phrase.length) {
        // Adiciona o próximo caractere
        if (phrase[currentIndex] === '\n') {
          currentText += '<br>';
        } else {
          currentText += phrase[currentIndex];
        }
        
        // Atualiza o elemento
        typingElement.innerHTML = currentText;
        
        currentIndex++;
        setTimeout(type, 80);
      }
    }
    
    type();
  }

  // Inicializar contadores
  function initCounters() {
    const counters = [
      { id: 'tvl-counter', value: 90, prefix: '$', suffix: 'B+' },
      { id: 'apy-counter', value: 10, suffix: '%' },
      { id: 'protocols-counter', value: 150, suffix: '+' },
      { id: 'fee-counter', value: 0, suffix: '%' }
    ];

    counters.forEach(({id, value, prefix = '', suffix = ''}) => {
      const element = document.getElementById(id);
      if (!element) {
        console.error(`Element with id ${id} not found`);
        return;
      }

      const countUp = new CountUp(id, value, {
        duration: 2.5,
        useGrouping: true,
        useEasing: true,
        separator: ',',
        decimal: '.',
        prefix: prefix,
        suffix: suffix
      });

      if (!countUp.error) {
        countUp.start();
      } else {
        console.error('CountUp error:', countUp.error);
      }
    });
  }

  // Inicializar os toggles
  function initToggles() {
    // Toggle de problema/solução
    const tabProblem = document.getElementById('tab-problem');
    const tabSolution = document.getElementById('tab-solution');
    const panelProblem = document.getElementById('panel-problem');
    const panelSolution = document.getElementById('panel-solution');
    const toggleBg = document.querySelector('#problem-solution .toggle-background');

    if (tabProblem && tabSolution && panelProblem && panelSolution && toggleBg) {
      function switchPanel(showSolution) {
        toggleBg.classList.toggle('right', showSolution);
        
        tabProblem.classList.toggle('text-gray-400', showSolution);
        tabProblem.classList.toggle('text-white', !showSolution);
        tabProblem.classList.toggle('active', !showSolution);
        
        tabSolution.classList.toggle('text-gray-400', !showSolution);
        tabSolution.classList.toggle('text-white', showSolution);
        tabSolution.classList.toggle('active', showSolution);

        panelProblem.classList.toggle('active', !showSolution);
        panelSolution.classList.toggle('active', showSolution);
      }

      tabProblem.addEventListener('click', () => switchPanel(false));
      tabSolution.addEventListener('click', () => switchPanel(true));
    }

    // Toggle de comparação
    const btn1 = document.getElementById('btn-mode1');
    const btn2 = document.getElementById('btn-mode2');
    const panel1 = document.getElementById('table-mode1');
    const panel2 = document.getElementById('table-mode2');
    const comparisonBg = document.querySelector('#comparison-section .toggle-background');
    const tablesContainer = document.querySelector('.tables-container');

    if (btn1 && btn2 && panel1 && panel2 && comparisonBg && tablesContainer) {
      function updateToggleState(isSecondActive) {
        comparisonBg.style.transform = isSecondActive ? 'translateX(calc(100% + 8px))' : 'translateX(0)';
        btn1.classList.toggle('active', !isSecondActive);
        btn2.classList.toggle('active', isSecondActive);
        
        tablesContainer.classList.toggle('mode2', isSecondActive);
        panel1.classList.toggle('active', !isSecondActive);
        panel2.classList.toggle('active', isSecondActive);
      }

      btn1.addEventListener('click', () => updateToggleState(false));
      btn2.addEventListener('click', () => updateToggleState(true));
    }
  }

  // Inicializar cards
  function initCards() {
    document.querySelectorAll('.security-card').forEach(card => {
      card.classList.add('loaded');
      
      card.addEventListener('mouseleave', function() {
        this.classList.add('hover-leave');
        setTimeout(() => this.classList.remove('hover-leave'), 2000);
      });
    });
  }

  // Troca dinâmica do logo conforme fundo do menu
  function updateLogo() {
    const nav = document.querySelector('.nav-menu');
    const logo = document.getElementById('logo-img');
    if (!nav || !logo) return;
    if (!nav.classList.contains('light-section')) {
      logo.src = 'logo-branco.png';
    } else {
      logo.src = 'logo-preto.png';
    }
  }
  window.addEventListener('scroll', updateLogo);
  updateLogo();

  // Observa mudanças de classe na nav-menu para trocar o logo imediatamente
  const nav = document.querySelector('.nav-menu');
  if (nav) {
    const observer = new MutationObserver(updateLogo);
    observer.observe(nav, { attributes: true, attributeFilter: ['class'] });
  }

  // Iniciar todas as funcionalidades
  typeText();
  initCounters();
  initToggles();
  initCards();
}); 