// Состояние приложения
const state = {
    currentScreen: 'settings',
    currentPair: 'EUR/USD',
    currentTimeframe: 'M1',
    currentMarket: 'standard',
    currentLanguage: 'en', // По умолчанию английский
    cooldowns: {},
    cooldownInterval: null,
    currentSignal: null,
    lastStandardPair: 'EUR/USD', // Запоминаем последнюю стандартную пару
    chartWidgets: {
        standard: null,
        otc: null
    }
};

// Элементы интерфейса
const elements = {
    marketTabs: document.querySelector('.market-tabs'),
    getSignalBtn: document.getElementById('get-signal-btn'),
    signalMessage: document.getElementById('signal-message'),
    signalResult: document.getElementById('signal-result'),
    signalAction: document.getElementById('signal-action'),
    signalTimeRange: document.getElementById('signal-time-range'),
    signalPercentage: document.getElementById('signal-percentage'),
    currencyPair: document.getElementById('currency-pair'),
    timeframeBtn: document.getElementById('timeframe-btn'),
    timeframeDropdown: document.getElementById('timeframe-dropdown'),
    languageBtn: document.getElementById('language-btn'),
    languageDropdown: document.getElementById('language-dropdown'),
    signalContent: document.getElementById('signal-content'),
    signalLoading: document.getElementById('signal-loading'),
    loadingText: document.getElementById('loading-text'),
    loadingSubtext: document.getElementById('loading-subtext'),
    tradingViewChartStandard: document.getElementById('tradingview-chart-standard'),
    tradingViewChartOTC: document.getElementById('tradingview-chart-otc'),
    tradingViewContainerStandard: document.getElementById('tradingview-chart-container-standard'),
    tradingViewContainerOTC: document.getElementById('tradingview-chart-container-otc')
};

