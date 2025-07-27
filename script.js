// Состояние приложения
const state = {
    currentScreen: 'settings',
    currentPair: 'EUR/USD',
    currentTimeframe: 'M1',
    currentMarket: 'standard',
    currentLanguage: 'en',
    cooldowns: {},
    cooldownInterval: null,
    currentSignal: null,
    timerInterval: null,
    analyzingInterval: null,
    lastStandardPair: 'EUR/USD',
    chartWidgets: {
        standard: null,
        otc: null
    },
    isAnalyzing: false,
    fillTimeout: null
};

// Элементы интерфейса
const elements = {
    marketTabs: document.querySelector('.market-tabs'),
    tabSlider: document.getElementById('tab-slider'),
    getSignalBtn: document.getElementById('get-signal-btn'),
    btnText: document.querySelector('.btn-text'),
    currencyPair: document.getElementById('currency-pair'),
    timeframeBtn: document.getElementById('timeframe-btn'),
    timeframeDropdown: document.getElementById('timeframe-dropdown'),
    languageBtn: document.getElementById('language-btn'),
    languageDropdown: document.getElementById('language-dropdown'),
    tradingViewChartStandard: document.getElementById('tradingview-chart-standard'),
    tradingViewChartOTC: document.getElementById('tradingview-chart-otc'),
    tradingViewContainerStandard: document.getElementById('tradingview-chart-container-standard'),
    tradingViewContainerOTC: document.getElementById('tradingview-chart-container-otc'),
    // Элементы для области сигналов
    signalIcon: document.getElementById('signal-icon'),
    signalText: document.getElementById('signal-text'),
    signalTime: document.getElementById('signal-time'),
    signalAccuracy: document.getElementById('signal-accuracy'),
    timerProgress: document.getElementById('timer-progress'),
    timerDisplay: document.getElementById('timer-display'),
    timerLabel: document.getElementById('timer-label'),
    // Элементы для флагов
    baseFlag: document.getElementById('base-flag'),
    quoteFlag: document.getElementById('quote-flag')
};

// Переводы
const translations = {
    en: {
        getSignal: "Get Signal",
        analyzing: "Analyzing",
        direction: "Direction",
        marketClosed: "Market Closed",
        switchToOTC: "⇄ Trade OTC",
        nextOpen: "The market will open on",
        currencyPair: "Currency Pair",
        timeframe: "Timeframe",
        language: "Language",
        timeToResult: "Time to trade result"
    },
    ru: {
        getSignal: "Получить сигнал",
        analyzing: "Анализирую",
        direction: "Направление",
        marketClosed: "Рынок закрыт",
        switchToOTC: "⇄ Перейти на OTC",
        nextOpen: "Рынок откроется",
        currencyPair: "Валютная пара",
        timeframe: "Таймфрейм",
        language: "Язык",
        timeToResult: "Время до итога сделки"
    },
    uz: {
        getSignal: "Signal olish",
        analyzing: "Tahlil qilinmoqda",
        direction: "Yo'nalish",
        marketClosed: "Bozor yopiq",
        switchToOTC: "⇄ OTC bozoriga o'tish",
        nextOpen: "Bozor ochiladi",
        currencyPair: "Valyuta juftligi",
        timeframe: "Vaqt oraligi",
        language: "Til",
        timeToResult: "Savdo natijasigacha vaqt"
    },
    ar: {
        getSignal: "الحصول على إشارة",
        analyzing: "يتم التحليل",
        direction: "الاتجاه",
        marketClosed: "السوق مغلق",
        switchToOTC: "⇄ التبديل إلى OTC",
        nextOpen: "سيفتح السوق في",
        currencyPair: "زوج العملات",
        timeframe: "الإطار الزمني",
        language: "اللغة",
        timeToResult: "الوقت حتى نتيجة التداول"
    }
};

