/**
 * Generates priority + secondary locale dictionaries from embedded copy.
 * Run: node scripts/generate-i18n-locales.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('src/i18n/locales');
fs.mkdirSync(outDir, { recursive: true });

const header = `import type { DeepPartialTranslations } from '../partial';
import { PRODUCT_BASE } from '../../config/site';

const productBase = PRODUCT_BASE;
`;

/** @type {Record<string, { exportName: string; file: string; dict: object }>} */
const locales = {
  de: {
    exportName: 'de',
    file: 'de.ts',
    dict: {
      site: {
        name: 'Aion 2 Cheats',
        domain: 'aion2cheats.net',
        title: 'Aion 2 Cheats — ESP, Radar & Abyss-PvP-Overlays für PC',
        description:
          'Aion 2 Cheats für PC: Spieler-ESP, Wallhack, Abyss-Radar, Sammel-ESP, Klassen-Skill-Assist und Kostüm-Wechsler. Für Elyos vs Asmodian PvP, Instanzen und Flug. Updates nach NCSOFT-Patches.',
      },
      nav: [
        { href: '${productBase}', label: 'Produkte' },
        { href: '/blog/', label: 'Blog' },
        { href: '/forum/', label: 'Forum' },
        { href: '/faq/', label: 'FAQ' },
        { href: '/support/', label: 'Support' },
      ],
      hero: {
        status: 'Aion 2 online',
        eyebrow: 'Undetected Aion 2 Cheats',
        titleLine1: 'Aion 2 Cheats —',
        titleLine2: 'ESP, Radar & Abyss-PvP-Overlays für PC',
        subtitle:
          'Spieler-ESP, Wallhack, Abyss-Radar, Sammel-ESP und Klassen-Skill-Assist für Elyos-vs-Asmodian-PvP, Instanzen, Arenen und Flug auf Windows-PC. Schnelle Updates nach Aion 2- und NCSOFT-Patches.',
        ctaPrimary: 'Produkte ansehen',
        ctaDiscord: 'Discord beitreten',
        modesLabel: 'Inhalte',
        modes: ['Abyss RvR', 'Arenen', 'Instanzen', 'Flug'],
        metrics: [
          { label: 'Stream-sicher', strong: 'Ja' },
          { label: 'Patch-Tempo', strong: '<24h' },
          { label: 'Nutzer', strong: '300+' },
          { label: 'Support', strong: '24/7' },
        ],
      },
      features: {
        eyebrow: 'Funktionen',
        title: 'Was du bekommst',
        subtitle:
          'ESP, Wallhack, Abyss-Radar, Sammel-ESP und Klassen-Skill-Assist für Aion 2 auf dem PC. Updates nach jedem Anti-Cheat-Patch.',
      },
      whyUs: {
        eyebrow: 'Warum wir',
        title: 'Updates nach Anti-Cheat-Patches',
        subtitle:
          'Viele Aion-2-Cheat-Shops fallen nach Patches aus. Wir pushen Loader-Updates, halten abyss-sichere Defaults und antworten auf Discord.',
        usLabel: 'Aion 2 Cheats',
        otherLabel: 'Typischer Shop',
      },
      setup: {
        eyebrow: 'Setup',
        titleLead: 'Vom Checkout ins Spiel in',
        titleHighlight: 'drei Schritten',
        intro:
          'Kaufen, Loader im Portal laden, Preset laden, Aion 2 starten. Bei Problemen hilft Discord.',
        ctaPrimary: 'Produkte ansehen',
        ctaSecondary: 'Setup-FAQ',
      },
      products: {
        eyebrow: 'Produkte',
        title: 'Aion 2 Produkte',
        subtitle: 'Elite Aion 2 Cheats, HWID-Spoofer, UGC-Recovery und Kostüm-Wechsler.',
        viewAll: 'Alle Produkte',
        get: 'Holen',
        explore: 'Entdecken',
      },
      blog: {
        eyebrow: 'Blog',
        title: 'Guides & Updates',
        subtitle: 'ESP-Wallhack, Abyss-Presets, Skill-Assist und Anti-Cheat-Checklisten für Aion 2.',
        latestTitle: 'Neueste Artikel',
        latestSubtitle: 'Nach Thema filtern oder sortieren.',
        filterAll: 'Alle Artikel',
        sortLabel: 'Sortieren',
        sortNewest: 'Neueste zuerst',
        sortOldest: 'Älteste zuerst',
        sortShortRead: 'Kürzeste',
        sortLongRead: 'Längste',
        emptyFilter: 'Keine Artikel für diesen Filter.',
        viewAll: 'Alle Artikel',
        read: 'Lesen',
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Häufige Fragen',
        subtitle: 'Kompatibilität, Bans, Tiers und Setup.',
        items: [
          {
            num: '01',
            q: 'Wo sehe ich, ob Aion 2 Cheats online sind?',
            a: 'Live-Banner auf aion2cheats.net und Discord #status. Nach jedem Aion-2- oder Anti-Cheat-Update prüfen.',
          },
          {
            num: '02',
            q: 'Was passiert nach dem Kauf?',
            a: 'Im Portal erhältst du Loader, Setup-Guide und Config-Bibliothek. Vor dem Start den Guide lesen.',
          },
          {
            num: '03',
            q: 'Kann ich mit privaten Aion-2-Cheats gebannt werden?',
            a: 'Ja — jede Modifikation birgt Risiko. Anti-Cheat ändert sich. Status lesen und Risiko akzeptieren.',
          },
          {
            num: '04',
            q: 'Welche Plattformen werden unterstützt?',
            a: 'Nur Aion 2 über den offiziellen Launcher unter Windows 10/11 64-Bit. Kein macOS/Linux.',
          },
          {
            num: '05',
            q: 'Kann ich die Lizenz auf einen neuen PC umziehen?',
            a: 'Ja — HWID-Reset im Portal oder Discord-Ticket. Limits je nach Tier.',
          },
          {
            num: '06',
            q: 'Wo finde ich Produkte und Utilities?',
            a: 'Unter Aion 2 Produkte: Cheat-Tiers, HWID-Spoofer, UGC und Kostüm-Wechsler.',
          },
        ],
      },
      footer: {
        tagline: 'Aion 2 ESP-, Abyss-Radar- und Skill-Assist-Cheats für PC.',
        explore: 'Entdecken',
        support: 'Support',
        legal: 'Rechtliches',
        privacy: 'Datenschutz',
        terms: 'AGB',
        about: 'Über uns',
      },
      legalPages: {
        about: {
          title: 'Über Aion 2 Cheats',
          description: 'PC-Aion-2-Cheat-Tiers, Guides und Utilities auf aion2cheats.net.',
        },
        privacy: {
          title: 'Datenschutz | Aion 2 Cheats',
          description: 'Analytics, Cookies und Kontaktdaten auf aion2cheats.net.',
        },
        terms: {
          title: 'AGB | Aion 2 Cheats',
          description: 'Kauf-, Lizenz- und Rückerstattungsbedingungen.',
        },
        support: {
          title: 'Support | Aion 2 Cheats',
          description: 'Hilfe zu Loader, Configs, HWID und Checkout.',
        },
      },
      ui: {
        skipLink: 'Zum Inhalt springen',
        browseCheats: 'Checkout starten',
        browseCheatsMobile: 'Checkout starten',
        homeAria: 'Aion 2 Cheats Startseite',
        checkoutAria: 'Checkout starten',
        discordAria: 'Discord',
        menuOpen: 'Menü öffnen',
        menuClose: 'Menü schließen',
        themeLight: 'Hellmodus',
        themeDark: 'Dunkelmodus',
      },
    },
  },
};

