// Состояние приложения
const state = {
    currentScreen: 'settings', 
    cooldown: 0,
    cooldownInterval: null,
    currentPair: 'EUR/USD',
    currentTimeframe: '5 seconds',
    currentMarket: 'standard'
};

// Элементы интерфейса
const elements = {
    settingsSection: document.querySelector('.settings-section'),
    getSignalBtn: document.getElementById('get-signal-btn'),
    signalPair: document.getElementById('signal-pair'),
    signalAction: document.getElementById('signal-action'),
    signalTimestamp: document.getElementById('signal-timestamp'),
    cooldownTimer: document.getElementById('cooldown-timer'),
    currencyPair: document.getElementById('currency-pair'),
    timeframe: document.getElementById('timeframe'),
    signalContent: document.getElementById('signal-content'),
    signalLoading: document.getElementById('signal-loading')
};

// Списки инструментов
const instruments = {
    standard: [
        "EUR/USD", "BTC/USD", "ETH/USD", "USD/RUB", 
        "USD/JPY", "GBP/USD", "USD/CHF", "AUD/USD", 
        "USD/CAD", "NZD/USD", "EUR/GBP", "EUR/JPY", 
        "GBP/JPY", "AUD/JPY", "CHF/JPY", "EUR/AUD", 
        "EUR/CAD", "GBP/AUD", "GBP/CAD", "AUD/CAD", 
        "AUD/CHF", "NZD/JPY", "NZD/CHF"
    ],
    otc: [
        "ZAR/USD OTC", "YER/USD OTC", "WTI Crude Oil OTC", "VIX OTC", 
        "VISA OTC", "USD/VND OTC", "USD/THB OTC", "USD/SGD OTC", 
        "USD/RUB OTC", "USD/PKR OTC", "USD/PHP OTC", 
        "USD/MXN OTC", "USD/JPY OTC", "USD/INR OTC", "USD/IDR OTC", 
        "USD/EGP OTC", "USD/DZD OTC", "USD/COP OTC", "USD/CNH OTC", 
        "USD/CLP OTC", "USD/CHF OTC", "USD/CAD OTC", "USD/BRL OTC", 
        "USD/BDT OTC", "USD/ARS OTC", "US100 OTC", "UAH/USD OTC", 
        "Toncoin OTC", "Tesla OTC", "TRON OTC", "TND/USD OTC", 
        "Solana OTC", "Silver OTC", "SP500 OTC", "SAR/CNY OTC", 
        "QAR/CNY OTC", "GBP/USD OTC", "EUR/GBP OTC", "EUR/JPY OTC", 
        "GBP/JPY OTC", "AUD/NZD OTC", "CAD/JPY OTC", "CHF/JPY OTC", 
        "EUR/CHF OTC", "AUD/CAD OTC", "AED/CNY OTC"
    ]
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Обработчик кнопки "Get Signal"
    elements.getSignalBtn.addEventListener('click', startSignalProcess);
    
    // Обработчики выбора
    elements.currencyPair.addEventListener('change', (e) => {
        state.currentPair = e.target.value;
    });
    
    elements.timeframe.addEventListener('change', (e) => {
        state.currentTimeframe = e.target.value;
    });
    
    // Обработчики вкладок рынка
    document.querySelectorAll('.market-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.market-tab').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            state.currentMarket = tab.dataset.market;
            updateInstruments(state.currentMarket);
        });
    });
    
    // Инициализация инструментов для стандартного рынка
    updateInstruments('standard');
    // Активируем вкладку Standard
    document.querySelector('.market-tab[data-market="standard"]').classList.add('active');
    document.querySelector('.market-tab[data-market="otc"]').classList.remove('active');
    
    // Установить начальные значения сигнала
    resetSignalDisplay();
});