// Флаги для валютных пар
const currencyFlags = {
    'EUR': 'https://flagcdn.com/w40/eu.png',
    'USD': 'https://flagcdn.com/w40/us.png',
    'GBP': 'https://flagcdn.com/w40/gb.png',
    'JPY': 'https://flagcdn.com/w40/jp.png',
    'CHF': 'https://flagcdn.com/w40/ch.png',
    'AUD': 'https://flagcdn.com/w40/au.png',
    'CAD': 'https://flagcdn.com/w40/ca.png',
    'NZD': 'https://flagcdn.com/w40/nz.png',
    'RUB': 'https://flagcdn.com/w40/ru.png',
    'BTC': 'https://s3.tradingview.com/c/COIN_bitcoin.svg',
    'ETH': 'https://s3.tradingview.com/c/COIN_ethereum.svg'
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

// Доступные таймфреймы
const timeframes = {
    standard: ["M1", "M3", "M30", "H1"],
    otc: ["S5", "S15", "S30", "M1", "M3", "M30", "H1"]
};

// Маппинг таймфреймов для TradingView
const timeframeMapping = {
    "S5": "5",
    "S15": "15",
    "S30": "30",
    "M1": "1",
    "M3": "3",
    "M30": "30",
    "H1": "60"
};

// Маппинг символов для TradingView
const symbolMapping = {
    "EUR/USD": "FX:EURUSD",
    "BTC/USD": "BINANCE:BTCUSDT",
    "ETH/USD": "BINANCE:ETHUSDT",
    "USD/RUB": "FX_IDC:USDRUB",
    "USD/JPY": "FX:USDJPY",
    "GBP/USD": "FX:GBPUSD",
    "USD/CHF": "FX:USDCHF",
    "AUD/USD": "FX:AUDUSD",
    "USD/CAD": "FX:USDCAD",
    "NZD/USD": "FX:NZDUSD",
    "EUR/GBP": "FX:EURGBP",
    "EUR/JPY": "FX:EURJPY",
    "GBP/JPY": "FX:GBPJPY",
    "AUD/JPY": "FX:AUDJPY",
    "CHF/JPY": "FX:CHFJPY",
    "EUR/AUD": "FX:EURAUD",
    "EUR/CAD": "FX:EURCAD",
    "GBP/AUD": "FX:GBPAUD",
    "GBP/CAD": "FX:GBPCAD",
    "AUD/CAD": "FX:AUDCAD",
    "AUD/CHF": "FX:AUDCHF",
    "NZD/JPY": "FX:NZDJPY",
    "NZD/CHF": "FX:NZDCHF",
    "USD/JPY OTC": "FX:USDJPY",
    "GBP/USD OTC": "FX:GBPUSD",
    "EUR/GBP OTC": "FX:EURGBP"
};

// Расписание бирж (время UTC)
const marketSchedule = {
    asia: {
        TSE: { open: 0, close: 6 },
        SSE: { open: 1.5, close: 7.5 },
        HKEX: { open: 1.5, close: 7.5 }
    },
    europe: {
        LSE: { open: 8, close: 16.5 },
        Deutsche: { open: 8, close: 16.5 },
        Euronext: { open: 8, close: 16.5 }
    },
    america: {
        NYSE: { open: 14.5, close: 21 },
        NASDAQ: { open: 14.5, close: 21 }
    }
};

// Функция для получения флагов валютной пары в стиле TradingView
function getCurrencyFlags(pair) {
    // Убираем OTC если есть
    const cleanPair = pair.replace(' OTC', '');
    const currencies = cleanPair.split('/');
    
    const baseCurrency = currencies[0];
    const quoteCurrency = currencies[1];
    
    return {
        base: currencyFlags[baseCurrency] || currencyFlags['USD'],
        quote: currencyFlags[quoteCurrency] || currencyFlags['USD']
    };
}

// Функция для обновления флагов
function updateCurrencyFlags() {
    const flags = getCurrencyFlags(state.currentPair);
    
    elements.baseFlag.style.backgroundImage = `url(${flags.base})`;
    elements.quoteFlag.style.backgroundImage = `url(${flags.quote})`;
}

// Функция для анимации слайдера вкладок
function updateTabSlider(activeTab) {
    const isOTC = activeTab === 'otc';
    elements.tabSlider.style.transform = isOTC ? 'translateX(100%)' : 'translateX(0%)';
}

// Функция для получения локали TradingView
function getTradingViewLocale() {
    const langMap = {
        en: "en",
        ru: "ru",
        uz: "ru",
        ar: "en"
    };
    return langMap[state.currentLanguage] || "en";
}

// Функция для создания/обновления графика
function updateTradingViewChart() {
    let pair, containerId, symbol, tvTimeframe;
    const market = state.currentMarket;

    if (market === 'otc') {
        pair = state.lastStandardPair;
        containerId = 'tradingview-chart-otc';
    } else {
        pair = state.currentPair;
        state.lastStandardPair = pair;
        containerId = 'tradingview-chart-standard';
    }

    symbol = symbolMapping[pair] || symbolMapping[pair + ' OTC'] || null;
    tvTimeframe = timeframeMapping[state.currentTimeframe];
    
    if (!symbol || !tvTimeframe) {
        console.warn(`Chart not available for ${pair} with timeframe ${state.currentTimeframe}`);
        return;
    }

    if (state.chartWidgets[market] !== null) {
        state.chartWidgets[market].remove();
        state.chartWidgets[market] = null;
    }

    state.chartWidgets[market] = new TradingView.widget({
        "container_id": containerId,
        "autosize": true,
        "symbol": symbol,
        "interval": tvTimeframe,
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": getTradingViewLocale(),
        "toolbar_bg": "#1e293b",
        "hide_top_toolbar": false,
        "allow_symbol_change": false,
        "studies": [], // Убираем все индикаторы включая объем
        "hide_volume": true, // Скрываем объем
        "disabled_features": ["volume_force_overlay"] // Отключаем принудительное наложение объема
    });
}

// Функция для переключения видимости графиков
function updateChartVisibility() {
    if (state.currentMarket === 'standard') {
        elements.tradingViewContainerStandard.style.display = 'block';
        elements.tradingViewContainerOTC.style.display = 'none';
    } else {
        elements.tradingViewContainerStandard.style.display = 'none';
        elements.tradingViewContainerOTC.style.display = 'block';
    }
}

// Получение следующего времени открытия рынка
function getNextMarketOpenTime() {
    const now = new Date();
    const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
    const utcDay = now.getUTCDay();

    const createDate = (baseDate, hoursFloat) => {
        const date = new Date(baseDate);
        const hours = Math.floor(hoursFloat);
        const minutes = Math.round((hoursFloat - hours) * 60);
        date.setUTCHours(hours, minutes, 0, 0);
        return date;
    };

    let openTimes = [];
    for (const region of Object.values(marketSchedule)) {
        for (const exchange of Object.values(region)) {
            openTimes.push(exchange.open);
        }
    }
    openTimes.sort((a, b) => a - b);

    const getNextBusinessDay = (date, offset) => {
        const nextDate = new Date(date);
        nextDate.setUTCDate(date.getUTCDate() + offset);
        const nextDay = nextDate.getUTCDay();
        if (nextDay === 0 || nextDay === 6) {
            return getNextBusinessDay(date, offset + 1);
        }
        return nextDate;
    };

    if (utcDay >= 1 && utcDay <= 5) {
        for (const time of openTimes) {
            if (time > utcHours) {
                return createDate(now, time);
            }
        }
        const nextBusinessDay = getNextBusinessDay(now, 1);
        const nextTime = Math.min(...openTimes);
        return createDate(nextBusinessDay, nextTime);
    } else {
        const nextBusinessDay = getNextBusinessDay(now, 1);
        const nextTime = Math.min(...openTimes);
        return createDate(nextBusinessDay, nextTime);
    }
}

// Форматирование даты в DD.MM.YYYY
function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
}