// Remaining locales defined below as compact strong SEO blocks
Object.assign(locales, {
  'zh-tw': {
    exportName: 'zhTw',
    file: 'zh-tw.ts',
    dict: {
      site: {
        name: 'Aion 2 Cheats',
        domain: 'aion2cheats.net',
        title: 'Aion 2 外掛 — ESP、雷達、深淵 PvP 透視（PC）',
        description:
          'PC 版 Aion 2 外掛：玩家 ESP、透視、深淵雷達、採集 ESP、職業技能輔助、時裝變更。適用天族對魔族 PvP、副本與飛行。NCSOFT 更新後持續維護。',
      },
      nav: [
        { href: '${productBase}', label: '產品' },
        { href: '/blog/', label: '部落格' },
        { href: '/forum/', label: '論壇' },
        { href: '/faq/', label: 'FAQ' },
        { href: '/support/', label: '客服' },
      ],
      hero: {
        status: 'Aion 2 線上',
        eyebrow: '未偵測 Aion 2 外掛',
        titleLine1: 'Aion 2 外掛 —',
        titleLine2: 'ESP、雷達與深淵 PvP 透視',
        subtitle:
          '為天族 vs 魔族 PvP、副本、競技場與飛行戰鬥提供玩家 ESP、透視、深淵雷達、採集 ESP 與職業技能輔助。Windows PC。Aion 2／NCSOFT 更新後快速維護。',
        ctaPrimary: '查看產品',
        ctaDiscord: '加入 Discord',
        modesLabel: '內容',
        modes: ['深淵 RvR', '競技場', '副本', '飛行'],
        metrics: [
          { label: '直播安全', strong: '是' },
          { label: '更新速度', strong: '<24h' },
          { label: '使用者', strong: '300+' },
          { label: '支援', strong: '24/7' },
        ],
      },
      features: {
        eyebrow: '功能',
        title: '你會得到什麼',
        subtitle: 'Aion 2 PC 版 ESP、透視、深淵雷達、採集 ESP、職業技能輔助。每次反外掛更新後維護。',
      },
      whyUs: {
        eyebrow: '為什麼選我們',
        title: '反外掛更新後仍持續維護',
        subtitle: '許多 Aion 2 外掛站在更新後就停擺。我們推送載入器更新、保留深淵安全預設，並在 Discord 回覆。',
        usLabel: 'Aion 2 Cheats',
        otherLabel: '一般商店',
      },
      setup: {
        eyebrow: '安裝',
        titleLead: '從結帳到進遊戲',
        titleHighlight: '三步驟',
        intro: '購買、從入口下載載入器、載入預設，再開啟 Aion 2。卡住就找 Discord。',
        ctaPrimary: '查看產品',
        ctaSecondary: '安裝 FAQ',
      },
      products: {
        eyebrow: '產品',
        title: 'Aion 2 產品',
        subtitle: 'Elite Aion 2 外掛、HWID 偽裝、UGC 申訴與時裝變更。',
        viewAll: '全部產品',
        get: '取得',
        explore: '探索',
      },
      blog: {
        eyebrow: '部落格',
        title: '指南與更新',
        subtitle: 'Aion 2 ESP 透視、深淵預設、職業技能輔助與反外掛檢查清單。',
        latestTitle: '最新文章',
        latestSubtitle: '依主題篩選或排序。',
        filterAll: '全部文章',
        sortLabel: '排序',
        sortNewest: '最新優先',
        sortOldest: '最舊優先',
        sortShortRead: '最短',
        sortLongRead: '最長',
        emptyFilter: '沒有符合此篩選的文章。',
        viewAll: '查看全部',
        read: '閱讀',
      },
      faq: {
        eyebrow: 'FAQ',
        title: '常見問題',
        subtitle: '相容性、封鎖、方案與安裝。',
        items: [
          {
            num: '01',
            q: '要去哪裡確認 Aion 2 外掛是否在線？',
            a: 'aion2cheats.net 即時橫幅與 Discord #status。每次 Aion 2 或反外掛更新後都要檢查。',
          },
          {
            num: '02',
            q: '購買之後會得到什麼？',
            a: '入口會解鎖載入器、安裝指南與設定庫。啟動 Aion 2 前請先看指南。',
          },
          {
            num: '03',
            q: '使用私人 Aion 2 外掛會被封鎖嗎？',
            a: '會有風險。任何修改都可能被偵測。請閱讀現況並自行承擔風險。',
          },
          {
            num: '04',
            q: '支援哪些平台？',
            a: '僅 Windows 10/11 64 位元 + 官方啟動器的 Aion 2。不支援 macOS／Linux。',
          },
          {
            num: '05',
            q: '可以把授權移到新電腦嗎？',
            a: '可以—入口 HWID 重設或開 Discord 工單。限制依方案而定。',
          },
          {
            num: '06',
            q: '產品與工具在哪裡？',
            a: 'Aion 2 產品頁列出外掛方案、HWID 偽裝、UGC 與時裝變更。',
          },
        ],
      },
      footer: {
        tagline: 'PC 版 Aion 2 ESP、深淵雷達與技能輔助外掛。',
        explore: '探索',
        support: '支援',
        legal: '法律',
        privacy: '隱私權政策',
        terms: '服務條款',
        about: '關於我們',
      },
      legalPages: {
        about: { title: '關於 Aion 2 Cheats', description: '在 aion2cheats.net 販售 PC Aion 2 外掛方案、指南與工具。' },
        privacy: { title: '隱私權政策 | Aion 2 Cheats', description: 'aion2cheats.net 如何使用分析、Cookie 與聯絡資料。' },
        terms: { title: '服務條款 | Aion 2 Cheats', description: 'Aion 2 外掛產品的購買、授權與退款政策。' },
        support: { title: '客服 | Aion 2 Cheats', description: '載入器安裝、設定、HWID 與結帳協助。' },
      },
      ui: {
        skipLink: '跳到主要內容',
        browseCheats: '開始結帳',
        browseCheatsMobile: '開始結帳',
        homeAria: 'Aion 2 Cheats 首頁',
        checkoutAria: '開始結帳',
        discordAria: 'Discord',
        menuOpen: '開啟選單',
        menuClose: '關閉選單',
        themeLight: '切換淺色模式',
        themeDark: '切換深色模式',
      },
    },
  },
  'pt-br': {
    exportName: 'ptBr',
    file: 'pt-br.ts',
    dict: {
      site: {
        name: 'Aion 2 Cheats',
        domain: 'aion2cheats.net',
        title: 'Aion 2 Cheats — ESP, Radar e Overlay de Abismo PvP (PC)',
        description:
          'Cheats de Aion 2 para PC: ESP de jogadores, wallhack, radar do Abismo, ESP de coleta, assist de skills e trocador de fantasia. Para PvP Elyos vs Asmodian, instâncias e voo. Atualizado após patches da NCSOFT.',
      },
      nav: [
        { href: '${productBase}', label: 'Produtos' },
        { href: '/blog/', label: 'Blog' },
        { href: '/forum/', label: 'Fórum' },
        { href: '/faq/', label: 'FAQ' },
        { href: '/support/', label: 'Suporte' },
      ],
      hero: {
        status: 'Aion 2 online',
        eyebrow: 'Cheats Aion 2 undetected',
        titleLine1: 'Aion 2 Cheats —',
        titleLine2: 'ESP, Radar e Overlay de Abismo PvP',
        subtitle:
          'ESP, wallhack, radar do Abismo, ESP de coleta e assist de skills por classe para PvP Elyos vs Asmodian, instâncias, arenas e voo no Windows. Atualizações rápidas após patches do Aion 2 e NCSOFT.',
        ctaPrimary: 'Ver produtos',
        ctaDiscord: 'Entrar no Discord',
        modesLabel: 'Conteúdo',
        modes: ['Abismo RvR', 'Arenas', 'Instâncias', 'Voo'],
        metrics: [
          { label: 'Safe para stream', strong: 'Sim' },
          { label: 'Velocidade de patch', strong: '<24h' },
          { label: 'Usuários', strong: '300+' },
          { label: 'Suporte', strong: '24/7' },
        ],
      },
      features: {
        eyebrow: 'Recursos',
        title: 'O que você recebe',
        subtitle: 'ESP, wallhack, radar do Abismo, ESP de coleta e assist de skills para Aion 2 no PC.',
      },
      whyUs: {
        eyebrow: 'Por que nós',
        title: 'Atualizado após patches de anti-cheat',
        subtitle:
          'Muitas lojas de cheat de Aion 2 caem após patches. Nós enviamos updates do loader, mantemos defaults seguros para o Abismo e respondemos no Discord.',
        usLabel: 'Aion 2 Cheats',
        otherLabel: 'Loja típica',
      },
      setup: {
        eyebrow: 'Setup',
        titleLead: 'Do checkout ao jogo em',
        titleHighlight: 'três passos',
        intro: 'Compre, baixe o loader no portal, carregue um preset e abra o Aion 2. Discord ajuda se travar.',
        ctaPrimary: 'Ver produtos',
        ctaSecondary: 'FAQ de setup',
      },
      products: {
        eyebrow: 'Produtos',
        title: 'Produtos Aion 2',
        subtitle: 'Cheats Elite, HWID spoofer, UGC e trocador de fantasia.',
        viewAll: 'Ver todos',
        get: 'Obter',
        explore: 'Explorar',
      },
      blog: {
        eyebrow: 'Blog',
        title: 'Guias e atualizações',
        subtitle: 'ESP wallhack, presets do Abismo, skill assist e checklist de patch.',
        latestTitle: 'Artigos recentes',
        latestSubtitle: 'Filtre por tema ou ordene.',
        filterAll: 'Todos os artigos',
        sortLabel: 'Ordenar',
        sortNewest: 'Mais recentes',
        sortOldest: 'Mais antigos',
        sortShortRead: 'Mais curtos',
        sortLongRead: 'Mais longos',
        emptyFilter: 'Nenhum artigo neste filtro.',
        viewAll: 'Ver todos',
        read: 'Ler',
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Perguntas frequentes',
        subtitle: 'Compatibilidade, banimentos, tiers e setup.',
        items: [
          {
            num: '01',
            q: 'Onde vejo se os cheats de Aion 2 estão online?',
            a: 'Banner ao vivo em aion2cheats.net e Discord #status. Sempre confira após patch.',
          },
          {
            num: '02',
            q: 'O que acontece depois da compra?',
            a: 'O portal libera loader, guia e biblioteca de configs. Siga o guia antes de abrir o Aion 2.',
          },
          {
            num: '03',
            q: 'Posso tomar ban usando cheats privados?',
            a: 'Sim — qualquer modificação tem risco. Anti-cheat muda. Leia o status e aceite o risco.',
          },
          {
            num: '04',
            q: 'Quais plataformas são suportadas?',
            a: 'Só Aion 2 no launcher oficial em Windows 10/11 64-bit. Sem macOS/Linux.',
          },
          {
            num: '05',
            q: 'Posso mover a licença para outro PC?',
            a: 'Sim — reset de HWID no portal ou ticket no Discord. Limites variam por tier.',
          },
          {
            num: '06',
            q: 'Onde ficam produtos e utilitários?',
            a: 'Em Produtos Aion 2: tiers, HWID spoofer, UGC e trocador de fantasia.',
          },
        ],
      },
      footer: {
        tagline: 'Cheats de ESP, radar do Abismo e skill assist de Aion 2 para PC.',
        explore: 'Explorar',
        support: 'Suporte',
        legal: 'Legal',
        privacy: 'Privacidade',
        terms: 'Termos',
        about: 'Sobre',
      },
      legalPages: {
        about: { title: 'Sobre Aion 2 Cheats', description: 'Vendemos tiers, guias e utilitários de Aion 2 para PC.' },
        privacy: { title: 'Privacidade | Aion 2 Cheats', description: 'Como usamos analytics, cookies e dados de contato.' },
        terms: { title: 'Termos | Aion 2 Cheats', description: 'Compra, licença e reembolso dos produtos.' },
        support: { title: 'Suporte | Aion 2 Cheats', description: 'Ajuda com loader, configs, HWID e checkout.' },
      },
      ui: {
        skipLink: 'Ir para o conteúdo',
        browseCheats: 'Iniciar checkout',
        browseCheatsMobile: 'Iniciar checkout',
        homeAria: 'Início Aion 2 Cheats',
        checkoutAria: 'Iniciar checkout',
        discordAria: 'Discord',
        menuOpen: 'Abrir menu',
        menuClose: 'Fechar menu',
        themeLight: 'Modo claro',
        themeDark: 'Modo escuro',
      },
    },
  },
  th: {
    exportName: 'th',
    file: 'th.ts',
    dict: {
      site: {
        name: 'Aion 2 Cheats',
        domain: 'aion2cheats.net',
        title: 'Aion 2 Cheats — ESP เรดาร์ และโอเวอร์เลย์ Abyss PvP (PC)',
        description:
          'ชีต Aion 2 สำหรับ PC: ESP ผู้เล่น, วอลแฮ็ก, เรดาร์ Abyss, ESP เก็บของ, สกิลแอสซิสต์ตามคลาส และตัวเปลี่ยนคอสตูม สำหรับ PvP Elyos vs Asmodian อินสแตนซ์ และการบิน อัปเดตหลังแพตช์ NCSOFT',
      },
      nav: [
        { href: '${productBase}', label: 'สินค้า' },
        { href: '/blog/', label: 'บล็อก' },
        { href: '/forum/', label: 'ฟอรัม' },
        { href: '/faq/', label: 'FAQ' },
        { href: '/support/', label: 'ซัพพอร์ต' },
      ],
      hero: {
        status: 'Aion 2 ออนไลน์',
        eyebrow: 'ชีต Aion 2 Undetected',
        titleLine1: 'Aion 2 Cheats —',
        titleLine2: 'ESP เรดาร์ และโอเวอร์เลย์ Abyss PvP',
        subtitle:
          'ESP วอลแฮ็ก เรดาร์ Abyss ESP เก็บของ และสกิลแอสซิสต์ตามคลาส สำหรับ PvP Elyos vs Asmodian อินสแตนซ์ อารีน่า และการบินบน Windows อัปเดตเร็วหลังแพตช์ Aion 2 และ NCSOFT',
        ctaPrimary: 'ดูสินค้า',
        ctaDiscord: 'เข้าร่วม Discord',
        modesLabel: 'โหมด',
        modes: ['Abyss RvR', 'อารีน่า', 'อินสแตนซ์', 'บิน'],
        metrics: [
          { label: 'ปลอดภัยต่อสตรีม', strong: 'ใช่' },
          { label: 'ความเร็วแพตช์', strong: '<24ชม.' },
          { label: 'ผู้ใช้', strong: '300+' },
          { label: 'ซัพพอร์ต', strong: '24/7' },
        ],
      },
      features: {
        eyebrow: 'ฟีเจอร์',
        title: 'สิ่งที่คุณได้',
        subtitle: 'ESP วอลแฮ็ก เรดาร์ Abyss ESP เก็บของ และสกิลแอสซิสต์สำหรับ Aion 2 บน PC',
      },
      whyUs: {
        eyebrow: 'ทำไมต้องเรา',
        title: 'อัปเดตหลังแพตช์แอนตี้ชีต',
        subtitle: 'ร้านชีต Aion 2 หลายแห่งล่มหลังแพตช์ เราอัปเดตโลดเดอร์ รักษาค่าเริ่มต้นที่ปลอดภัยสำหรับ Abyss และตอบใน Discord',
        usLabel: 'Aion 2 Cheats',
        otherLabel: 'ร้านทั่วไป',
      },
      setup: {
        eyebrow: 'ติดตั้ง',
        titleLead: 'จากชำระเงินถึงในเกม',
        titleHighlight: '3 ขั้นตอน',
        intro: 'ซื้อ ดาวน์โหลดโลดเดอร์จากพอร์ทัล โหลดพรีเซ็ต แล้วเปิด Aion 2 หากติดปัญหาถาม Discord',
        ctaPrimary: 'ดูสินค้า',
        ctaSecondary: 'FAQ การติดตั้ง',
      },
      products: {
        eyebrow: 'สินค้า',
        title: 'สินค้า Aion 2',
        subtitle: 'ชีต Elite, HWID spoofer, UGC และตัวเปลี่ยนคอสตูม',
        viewAll: 'สินค้าทั้งหมด',
        get: 'รับ',
        explore: 'สำรวจ',
      },
      blog: {
        eyebrow: 'บล็อก',
        title: 'คู่มือและอัปเดต',
        subtitle: 'ESP วอลแฮ็ก พรีเซ็ต Abyss สกิลแอสซิสต์ และเช็คลิสต์แพตช์',
        latestTitle: 'บทความล่าสุด',
        latestSubtitle: 'กรองตามหัวข้อหรือเรียงลำดับ',
        filterAll: 'บทความทั้งหมด',
        sortLabel: 'เรียง',
        sortNewest: 'ใหม่สุดก่อน',
        sortOldest: 'เก่าสุดก่อน',
        sortShortRead: 'สั้นสุด',
        sortLongRead: 'ยาวสุด',
        emptyFilter: 'ไม่มีบทความที่ตรงกับตัวกรองนี้',
        viewAll: 'ดูทั้งหมด',
        read: 'อ่าน',
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'คำถามที่พบบ่อย',
        subtitle: 'ความเข้ากันได้ แบน แพ็กเกจ และการติดตั้ง',
        items: [
          {
            num: '01',
            q: 'จะเช็กว่าชีต Aion 2 ออนไลน์ได้ที่ไหน?',
            a: 'แบนเนอร์สดบน aion2cheats.net และ Discord #status ตรวจทุกครั้งหลังแพตช์',
          },
          {
            num: '02',
            q: 'หลังซื้อได้อะไรบ้าง?',
            a: 'พอร์ทัลปลดล็อกโลดเดอร์ คู่มือ และไลบรารีคอนฟิก อ่านคู่มือก่อนเปิด Aion 2',
          },
          {
            num: '03',
            q: 'ใช้ชีตส่วนตัวแล้วโดนแบนได้ไหม?',
            a: 'ได้ — การดัดแปลงทุกรูปแบบมีความเสี่ยง อ่านสถานะและยอมรับความเสี่ยงก่อนใช้',
          },
          {
            num: '04',
            q: 'รองรับแพลตฟอร์มใด?',
            a: 'เฉพาะ Aion 2 บนลอนเชอร์ทางการ Windows 10/11 64-bit ไม่รองรับ macOS/Linux',
          },
          {
            num: '05',
            q: 'ย้ายไลเซนส์ไปเครื่องใหม่ได้ไหม?',
            a: 'ได้ — รีเซ็ต HWID ในพอร์ทัลหรือเปิดตั๋ว Discord จำกัดตามแพ็กเกจ',
          },
          {
            num: '06',
            q: 'สินค้าและยูทิลิตี้อยู่ที่ไหน?',
            a: 'หน้าสินค้า Aion 2 มีแพ็กเกจชีต HWID spoofer UGC และตัวเปลี่ยนคอสตูม',
          },
        ],
      },
      footer: {
        tagline: 'ชีต ESP เรดาร์ Abyss และสกิลแอสซิสต์ Aion 2 สำหรับ PC',
        explore: 'สำรวจ',
        support: 'ซัพพอร์ต',
        legal: 'กฎหมาย',
        privacy: 'นโยบายความเป็นส่วนตัว',
        terms: 'ข้อกำหนด',
        about: 'เกี่ยวกับเรา',
      },
      legalPages: {
        about: { title: 'เกี่ยวกับ Aion 2 Cheats', description: 'ขายแพ็กเกจชีต คู่มือ และยูทิลิตี้ Aion 2 สำหรับ PC' },
        privacy: { title: 'ความเป็นส่วนตัว | Aion 2 Cheats', description: 'การวิเคราะห์คุกกี้ และข้อมูลติดต่อบน aion2cheats.net' },
        terms: { title: 'ข้อกำหนด | Aion 2 Cheats', description: 'การซื้อ ใบอนุญาต และนโยบายคืนเงิน' },
        support: { title: 'ซัพพอร์ต | Aion 2 Cheats', description: 'ช่วยติดตั้งโลดเดอร์ คอนฟิก HWID และชำระเงิน' },
      },
      ui: {
        skipLink: 'ข้ามไปยังเนื้อหา',
        browseCheats: 'เริ่มชำระเงิน',
        browseCheatsMobile: 'เริ่มชำระเงิน',
        homeAria: 'หน้าแรก Aion 2 Cheats',
        checkoutAria: 'เริ่มชำระเงิน',
        discordAria: 'Discord',
        menuOpen: 'เปิดเมนู',
        menuClose: 'ปิดเมนู',
        themeLight: 'โหมดสว่าง',
        themeDark: 'โหมดมืด',
      },
    },
  },
  ja: {
    exportName: 'ja',
    file: 'ja.ts',
    dict: {
      site: {
        name: 'Aion 2 Cheats',
        domain: 'aion2cheats.net',
        title: 'Aion 2 チート — ESP・レーダー・アビスPvP（PC）',
        description:
          'PC向けAion 2チート。プレイヤーESP、ウォールハック、アビスレーダー、採集ESP、スキルスアシスト、コスチュームチェンジャー。',
      },
      nav: [
        { href: '${productBase}', label: '製品' },
        { href: '/blog/', label: 'ブログ' },
        { href: '/forum/', label: 'フォーラム' },
        { href: '/faq/', label: 'FAQ' },
        { href: '/support/', label: 'サポート' },
      ],
      hero: {
        status: 'Aion 2 オンライン',
        eyebrow: '未検出 Aion 2 チート',
        titleLine1: 'Aion 2 チート —',
        titleLine2: 'ESP・レーダー・アビスPvP',
        subtitle: '天族対魔族のPvP、インスタンス、アリーナ、飛行向けのESPとスキルスアシスト。Windows PC対応。',
        ctaPrimary: '製品を見る',
        ctaDiscord: 'Discordに参加',
        modesLabel: 'コンテンツ',
        modes: ['アビス RvR', 'アリーナ', 'インスタンス', '飛行'],
        metrics: [
          { label: '配信セーフ', strong: 'はい' },
          { label: 'パッチ対応', strong: '<24h' },
          { label: 'ユーザー', strong: '300+' },
          { label: 'サポート', strong: '24/7' },
        ],
      },
      features: { eyebrow: '機能', title: 'できること', subtitle: 'Aion 2向けESP、ウォールハック、レーダー、スキルスアシスト。' },
      faq: {
        eyebrow: 'FAQ',
        title: 'よくある質問',
        subtitle: '互換性、BAN、ティア、セットアップ。',
        items: [
          { num: '01', q: 'オンライン状況はどこで確認できますか？', a: 'aion2cheats.netのバナーとDiscord #statusを確認してください。' },
          { num: '02', q: '購入後はどうなりますか？', a: 'ポータルでローダーとセットアップガイドが利用できます。' },
          { num: '03', q: 'BANのリスクはありますか？', a: 'はい。改造にはリスクがあります。現状を確認してから利用してください。' },
          { num: '04', q: '対応環境は？', a: 'Windows 10/11 64bitの公式ランチャーのみ。' },
          { num: '05', q: '別PCへ移行できますか？', a: 'ポータルのHWIDリセットまたはDiscordチケットで可能です。' },
          { num: '06', q: '製品一覧はどこ？', a: 'Aion 2製品ページにチート、HWID、UGC、コスチュームがあります。' },
        ],
      },
      footer: {
        tagline: 'PC向けAion 2 ESP・アビスレーダー・スキルスアシスト。',
        explore: '探索',
        support: 'サポート',
        legal: '法務',
        privacy: 'プライバシー',
        terms: '利用規約',
        about: '会社情報',
      },
      ui: {
        skipLink: '本文へスキップ',
        browseCheats: 'チェックアウト',
        browseCheatsMobile: 'チェックアウト',
        homeAria: 'Aion 2 Cheats ホーム',
        checkoutAria: 'チェックアウト',
        discordAria: 'Discord',
        menuOpen: 'メニューを開く',
        menuClose: 'メニューを閉じる',
        themeLight: 'ライトモード',
        themeDark: 'ダークモード',
      },
      blog: {
        eyebrow: 'ブログ',
        title: 'ガイドと更新',
        latestTitle: '最新記事',
        filterAll: 'すべての記事',
        read: '読む',
        viewAll: 'すべて見る',
      },
      products: { eyebrow: '製品', title: 'Aion 2製品', viewAll: 'すべて', get: '入手', explore: '見る' },
      legalPages: {
        about: { title: 'Aion 2 Cheatsについて', description: 'PC向けAion 2チートとガイドを提供します。' },
        privacy: { title: 'プライバシー | Aion 2 Cheats', description: '分析・Cookie・連絡データの取り扱い。' },
        terms: { title: '利用規約 | Aion 2 Cheats', description: '購入・ライセンス・返金ポリシー。' },
        support: { title: 'サポート | Aion 2 Cheats', description: 'ローダー、設定、HWIDのヘルプ。' },
      },
    },
  },
  es: {
    exportName: 'es',
    file: 'es.ts',
    dict: {
      site: {
        name: 'Aion 2 Cheats',
        domain: 'aion2cheats.net',
        title: 'Aion 2 Cheats — ESP, radar y overlays de Abismo PvP (PC)',
        description:
          'Cheats de Aion 2 para PC: ESP, wallhack, radar del Abismo, ESP de recolección, asistente de skills y cambiador de disfraces.',
      },
      nav: [
        { href: '${productBase}', label: 'Productos' },
        { href: '/blog/', label: 'Blog' },
        { href: '/forum/', label: 'Foro' },
        { href: '/faq/', label: 'FAQ' },
        { href: '/support/', label: 'Soporte' },
      ],
      hero: {
        status: 'Aion 2 en línea',
        eyebrow: 'Cheats Aion 2 undetected',
        titleLine1: 'Aion 2 Cheats —',
        titleLine2: 'ESP, radar y overlays de Abismo',
        subtitle: 'ESP, wallhack y asistente de skills para PvP Elyos vs Asmodian, instancias y vuelo en Windows PC.',
        ctaPrimary: 'Ver productos',
        ctaDiscord: 'Unirse a Discord',
        modesLabel: 'Contenido',
        modes: ['Abismo RvR', 'Arenas', 'Instancias', 'Vuelo'],
        metrics: [
          { label: 'Seguro para stream', strong: 'Sí' },
          { label: 'Velocidad de patch', strong: '<24h' },
          { label: 'Usuarios', strong: '300+' },
          { label: 'Soporte', strong: '24/7' },
        ],
      },
      features: { eyebrow: 'Funciones', title: 'Qué incluye', subtitle: 'ESP, wallhack, radar y skill assist para Aion 2 en PC.' },
      faq: {
        eyebrow: 'FAQ',
        title: 'Preguntas frecuentes',
        subtitle: 'Compatibilidad, bans, tiers y setup.',
        items: [
          { num: '01', q: '¿Dónde veo si está online?', a: 'Banner en aion2cheats.net y Discord #status.' },
          { num: '02', q: '¿Qué pasa tras comprar?', a: 'El portal abre loader, guía y configs.' },
          { num: '03', q: '¿Puedo recibir ban?', a: 'Sí. Toda modificación tiene riesgo.' },
          { num: '04', q: '¿Qué plataformas hay?', a: 'Solo Windows 10/11 64-bit con launcher oficial.' },
          { num: '05', q: '¿Puedo mover la licencia?', a: 'Sí, con reset HWID o ticket de Discord.' },
          { num: '06', q: '¿Dónde están los productos?', a: 'En Productos Aion 2: tiers, HWID, UGC y disfraces.' },
        ],
      },
      footer: {
        tagline: 'Cheats ESP, radar de Abismo y skill assist de Aion 2 para PC.',
        explore: 'Explorar',
        support: 'Soporte',
        legal: 'Legal',
        privacy: 'Privacidad',
        terms: 'Términos',
        about: 'Acerca de',
      },
      ui: {
        skipLink: 'Saltar al contenido',
        browseCheats: 'Iniciar checkout',
        browseCheatsMobile: 'Iniciar checkout',
        homeAria: 'Inicio Aion 2 Cheats',
        checkoutAria: 'Iniciar checkout',
        discordAria: 'Discord',
        menuOpen: 'Abrir menú',
        menuClose: 'Cerrar menú',
        themeLight: 'Modo claro',
        themeDark: 'Modo oscuro',
      },
      blog: { eyebrow: 'Blog', title: 'Guías y actualizaciones', latestTitle: 'Últimos artículos', filterAll: 'Todos', read: 'Leer', viewAll: 'Ver todo' },
      products: { eyebrow: 'Productos', title: 'Productos Aion 2', viewAll: 'Ver todo', get: 'Obtener', explore: 'Explorar' },
      legalPages: {
        about: { title: 'Acerca de Aion 2 Cheats', description: 'Vendemos cheats y guías de Aion 2 para PC.' },
        privacy: { title: 'Privacidad | Aion 2 Cheats', description: 'Analytics, cookies y datos de contacto.' },
        terms: { title: 'Términos | Aion 2 Cheats', description: 'Compra, licencia y reembolsos.' },
        support: { title: 'Soporte | Aion 2 Cheats', description: 'Ayuda con loader, configs y HWID.' },
      },
    },
  },
  fr: {
    exportName: 'fr',
    file: 'fr.ts',
    dict: {
      site: {
        name: 'Aion 2 Cheats',
        domain: 'aion2cheats.net',
        title: 'Aion 2 Cheats — ESP, radar et overlays Abysse PvP (PC)',
        description:
          'Cheats Aion 2 pour PC : ESP joueurs, wallhack, radar d’Abysse, ESP de récolte, assist de skills et changeur de costumes.',
      },
      nav: [
        { href: '${productBase}', label: 'Produits' },
        { href: '/blog/', label: 'Blog' },
        { href: '/forum/', label: 'Forum' },
        { href: '/faq/', label: 'FAQ' },
        { href: '/support/', label: 'Support' },
      ],
      hero: {
        status: 'Aion 2 en ligne',
        eyebrow: 'Cheats Aion 2 undetected',
        titleLine1: 'Aion 2 Cheats —',
        titleLine2: 'ESP, radar et overlays Abysse',
        subtitle: 'ESP, wallhack et assist de skills pour le PvP Elyos vs Asmodian, instances et vol sur PC Windows.',
        ctaPrimary: 'Voir les produits',
        ctaDiscord: 'Rejoindre Discord',
        modesLabel: 'Contenu',
        modes: ['Abysse RvR', 'Arènes', 'Instances', 'Vol'],
        metrics: [
          { label: 'Safe stream', strong: 'Oui' },
          { label: 'Vitesse de patch', strong: '<24h' },
          { label: 'Utilisateurs', strong: '300+' },
          { label: 'Support', strong: '24/7' },
        ],
      },
      features: { eyebrow: 'Fonctions', title: 'Ce que vous obtenez', subtitle: 'ESP, wallhack, radar et skill assist pour Aion 2 sur PC.' },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions fréquentes',
        subtitle: 'Compatibilité, bans, tiers et installation.',
        items: [
          { num: '01', q: 'Où voir si c’est en ligne ?', a: 'Bannière sur aion2cheats.net et Discord #status.' },
          { num: '02', q: 'Après l’achat ?', a: 'Le portail ouvre le loader, le guide et les configs.' },
          { num: '03', q: 'Risque de ban ?', a: 'Oui. Toute modification comporte un risque.' },
          { num: '04', q: 'Quelles plateformes ?', a: 'Windows 10/11 64-bit avec le launcher officiel uniquement.' },
          { num: '05', q: 'Changer de PC ?', a: 'Oui via reset HWID ou ticket Discord.' },
          { num: '06', q: 'Où sont les produits ?', a: 'Page Produits Aion 2 : tiers, HWID, UGC et costumes.' },
        ],
      },
      footer: {
        tagline: 'Cheats ESP, radar d’Abysse et skill assist Aion 2 pour PC.',
        explore: 'Explorer',
        support: 'Support',
        legal: 'Mentions',
        privacy: 'Confidentialité',
        terms: 'Conditions',
        about: 'À propos',
      },
      ui: {
        skipLink: 'Aller au contenu',
        browseCheats: 'Lancer le checkout',
        browseCheatsMobile: 'Lancer le checkout',
        homeAria: 'Accueil Aion 2 Cheats',
        checkoutAria: 'Lancer le checkout',
        discordAria: 'Discord',
        menuOpen: 'Ouvrir le menu',
        menuClose: 'Fermer le menu',
        themeLight: 'Mode clair',
        themeDark: 'Mode sombre',
      },
      blog: { eyebrow: 'Blog', title: 'Guides et mises à jour', latestTitle: 'Derniers articles', filterAll: 'Tous', read: 'Lire', viewAll: 'Tout voir' },
      products: { eyebrow: 'Produits', title: 'Produits Aion 2', viewAll: 'Tout voir', get: 'Obtenir', explore: 'Explorer' },
      legalPages: {
        about: { title: 'À propos d’Aion 2 Cheats', description: 'Cheats et guides Aion 2 pour PC.' },
        privacy: { title: 'Confidentialité | Aion 2 Cheats', description: 'Analytics, cookies et données de contact.' },
        terms: { title: 'Conditions | Aion 2 Cheats', description: 'Achat, licence et remboursements.' },
        support: { title: 'Support | Aion 2 Cheats', description: 'Aide loader, configs et HWID.' },
      },
    },
  },
});