// Переводы
const translations = {
    en: {
        getSignal: "Get Signal",
        analyzing: "Analyzing market data...",
        processing: "Our algorithm is processing your request",
        direction: "Direction",
        marketClosed: "Market Closed",
        switchToOTC: "⇄ Trade OTC",
        nextOpen: "The market will open on",
        currencyPair: "Currency Pair",
        timeframe: "Timeframe",
        language: "Language"
    },
    ru: {
        getSignal: "Получить сигнал",
        analyzing: "Анализирую рыночные данные...",
        processing: "Наш алгоритм обрабатывает ваш запрос",
        direction: "Направление",
        marketClosed: "Рынок закрыт",
        switchToOTC: "⇄ Перейти на OTC",
        nextOpen: "Рынок откроется",
        currencyPair: "Валютная пара",
        timeframe: "Таймфрейм",
        language: "Язык"
    },
    uz: {
        getSignal: "Signal olish",
        analyzing: "Bozor ma'lumotlarini tahlil qilish...",
        processing: "Bizning algoritm so'rovingizni qayta ishlamoqda",
        direction: "Yo'nalish",
        marketClosed: "Bozor yopiq",
        switchToOTC: "⇄ OTC bozoriga o'tish",
        nextOpen: "Bozor ochiladi",
        currencyPair: "Valyuta juftligi",
        timeframe: "Vaqt oraligi",
        language: "Til"
    },
    ar: {
        getSignal: "الحصول على إشارة",
        analyzing: "جاري تحليل بيانات السوق...",
        processing: "الخوارزمية الخاصة بنا تعالج طلبك",
        direction: "الاتجاه",
        marketClosed: "السوق مغلق",
        switchToOTC: "⇄ التبديل إلى OTC",
        nextOpen: "سيفتح السوق في",
        currencyPair: "زوج العملات",
        timeframe: "الإطار الزمني",
        language: "اللغة"
    }
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

// Функция для получения локали TradingView
function getTradingViewLocale() {
    const langMap = {
        en: "en",
        ru: "ru",
        uz: "ru", // Uzbek не поддерживается, используем русский
        ar: "en"
    };
    return langMap[state.currentLanguage] || "en";
}

// Функция для создания/обновления графика
function updateTradingViewChart() {
    let pair, containerId, symbol, tvTimeframe;
    const market = state.currentMarket;

    if (market === 'otc') {
        // Для OTC используем последнюю стандартную пару
        pair = state.lastStandardPair;
        containerId = 'tradingview-chart-otc';
    } else {
        // Для стандартного рынка используем текущую пару
        pair = state.currentPair;
        // Запоминаем пару для OTC
        state.lastStandardPair = pair;
        containerId = 'tradingview-chart-standard';
    }

    // Проверяем доступность символа
    symbol = symbolMapping[pair] || symbolMapping[pair + ' OTC'] || null;
    
    // Проверяем доступность таймфрейма
    tvTimeframe = timeframeMapping[state.currentTimeframe];
    
    if (!symbol || !tvTimeframe) {
        console.warn(`Chart not available for ${pair} with timeframe ${state.currentTimeframe}`);
        return;
    }

    // Удаляем старый график если есть
    if (state.chartWidgets[market] !== null) {
        state.chartWidgets[market].remove();
        state.chartWidgets[market] = null;
    }

    // Создаем новый график
    state.chartWidgets[market] = new TradingView.widget({
        "container_id": containerId,
        "autosize": true,
        "symbol": symbol,
        "interval": tvTimeframe,
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1", // Candlestick
        "locale": getTradingViewLocale(), // Используем динамическую локаль
        "toolbar_bg": "#1e293b",
        "hide_top_toolbar": false,
        "allow_symbol_change": false,
        "studies": [],
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
    
    // Обновляем тексты
    elements.getSignalBtn.textContent = t.getSignal;
    elements.loadingText.textContent = t.analyzing;
    elements.loadingSubtext.textContent = t.processing;
    
    // Обновляем состояние рынка
    updateMarketStatus();
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация выпадающих списков
    updateTimeframeDropdown();
    
    elements.getSignalBtn.addEventListener('click', startSignalProcess);
    
    elements.currencyPair.addEventListener('change', (e) => {
        state.currentPair = e.target.value;
        
        // Обновляем только для стандартного рынка
        if (state.currentMarket === 'standard') {
            resetSignalDisplay();
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
            resetSignalDisplay();
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
            
            // Обновляем график при смене языка
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
            document.querySelectorAll('.market-tab').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            state.currentMarket = tab.dataset.market;
            updateInstruments(state.currentMarket);
            updateTimeframeDropdown();
            resetSignalDisplay();
            updateCooldownDisplay();
            updateMarketStatus();
            
            // Переключаем видимость графиков
            updateChartVisibility();
            updateTradingViewChart();
        });
    });
    
    updateInstruments('standard');
    document.querySelector('.market-tab[data-market="standard"]').classList.add('active');
    document.querySelector('.market-tab[data-market="otc"]').classList.remove('active');
    
    resetSignalDisplay();
    updateMarketStatus();
    
    // Инициализируем графики
    updateChartVisibility();
    updateTradingViewChart();
    
    state.cooldownInterval = setInterval(() => {
        updateMarketStatus();
        if (state.currentMarket !== 'standard' || isMarketOpen()) {
            updateCooldownDisplay();
        }
    }, 1000);
    
    // Инициализируем язык
    updateLanguage();
});

// Обновить выпадающий список таймфреймов
function updateTimeframeDropdown() {
    const tfList = timeframes[state.currentMarket];
    elements.timeframeDropdown.innerHTML = '';
    
    tfList.forEach(tf => {
        const div = document.createElement('div');
        div.dataset.value = tf;
        div.textContent = tf;
        
        // Подсветка активного таймфрейма
        if (tf === state.currentTimeframe) {
            div.classList.add('active');
        }
        
        elements.timeframeDropdown.appendChild(div);
    });
}

// Обновить статус рынка
function updateMarketStatus() {
    const lang = state.currentLanguage;
    const t = translations[lang];
    
    const isClosed = state.currentMarket === 'standard' && !isMarketOpen();
    
    if (isClosed) {
        elements.getSignalBtn.disabled = true;
        elements.getSignalBtn.textContent = t.marketClosed;
    } else {
        elements.getSignalBtn.disabled = false;
        elements.getSignalBtn.textContent = t.getSignal;
    }
}

// Начать процесс получения сигнала
function startSignalProcess() {
    if (state.currentMarket === 'standard' && !isMarketOpen()) {
        return;
    }
    
    const key = getCurrentKey();
    
    if (isOnCooldown(key)) {
        return;
    }
    
    showSignalLoading();
    
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
    
    setTimeout(() => {
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
            percentage: Math.floor(Math.random() * 14) + 83 // 83-96%
        };
        
        // Обновляем элементы сигнала
        elements.signalMessage.style.display = 'none';
        elements.signalResult.style.display = 'block';
        
        elements.signalAction.textContent = state.currentSignal.action;
        elements.signalAction.className = isBuy ? 'buy' : 'sell';
        
        elements.signalTimeRange.textContent = formatTimeWithSeconds(now);
        elements.signalPercentage.textContent = `${state.currentSignal.percentage}%`;
        
        startCooldown(key);
        updateCooldownDisplay();
        hideSignalLoading();
    }, delay);
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

// Обновить отображение cooldown
function updateCooldownDisplay() {
    const key = getCurrentKey();
    const cooldownEnd = state.cooldowns[key];
    const now = Date.now();
    const t = translations[state.currentLanguage];
    
    if (cooldownEnd && cooldownEnd > now) {
        const remaining = Math.max(0, cooldownEnd - now);
        const seconds = Math.ceil(remaining / 1000);
        
        // Убираем букву 's' - оставляем только цифры
        elements.getSignalBtn.textContent = `${t.getSignal} (${seconds})`;
        elements.getSignalBtn.disabled = true;
    } else {
        elements.getSignalBtn.textContent = t.getSignal;
        elements.getSignalBtn.disabled = false;
        
        // Сбрасываем отображение сигнала после таймера
        if (state.currentSignal) {
            resetSignalDisplay();
            state.currentSignal = null;
        }
    }
}

// Показать загрузку
function showSignalLoading() {
    elements.signalLoading.style.display = 'flex';
}

// Скрыть загрузку
function hideSignalLoading() {
    elements.signalLoading.style.display = 'none';
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

// Сбросить отображение сигнала
function resetSignalDisplay() {
    elements.signalMessage.style.display = 'none';
    elements.signalMessage.innerHTML = '';
    elements.signalResult.style.display = 'none';
    elements.signalAction.textContent = '--';
    elements.signalAction.className = '';
    elements.signalTimeRange.textContent = '';
    elements.signalPercentage.textContent = '';
    
    state.currentSignal = null; // Сбрасываем текущий сигнал
    
    updateCooldownDisplay();
    hideSignalLoading();
}