// Проверка, открыт ли рынок
function isMarketOpen() {
    const now = new Date();
    const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
    const utcDay = now.getUTCDay();
    
    if (utcDay === 0 || utcDay === 6) return false;
    
    for (const region of Object.values(marketSchedule)) {
        for (const exchange of Object.values(region)) {
            if (utcHours >= exchange.open && utcHours < exchange.close) {
                return true;
            }
        }
    }
    
    return false;
}

// Обновление интерфейса при смене языка
function updateLanguage() {
    const lang = state.currentLanguage;
    const t = translations[lang];
    
    if (!state.isAnalyzing) {
        elements.btnText.textContent = t.getSignal;
    }
    
    // Обновляем текст таймера
    elements.timerLabel.textContent = t.timeToResult;
    
    updateMarketStatus();
}

// Анимация точек для кнопки "Analyzing"
function startAnalyzingAnimation() {
    const t = translations[state.currentLanguage];
    let dotCount = 0;
    
    state.isAnalyzing = true;
    elements.getSignalBtn.classList.add('analyzing');
    
    state.analyzingInterval = setInterval(() => {
        const dots = '.'.repeat(dotCount);
        elements.btnText.textContent = t.analyzing + dots;
        dotCount = (dotCount + 1) % 4;
    }, 500);
}

