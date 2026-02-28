let currentLang = "en";
let vipToastTimer = null;
let signalLoadingTextTimer = null;

const LOADING_PHRASES = {
    ru: [
        { title: "Анализируем рынок…", sub: "Проверяем волатильность, ликвидность и качество входа" },
        { title: "Проверяем волатильность…", sub: "Смотрим импульсы, спред и шумовые зоны" },
        { title: "Сканируем ликвидность…", sub: "Ищем кластеры и возможные выносы" },
        { title: "Подтверждаем сетап…", sub: "Сопоставляем режим рынка и риск-профиль" },
    ],
    en: [
        { title: "Analyzing the market…", sub: "Checking volatility, liquidity and entry quality" },
        { title: "Checking volatility…", sub: "Watching impulses, spread and noisy zones" },
        { title: "Scanning liquidity…", sub: "Looking for clusters and liquidity sweeps" },
        { title: "Confirming setup…", sub: "Matching regime and risk profile" },
    ],
    es: [
        { title: "Analizando el mercado…", sub: "Revisamos volatilidad, liquidez y calidad de entrada" },
        { title: "Comprobando volatilidad…", sub: "Miramos impulsos, spread y zonas ruidosas" },
        { title: "Escaneando liquidez…", sub: "Buscamos clusters y barridos de liquidez" },
        { title: "Confirmando setup…", sub: "Ajustamos régimen y perfil de riesgo" },
    ],
    hi: [
        { title: "Market analyze कर रहे हैं…", sub: "Volatility, liquidity aur entry quality check हो रही है" },
        { title: "Volatility check…", sub: "Impulse, spread aur noisy zones देख रहे हैं" },
        { title: "Liquidity scan…", sub: "Clusters aur liquidity sweeps ढूंढ रहे हैं" },
        { title: "Setup confirm…", sub: "Regime aur risk profile match कर रहे हैं" },
    ],
};

function stopSignalLoadingText() {
    if (signalLoadingTextTimer) clearTimeout(signalLoadingTextTimer);
    signalLoadingTextTimer = null;
}

function startSignalLoadingText(titleEl, subEl) {
    stopSignalLoadingText();

    const phrases = LOADING_PHRASES[currentLang] || LOADING_PHRASES.en;
    let idx = 0;

    const swap = (next) => {
        titleEl.classList.add("is-swap");
        subEl.classList.add("is-swap");

        setTimeout(() => {
            titleEl.textContent = next.title;
            subEl.textContent = next.sub;
            titleEl.classList.remove("is-swap");
            subEl.classList.remove("is-swap");
        }, 160);
    };

    swap(phrases[0]);

    const loop = () => {
        idx = (idx + 1) % phrases.length;
        swap(phrases[idx]);
        signalLoadingTextTimer = setTimeout(loop, 400 + Math.random() * 200);
    };

    signalLoadingTextTimer = setTimeout(loop, 450);
}

