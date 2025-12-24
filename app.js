const SUPPORT_TG = "https://t.me/your_username";

const data = [
    {
        id: "begin",
        title: { ru: "Как начать", en: "How to Begin" },
        items: [
            {
                id: "get-bot",
                q: { ru: "Как получить бота?", en: "How do I get a bot?" },
                a: {
                    ru: `Тебе нужно запустить бота и нажать на “ПОЛУЧИТЬ СИГНАЛ”, пройти регистрацию и пополнить аккаунт на любую сумму.<p>Запустить бота → <a href="ССЫЛКУ НА БОТА:)" target="_blank" rel="noreferrer">нажми сюда</a></p>`,
                    en: `You need to launch the bot and click on “GET SIGNAL”, register, and top up your account with any amount.<p>Launch the bot → <a href="ССЫЛКУ НА БОТА:)" target="_blank" rel="noreferrer">click here</a></p>`
                }
            },
            {
                id: "have-account",
                q: { ru: "У меня уже есть аккаунт. Что делать?", en: "I already have an account. What should I do?" },
                a: {
                    ru: "Создайте новый аккаунт. Верификация не нужна — доступ к боту откроется сразу.",
                    en: "Create a new account. No verification required — access to the bot will be open immediately."
                }
            },
            {
                id: "new-account-verified",
                q: { ru: "Я хочу продолжить на новом аккаунте, но на первом у меня верификация. Что делать?", en: "I want to continue with a new account, but I have verification on the first one. What should I do?" },
                a: {
                    ru: "Чтобы пройти повторно верификацию на новом аккаунте, закройте предыдущий счет с верификацией — после этого у вас не будет проблем.",
                    en: "To re-verify your new account, close your previous verified account — after that, you will have no problems."
                }
            },
            {
                id: "min-deposit",
                q: { ru: "Минимальный депозит", en: "Minimum deposit" },
                a: {
                    ru: "Любая сумма. Даже с небольшого депозита можно начинать — бот настроен на эффективный рост баланса.",
                    en: "Any amount. You can start with even a small deposit — the bot is configured for effective balance growth."
                }
            },
            {
                id: "private-group",
                q: { ru: "Что за приватная группа? Что я получу и как войти?", en: "What is a private group? What will I get and how do I join?" },
                a: { ru: "В разработке...", en: "Coming soon..." }
            },
            {
                id: "experience",
                q: { ru: "Нужен ли опыт и знания?", en: "Is experience and knowledge necessary?" },
                a: {
                    ru: `В начале вам это не нужно.<p>Торговля — это не зазубривание учебников, а следование структурированным настройкам.</p><p>Сигналы, боты и упрощенные стратегии сжимают многолетний опыт в четкие инструкции.</p><p>Наш бот анализирует всё автоматически: ваша задача нажать кнопку в нужный момент.</p>`,
                    en: `You don't need it at the beginning.<p>Trading is not about memorizing textbooks, but following structured settings.</p><p>Signals, bots, and simplified strategies condense years of experience into clear instructions.</p><p>Our bot analyzes everything automatically: your task is to press the button at the right moment.</p>`
                }
            },
            {
                id: "small-balance",
                q: { ru: "Правда, что можно начать зарабатывать даже с маленького депозита?", en: "Is it true that I can make money from a small balance?" },
                a: {
                    ru: `Безусловно. Современная торговля опирается на эффективность сложного процента, а не на крупные депозиты.<p>Даже небольшой счет может стабильно расти, если вы будете следовать следующим принципам:</p><ul><li>фиксированный дробный риск</li><li>высоковероятные входы</li><li>контролируемая подверженность волатильности</li></ul><p>Новички часто недооценивают, насколько мощным становится со временем стабильный еженедельный рост на 3–7%.</p><p>Ключом к успеху является систематическое выполнение, а не стартовый капитал.</p>`,
                    en: `Absolutely. Modern trading relies on the power of compound interest, not large deposits.<p>Even a small account can grow steadily if you follow these principles:</p><ul><li>Fixed fractional risk</li><li>High-probability entries</li><li>Controlled exposure to volatility</li></ul><p>Beginners often underestimate how powerful a steady weekly growth of 3–7% becomes over time.</p><p>The key to success is systematic execution, not starting capital.</p>`
                }
            },
            {
                id: "charts",
                q: { ru: "Что если я не понимаю графики и индикаторы?", en: "What if I don't understand charts and indicators?" },
                a: {
                    ru: `Большинство новичков этого не понимают — и это нормально.<p>Именно для этого и существуют структурированные инструменты: алгоритмические сигналы, упрощенные настройки и автоматизированные системы.</p><p>Они декодируют:</p><ul><li>ценовое действие,</li><li>динамику тренда,</li><li>вероятность разворота,</li><li>подтверждения прорыва.</li></ul><p>Вместо того, чтобы тратить месяцы на изучение технического анализа, вы начинаете с управляемых, основанных на данных решений.</p><p>Это снижает стресс и ускоряет получение результатов.</p>`,
                    en: `Most beginners don't do this — and that's okay.<p>That's why structured tools exist: algorithmic signals, simplified settings, and automated systems.</p><p>They decode:</p><ul><li>price action,</li><li>trend dynamics,</li><li>probability of reversal,</li><li>breakout confirmations.</li></ul><p>Instead of spending months learning technical analysis, you start with manageable, data-driven decisions.</p><p>This reduces stress and speeds up results.</p>`
                }
            }
        ]
    },
    {
        id: "about",
        title: { ru: "О боте", en: "About the bot" },
        items: [
            {
                id: "vip",
                q: { ru: "Я не понимаю что за VIP версия в боте. Как получить?", en: "I don't understand what the VIP version in the bot is. How do I get it?" },
                a: {
                    ru: `ВИП версию можно получить, если на аккаунте будет сумма ВСЕХ депозитов больше $100. Вам откроется:<ul><li>NeuralEdge V2 model с улучшенным алгоритмом: он принимает во внимание новости, исправляет алгоритмы после ошибок и адаптирует торговлю к пользователю.</li><li>Время до H4 (4 часа)</li><li>Расширенные рынки: акции/криптовалюты/индексы</li><li>Детали: коридоры силы/объема/вероятности</li><li>Глубокая история и фавориты</li><li>Анализ рынка каждые 1,2с</li></ul>`,
                    en: `You can get the VIP version if your account has a TOTAL deposit amount of over $100. You will get access to:<ul><li>NeuralEdge V2 model with an improved algorithm: it takes news into account, corrects algorithms after errors, and adapts trading to the user.</li><li>Timeframes up to H4</li><li>Extended markets: stocks/crypto/indices</li><li>Details: strength/volume/probability corridors</li><li>Deep history & favorites</li><li>Market analysis every 1.2s</li></ul>`
                }
            },
            {
                id: "other-account",
                q: { ru: "Если я получил доступ к боту, смогу ли я торговать на другом аккаунте?", en: "If I have access to the bot, can I trade on another account?" },
                a: {
                    ru: `Нет. Вам необходимо продолжать торговать на аккаунте, который вы зарегистрировали через бота.<p>Если вы начнете торговать на другом счете, бот не будет получать информацию об изменении баланса после выдачи сигнала и начнет выдавать случайные сигналы, пока вы не переключитесь на нужный аккаунт.</p>`,
                    en: `No. You need to continue trading on the account you registered through the bot.<p>If you start trading on another account, the bot will not receive information about the balance change after issuing a signal and will start giving random signals until you switch to the correct account.</p>`
                }
            },
            {
                id: "trust",
                q: { ru: "Можно ли доверять сигналам или ботам?", en: "Can signals or bots be trusted?" },
                a: {
                    ru: `Сигналы и боты — это не магия, а статистические механизмы, обученные на основе исторических данных о волатильности, вероятности продолжения тренда и распределении ликвидности.<p>Они дают вам:</p><ul><li>стабильную логику входа</li><li>снижение усталости от принятия решений</li><li>и возможность избежать эмоциональных ошибок</li></ul><p>Вы сочетаете человеческую интуицию с алгоритмической точностью, что значительно повышает стабильность.</p>`,
                    en: `Signals and bots are not magic, but statistical mechanisms trained on historical data about volatility, probability of trend continuation, and liquidity distribution.<p>They give you:</p><ul><li>stable entry logic</li><li>reduced decision fatigue</li><li>and the ability to avoid emotional mistakes</li></ul><p>You combine human intuition with algorithmic precision, which significantly increases stability.</p>`
                }
            }
        ]
    },
    {
        id: "trade",
        title: { ru: "Как торговать", en: "How to trade" },
        items: [
            {
                id: "amount-time",
                q: { ru: "Сумма и время сделки. Как выбрать?", en: "Trade amount and time. How to choose?" },
                a: {
                    ru: `Рекомендую попробовать каждое время и выбрать подходящий для себя.<p>Секунды удобны, но на них нужно входить моментально — любая задержка, и сигнал упущен. Минуты — золотая середина у моей команды.</p><p>Но помните: долгая задержка может привести к изменению направления в конце.</p>`,
                    en: `I recommend trying each option and choosing the one that suits you best.<p>Seconds are easy to use, but you have to enter them instantly — any delay and you'll miss the signal. Minutes are the golden mean for my team.</p><p>But remember, a long delay can lead to a change of direction at the end.</p>`
                }
            },
            {
                id: "lose",
                q: { ru: "Что делать при проигрыше?", en: "What should you do if you lose?" },
                a: {
                    ru: `Я советую уже проверенную систему мартингейла, но немного измененную. Вот как это работает:<ul><li>Сделка 1: 1 доллар → потеря</li><li>Сделка 2: 2 доллара → потеря</li><li>Сделка 3: 6 долларов (потому что $1 + $2 = $3, затем удвоение = 6 долларов)</li></ul><p>Это покрывает не только последнюю сделку, но и все предыдущие — это помогает не проиграть всё и вернуться к изначальной точке. Но при этой стратегии не нужно торговать больше 10% от баланса.</p><p>Чем хороша эта стратегия: с ботом риск даже трёх подряд проигрышей — редкость.</p>`,
                    en: `I recommend the tried and tested martingale system, but with a slight modification. Here's how it works:<ul><li>Trade 1: $1 → loss</li><li>Trade 2: $2 → loss</li><li>Trade 3: $6 (because $1 + $2 = $3, then double = $6)</li></ul><p>This covers not only the last trade, but all previous ones, which helps you avoid losing everything and return to your starting point. But with this strategy, you should not trade more than 10% of your balance.</p><p>What is good about this strategy: with a bot, the risk of even 3 consecutive losses is rare.</p>`
                }
            },
            {
                id: "sudden",
                q: { ru: "Может ли рынок внезапно изменится?", en: "Could the market suddenly change?" },
                a: {
                    ru: `Развороты являются частью рыночной физиологии — они происходят из-за того, что поставщики ликвидности перебалансируют свои позиции.<p>Хорошие стратегии естественным образом учитывают этот фактор.</p><p>Использование сигналов или ботов помогает вам избежать некачественных входов и дает вам доступ к вероятностям, основанным на импульсе, что означает, что вы входите только тогда, когда тренд стабилен.</p><p>Вы перестаете бояться разворотов и начинаете использовать предсказуемые циклы импульса.</p>`,
                    en: `Turnarounds are part of market physiology — they occur because liquidity providers rebalance their positions.<p>Good strategies naturally take this factor into account.</p><p>Using signals or bots helps you avoid poor-quality entries and gives you access to momentum-based probabilities, which means you only enter when the trend is stable.</p><p>You stop fearing reversals and start taking advantage of predictable momentum cycles.</p>`
                }
            }
        ]
    },
    {
        id: "broker",
        title: { ru: "Брокер", en: "Broker" },
        items: [
            {
                id: "why-broker",
                q: { ru: "Почему я выбрал этого брокера?", en: "Why did I choose this broker?" },
                a: {
                    ru: `Pocket Option — это полнофункциональная торговая платформа.<ul><li>Проверенная надежность — многолетний опыт и официальные лицензии, подтверждающие это</li><li>Простая регистрация — быстрая и простая, даже если вы новичок</li><li>Удобный интерфейс — разработан, чтобы сделать торговлю доступной для всех</li><li>Обучение на платформе — учитесь и совершенствуйте свои навыки прямо на платформе</li><li>Разнообразие активов — большой выбор активов, что делает торговлю увлекательной</li><li>Мгновенные выводы средств — наслаждайтесь быстрым и беспроблемным доступом к своим доходам</li></ul>`,
                    en: `Pocket Option is a full-featured trading platform.<ul><li>Proven reliability — years of experience and official licenses to back it up</li><li>Easy registration — quick and simple, even if you're a beginner</li><li>User-friendly interface — designed to make trading accessible to everyone</li><li>On-platform training — learn and improve your skills right on the platform</li><li>Variety of assets — a large selection of assets, making trading exciting</li><li>Instant withdrawals — enjoy fast and hassle-free access to your earnings</li></ul>`
                }
            },
            {
                id: "withdraw",
                q: { ru: "Смогу ли я вывести свою прибыль?", en: "Will I be able to withdraw my profits?" },
                a: {
                    ru: `Да, вывод средств происходит без проблем. Pocket Option работает во многих странах, предлагая вывод средств на карты, кошельки и криптовалюты.<p>Обратитесь в службу поддержки, так как некоторые варианты могут быть недоступны на момент чтения.</p>`,
                    en: `Yes, withdrawals are processed without any problems. Pocket Option operates in many countries, offering withdrawals to cards, wallets, and cryptocurrencies.<p>Check with support, as some options may be unavailable at the time of reading.</p>`
                }
            }
        ]
    },
    {
        id: "other",
        title: { ru: "Другой вопрос", en: "Other" },
        items: [
            {
                id: "status",
                q: { ru: "Что если заказ получен, но статус не обновился?", en: "What if the order is received, but the status hasn’t updated?" },
                a: {
                    ru: `Иногда обновление статуса занимает до 3 дней. Если через 3 дня после получения заказа статус не обновился, обратитесь в <a href="${SUPPORT_TG}" target="_blank" rel="noreferrer">чат поддержки</a>.`,
                    en: `Sometimes the status update can take up to 3 days. If the status hasn’t updated 3 days after receiving the order, contact <a href="${SUPPORT_TG}" target="_blank" rel="noreferrer">support chat</a>.`
                }
            },
            {
                id: "no-answer",
                type: "link",
                t: { ru: "Нет ответа на мой вопрос", en: "I didn’t find an answer" },
                href: SUPPORT_TG
            }
        ]
    }
];