// Остановка анимации кнопки
function stopAnalyzingAnimation() {
    if (state.analyzingInterval) {
        clearInterval(state.analyzingInterval);
        state.analyzingInterval = null;
    }
    state.isAnalyzing = false;
    elements.getSignalBtn.classList.remove('analyzing');
}

// Сброс области сигналов в начальное состояние
function resetSignalArea() {
    elements.signalIcon.className = 'signal-icon';
    elements.signalIcon.innerHTML = '<i class="fas fa-chart-line"></i>';
    elements.signalText.textContent = '--';
    elements.signalText.className = 'signal-text';
    elements.signalTime.textContent = '--:--:--';
    elements.signalAccuracy.textContent = '--';
    
    // Сброс таймера с анимацией
    elements.timerProgress.className = 'timer-progress resetting';
    elements.timerDisplay.textContent = '--:--';
    
    // Делаем полоску серой с полосками с анимацией
    const timerBar = elements.timerProgress.parentElement;
    
    setTimeout(() => {
        timerBar.className = 'timer-bar inactive';
        elements.timerProgress.className = 'timer-progress inactive';
    }, 500);
    
    // Останавливаем таймер если он работает
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    if (state.fillTimeout) {
        clearTimeout(state.fillTimeout);
        state.fillTimeout = null;
    }
}

// Обновление области сигналов с данными
function updateSignalArea(signalData) {
    const { action, isBuy, startTime, percentage } = signalData;
    
    // Обновляем иконку и текст с правильными направлениями
    if (isBuy) {
        elements.signalIcon.className = 'signal-icon buy';
        elements.signalIcon.innerHTML = '<i class="fas fa-arrow-trend-up"></i>';
        elements.signalText.textContent = 'BUY';
        elements.signalText.className = 'signal-text buy';
    } else {
        elements.signalIcon.className = 'signal-icon sell';
        elements.signalIcon.innerHTML = '<i class="fas fa-arrow-trend-down"></i>';
        elements.signalText.textContent = 'SELL';
        elements.signalText.className = 'signal-text sell';
    }
    
    // Обновляем время
    elements.signalTime.textContent = formatTimeWithSeconds(startTime);
    
    // Обновляем точность
    elements.signalAccuracy.textContent = `${percentage}%`;
    
    // Запускаем таймер
    startTimer();
}

// Функция для запуска заполнения прогресс-бара при нажатии GET SIGNAL
function startProgressFill(duration) {
    const timerBar = elements.timerProgress.parentElement;
    timerBar.className = 'timer-bar';
    elements.timerProgress.className = 'timer-progress filling';
    elements.timerProgress.style.setProperty('--fill-duration', `${duration / 1000}s`);
}

// Запуск таймера с новой логикой
function startTimer() {
    if (!state.currentSignal) return;
    
    const { endTime } = state.currentSignal;
    const duration = endTime.getTime() - state.currentSignal.startTime.getTime();
    
    // Убираем класс filling и делаем полоску активной для обратного отсчета
    const timerBar = elements.timerProgress.parentElement;
    timerBar.className = 'timer-bar';
    elements.timerProgress.className = 'timer-progress draining';
    elements.timerProgress.style.width = '100%';
    
    // Обновляем таймер каждую секунду
    state.timerInterval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, endTime.getTime() - now);
        
        // Обновляем отображение времени
        const remainingSeconds = Math.ceil(remaining / 1000);
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        elements.timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Обновляем ширину полоски (от 100% до 0%)
        const widthPercent = (remaining / duration) * 100;
        elements.timerProgress.style.width = `${widthPercent}%`;
        
        // Если время вышло
        if (remaining <= 0) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
            
            // Сбрасываем все в исходное состояние
            setTimeout(() => {
                resetSignalArea();
                state.currentSignal = null;
            }, 500);
        }
    }, 100);
}