// Начать процесс получения сигнала
function startSignalProcess() {
    // Проверка cooldown
    if (state.cooldown > Date.now()) return;
    
    // Устанавливаем время в сигнале
    elements.signalTimestamp.textContent = getCurrentTime();
    
    // Показываем индикатор загрузки в области сигнала
    showSignalLoading();
    
    // Фиксированная задержка в 1 секунду для анализа
    setTimeout(() => {
        // Генерация случайного сигнала
        const isBuy = Math.random() > 0.5;
        
        // Обновляем секцию сигнала
        elements.signalPair.textContent = state.currentPair;
        elements.signalAction.textContent = isBuy ? 'Buy' : 'Sell';
        elements.signalAction.className = `signal-action ${isBuy ? 'buy' : 'sell'}`;
        
        // Скрываем индикатор загрузки
        hideSignalLoading();
        
        // Установка cooldown
        startCooldown();
    }, 1000);
}

// Показать загрузку в области сигнала
function showSignalLoading() {
    elements.signalContent.style.display = 'none';
    elements.signalLoading.style.display = 'flex';
    elements.cooldownTimer.style.display = 'none';
}

// Скрыть загрузку в области сигнала
function hideSignalLoading() {
    elements.signalContent.style.display = 'flex';
    elements.signalLoading.style.display = 'none';
    elements.cooldownTimer.style.display = 'block';
}

// Обновить инструменты при смене рынка
function updateInstruments(market) {
    // Обновить опции
    elements.currencyPair.innerHTML = '';
    instruments[market].forEach(pair => {
        const option = document.createElement('option');
        option.value = pair;
        option.textContent = pair;
        elements.currencyPair.appendChild(option);
    });
    
    // Установить текущую пару
    state.currentPair = instruments[market][0];
    elements.currencyPair.value = state.currentPair;
}

// Запустить cooldown
function startCooldown() {
    // Рассчитать длительность cooldown в миллисекундах
    const duration = parseTimeframe(state.currentTimeframe);
    
    // Установить время окончания cooldown
    state.cooldown = Date.now() + duration;
    
    // Запустить таймер
    updateCooldownTimer();
    
    if (state.cooldownInterval) {
        clearInterval(state.cooldownInterval);
    }
    
    // Точный таймер
    state.cooldownInterval = setInterval(() => {
        updateCooldownTimer();
        updateCooldownButton();
        
        // Сбросить сигнал после истечения времени
        if (state.cooldown <= Date.now()) {
            resetSignalDisplay();
        }
    }, 1000);
}

// Обновить кнопку с таймером
function updateCooldownButton() {
    const now = Date.now();
    const remaining = Math.max(0, state.cooldown - now);
    const seconds = Math.ceil(remaining / 1000);
    
    if (seconds > 0) {
        elements.getSignalBtn.textContent = `Get Signal (${seconds}s)`;
        elements.getSignalBtn.disabled = true;
    } else {
        elements.getSignalBtn.textContent = 'Get Signal';
        elements.getSignalBtn.disabled = false;
    }
}

// Обновить таймер cooldown
function updateCooldownTimer() {
    const now = Date.now();
    const remaining = Math.max(0, state.cooldown - now);
    const seconds = Math.ceil(remaining / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    elements.cooldownTimer.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    
    if (remaining <= 0) {
        clearInterval(state.cooldownInterval);
    }
}

// Преобразовать timeframe в миллисекунды
function parseTimeframe(timeframe) {
    const value = parseInt(timeframe);
    
    if (timeframe.includes('second')) {
        return value * 1000;
    }
    
    if (timeframe.includes('minute')) {
        return value * 60 * 1000;
    }
    
    return 5000; // По умолчанию 5 секунд
}

// Получить текущее время
function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

// Сбросить отображение сигнала
function resetSignalDisplay() {
    elements.signalPair.textContent = '--';
    elements.signalAction.textContent = '--';
    elements.signalAction.className = 'signal-action';
    elements.signalTimestamp.textContent = '--:--:--';
    elements.cooldownTimer.textContent = '--:--';
    // Убедимся, что индикатор загрузки скрыт
    hideSignalLoading();
}