function injectGlobalFixStyles() {
    const id = "GTPO-fix-styles-v3";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
    [hidden]{ display:none !important; }

    .signal-stat{ display:flex; flex-direction:column; }
    .signal-stat-label{ line-height:1.2; min-height:2.4em; }
    .signal-stat-value{ margin-top:auto; }

    .picker-row-titleline{
      display:flex;
      align-items:center;
      gap:10px;
      flex-wrap:wrap;
    }
    .model-badge{
      font-size:10px;
      letter-spacing:.08em;
      text-transform:uppercase;
      padding:5px 10px;
      border-radius:999px;
      border:1px solid rgba(252,211,77,.9);
      color:rgba(252,211,77,1);
      background:rgba(252,211,77,.10);
      box-shadow:0 10px 24px rgba(0,0,0,.35);
      white-space:nowrap;
    }
    .model-badge--popular{
      background:
        radial-gradient(circle at 0% 0%, rgba(252,211,77,0.22), transparent 60%),
        rgba(15,23,42,0.98);
    }

    .signal-modal__dialog.is-loading > :not(.signal-modal__handle):not([data-signal-loading]){
      display:none !important;
    }
    .signal-modal__dialog.is-loading [data-signal-loading]{
      display:block !important;
    }

    .signal-loading{
      text-align:center;
      padding: 18px 10px 10px;
    }
    .signal-loading-title{
      font-size: 20px;
      font-weight: 650;
      margin-top: 6px;
      transition: opacity .18s ease, transform .18s ease;
    }
    .signal-loading-sub{
      font-size: 14px;
      color: rgba(156,163,175,0.9);
      margin-top: 8px;
      line-height: 1.4;
      transition: opacity .18s ease, transform .18s ease;
    }
    .signal-loading-title.is-swap,
    .signal-loading-sub.is-swap{
      opacity:0;
      transform: translateY(2px);
    }
    .signal-loading .analyzer-loader{
      margin-top: 16px;
      justify-content: center;
    }
  `;
    document.head.appendChild(style);
}

const I18N = {
    en: {
        summary: { label: "BOT TURNOVER TODAY" },
        mode: { home: "Home", trading: "Trading" },
        favorites: {
            title: "Favorites",
            seeAll: "See all",
            seeLess: "See less",
            otcHint: "OTC · available 24/7",
            regHint: "REGULAR · closed on weekends",
            favOnly: "Favorites only",
        },
        info: {
            title: "GTPO AI",
            cards: [
                {
                    id: "models",
                    label: "VIP AI MODELS",
                    title: "GTPO Orion, Mega and Unity",
                    text: "How the models are trained and how VIP mode differs from basic.",
                    modalTag: "VIP AI MODELS",
                    modalTitle: "Orion, Mega, Atlas & Unity — trading cores",
                    modalHtml: `
            <p>VIP users get access to additional cores and filters.</p>
            <ul>
              <li><strong>Orion v3</strong> — trend & micro-pullbacks.</li>
              <li><strong>Mega</strong> — impulses and liquidity sweeps.</li>
              <li><strong>Atlas</strong> — risk profiling and discipline filters.</li>
              <li><strong>Unity</strong> — adaptive core with news awareness.</li>
            </ul>
          `,
                },
                {
                    id: "bot",
                    label: "HOW THE BOT WORKS",
                    title: "GTPO Trading Core architecture",
                    text: "Filtered signals, risk-management and protection from noisy setups.",
                    modalTag: "WHY OUR BOT",
                    modalTitle: "GTPO Trading Core — engine of the mini app",
                    modalHtml: `
            <p><strong>GTPO Trading Core</strong> ingests quotes and discards setups that fail quality checks.</p>
            <ul>
              <li><strong>Multi-level filters</strong> by volatility, spread and market phase.</li>
              <li><strong>Anti-noise</strong> on news and thin liquidity.</li>
              <li><strong>Transparent risk</strong> without martingale.</li>
            </ul>
          `,
                },
                {
                    id: "pocket",
                    label: "POCKET OPTION",
                    title: "Focus on a single exchange",
                    text: "Why we chose Pocket Option and how AI adapts to its liquidity.",
                    modalTag: "WHY POCKET OPTION",
                    modalTitle: "Deep specialization instead of shallow multi-broker",
                    modalHtml: `
            <p>We focus on <strong>Pocket Option</strong> to model its liquidity and gaps precisely.</p>
          `,
                },
            ],
        },
        faq: {
            title: "FAQ",
            items: [
                {
                    q: "How does the bot generate signals?",
                    a: `<p>GTPO analyzes market data and keeps only setups that pass risk and entry-quality filters.</p>`,
                },
                {
                    q: "What does VIP status give in the mini app?",
                    a: `<p>VIP unlocks more sensitive cores and additional filters.</p>`,
                },
                {
                    q: "Is this safe for my deposit?",
                    a: `<p>The bot doesn’t have access to your account. Still, trading involves risk.</p>`,
                },
                {
                    q: "Do I need trading experience to use the bot?",
                    a: `<p>Signals are simplified: “asset → direction → expiry → risk”.</p>`,
                },
            ],
        },
        trading: {
            pairLabel: "Currency pair",
            pairPlaceholder: "Choose pair",
            timeLabel: "Expiry time",
            timePlaceholder: "Choose time",
            modelLabel: "AI model",
            modelPlaceholder: "Choose model",
            submit: "Get signal",
        },
        picker: {
            pairTitle: "Currency pair",
            pairSubtitle: "All Pocket Option assets: currencies, crypto, commodities, stocks and indices.",
            timeTitle: "Expiry time",
            timeSubtitle: "Pick the horizon the models were trained for.",
            modelTitle: "AI model",
            modelSubtitle: "AI core combination for this signal.",
            searchPlaceholder: "Search",
            nothingFound: "Nothing found",
            marketColLeft: "ASSETS",
            marketColRight: "MARKET",
            favOnly: "Favorites only",
            otcBadge: "OTC",
            regBadge: "REG",
            otcDesc: "OTC · available 24/7",
            regDesc: "REGULAR · unavailable on weekends",
            vipBadge: "VIP",
            vipOnlyDesc: "Available in VIP",
            vipOnlyToast: "This option is available only with VIP status.",
            popularBadge: "Users' choice",
            modelDescriptions: {
                orion: "Scans trend strength and micro pullbacks.",
                mega: "Finds impulses, volume clusters and liquidity sweeps.",
                atlas: "Builds risk profile and filters emotional trades.",
                unity: "Accounts for news, corrects after mistakes and adapts trading to the user.",
            },
        },
        analyzer: {
            label: "AI analyzer",
            statusIdle: "Waiting for parameters",
            statusActive: "Analyzing…",
            statusDone: "Signal prepared",
            idleLine1: "Select pair, expiry and AI model to see how GTPO core reacts.",
            idleLine2: "The analyzer always shows which patterns the engine is focusing on.",
            modelLines: {
                orion: [
                    "Scans trend strength and micro pullbacks on the selected asset.",
                    "Cuts noisy zones and keeps only clean continuations.",
                ],
                mega: [
                    "Looks for impulse candles, volume clusters and liquidity sweeps.",
                    "Skips chaotic spikes and news gaps with unstable spreads.",
                ],
                atlas: [
                    "Builds a risk profile from daily stats and recent streak quality.",
                    "Adjusts signal load to keep discipline under control.",
                ],
                unity: [
                    "Analyzes politics & news, learns from past trades and adapts to trader latency.",
                    "Corrects after mistakes and personalizes the strategy.",
                ],
            },
        },
        signal: {
            label: "AI signal",
            directionBuy: "BUY",
            directionSell: "SELL",
            confidenceLabel: "Confidence",
            accuracyLabel: "Backtest accuracy",
            marketLabel: "Market",
            expiryLabel: "Expiry",
            issuedLabel: "Issued",
            validUntilLabel: "Valid until",
            riskLabel: "Risk",
            riskLow: "Low",
            riskMedium: "Medium",
            riskHigh: "High",
            note: "Open Pocket Option, copy pair, direction and expiry and keep risk per trade within your plan.",
            backToForm: "Back to form",
            repeat: "Repeat",
            loadingPairs: [
                ["Analyzing market…", "Checking volatility and entry quality"],
                ["Scanning liquidity…", "Measuring spread stability"],
                ["Filtering noise…", "Validating patterns and regime"],
            ],
        },
    },

    ru: {
        summary: { label: "ОБОРОТ БОТА ЗА СЕГОДНЯ" },
        mode: { home: "Главная", trading: "Трейдинг" },
        favorites: {
            title: "Избранное",
            seeAll: "Показать все",
            seeLess: "Свернуть",
            otcHint: "OTC · доступно 24/7",
            regHint: "REGULAR · недоступно в выходные",
            favOnly: "Только избранное",
        },
        info: {
            title: "GTPO AI",
            cards: [
                {
                    id: "models",
                    label: "VIP AI-МОДЕЛИ",
                    title: "Orion, Mega, Atlas и Unity",
                    text: "Как устроены ядра, откуда берутся данные и чем VIP-режим отличается от базового.",
                    modalTag: "VIP AI",
                    modalTitle: "Orion, Mega, Atlas и Unity — ядра генерации",
                    modalHtml: `
            <p>VIP-режим открывает дополнительные ядра и фильтры.</p>
            <ul>
              <li><strong>Orion v3</strong> — тренд и микрокоррекции.</li>
              <li><strong>Mega</strong> — импульсы и ликвидность.</li>
              <li><strong>Atlas</strong> — риск-профиль и дисциплина.</li>
              <li><strong>Unity</strong> — адаптивное ядро с учётом новостей.</li>
            </ul>
          `,
                },
                {
                    id: "bot",
                    label: "КАК УСТРОЕН БОТ",
                    title: "Архитектура GTPO Trading Core",
                    text: "Отфильтрованные сигналы, риск-менеджмент и защита от шумовых сделок.",
                    modalTag: "ПОЧЕМУ НАШ БОТ",
                    modalTitle: "GTPO Trading Core — серверное ядро мини-бота",
                    modalHtml: `
            <p>Ядро принимает поток котировок и отбрасывает всё, что не проходит по качеству.</p>
            <ul>
              <li><strong>Фильтры</strong> по волатильности, спреду и фазе рынка.</li>
              <li><strong>Анти-шум</strong> на новостях и тонком рынке.</li>
              <li><strong>Риск</strong> без мартина и догонов.</li>
            </ul>
          `,
                },
                {
                    id: "pocket",
                    label: "POCKET OPTION",
                    title: "Фокус на одной бирже",
                    text: "Почему мы выбрали Pocket Option и как AI подстраивается под её ликвидность.",
                    modalTag: "ПОЧЕМУ POCKET OPTION",
                    modalTitle: "Специализация на одной бирже вместо десятка поверхностных",
                    modalHtml: `
            <p>Мы фокусируем GTPO AI на <strong>Pocket Option</strong>, чтобы точнее моделировать ликвидность и гэпы.</p>
          `,
                },
            ],
        },
        faq: {
            title: "FAQ",
            items: [
                { q: "Как бот генерирует сигналы?", a: `<p>GTPO анализирует рынок и оставляет только те сетапы, которые прошли фильтры по риску и качеству входа.</p>` },
                { q: "Что даёт VIP-статус в мини-апп?", a: `<p>VIP открывает доступ к дополнительным ядрам и более тонким фильтрам.</p>` },
                { q: "Насколько это безопасно для депозита?", a: `<p>Бот не имеет доступа к вашему счёту и не совершает сделки за вас. Любая торговля связана с риском.</p>` },
                { q: "Нужен ли опыт в трейдинге?", a: `<p>Сигналы подаются просто: «актив → направление → экспирация → риск».</p>` },
            ],
        },
        trading: {
            pairLabel: "Валютная пара",
            pairPlaceholder: "Выберите пару",
            timeLabel: "Время экспирации",
            timePlaceholder: "Выберите время",
            modelLabel: "AI-модель",
            modelPlaceholder: "Выберите модель",
            submit: "Получить сигнал",
        },
        picker: {
            pairTitle: "Валютная пара",
            pairSubtitle: "Все активы Pocket Option: валюты, крипто, сырьё, акции и индексы.",
            timeTitle: "Время экспирации",
            timeSubtitle: "Выберите таймфрейм, под который обучались модели.",
            modelTitle: "AI-модель",
            modelSubtitle: "Комбинация AI-ядра для генерации сигнала.",
            searchPlaceholder: "Поиск",
            nothingFound: "Ничего не найдено",
            marketColLeft: "АКТИВЫ",
            marketColRight: "РЫНОК",
            favOnly: "Только избранное",
            otcBadge: "OTC",
            regBadge: "REG",
            otcDesc: "OTC · доступно 24/7",
            regDesc: "REGULAR · недоступен в выходные",
            vipBadge: "VIP",
            vipOnlyDesc: "Доступно в VIP-режиме",
            vipOnlyToast: "Эта опция доступна только с VIP-статусом в боте GTPO.",
            popularBadge: "Выбор пользователей",
            modelDescriptions: {
                orion: "Сканирует силу тренда и микрокоррекции по активу.",
                mega: "Ищет импульсы, кластеры объёма и выносы ликвидности.",
                atlas: "Строит риск-профиль и отсекает эмоциональные входы.",
                unity: "Учитывает новости, корректирует алгоритмы после ошибок и адаптирует торговлю под пользователя",
            },
        },
        analyzer: {
            label: "AI-анализатор",
            statusIdle: "Ждём параметры",
            statusActive: "Идёт анализ…",
            statusDone: "Сигнал готов",
            idleLine1: "Выберите актив, экспирацию и AI-модель — покажем, как реагирует ядро.",
            idleLine2: "Анализатор показывает, на какие паттерны сейчас смотрит система.",
            modelLines: {
                orion: [
                    "Сканирует силу тренда и микрокоррекции по выбранному активу.",
                    "Отсекает шум и оставляет чистые продолжения движения.",
                ],
                mega: [
                    "Ищет импульсные свечи, кластеры объёма и выносы ликвидности.",
                    "Пропускает хаотичные шпильки и новостные гэпы с нестабильным спредом.",
                ],
                atlas: [
                    "Строит риск-профиль по дневной статистике и качеству последних серий.",
                    "Подстраивает нагрузку по риску, чтобы убрать эмоциональные входы.",
                ],
                unity: [
                    "Анализирует политику и новости, обучается на прошлых сделках и подстраивается под задержку трейдера",
                    "Корректирует алгоритмы после ошибок и адаптирует торговлю под пользователя.",
                ],
            },
        },
        signal: {
            label: "AI-сигнал",
            directionBuy: "ПОКУПКА",
            directionSell: "ПРОДАЖА",
            confidenceLabel: "Уверенность",
            accuracyLabel: "Точность на истории",
            marketLabel: "Рынок",
            expiryLabel: "Экспирация",
            issuedLabel: "Выдан",
            validUntilLabel: "Действителен до",
            riskLabel: "Риск",
            riskLow: "Низкий",
            riskMedium: "Средний",
            riskHigh: "Высокий",
            note: "Открой Pocket Option, скопируй актив, направление и экспирацию и держи риск на сделку в рамках своего плана.",
            backToForm: "Назад к форме",
            repeat: "Повторить",
            loadingPairs: [
                ["Анализируем рынок…", "Проверяем волатильность, ликвидность и качество входа"],
                ["Сканируем ликвидность…", "Оцениваем стабильность спреда и шумовые зоны"],
                ["Фильтруем новости…", "Проверяем паттерны и режим рынка"],
            ],
        },
    },

    es: {
        summary: { label: "VOLUMEN DEL BOT HOY" },
        mode: { home: "Inicio", trading: "Trading" },
        favorites: {
            title: "Favoritos",
            seeAll: "Ver todo",
            seeLess: "Ocultar",
            otcHint: "OTC · disponible 24/7",
            regHint: "REGULAR · cerrado fines de semana",
            favOnly: "Solo favoritos",
        },
        info: {
            title: "GTPO AI",
            cards: [
                {
                    id: "models",
                    label: "MODELOS VIP AI",
                    title: "Orion, Mega, Atlas y Unity",
                    text: "Modelos, datos y diferencia entre VIP y básico.",
                    modalTag: "VIP AI",
                    modalTitle: "Cores: Orion, Mega, Atlas y Unity",
                    modalHtml: `<p>VIP desbloquea cores adicionales y filtros.</p>`,
                },
                {
                    id: "bot",
                    label: "CÓMO FUNCIONA EL BOT",
                    title: "Arquitectura GTPO Trading Core",
                    text: "Señales filtradas, gestión de riesgo y protección contra ruido.",
                    modalTag: "POR QUÉ NUESTRO BOT",
                    modalTitle: "GTPO Trading Core — motor del mini-bot",
                    modalHtml: `<p>Recibe precios y descarta lo que no pasa filtros.</p>`,
                },
                {
                    id: "pocket",
                    label: "POCKET OPTION",
                    title: "Especialización en un solo bróker",
                    text: "Por qué elegimos Pocket Option.",
                    modalTag: "POCKET OPTION",
                    modalTitle: "Foco profundo en un bróker",
                    modalHtml: `<p>Nos centramos en Pocket Option para mayor precisión.</p>`,
                },
            ],
        },
        faq: {
            title: "FAQ",
            items: [
                { q: "¿Cómo genera señales el bot?", a: `<p>Analiza el mercado y filtra setups.</p>` },
                { q: "¿Qué ofrece VIP?", a: `<p>Más cores y filtros.</p>` },
                { q: "¿Es seguro?", a: `<p>No opera por ti, pero hay riesgo.</p>` },
                { q: "¿Necesito experiencia?", a: `<p>Señal simple: activo → dirección → expiración → riesgo.</p>` },
            ],
        },
        trading: {
            pairLabel: "Par de divisas",
            pairPlaceholder: "Elige par",
            timeLabel: "Tiempo de expiración",
            timePlaceholder: "Elige tiempo",
            modelLabel: "Modelo AI",
            modelPlaceholder: "Elige modelo",
            submit: "Obtener señal",
        },
        picker: {
            pairTitle: "Par de divisas",
            pairSubtitle: "Todos los activos de Pocket Option: divisas, cripto, materias primas, acciones e índices.",
            timeTitle: "Tiempo de expiración",
            timeSubtitle: "Elige el marco temporal para el que se entrenaron los modelos.",
            modelTitle: "Modelo AI",
            modelSubtitle: "Combinación de núcleos AI para esta señal.",
            searchPlaceholder: "Buscar",
            nothingFound: "No se encontró nada",
            marketColLeft: "ACTIVOS",
            marketColRight: "MERCADO",
            favOnly: "Solo favoritos",
            otcBadge: "OTC",
            regBadge: "REG",
            otcDesc: "OTC · disponible 24/7",
            regDesc: "REGULAR · no disponible fines de semana",
            vipBadge: "VIP",
            vipOnlyDesc: "Disponible en VIP",
            vipOnlyToast: "Disponible solo con estado VIP.",
            popularBadge: "Popular",
            modelDescriptions: {
                orion: "Escanea tendencia y micro retrocesos.",
                mega: "Impulsos, clusters de volumen y barridos de liquidez.",
                atlas: "Perfil de riesgo y filtros de disciplina.",
                unity: "Cuenta noticias, corrige tras errores y adapta al usuario.",
            },
        },
        analyzer: {
            label: "Analizador AI",
            statusIdle: "Esperando parámetros",
            statusActive: "Analizando…",
            statusDone: "Señal lista",
            idleLine1: "Elige activo, expiración y modelo AI.",
            idleLine2: "El analizador muestra en qué patrones se centra el motor.",
            modelLines: {
                orion: ["Escanea tendencia y micro retrocesos.", "Filtra ruido y deja continuaciones limpias."],
                mega: ["Busca impulsos y liquidez.", "Omite picos caóticos y gaps de noticias."],
                atlas: ["Construye perfil de riesgo.", "Ajusta carga para disciplina."],
                unity: ["Analiza noticias/política y aprende de trades.", "Se adapta al usuario y corrige errores."],
            },
        },
        signal: {
            label: "Señal AI",
            directionBuy: "COMPRA",
            directionSell: "VENTA",
            confidenceLabel: "Confianza",
            accuracyLabel: "Precisión histórica",
            marketLabel: "Mercado",
            expiryLabel: "Expiración",
            issuedLabel: "Emitida",
            validUntilLabel: "Válida hasta",
            riskLabel: "Riesgo",
            riskLow: "Bajo",
            riskMedium: "Medio",
            riskHigh: "Alto",
            note: "Abre Pocket Option, copia activo, dirección y expiración y mantén el riesgo por operación dentro de tu plan.",
            backToForm: "Volver",
            repeat: "Repetir",
            loadingPairs: [
                ["Analizando mercado…", "Comprobando volatilidad y entrada"],
                ["Escaneando liquidez…", "Midiendo estabilidad del spread"],
                ["Filtrando ruido…", "Validando patrones"],
            ],
        },
    },

    hi: {
        summary: { label: "आज का BOT वॉल्यूम" },
        mode: { home: "होम", trading: "ट्रेडिंग" },
        favorites: {
            title: "फ़ेवरेट",
            seeAll: "सब दिखाओ",
            seeLess: "कम दिखाओ",
            otcHint: "OTC · 24/7 उपलब्ध",
            regHint: "REGULAR · वीकेंड पर बंद",
            favOnly: "केवल फ़ेवरेट",
        },
        info: {
            title: "GTPO AI",
            cards: [
                { id: "models", label: "VIP AI मॉडल", title: "Orion, Mega, Atlas, Unity", text: "VIP में extra cores और filters.", modalTag: "VIP AI", modalTitle: "Trading cores", modalHtml: `<p>VIP unlocks more cores & filters.</p>` },
                { id: "bot", label: "BOT कैसे काम करता है", title: "GTPO Trading Core", text: "Filtered signals, risk-management.", modalTag: "WHY", modalTitle: "Core engine", modalHtml: `<p>Price stream -> filters -> signal.</p>` },
                { id: "pocket", label: "POCKET OPTION", title: "एक broker पर focus", text: "Pocket Option specialization.", modalTag: "POCKET", modalTitle: "Deep focus", modalHtml: `<p>Better modeling & stability.</p>` },
            ],
        },
        faq: {
            title: "FAQ",
            items: [
                { q: "Signals कैसे बनते हैं?", a: `<p>Market analyze + filters.</p>` },
                { q: "VIP क्या देता है?", a: `<p>Extra cores & filters.</p>` },
                { q: "Safe है?", a: `<p>Bot trade नहीं करता, फिर भी risk है.</p>` },
                { q: "Experience चाहिए?", a: `<p>Simple signal format.</p>` },
            ],
        },
        trading: {
            pairLabel: "करेंसी pair",
            pairPlaceholder: "पैर चुनें",
            timeLabel: "Expiry time",
            timePlaceholder: "Time चुनें",
            modelLabel: "AI मॉडल",
            modelPlaceholder: "मॉडल चुनें",
            submit: "सिग्नल लो",
        },
        picker: {
            pairTitle: "करेंसी pair",
            pairSubtitle: "Pocket Option के सारे assets: forex, crypto, commodities, stocks, indices.",
            timeTitle: "Expiry time",
            timeSubtitle: "Timeframe चुनें जिस पर models train हुए हैं।",
            modelTitle: "AI मॉडल",
            modelSubtitle: "इस trade के लिए AI core चुनें।",
            searchPlaceholder: "सर्च",
            nothingFound: "कुछ नहीं मिला",
            marketColLeft: "ASSETS",
            marketColRight: "MARKET",
            favOnly: "केवल फ़ेवरेट",
            otcBadge: "OTC",
            regBadge: "REG",
            otcDesc: "OTC · 24/7",
            regDesc: "REGULAR · weekend बंद",
            vipBadge: "VIP",
            vipOnlyDesc: "सिर्फ़ VIP में उपलब्ध",
            vipOnlyToast: "यह option सिर्फ़ VIP में है.",
            popularBadge: "Popular",
            modelDescriptions: {
                orion: "Trend और micro pullbacks scan करता है।",
                mega: "Impulses और liquidity sweeps detect करता है।",
                atlas: "Risk profile बनाता है और discipline filter करता है।",
                unity: "News aware, mistakes के बाद adapt और user-based tuning.",
            },
        },
        analyzer: {
            label: "AI analyser",
            statusIdle: "Parameters चुनो",
            statusActive: "Analysis चल रहा है…",
            statusDone: "Signal ready",
            idleLine1: "Asset, expiry और AI model चुनो।",
            idleLine2: "Analyser बताता है system किस pattern पर focus है।",
            modelLines: {
                orion: ["Trend strength और pullbacks देखता है।", "Noise zones cut होते हैं।"],
                mega: ["Impulses और volume clusters track करता है।", "Random spikes ignore करता है।"],
                atlas: ["Risk profile build करता है।", "Emotional trades filter करता है।"],
                unity: ["News/politics analyze और past trades से सीखता है।", "User latency के हिसाब से adapt करता है।"],
            },
        },
        signal: {
            label: "AI signal",
            directionBuy: "BUY",
            directionSell: "SELL",
            confidenceLabel: "Confidence",
            accuracyLabel: "Backtest",
            marketLabel: "Market",
            expiryLabel: "Expiry",
            issuedLabel: "Issued",
            validUntilLabel: "Valid till",
            riskLabel: "Risk",
            riskLow: "Low",
            riskMedium: "Medium",
            riskHigh: "High",
            note: "Pocket Option खोलो, pair, direction और expiry copy करो और प्रति trade risk अपने प्लान में रखो।",
            backToForm: "वापस",
            repeat: "Repeat",
            loadingPairs: [
                ["Market analyze…", "Volatility check…"],
                ["Liquidity scan…", "Spread stability…"],
                ["Noise filter…", "Pattern validate…"],
            ],
        },
    },
};

function t(path) {
    const dict = I18N[currentLang] || I18N.en;
    const parts = path.split(".");
    let cur = dict;
    for (const p of parts) {
        if (cur && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p];
        else return path;
    }
    return cur;
}

function applyLanguage() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (!key) return;
        const val = t(key);
        const attr = el.getAttribute("data-i18n-attr");
        if (attr === "html") el.innerHTML = val;
        else if (attr) el.setAttribute(attr, val);
        else el.textContent = val;
    });

    if (window.GTPOInfoCardsUpdate) window.GTPOInfoCardsUpdate();
    if (window.GTPOFaqUpdate) window.GTPOFaqUpdate();
    if (window.GTPOFavoritesUpdate) window.GTPOFavoritesUpdate();
    if (window.GTPOTradingLangUpdate) window.GTPOTradingLangUpdate();
}

function showVipToast() {
    const toast = document.querySelector("[data-vip-toast]");
    if (!toast) return;

    const dictPicker = (I18N[currentLang] || I18N.en).picker;
    const msg =
        dictPicker.vipOnlyToast ||
        dictPicker.vipOnlyDesc ||
        "Available only with VIP status.";

    toast.textContent = msg;
    toast.classList.add("is-visible");
    if (vipToastTimer) clearTimeout(vipToastTimer);
    vipToastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

document.addEventListener("DOMContentLoaded", () => {
    injectGlobalFixStyles();

    try {
        const saved = localStorage.getItem("GTPO_lang");
        if (saved && I18N[saved]) currentLang = saved;
    } catch {}

    setupDailyTurnover();
    setupFavorites();
    setupInfoCards();
    setupFaqAccordion();
    setupTradingForm();
    setupModeToggle();
    setupLanguageSwitcher();

    applyLanguage();
});

function setupLanguageSwitcher() {
    const switcher = document.querySelector(".language-switcher");
    if (!switcher) return;
    const buttons = Array.from(switcher.querySelectorAll(".lang-option"));
    if (!buttons.length) return;

    function movePill(target) {
        const left = target.offsetLeft;
        const width = target.offsetWidth;
        switcher.style.setProperty("--lang-pill-x", left + "px");
        switcher.style.setProperty("--lang-pill-w", width + "px");
    }

    function setActiveByLang(lang) {
        const btn = buttons.find((b) => b.dataset.lang === lang) || buttons[0];
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
        if (btn) movePill(btn);
    }

    setActiveByLang(currentLang);

    switcher.addEventListener("click", (e) => {
        const btn = e.target;
        if (!(btn instanceof HTMLElement)) return;
        if (!btn.classList.contains("lang-option")) return;
        const lang = btn.dataset.lang;
        if (!lang || !I18N[lang]) return;

        currentLang = lang;
        try {
            localStorage.setItem("GTPO_lang", lang);
        } catch {}

        setActiveByLang(lang);
        applyLanguage();
    });

    window.addEventListener("resize", () => {
        const active = switcher.querySelector(".lang-option.is-active") || buttons[0];
        if (active) movePill(active);
    });
}

function setupModeToggle() {
    const track = document.querySelector(".mode-toggle-track");
    if (!track) return;
    const buttons = Array.from(track.querySelectorAll(".mode-option"));
    if (!buttons.length) return;

    function movePill(target) {
        const left = target.offsetLeft;
        const width = target.offsetWidth;
        track.style.setProperty("--mode-pill-x", left + "px");
        track.style.setProperty("--mode-pill-w", width + "px");
    }

    function toggleModeSections(mode) {
        document.querySelectorAll("[data-mode-section]").forEach((sec) => {
            const secMode = sec.getAttribute("data-mode-section");
            sec.style.display = secMode === mode ? "" : "none";
        });
    }

    function setActiveMode(mode) {
        buttons.forEach((btn) => {
            const isActive = btn.dataset.mode === mode;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-selected", isActive ? "true" : "false");
            if (isActive) movePill(btn);
        });
        toggleModeSections(mode);
    }

    const initial = track.querySelector(".mode-option.is-active") || buttons[0];
    if (initial) setActiveMode(initial.dataset.mode || "home");

    track.addEventListener("click", (e) => {
        const btn = e.target;
        if (!(btn instanceof HTMLElement)) return;
        if (!btn.classList.contains("mode-option")) return;
        const mode = btn.dataset.mode;
        if (!mode) return;
        setActiveMode(mode);
    });

    window.addEventListener("resize", () => {
        const current = track.querySelector(".mode-option.is-active") || buttons[0];
        if (current) movePill(current);
    });
}

function setupDailyTurnover() {
    const valueEl = document.querySelector(".js-balance-value");
    const changeEl = document.querySelector(".js-balance-change");
    const changeAmountEl = document.querySelector(".js-balance-change-amount");
    if (!valueEl || !changeEl || !changeAmountEl) return;

    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const START_BASE = 1500;
    const DAILY_GROWTH = 45;
    const startDateUTC = Date.UTC(2024, 0, 1);

    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const mskMs = utcMs + 3 * 60 * 60 * 1000;
    const dayIndex = Math.max(0, Math.floor((mskMs - startDateUTC) / MS_PER_DAY));
    const prevDayIndex = Math.max(0, dayIndex - 1);

    function valueForDay(i) {
        const noise = (Math.sin(i * 1.7) + Math.sin(i * 0.4)) * 5;
        return START_BASE + i * DAILY_GROWTH + noise;
    }

    const today = valueForDay(dayIndex);
    const yesterday = valueForDay(prevDayIndex);
    const diff = today - yesterday;
    const pct = yesterday > 0 ? (diff / yesterday) * 100 : 0;

    valueEl.textContent = formatUsd(today);
    changeEl.textContent = (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%";
    changeAmountEl.textContent = (diff >= 0 ? "+" : "") + diff.toFixed(2);

    function formatUsd(v) {
        return v.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
}

function setupFavorites() {
    const listEl = document.querySelector(".asset-list");
    const seeAllBtn = document.querySelector(".see-all-btn");
    if (!listEl || !seeAllBtn) return;

    const assets = [
        { id: "btc", name: "Bitcoin", symbol: "BTC", coingeckoId: "bitcoin", icon: "btc", price: 47609.89, change: 8.29 },
        { id: "eth", name: "Ethereum", symbol: "ETH", coingeckoId: "ethereum", icon: "eth", price: 1442.2, change: 2.55 },
        { id: "cro", name: "Cronos", symbol: "CRO", coingeckoId: "crypto-com-chain", icon: "cro", price: 0.1719, change: 1.84 },
        { id: "ltc", name: "Litecoin", symbol: "LTC", coingeckoId: "litecoin", icon: "ltc", price: 167.85, change: 2.02 },
        { id: "sol", name: "Solana", symbol: "SOL", coingeckoId: "solana", icon: "sol", price: 112.34, change: 3.12 },
        { id: "xrp", name: "XRP", symbol: "XRP", coingeckoId: "ripple", icon: "xrp", price: 0.58, change: 0.92 },
        { id: "ada", name: "Cardano", symbol: "ADA", coingeckoId: "cardano", icon: "ada", price: 0.42, change: -1.23 },
        { id: "dot", name: "Polkadot", symbol: "DOT", coingeckoId: "polkadot", icon: "dot", price: 7.16, change: 2.11 },
        { id: "link", name: "Chainlink", symbol: "LINK", coingeckoId: "chainlink", icon: "link", price: 13.87, change: 4.02 },
        { id: "avax", name: "Avalanche", symbol: "AVAX", coingeckoId: "avalanche-2", icon: "avax", price: 32.44, change: -0.64 },
    ];

    let expanded = false;

    function formatPrice(v) {
        const decimals = v < 1 ? 4 : 2;
        return v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    }

    function generateSparklinePoints() {
        const width = 80;
        const height = 32;
        const steps = 20;
        const pts = [];
        let y = height * 0.5;
        for (let i = 0; i < steps; i++) {
            const x = (i / (steps - 1)) * width;
            const dy = (Math.random() - 0.5) * 2.4;
            y += dy;
            const minY = height * 0.3;
            const maxY = height * 0.8;
            y = Math.max(minY, Math.min(maxY, y));
            pts.push(x.toFixed(1) + "," + y.toFixed(1));
        }
        return pts.join(" ");
    }

    function render() {
        listEl.innerHTML = "";
        const limit = expanded ? assets.length : 4;
        const slice = assets.slice(0, limit);

        slice.forEach((asset) => {
            const card = document.createElement("article");
            card.className = "asset-card";
            card.setAttribute("data-asset-id", asset.id);

            const svgId = `spark-${asset.id}`;
            card.innerHTML = `
        <div class="asset-main">
          <div class="asset-icon">
            <img src="src/assets/icon/${asset.icon}.svg" alt="${asset.symbol}" />
          </div>
          <div class="asset-labels">
            <span class="asset-name">${asset.name}</span>
            <span class="asset-symbol">${asset.symbol}</span>
          </div>
        </div>
        <div class="asset-chart">
          <svg class="sparkline" viewBox="0 0 80 32" preserveAspectRatio="none">
            <polyline id="${svgId}" fill="none" stroke="url(#grad-${asset.id})" stroke-width="1.2" points="" />
            <defs>
              <linearGradient id="grad-${asset.id}" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#60a5fa" />
                <stop offset="100%" stop-color="#2762ea" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="asset-price-block">
          <div class="asset-price js-asset-price">${formatPrice(asset.price)}</div>
          <div class="asset-change js-asset-change"></div>
        </div>
      `;

            const changeEl = card.querySelector(".js-asset-change");
            if (changeEl) {
                const sign = asset.change >= 0 ? "+" : "";
                changeEl.textContent = `${sign}${asset.change.toFixed(2)}%`;
                changeEl.classList.add(asset.change >= 0 ? "is-positive" : "is-negative");
            }

            listEl.appendChild(card);

            const poly = card.querySelector(`#${CSS.escape(svgId)}`);
            if (poly) poly.setAttribute("points", generateSparklinePoints());
        });

        seeAllBtn.textContent = expanded ? t("favorites.seeLess") : t("favorites.seeAll");
    }

    render();

    seeAllBtn.addEventListener("click", () => {
        expanded = !expanded;
        render();
    });

    function fetchRealPrices() {
        const ids = assets.map((a) => a.coingeckoId).join(",");
        const url =
            "https://api.coingecko.com/api/v3/simple/price?ids=" +
            encodeURIComponent(ids) +
            "&vs_currencies=usd&include_24hr_change=true";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                let changed = false;
                assets.forEach((asset) => {
                    const item = data[asset.coingeckoId];
                    if (!item) return;
                    if (typeof item.usd === "number") {
                        asset.price = item.usd;
                        changed = true;
                    }
                    if (typeof item.usd_24h_change === "number") {
                        asset.change = item.usd_24h_change;
                        changed = true;
                    }
                });
                if (changed) render();
            })
            .catch((err) => console.warn("Price fetch error:", err));
    }

    fetchRealPrices();
    setInterval(fetchRealPrices, 30000);

    window.GTPOFavoritesUpdate = () => render();
}