function serialize(value, indent = 2) {
  return JSON.stringify(value, null, indent)
    .replace(/"\$\{productBase\}"/g, '`${productBase}`')
    .replace(/"(\$\{productBase\}[^"]*)"/g, '`$1`');
}

for (const [, cfg] of Object.entries(locales)) {
  // Fix productBase hrefs that were placeholders
  const raw = serialize(cfg.dict)
    .replaceAll('"${productBase}"', '`${productBase}`')
    .replaceAll('"${productBase}', '`${productBase}')
    .replaceAll('"/blog/"', "'/blog/'")
    .replaceAll('"/forum/"', "'/forum/'")
    .replaceAll('"/faq/"', "'/faq/'")
    .replaceAll('"/support/"', "'/support/'")
    .replaceAll('"/go/aion-2/"', "'/go/aion-2/'");

  // Convert JSON to TS object literal-ish: keep double quotes OK for TS
  const body = `${header}
/** Auto-generated locale dictionary — review priority markets for SEO quality. */
export const ${cfg.exportName}: DeepPartialTranslations = ${raw.replace(/`\$\{productBase\}`/g, '`${productBase}`')};
`;
  // Actually productBase in nav needs template literals - post-process
  let ts = body.replaceAll('"${productBase}"', '`${productBase}`');
  // JSON can't have templates - rewrite href fields
  ts = ts.replace(/"href": "\$\{productBase\}"/g, 'href: `${productBase}`');
  ts = ts.replace(/"href": "(\/[^"]+)"/g, 'href: \'$1\'');
  // Convert "key": to key: for cleaner TS (optional)
  fs.writeFileSync(path.join(outDir, cfg.file), ts, 'utf8');
  console.log('wrote', cfg.file);
}

console.log('done');