// Форматирование времени в HH:MM:SS
function formatTimeWithSeconds(date) {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

// Получить уникальный ключ
function getCurrentKey() {
    return `${state.currentPair}|${state.currentTimeframe}`;
}

// Проверить cooldown
function isOnCooldown(key) {
    const cooldownEnd = state.cooldowns[key];
    return cooldownEnd && cooldownEnd > Date.now();
}

// Запустить cooldown
function startCooldown(key) {
    const duration = parseTimeframe(state.currentTimeframe);
    state.cooldowns[key] = Date.now() + duration;
}

// Обновить отображение cooldown - синхронизировано с таймером
function updateCooldownDisplay() {
    const key = getCurrentKey();
    const cooldownEnd = state.cooldowns[key];
    const now = Date.now();
    const t = translations[state.currentLanguage];
    
    if (cooldownEnd && cooldownEnd > now && !state.isAnalyzing) {
        const remaining = Math.max(0, cooldownEnd - now);
        const seconds = Math.ceil(remaining / 1000);
        
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const timeStr = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        
        elements.btnText.textContent = `${t.getSignal} (${timeStr})`;
        elements.getSignalBtn.disabled = true;
    } else if (!state.isAnalyzing) {
        elements.btnText.textContent = t.getSignal;
        elements.getSignalBtn.disabled = false;
        
        // Если cooldown закончился и нет активного сигнала, сбрасываем область
        if (!state.currentSignal) {
            resetSignalArea();
        }
    }
}

// Начать процесс получения сигнала
function startSignalProcess() {
    if (state.currentMarket === 'standard' && !isMarketOpen()) {
        return;
    }
    
    const key = getCurrentKey();
    
    if (isOnCooldown(key) || state.isAnalyzing) {
        return;
    }
    
    // Определяем задержку
    let delay;
    const tf = state.currentTimeframe;
    
    if (tf.startsWith('S')) {
        delay = Math.floor(Math.random() * 3000) + 1000;
    } else if (tf === 'M1' || tf === 'M3') {
        delay = Math.floor(Math.random() * 3000) + 4000;
    } else if (tf === 'M30') {
        delay = Math.floor(Math.random() * 9000) + 6000;
    } else if (tf === 'H1') {
        delay = Math.floor(Math.random() * 15000) + 10000;
    } else {
        delay = Math.floor(Math.random() * 3000) + 4000;
    }
    
    // Запускаем заполнение прогресс-бара
    startProgressFill(delay);
    
    // Запускаем анимацию кнопки
    startAnalyzingAnimation();
    
    state.fillTimeout = setTimeout(() => {
        const isBuy = Math.random() > 0.5;
        const duration = parseTimeframe(state.currentTimeframe);
        
        const now = new Date();
        const endTime = new Date(now.getTime() + duration);
        
        state.currentSignal = {
            key: key,
            pair: state.currentPair,
            action: isBuy ? 'BUY' : 'SELL',
            isBuy: isBuy,
            startTime: now,
            endTime: endTime,
            percentage: Math.floor(Math.random() * 14) + 83
        };
        
        // Останавливаем анимацию кнопки
        stopAnalyzingAnimation();
        
        // Обновляем область сигналов
        updateSignalArea(state.currentSignal);
        
        startCooldown(key);
    }, delay);
}

// Обновить статус рынка
function updateMarketStatus() {
    const lang = state.currentLanguage;
    const t = translations[lang];
    
    const isClosed = state.currentMarket === 'standard' && !isMarketOpen();
    
    if (isClosed) {
        elements.getSignalBtn.disabled = true;
        if (!state.isAnalyzing) {
            elements.btnText.textContent = t.marketClosed;
        }
    } else if (!state.isAnalyzing) {
        elements.getSignalBtn.disabled = false;
        elements.btnText.textContent = t.getSignal;
    }
}

// Обновить выпадающий список таймфреймов
function updateTimeframeDropdown() {
    const tfList = timeframes[state.currentMarket];
    elements.timeframeDropdown.innerHTML = '';
    
    tfList.forEach(tf => {
        const div = document.createElement('div');
        div.dataset.value = tf;
        div.textContent = tf;
        
        if (tf === state.currentTimeframe) {
            div.classList.add('active');
        }
        
        elements.timeframeDropdown.appendChild(div);
    });
}

// Обновить инструменты
function updateInstruments(market) {
    elements.currencyPair.innerHTML = '';
    instruments[market].forEach(pair => {
        const option = document.createElement('option');
        option.value = pair;
        option.textContent = pair;
        elements.currencyPair.appendChild(option);
    });
    
    state.currentPair = instruments[market][0];
    elements.currencyPair.value = state.currentPair;
    updateCurrencyFlags();
}

// Преобразовать timeframe в миллисекунды
function parseTimeframe(timeframe) {
    const type = timeframe.charAt(0);
    const value = parseInt(timeframe.substring(1));
    
    if (type === 'S') {
        return value * 1000;
    } else if (type === 'M') {
        return value * 60 * 1000;
    } else if (type === 'H') {
        return value * 60 * 60 * 1000;
    }
    
    return 60000;
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    updateTimeframeDropdown();
    
    elements.getSignalBtn.addEventListener('click', startSignalProcess);
    
    elements.currencyPair.addEventListener('change', (e) => {
        state.currentPair = e.target.value;
        updateCurrencyFlags();
        
        if (state.currentMarket === 'standard') {
            resetSignalArea();
            updateCooldownDisplay();
            updateMarketStatus();
            updateTradingViewChart();
        }
    });
    
    // Обработчики для иконок
    elements.timeframeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.timeframeDropdown.style.display = 
            elements.timeframeDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    elements.languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.languageDropdown.style.display = 
            elements.languageDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Обработчики для выпадающих списков
    elements.timeframeDropdown.addEventListener('click', (e) => {
        if (e.target && e.target.dataset.value) {
            state.currentTimeframe = e.target.dataset.value;
            resetSignalArea();
            updateCooldownDisplay();
            updateTradingViewChart();
            elements.timeframeDropdown.style.display = 'none';
            updateTimeframeDropdown();
        }
    });
    
    elements.languageDropdown.addEventListener('click', (e) => {
        if (e.target && e.target.dataset.value) {
            state.currentLanguage = e.target.dataset.value;
            updateLanguage();
            elements.languageDropdown.style.display = 'none';
            updateTradingViewChart();
        }
    });
    
    // Закрытие выпадающих списков при клике вне их
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.icon-dropdown')) {
            elements.timeframeDropdown.style.display = 'none';
            elements.languageDropdown.style.display = 'none';
        }
    });
    
    // Обработчики для вкладок рынка
    document.querySelectorAll('.market-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Обновляем активные состояния
            document.querySelectorAll('.market-tab').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            
            // Анимируем слайдер
            updateTabSlider(tab.dataset.market);
            
            state.currentMarket = tab.dataset.market;
            updateInstruments(state.currentMarket);
            updateTimeframeDropdown();
            resetSignalArea();
            updateCooldownDisplay();
            updateMarketStatus();
            
            updateChartVisibility();
            updateTradingViewChart();
        });
    });
    
    updateInstruments('standard');
    document.querySelector('.market-tab[data-market="standard"]').classList.add('active');
    document.querySelector('.market-tab[data-market="otc"]').classList.remove('active');
    updateTabSlider('standard');
    
    resetSignalArea();
    updateMarketStatus();
    
    updateChartVisibility();
    updateTradingViewChart();
    
    // Обновляем cooldown каждую секунду для синхронизации с таймером
    state.cooldownInterval = setInterval(() => {
        updateMarketStatus();
        if (state.currentMarket !== 'standard' || isMarketOpen()) {
            updateCooldownDisplay();
        }
    }, 100);
    
    updateLanguage();
});