function setupInfoCards() {
    const grid = document.querySelector("[data-info-grid]");
    const modal = document.querySelector(".info-modal");
    if (!grid || !modal) return;

    const tagEl = modal.querySelector("#info-modal-tag");
    const titleEl = modal.querySelector("#info-modal-title");
    const bodyEl = modal.querySelector("#info-modal-body");
    const closeBtn = modal.querySelector(".info-modal__close");
    const backdrop = modal.querySelector(".info-modal__backdrop");

    function openModal(id) {
        const card = (I18N[currentLang] || I18N.en).info.cards.find((c) => c.id === id);
        if (!card) return;
        tagEl.textContent = card.modalTag;
        titleEl.textContent = card.modalTitle;
        bodyEl.innerHTML = card.modalHtml;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    grid.addEventListener("click", (e) => {
        const el = e.target;
        if (!(el instanceof HTMLElement)) return;
        const cardEl = el.closest(".info-card");
        if (!cardEl) return;
        const id = cardEl.getAttribute("data-card-id");
        if (id) openModal(id);
    });

    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    function renderCards() {
        const cards = (I18N[currentLang] || I18N.en).info.cards;
        grid.innerHTML = "";
        cards.forEach((card, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "info-card";
            if (idx === 0) btn.classList.add("info-card--wide");
            btn.setAttribute("data-card-id", card.id);
            btn.innerHTML = `
        <div class="info-card-label">${card.label}</div>
        <div class="info-card-title">${card.title}</div>
        <p class="info-card-text">${card.text}</p>
      `;
            grid.appendChild(btn);
        });
    }

    renderCards();
    window.GTPOInfoCardsUpdate = renderCards;
}

function setupFaqAccordion() {
    const listRoot = document.querySelector("[data-faq-list]");
    if (!listRoot) return;

    function renderFaq() {
        listRoot.innerHTML = "";
        const items = (I18N[currentLang] || I18N.en).faq.items;

        items.forEach((item, index) => {
            const art = document.createElement("article");
            art.className = "faq-item";
            if (index === 0) art.classList.add("is-open");

            art.innerHTML = `
        <button class="faq-header" type="button">
          <span class="faq-question">${item.q}</span>
          <span class="faq-icon">
            <span class="faq-icon-line faq-icon-line--h"></span>
            <span class="faq-icon-line faq-icon-line--v"></span>
          </span>
        </button>
        <div class="faq-body">
          <div class="faq-body-inner">
            ${item.a}
          </div>
        </div>
      `;
            listRoot.appendChild(art);
        });

        const itemsEls = Array.from(listRoot.querySelectorAll(".faq-item"));
        itemsEls.forEach((itemEl, idx) => {
            const header = itemEl.querySelector(".faq-header");
            const body = itemEl.querySelector(".faq-body");
            const inner = itemEl.querySelector(".faq-body-inner");
            if (!header || !body || !inner) return;

            if (idx === 0) body.style.maxHeight = inner.offsetHeight + "px";

            header.addEventListener("click", () => {
                const isOpen = itemEl.classList.contains("is-open");

                itemsEls.forEach((other) => {
                    if (other === itemEl) return;
                    other.classList.remove("is-open");
                    const obody = other.querySelector(".faq-body");
                    if (obody) obody.style.maxHeight = "0px";
                });

                if (isOpen) {
                    itemEl.classList.remove("is-open");
                    body.style.maxHeight = "0px";
                } else {
                    itemEl.classList.add("is-open");
                    body.style.maxHeight = inner.offsetHeight + "px";
                }
            });
        });
    }

    renderFaq();
    window.GTPOFaqUpdate = renderFaq;
}

function setupTradingForm() {
    const tradingSection = document.querySelector(".trading-section");
    const pickerModal = document.querySelector("[data-picker-modal]");
    const signalModal = document.querySelector("[data-signal-modal]");
    if (!tradingSection || !pickerModal || !signalModal) return;

    const CP_DATA = {
        fiat: [
            { id: "AUD_CAD_OTC", name: "AUD/CAD OTC", market: "OTC" },
            { id: "EUR_CHF_OTC", name: "EUR/CHF OTC", market: "OTC" },
            { id: "EUR_USD_OTC", name: "EUR/USD OTC", market: "OTC" },
            { id: "GBP_AUD_OTC", name: "GBP/AUD OTC", market: "OTC" },
            { id: "LBP_USD_OTC", name: "LBP/USD OTC", market: "OTC" },
            { id: "NZD_JPY_OTC", name: "NZD/JPY OTC", market: "OTC" },
            { id: "OMR_CNY_OTC", name: "OMR/CNY OTC", market: "OTC" },
            { id: "USD_BDT_OTC", name: "USD/BDT OTC", market: "OTC" },
            { id: "USD_CNH_OTC", name: "USD/CNH OTC", market: "OTC" },
            { id: "USD_COP_OTC", name: "USD/COP OTC", market: "OTC" },
            { id: "USD_IDR_OTC", name: "USD/IDR OTC", market: "OTC" },
            { id: "USD_INR_OTC", name: "USD/INR OTC", market: "OTC" },
            { id: "USD_PHP_OTC", name: "USD/PHP OTC", market: "OTC" },
            { id: "USD_VND_OTC", name: "USD/VND OTC", market: "OTC" },
            { id: "ZAR_USD_OTC", name: "ZAR/USD OTC", market: "OTC" },
            { id: "EUR_HUF_OTC", name: "EUR/HUF OTC", market: "OTC" },
            { id: "EUR_USD", name: "EUR/USD", market: "" },
            { id: "NGN_USD_OTC", name: "NGN/USD OTC", market: "OTC" },
            { id: "USD_CLP_OTC", name: "USD/CLP OTC", market: "OTC" },
            { id: "AUD_USD_OTC", name: "AUD/USD OTC", market: "OTC" },
            { id: "EUR_NZD_OTC", name: "EUR/NZD OTC", market: "OTC" },
            { id: "YER_USD_OTC", name: "YER/USD OTC", market: "OTC" },
            { id: "AED_CNY_OTC", name: "AED/CNY OTC", market: "OTC" },
            { id: "AUD_USD", name: "AUD/USD", market: "" },
            { id: "GBP_CAD", name: "GBP/CAD", market: "" },
            { id: "USD_EGP_OTC", name: "USD/EGP OTC", market: "OTC" },
            { id: "AUD_CAD", name: "AUD/CAD", market: "" },
            { id: "CAD_CHF", name: "CAD/CHF", market: "" },
            { id: "EUR_CAD", name: "EUR/CAD", market: "" },
            { id: "EUR_CHF", name: "EUR/CHF", market: "" },
            { id: "EUR_GBP_OTC", name: "EUR/GBP OTC", market: "OTC" },
            { id: "GBP_USD", name: "GBP/USD", market: "" },
            { id: "USD_JPY", name: "USD/JPY", market: "" },
            { id: "EUR_JPY_OTC", name: "EUR/JPY OTC", market: "OTC" },
            { id: "AUD_CHF", name: "AUD/CHF", market: "" },
            { id: "AUD_JPY_OTC", name: "AUD/JPY OTC", market: "OTC" },
            { id: "GBP_JPY", name: "GBP/JPY", market: "" },
            { id: "GBP_USD_OTC", name: "GBP/USD OTC", market: "OTC" },
            { id: "USD_SGD_OTC", name: "USD/SGD OTC", market: "OTC" },
            { id: "EUR_TRY_OTC", name: "EUR/TRY OTC", market: "OTC" },
            { id: "USD_MXN_OTC", name: "USD/MXN OTC", market: "OTC" },
            { id: "CHF_JPY", name: "CHF/JPY", market: "" },
            { id: "UAH_USD_OTC", name: "UAH/USD OTC", market: "OTC" },
            { id: "GBP_AUD", name: "GBP/AUD", market: "" },
            { id: "JOD_CNY_OTC", name: "JOD/CNY OTC", market: "OTC" },
            { id: "EUR_AUD", name: "EUR/AUD", market: "" },
            { id: "CAD_CHF_OTC", name: "CAD/CHF OTC", market: "OTC" },
            { id: "CAD_JPY", name: "CAD/JPY", market: "" },
            { id: "EUR_RUB_OTC", name: "EUR/RUB OTC", market: "OTC" },
            { id: "QAR_CNY_OTC", name: "QAR/CNY OTC", market: "OTC" },
            { id: "USD_DZD_OTC", name: "USD/DZD OTC", market: "OTC" },
            { id: "USD_CHF_OTC", name: "USD/CHF OTC", market: "OTC" },
            { id: "CHF_NOK_OTC", name: "CHF/NOK OTC", market: "OTC" },
            { id: "GBP_JPY_OTC", name: "GBP/JPY OTC", market: "OTC" },
            { id: "AUD_NZD_OTC", name: "AUD/NZD OTC", market: "OTC" },
            { id: "USD_BRL_OTC", name: "USD/BRL OTC", market: "OTC" },
            { id: "USD_ARS_OTC", name: "USD/ARS OTC", market: "OTC" },
            { id: "AUD_CHF_OTC", name: "AUD/CHF OTC", market: "OTC" },
            { id: "SAR_CNY_OTC", name: "SAR/CNY OTC", market: "OTC" },
            { id: "CHF_JPY_OTC", name: "CHF/JPY OTC", market: "OTC" },
            { id: "USD_CHF", name: "USD/CHF", market: "" },
            { id: "EUR_JPY", name: "EUR/JPY", market: "" },
            { id: "MAD_USD_OTC", name: "MAD/USD OTC", market: "OTC" },
            { id: "NZD_USD_OTC", name: "NZD/USD OTC", market: "OTC" },
            { id: "AUD_JPY", name: "AUD/JPY", market: "" },
            { id: "USD_JPY_OTC", name: "USD/JPY OTC", market: "OTC" },
            { id: "USD_MYR_OTC", name: "USD/MYR OTC", market: "OTC" },
            { id: "EUR_GBP", name: "EUR/GBP", market: "" },
            { id: "KES_USD_OTC", name: "KES/USD OTC", market: "OTC" },
            { id: "USD_RUB_OTC", name: "USD/RUB OTC", market: "OTC" },
            { id: "BHD_CNY_OTC", name: "BHD/CNY OTC", market: "OTC" },
            { id: "USD_CAD", name: "USD/CAD", market: "" },
            { id: "USD_PKR_OTC", name: "USD/PKR OTC", market: "OTC" },
            { id: "USD_THB_OTC", name: "USD/THB OTC", market: "OTC" },
            { id: "GBP_CHF", name: "GBP/CHF", market: "" },
            { id: "TND_USD_OTC", name: "TND/USD OTC", market: "OTC" },
            { id: "CAD_JPY_OTC", name: "CAD/JPY OTC", market: "OTC" },
            { id: "USD_CAD_OTC", name: "USD/CAD OTC", market: "OTC" },
        ],
        crypto: [
            { id: "Avalanche_OTC", name: "Avalanche OTC", market: "OTC" },
            { id: "Bitcoin_ETF_OTC", name: "Bitcoin ETF OTC", market: "OTC" },
            { id: "BNB_OTC", name: "BNB OTC", market: "OTC" },
            { id: "Bitcoin_OTC", name: "Bitcoin OTC", market: "OTC" },
            { id: "Dogecoin_OTC", name: "Dogecoin OTC", market: "OTC" },
            { id: "Solana_OTC", name: "Solana OTC", market: "OTC" },
            { id: "TRON_OTC", name: "TRON OTC", market: "OTC" },
            { id: "Polkadot_OTC", name: "Polkadot OTC", market: "OTC" },
            { id: "Cardano_OTC", name: "Cardano OTC", market: "OTC" },
            { id: "Polygon_OTC", name: "Polygon OTC", market: "OTC" },
            { id: "Ethereum_OTC", name: "Ethereum OTC", market: "OTC" },
            { id: "Litecoin_OTC", name: "Litecoin OTC", market: "OTC" },
            { id: "Toncoin_OTC", name: "Toncoin OTC", market: "OTC" },
            { id: "Chainlink_OTC", name: "Chainlink OTC", market: "OTC" },
            { id: "Bitcoin", name: "Bitcoin", market: "" },
            { id: "Ethereum", name: "Ethereum", market: "" },
            { id: "Dash", name: "Dash", market: "" },
            { id: "BCH_EUR", name: "BCH/EUR", market: "" },
            { id: "BCH_GBP", name: "BCH/GBP", market: "" },
            { id: "BCH_JPY", name: "BCH/JPY", market: "" },
            { id: "BTC_GBP", name: "BTC/GBP", market: "" },
            { id: "BTC_JPY", name: "BTC/JPY", market: "" },
            { id: "Chainlink", name: "Chainlink", market: "" },
        ],
        commod: [
            { id: "Brent_Oil_OTC", name: "Brent Oil OTC", market: "OTC" },
            { id: "WTI_Crude_Oil_OTC", name: "WTI Crude Oil OTC", market: "OTC" },
            { id: "Silver_OTC", name: "Silver OTC", market: "OTC" },
            { id: "Gold_OTC", name: "Gold OTC", market: "OTC" },
            { id: "Natural_Gas_OTC", name: "Natural Gas OTC", market: "OTC" },
            { id: "Palladium_spot_OTC", name: "Palladium spot OTC", market: "OTC" },
            { id: "Platinum_spot_OTC", name: "Platinum spot OTC", market: "OTC" },
            { id: "Brent_Oil", name: "Brent Oil", market: "" },
            { id: "WTI_Crude_Oil", name: "WTI Crude Oil", market: "" },
            { id: "XAG_EUR", name: "XAG/EUR", market: "" },
            { id: "Silver", name: "Silver", market: "" },
            { id: "XAU_EUR", name: "XAU/EUR", market: "" },
            { id: "Gold", name: "Gold", market: "" },
            { id: "Natural_Gas", name: "Natural Gas", market: "" },
            { id: "Palladium_spot", name: "Palladium spot", market: "" },
            { id: "Platinum_spot", name: "Platinum spot", market: "" },
        ],
        stocks: [
            { id: "American_Express_OTC", name: "American Express OTC", market: "OTC" },
            { id: "Microsoft_OTC", name: "Microsoft OTC", market: "OTC" },
            { id: "Amazon_OTC", name: "Amazon OTC", market: "OTC" },
            { id: "FedEx_OTC", name: "FedEx OTC", market: "OTC" },
            { id: "Intel_OTC", name: "Intel OTC", market: "OTC" },
            { id: "FACEBOOK_INC_OTC", name: "FACEBOOK INC OTC", market: "OTC" },
            { id: "GameStop_Corp_OTC", name: "GameStop Corp OTC", market: "OTC" },
            { id: "Marathon_Digital_Holdings_OTC", name: "Marathon Digital Holdings OTC", market: "OTC" },
            { id: "Johnson_Johnson_OTC", name: "Johnson & Johnson OTC", market: "OTC" },
            { id: "McDonalds_OTC", name: "McDonald's OTC", market: "OTC" },
            { id: "Apple_OTC", name: "Apple OTC", market: "OTC" },
            { id: "Citigroup_Inc_OTC", name: "Citigroup Inc OTC", market: "OTC" },
            { id: "Tesla_OTC", name: "Tesla OTC", market: "OTC" },
            { id: "AMD_OTC", name: "Advanced Micro Devices OTC", market: "OTC" },
            { id: "ExxonMobil_OTC", name: "ExxonMobil OTC", market: "OTC" },
            { id: "Palantir_Technologies_OTC", name: "Palantir Technologies OTC", market: "OTC" },
            { id: "Alibaba_OTC", name: "Alibaba OTC", market: "OTC" },
            { id: "VISA_OTC", name: "VISA OTC", market: "OTC" },
            { id: "Boeing_Company_OTC", name: "Boeing Company OTC", market: "OTC" },
            { id: "Pfizer_Inc_OTC", name: "Pfizer Inc OTC", market: "OTC" },
            { id: "Netflix_OTC", name: "Netflix OTC", market: "OTC" },
            { id: "VIX_OTC", name: "VIX OTC", market: "OTC" },
            { id: "Cisco_OTC", name: "Cisco OTC", market: "OTC" },
            { id: "Coinbase_Global_OTC", name: "Coinbase Global OTC", market: "OTC" },
            { id: "Apple", name: "Apple", market: "" },
            { id: "American_Express", name: "American Express", market: "" },
            { id: "Boeing_Company", name: "Boeing Company", market: "" },
            { id: "FACEBOOK_INC", name: "FACEBOOK INC", market: "" },
            { id: "Johnson_Johnson", name: "Johnson & Johnson", market: "" },
            { id: "JPMorgan", name: "JPMorgan Chase & Co", market: "" },
            { id: "McDonalds", name: "McDonald's", market: "" },
            { id: "Microsoft", name: "Microsoft", market: "" },
            { id: "Pfizer_Inc", name: "Pfizer Inc", market: "" },
            { id: "Tesla", name: "Tesla", market: "" },
            { id: "Alibaba", name: "Alibaba", market: "" },
            { id: "Citigroup_Inc", name: "Citigroup Inc", market: "" },
            { id: "Netflix", name: "Netflix", market: "" },
            { id: "Cisco", name: "Cisco", market: "" },
            { id: "ExxonMobil", name: "ExxonMobil", market: "" },
            { id: "Intel", name: "Intel", market: "" },
        ],
        docs: [
            { id: "AUS_200_OTC", name: "AUS 200 OTC", market: "OTC" },
            { id: "100GBP_OTC", name: "100GBP OTC", market: "OTC" },
            { id: "CAC_40", name: "CAC 40", market: "" },
            { id: "D30EUR_OTC", name: "D30EUR OTC", market: "OTC" },
            { id: "E35EUR", name: "E35EUR", market: "" },
            { id: "E35EUR_OTC", name: "E35EUR OTC", market: "OTC" },
            { id: "E50EUR_OTC", name: "E50EUR OTC", market: "OTC" },
            { id: "F40EUR_OTC", name: "F40EUR OTC", market: "OTC" },
            { id: "US100", name: "US100", market: "" },
            { id: "SMI_20", name: "SMI 20", market: "" },
            { id: "SP500", name: "SP500", market: "" },
            { id: "SP500_OTC", name: "SP500 OTC", market: "OTC" },
            { id: "100GBP", name: "100GBP", market: "" },
            { id: "AEX_25", name: "AEX 25", market: "" },
            { id: "D30_EUR", name: "D30/EUR", market: "" },
            { id: "DJI30", name: "DJI30", market: "" },
            { id: "DJI30_OTC", name: "DJI30 OTC", market: "OTC" },
            { id: "E50_EUR", name: "E50/EUR", market: "" },
            { id: "F40_EUR", name: "F40/EUR", market: "" },
            { id: "HONG_KONG_33", name: "HONG KONG 33", market: "" },
            { id: "JPN225", name: "JPN225", market: "" },
            { id: "JPN225_OTC", name: "JPN225 OTC", market: "OTC" },
            { id: "US100_OTC", name: "US100 OTC", market: "OTC" },
            { id: "AUS_200", name: "AUS 200", market: "" },
        ],
    };

    // ✅ UNLOCK: все пары считаем "доступными" (VIP-блокировки отключены)
    const BASIC_PAIR_IDS = (() => {
        const s = new Set();
        Object.values(CP_DATA).forEach((arr) => arr.forEach((x) => s.add(x.id)));
        return s;
    })();

    const EXPIRY_PRESETS = [
        { id: "S5", label: "S5", seconds: 5, sub: "Ultra-short scalping" },
        { id: "S15", label: "S15", seconds: 15, sub: "Very fast entries" },
        { id: "S30", label: "S30", seconds: 30, sub: "Impulse moves" },
        { id: "M1", label: "M1", seconds: 60, sub: "Classic scalping" },
        { id: "M3", label: "M3", seconds: 180, sub: "Balanced intraday" },
        { id: "M5", label: "M5", seconds: 300, sub: "Calmer setups" },
        { id: "M30", label: "M30", seconds: 1800, sub: "Session swings" },
        { id: "H1", label: "H1", seconds: 3600, sub: "Intraday trend" },
        { id: "H4", label: "H4", seconds: 14400, sub: "Swing trend" },
    ];

    const AI_MODELS = [
        { id: "orion", title: "Orion v3" },
        { id: "mega", title: "Mega" },
        { id: "atlas", title: "Atlas" },
        { id: "unity", title: "Unity" },
    ];

    // ✅ UNLOCK: все модели доступны
    const BASIC_MODEL_IDS = new Set(AI_MODELS.map((m) => m.id));

    const CP_FAV_KEY = "GTPO_pair_favs_v1";
    let favSet;
    try {
        favSet = new Set(JSON.parse(localStorage.getItem(CP_FAV_KEY) || "[]"));
    } catch {
        favSet = new Set();
    }

    const state = {
        pair: null,
        pairMarket: null,
        time: null,
        model: null,
        modelId: null,
        expirySeconds: null,
    };

    const fields = {
        pair: tradingSection.querySelector('[data-trading-field="pair"] .trading-field-control'),
        time: tradingSection.querySelector('[data-trading-field="time"] .trading-field-control'),
        model: tradingSection.querySelector('[data-trading-field="model"] .trading-field-control'),
    };

    const submitBtn = tradingSection.querySelector(".trading-submit");

    const modalTitle = pickerModal.querySelector("#picker-modal-title");
    const modalSubtitle = pickerModal.querySelector("#picker-modal-subtitle");
    const searchWrap = pickerModal.querySelector("#picker-modal-search-wrap");
    const searchInput = pickerModal.querySelector("#picker-search-input");
    const contentBox = pickerModal.querySelector("#picker-modal-content");
    const modalBackdrop = pickerModal.querySelector(".picker-modal__backdrop");

    const analyzerEl = tradingSection.querySelector("[data-analyzer]");
    const analyzerStatusEl = analyzerEl.querySelector("[data-analyzer-status]");
    const analyzerLinePrimary = analyzerEl.querySelector("[data-analyzer-line-primary]");
    const analyzerLineSecondary = analyzerEl.querySelector("[data-analyzer-line-secondary]");

    const signalBackdrop = signalModal.querySelector(".signal-modal__backdrop");
    const signalDialog = signalModal.querySelector(".signal-modal__dialog");
    const signalDirPill = signalModal.querySelector("[data-signal-dir-pill]");
    const signalPairEl = signalModal.querySelector("[data-signal-pair]");
    const signalModelEl = signalModal.querySelector("[data-signal-model]");
    const signalConfEl = signalModal.querySelector("[data-signal-confidence]");
    const signalAccEl = signalModal.querySelector("[data-signal-accuracy]");
    const signalMarketEl = signalModal.querySelector("[data-signal-market]");
    const signalExpiryEl = signalModal.querySelector("[data-signal-expiry]");
    const signalIssuedEl = signalModal.querySelector("[data-signal-issued]");
    const signalValidEl = signalModal.querySelector("[data-signal-valid-until]");
    const signalRiskLabelEl = signalModal.querySelector("[data-signal-risk-label]");
    const signalNoteEl = signalModal.querySelector("[data-signal-note]");

    const signalActions = signalModal.querySelector(".signal-modal__actions");
    let signalCloseBtn = signalModal.querySelector("[data-signal-close]");
    let signalRepeatBtn = signalModal.querySelector("[data-signal-repeat]");

    let lastSignal = null;

    let signalLoadingTimer = null;
    let signalLoadingStep = 0;

    let isAnalyzing = false;
    let pairCategory = "fiat";
    let pairFavOnly = false;

    function randInt(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }

    function pad2(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    function updateSubmitState() {
        const ready = !!(state.pair && state.time && state.model);
        if (!submitBtn) return;
        submitBtn.disabled = !ready;
        submitBtn.classList.toggle("is-enabled", ready);
    }

    function applyFieldValue(type, value) {
        const fieldBtn = fields[type];
        if (!fieldBtn) return;
        const valEl = fieldBtn.querySelector(".trading-field-value");
        const phEl = fieldBtn.querySelector(".trading-field-placeholder");
        if (valEl) valEl.textContent = value;
        if (phEl) phEl.style.display = "none";
        fieldBtn.classList.add("has-value");
    }

    function resetAnalyzerIdle() {
        const dict = t("analyzer");
        analyzerStatusEl.textContent = dict.statusIdle;
        analyzerLinePrimary.textContent = dict.idleLine1;
        analyzerLineSecondary.textContent = dict.idleLine2;
    }

    function updateAnalyzerForModel(modelId) {
        const dict = t("analyzer");
        const lines = (dict.modelLines && dict.modelLines[modelId]) || [dict.idleLine1, dict.idleLine2];
        analyzerLinePrimary.textContent = lines[0];
        analyzerLineSecondary.textContent = lines[1] || "";
    }

    function accuracyRangeByModel(modelId) {
        if (modelId === "mega") return [70, 85];
        if (modelId === "atlas") return [70, 85];
        if (modelId === "unity") return [85, 97];
        return [60, 78];
    }

    function pickRiskKeyWeighted() {
        const r = Math.random();
        if (r < 0.5) return "riskLow";
        if (r < 0.9) return "riskMedium";
        return "riskHigh";
    }

    function generateSignalFromState() {
        const [accMin, accMax] = accuracyRangeByModel(state.modelId);
        const accuracyNum = randInt(accMin, accMax);
        const confidenceNum = Math.max(50, Math.min(99, accuracyNum + randInt(-3, 6)));
        const direction = Math.random() > 0.5 ? "buy" : "sell";
        const now = new Date();
        const issued = pad2(now.getHours()) + ":" + pad2(now.getMinutes());
        const validDate = new Date(now.getTime() + (state.expirySeconds || 300) * 1000);
        const validUntil = pad2(validDate.getHours()) + ":" + pad2(validDate.getMinutes());

        return {
            direction,
            confidence: String(confidenceNum),
            accuracy: String(accuracyNum),
            market: state.pairMarket || "OTC",
            pair: state.pair,
            model: state.model,
            expiryLabel: state.time,
            issued,
            validUntil,
            riskKey: pickRiskKeyWeighted(),
        };
    }

    function stopSignalLoadingText() {
        if (signalLoadingTimer) {
            clearTimeout(signalLoadingTimer);
            signalLoadingTimer = null;
        }
    }

    function getLoadingPairs() {
        const sig = (I18N[currentLang] || I18N.en).signal;
        return sig.loadingPairs || (I18N.en.signal.loadingPairs || []);
    }

    function startSignalLoadingText(titleEl, subEl) {
        stopSignalLoadingText();
        signalLoadingStep = 0;

        const pairs = getLoadingPairs();
        const first = pairs[0] || ["Analyzing…", "Please wait…"];
        if (titleEl) titleEl.textContent = first[0];
        if (subEl) subEl.textContent = first[1];

        const tick = () => {
            const delay = 400 + Math.floor(Math.random() * 201);
            signalLoadingTimer = setTimeout(() => {
                const p = getLoadingPairs();
                if (!p.length) return tick();

                signalLoadingStep = (signalLoadingStep + 1) % p.length;
                const [nextTitle, nextSub] = p[signalLoadingStep];

                if (titleEl) titleEl.classList.add("is-swap");
                if (subEl) subEl.classList.add("is-swap");

                setTimeout(() => {
                    if (titleEl) titleEl.textContent = nextTitle;
                    if (subEl) subEl.textContent = nextSub;
                    if (titleEl) titleEl.classList.remove("is-swap");
                    if (subEl) subEl.classList.remove("is-swap");
                }, 140);

                tick();
            }, delay);
        };

        tick();
    }

    function ensureSignalModalBlocks() {
        let loadingWrap = signalDialog.querySelector("[data-signal-loading]");
        if (!loadingWrap) {
            loadingWrap = document.createElement("div");
            loadingWrap.className = "signal-loading";
            loadingWrap.setAttribute("data-signal-loading", "");
            signalDialog.appendChild(loadingWrap);
        }

        let loadingTitle =
            loadingWrap.querySelector("[data-signal-loading-title]") ||
            loadingWrap.querySelector(".signal-loading-title") ||
            loadingWrap.querySelector('[data-i18n="signal.loadingTitle"]');

        if (!loadingTitle) {
            loadingTitle = document.createElement("div");
            loadingTitle.className = "signal-loading-title";
            loadingWrap.appendChild(loadingTitle);
        }

        let loadingSub =
            loadingWrap.querySelector("[data-signal-loading-sub]") ||
            loadingWrap.querySelector(".signal-loading-sub") ||
            loadingWrap.querySelector('[data-i18n="signal.loadingSub"]');

        if (!loadingSub) {
            loadingSub = document.createElement("div");
            loadingSub.className = "signal-loading-sub";
            loadingWrap.appendChild(loadingSub);
        }

        loadingTitle.removeAttribute("data-i18n");
        loadingTitle.removeAttribute("data-i18n-attr");
        loadingSub.removeAttribute("data-i18n");
        loadingSub.removeAttribute("data-i18n-attr");

        loadingTitle.setAttribute("data-signal-loading-title", "");
        loadingSub.setAttribute("data-signal-loading-sub", "");

        let dots = loadingWrap.querySelector(".analyzer-loader");
        if (!dots) {
            dots = document.createElement("div");
            dots.className = "analyzer-loader";
            dots.innerHTML = `
      <span class="loader-dot"></span>
      <span class="loader-dot"></span>
      <span class="loader-dot"></span>
    `;
            loadingWrap.appendChild(dots);
        }

        loadingWrap.style.display = "none";
        return { loadingWrap, loadingTitle, loadingSub };
    }

    function setSignalModalLoading(isLoading) {
        const { loadingWrap, loadingTitle, loadingSub } = ensureSignalModalBlocks();

        if (isLoading) {
            signalDialog.classList.add("is-loading");
            loadingWrap.style.display = "block";
            loadingTitle.textContent = "";
            loadingSub.textContent = "";
            startSignalLoadingText(loadingTitle, loadingSub);
        } else {
            stopSignalLoadingText();
            signalDialog.classList.remove("is-loading");
            loadingWrap.style.display = "none";
        }
    }

    function ensureSignalActionsButtons() {
        if (!signalActions) return;

        const dictSignal = t("signal");

        signalCloseBtn = signalActions.querySelector("[data-signal-close]");
        if (!signalCloseBtn) {
            signalCloseBtn = document.createElement("button");
            signalCloseBtn.type = "button";
            signalCloseBtn.className = "signal-btn signal-btn--primary";
            signalCloseBtn.setAttribute("data-signal-close", "");
            signalActions.appendChild(signalCloseBtn);
        }
        signalCloseBtn.textContent = dictSignal.backToForm || "Back";

        signalRepeatBtn = signalActions.querySelector("[data-signal-repeat]");
        if (!signalRepeatBtn) {
            signalRepeatBtn = document.createElement("button");
            signalRepeatBtn.type = "button";
            signalRepeatBtn.className = "signal-btn";
            signalRepeatBtn.setAttribute("data-signal-repeat", "");
            signalActions.insertBefore(signalRepeatBtn, signalCloseBtn);
        }
        signalRepeatBtn.textContent = dictSignal.repeat || "Repeat";
    }

    function openSignalModal(signal) {
        const langSignal = t("signal");

        ensureSignalActionsButtons();
        setSignalModalLoading(false);

        const isBuy = signal.direction === "buy";
        signalDirPill.textContent = isBuy ? langSignal.directionBuy : langSignal.directionSell;
        signalDirPill.classList.toggle("signal-dir-pill--buy", isBuy);
        signalDirPill.classList.toggle("signal-dir-pill--sell", !isBuy);

        signalPairEl.textContent = signal.pair;

        if (signalModelEl) {
            signalModelEl.textContent = "";
            signalModelEl.hidden = true;
        }

        signalConfEl.textContent = `${signal.confidence}%`;
        signalAccEl.textContent = `${signal.accuracy}%`;
        signalMarketEl.textContent = signal.market || "-";

        if (signalExpiryEl) {
            signalExpiryEl.textContent = "";
            const expiryRow = signalExpiryEl.closest(".signal-info-row");
            if (expiryRow) expiryRow.hidden = true;
        }

        signalIssuedEl.textContent = signal.issued;
        signalValidEl.textContent = signal.validUntil;

        const riskText = langSignal[signal.riskKey] || signal.riskKey;
        signalRiskLabelEl.textContent = (langSignal.riskLabel || "Risk") + ": " + riskText;

        signalNoteEl.textContent = langSignal.note;
        if (signalCloseBtn) signalCloseBtn.textContent = langSignal.backToForm;
        if (signalRepeatBtn) signalRepeatBtn.textContent = langSignal.repeat;

        signalModal.classList.add("is-open");
        signalModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        lastSignal = { ...signal };
    }

    function closeSignalModal() {
        stopSignalLoadingText();
        signalModal.classList.remove("is-open");
        signalModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function rerunSignalInsideModal() {
        if (!signalModal.classList.contains("is-open")) return;
        setSignalModalLoading(true);

        const delay = randInt(1000, 3000);
        setTimeout(() => {
            const next = generateSignalFromState();
            setSignalModalLoading(false);
            openSignalModal(next);
        }, delay);
    }

    signalBackdrop.addEventListener("click", closeSignalModal);

    const handleEl = signalDialog.querySelector(".signal-modal__handle");
    if (handleEl) handleEl.addEventListener("click", closeSignalModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && signalModal.classList.contains("is-open")) closeSignalModal();
    });

    if (signalActions) {
        signalActions.addEventListener("click", (e) => {
            const el = e.target;
            if (!(el instanceof HTMLElement)) return;
            if (el.hasAttribute("data-signal-close")) closeSignalModal();
            if (el.hasAttribute("data-signal-repeat")) rerunSignalInsideModal();
        });
    }

    function openPicker(type) {
        if (!modalTitle || !modalSubtitle || !contentBox) return;
        searchInput.value = "";
        searchInput.setAttribute(
            "placeholder",
            (I18N[currentLang] || I18N.en).picker.searchPlaceholder
        );

        const cfgs = {
            pair: { searchable: true, build: () => buildPairUI() },
            time: { searchable: false, build: buildTimeList },
            model: { searchable: false, build: buildModelList },
        };

        const dictPicker = (I18N[currentLang] || I18N.en).picker;
        if (type === "pair") {
            modalTitle.textContent = dictPicker.pairTitle;
            modalSubtitle.textContent = dictPicker.pairSubtitle;
        } else if (type === "time") {
            modalTitle.textContent = dictPicker.timeTitle;
            modalSubtitle.textContent = dictPicker.timeSubtitle;
        } else if (type === "model") {
            modalTitle.textContent = dictPicker.modelTitle;
            modalSubtitle.textContent = dictPicker.modelSubtitle;
        }

        const cfg = cfgs[type];
        if (!cfg) return;

        searchWrap.style.display = cfg.searchable ? "" : "none";

        cfg.build();
        pickerModal.classList.add("is-open");
        pickerModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        if (cfg.searchable) searchInput.focus();
    }

    function closePicker() {
        pickerModal.classList.remove("is-open");
        pickerModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    modalBackdrop.addEventListener("click", closePicker);
    document.addEventListener("keydown", (e) => {
        if (pickerModal.classList.contains("is-open") && e.key === "Escape") closePicker();
    });

    let favToggleBtn;
    (function ensureFavToggle() {
        favToggleBtn = searchWrap.querySelector(".picker-fav-toggle");
        if (!favToggleBtn) {
            favToggleBtn = document.createElement("button");
            favToggleBtn.type = "button";
            favToggleBtn.className = "picker-fav-toggle";
            favToggleBtn.textContent = "★";
            const searchInner = searchWrap.querySelector(".picker-search");
            if (searchInner) searchInner.appendChild(favToggleBtn);
        }
    })();

    function buildPairUI() {
        const pickerDict = (I18N[currentLang] || I18N.en).picker;

        contentBox.innerHTML = "";

        const tabsRow = document.createElement("div");
        tabsRow.className = "picker-tabs-row";
        const tabDefs = [
            { key: "fiat", label: "$" },
            { key: "crypto", label: "₿" },
            { key: "commod", label: "⛽" },
            { key: "stocks", label: "📈" },
            { key: "docs", label: "📄" },
        ];
        tabDefs.forEach((tab) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "picker-tab";
            if (tab.key === pairCategory) btn.classList.add("is-active");
            btn.textContent = tab.label;
            btn.addEventListener("click", () => {
                pairCategory = tab.key;
                Array.from(tabsRow.children).forEach((child) =>
                    child.classList.toggle("is-active", child === btn)
                );
                renderList();
            });
            tabsRow.appendChild(btn);
        });
        contentBox.appendChild(tabsRow);

        const headerRow = document.createElement("div");
        headerRow.className = "picker-header-row";
        headerRow.innerHTML = `
      <span class="picker-header-left">${pickerDict.marketColLeft}</span>
      <span class="picker-header-right">${pickerDict.marketColRight}</span>
    `;
        contentBox.appendChild(headerRow);

        const listContainer = document.createElement("div");
        listContainer.className = "picker-pair-list";
        contentBox.appendChild(listContainer);

        function renderList() {
            const term = searchInput.value.trim().toLowerCase();
            const raw = CP_DATA[pairCategory] || [];
            const dict = (I18N[currentLang] || I18N.en).picker;

            let items = raw;

            if (term) items = items.filter((x) => x.name.toLowerCase().includes(term));
            if (pairFavOnly) items = items.filter((x) => favSet.has(x.id));

            listContainer.innerHTML = "";

            if (!items.length) {
                const empty = document.createElement("div");
                empty.style.padding = "16px 8px";
                empty.style.fontSize = "12px";
                empty.style.color = "var(--text-muted)";
                empty.textContent = dict.nothingFound;
                listContainer.appendChild(empty);
                return;
            }

            items.forEach((item) => {
                const isOtc = item.market === "OTC";
                // ✅ VIP блокировки выключены: isVipLocked всегда false
                const isVipLocked = !BASIC_PAIR_IDS.has(item.id) ? false : false;

                const desc = isOtc ? dict.otcDesc : dict.regDesc;
                const badgeText = isOtc ? (dict.otcBadge || "OTC") : (dict.regBadge || "REG");

                const row = document.createElement("div");
                row.className = "picker-row";
                // ❌ больше не делаем disabled по REG, чтобы можно было выбрать всё
                // if (!isOtc) row.classList.add("picker-row--disabled");
                // if (isVipLocked) row.classList.add("picker-row--vip-locked");

                const isFav = favSet.has(item.id);

                row.innerHTML = `
          <div class="picker-row-main">
            <div class="picker-row-title-wrap">
              <button class="picker-row-star" type="button" aria-label="Favorite">
                ${isFav ? "★" : "☆"}
              </button>
              <span class="picker-row-title">${item.name}</span>
            </div>
            <span class="picker-row-sub">${desc}</span>
          </div>
          <span class="picker-row-badge">${badgeText}</span>
        `;

                const starBtn = row.querySelector(".picker-row-star");
                starBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (favSet.has(item.id)) favSet.delete(item.id);
                    else favSet.add(item.id);
                    try {
                        localStorage.setItem(CP_FAV_KEY, JSON.stringify([...favSet]));
                    } catch {}
                    renderList();
                });

                row.addEventListener("click", () => {
                    // ✅ VIP/REG ограничения сняты — выбираем любой пункт
                    state.pair = item.name;
                    state.pairMarket = item.market || "";
                    applyFieldValue("pair", item.name);
                    updateAnalyzerForModel(state.modelId || "orion");
                    closePicker();
                    updateSubmitState();
                });

                listContainer.appendChild(row);
            });
        }

        searchInput.oninput = () => renderList();
        favToggleBtn.onclick = () => {
            pairFavOnly = !pairFavOnly;
            favToggleBtn.classList.toggle("is-active", pairFavOnly);
            renderList();
        };
        renderList();
    }

    function buildTimeList() {
        contentBox.innerHTML = "";
        EXPIRY_PRESETS.forEach((p) => {
            const row = document.createElement("div");
            row.className = "picker-row";
            row.innerHTML = `
        <div class="picker-row-main">
          <span class="picker-row-title">${p.label}</span>
          <span class="picker-row-sub">${p.sub}</span>
        </div>
      `;
            row.addEventListener("click", () => {
                state.time = p.label;
                state.expirySeconds = p.seconds;
                applyFieldValue("time", p.label);
                closePicker();
                updateSubmitState();
            });
            contentBox.appendChild(row);
        });
    }

    function buildModelList() {
        contentBox.innerHTML = "";

        const pickerDict = (I18N[currentLang] || I18N.en).picker;
        const modelDescDict = pickerDict.modelDescriptions || {};
        const popularText = pickerDict.popularBadge || "Users' choice";

        AI_MODELS.forEach((m) => {
            const row = document.createElement("div");
            row.className = "picker-row";

            // ✅ VIP блокировки выключены
            const vipLocked = !BASIC_MODEL_IDS.has(m.id) ? false : false;

            const baseDesc = modelDescDict[m.id] || "";
            const subText = baseDesc;

            // if (vipLocked) row.classList.add("picker-row--vip-locked");

            const isUnity = m.id === "unity";
            const badgeHtml = isUnity
                ? `<span class="model-badge model-badge--popular">${popularText}</span>`
                : ``;

            row.innerHTML = `
      <div class="picker-row-main">
        <div class="picker-row-titleline">
          <span class="picker-row-title">${m.title}</span>
          ${badgeHtml}
        </div>
        <span class="picker-row-sub">${subText}</span>
      </div>
    `;

            row.addEventListener("click", () => {
                // ✅ выбираем любую модель
                state.model = m.title;
                state.modelId = m.id;
                applyFieldValue("model", m.title);
                updateAnalyzerForModel(m.id);
                closePicker();
                updateSubmitState();
            });

            contentBox.appendChild(row);
        });
    }

    Object.entries(fields).forEach(([type, btn]) => {
        if (!btn) return;
        btn.addEventListener("click", () => openPicker(type));
    });

    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            if (submitBtn.disabled || isAnalyzing) return;
            if (!state.pair || !state.time || !state.modelId) return;

            isAnalyzing = true;
            const dictAnalyzer = t("analyzer");
            analyzerStatusEl.textContent = dictAnalyzer.statusActive;
            updateAnalyzerForModel(state.modelId);

            const signal = generateSignalFromState();

            setTimeout(() => {
                isAnalyzing = false;
                analyzerStatusEl.textContent = dictAnalyzer.statusDone;
                openSignalModal(signal);
            }, 1300);
        });
    }

    resetAnalyzerIdle();

    window.GTPOTradingLangUpdate = () => {
        if (state.modelId) updateAnalyzerForModel(state.modelId);
        else resetAnalyzerIdle();

        if (signalModal.classList.contains("is-open") && lastSignal) {
            openSignalModal(lastSignal);
        } else {
            ensureSignalActionsButtons();
        }
    };
}