const root = document.getElementById("faqRoot");
const pageTitle = document.getElementById("pageTitle");
const btnRu = document.getElementById("langRu");
const btnEn = document.getElementById("langEn");

let lang = (localStorage.getItem("faq_lang") || "en").toLowerCase();
if (lang !== "ru" && lang !== "en") lang = "en";

const arrowSvg = `
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 3a1 1 0 0 1 1 1v12.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5.01 5.01a1 1 0 0 1-1.42 0l-5.01-5.01a1 1 0 1 1 1.4-1.42l3.34 3.34V4a1 1 0 0 1 1-1z"></path>
</svg>
`;

function escapeAttr(s){
    return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function setLang(next){
    lang = next;
    localStorage.setItem("faq_lang", lang);
    document.documentElement.lang = lang;
    btnRu.setAttribute("aria-pressed", lang === "ru" ? "true" : "false");
    btnEn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    pageTitle.textContent = lang === "ru" ? "Популярные вопросы" : "Popular questions";
    render();
}

function render(){
    root.innerHTML = data.map(section=>{
        const title = section.title[lang];
        const itemsHtml = section.items.map(item=>{
            if (item.type === "link"){
                const t = item.t[lang];
                return `
          <div class="item">
            <a class="linkrow" href="${escapeAttr(item.href)}" target="_blank" rel="noreferrer">
              <span class="linkrow__t">${t}</span>
              <svg class="linkrow__arr" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M9.29 6.71a1 1 0 0 1 1.42 0l5 5a1 1 0 0 1 0 1.42l-5 5a1 1 0 1 1-1.42-1.42L13.59 12 9.29 7.71a1 1 0 0 1 0-1.42z"/>
              </svg>
            </a>
          </div>
        `;
            }

            const q = item.q[lang];
            const a = item.a[lang];
            return `
        <div class="item" data-acc="${escapeAttr(item.id)}" data-open="0">
          <button class="acc-btn" type="button" aria-expanded="false" aria-controls="a-${escapeAttr(item.id)}">
            <div class="q"><span class="q__t">${q}</span></div>
            <div class="icon" aria-hidden="true">${arrowSvg}</div>
          </button>
          <div class="answer" id="a-${escapeAttr(item.id)}">${a}</div>
        </div>
      `;
        }).join("");

        return `
      <section class="section" data-section="${escapeAttr(section.id)}">
        <div class="section__head">${title}</div>
        ${itemsHtml}
      </section>
    `;
    }).join("");
}

function closeAll(exceptId){
    root.querySelectorAll(".item[data-acc]").forEach(el=>{
        const id = el.getAttribute("data-acc");
        if (id === exceptId) return;
        if (el.getAttribute("data-open") === "1"){
            el.setAttribute("data-open","0");
            const btn = el.querySelector(".acc-btn");
            if (btn) btn.setAttribute("aria-expanded","false");
        }
    });
}

root.addEventListener("click", (e)=>{
    const btn = e.target.closest(".acc-btn");
    if (btn){
        const item = btn.closest(".item[data-acc]");
        if (!item) return;
        const id = item.getAttribute("data-acc");
        const isOpen = item.getAttribute("data-open") === "1";
        closeAll(isOpen ? null : id);
        item.setAttribute("data-open", isOpen ? "0" : "1");
        btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    }
});

btnRu.addEventListener("click", ()=> setLang("ru"));
btnEn.addEventListener("click", ()=> setLang("en"));

setLang(lang);