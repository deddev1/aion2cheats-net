import type { SiteFaqItem } from '../data/faq';
import type { Locale } from './locales';

type FaqCopy = { q: string; a: string };

/**
 * Full /faq/ translations for priority markets (KR, TW, DE, BR, TH).
 * Keys match SiteFaqItem.id from data/faq.ts. Secondary locales fall back to English.
 */
const FAQ_FULL: Partial<Record<Locale, Record<string, FaqCopy>>> = {
  ko: {
    status: {
      q: 'Aion 2 치트가 온라인인지 어디서 확인하나요?',
      a: 'aion2cheats.net 라이브 배너와 디스코드 #status에서 확인하세요. Aion 2나 안티치트 업데이트 후에는 반드시 다시 확인하세요.',
    },
    'after-buy': {
      q: '구매 후 무엇이 열리나요?',
      a: '포털에서 로더, 설치 가이드, 설정 라이브러리가 열립니다. Aion 2를 실행하기 전에 가이드를 따라 주세요.',
    },
    'ban-risk': {
      q: '사설 Aion 2 치트로 밴될 수 있나요?',
      a: '네. 모든 변조에는 위험이 있습니다. 안티치트와 신고 시스템은 계속 바뀝니다. 현재 상태를 읽고 위험을 이해한 뒤 사용하세요.',
    },
    platforms: {
      q: '지원 플랫폼은 무엇인가요?',
      a: 'Windows 10/11 64비트와 공식 런처의 Aion 2만 지원합니다. macOS와 Linux는 지원하지 않습니다.',
    },
    'license-move': {
      q: '새 PC로 라이선스를 옮길 수 있나요?',
      a: '포털의 HWID 초기화나 디스코드 티켓으로 가능합니다. 한도는 티어에 따라 다릅니다.',
    },
    'products-page': {
      q: '제품과 유틸은 어디에 있나요?',
      a: 'Aion 2 제품 페이지에 치트 티어, HWID 스푸퍼, UGC, 코스튬 체인저와 기능 목록·결제가 있습니다.',
    },
    'what-is-esp': {
      q: 'Aion 2 ESP 월핵 / ESP란?',
      a: 'ESP 월핵과 플레이어 ESP는 어비스 지형 너머 적 위치, 드롭, 루트, 캠프를 보여 줍니다. Lite는 인식용 오버레이, Pro·Elite는 그 위에 스크립트 모듈을 더합니다.',
    },
    'esp-vs-scripts': {
      q: 'ESP 월핵과 에임봇의 차이는?',
      a: 'ESP 월핵·ESP는 정보 오버레이로 스킬을 시전하지 않습니다. 에임봇·Smooth Aim·Sticky Aim은 Pro·Elite의 조준 보조입니다. Lite는 인식만 가능합니다.',
    },
    'which-tier-esp': {
      q: 'ESP 월핵만 쓰려면 어떤 티어인가요?',
      a: 'Lite는 인식 전용: 플레이어 ESP, 드롭 로케이터, 루트 타이머, 레이더. Pro는 에임봇, Elite는 봇·킬스틸·코스튬 체인저까지 포함합니다.',
    },
    'which-tier-scripts': {
      q: '에임봇이 포함된 티어는?',
      a: 'Pro에 Aimbot, Smooth Aim, Sticky Aim, 핫키 매크로가 있습니다. Elite는 Pro 전부 + 파밍 어시스트·Auto Kill. Lite에는 스킬 자동화가 없습니다.',
    },
    'rank-lite-vs-pro': {
      q: 'Lite·Pro·Elite는 어떻게 고르나요?',
      a: '맵 인식만 → Lite. 어비스 교전에 에임봇 → Pro. 풀 봇과 우선 패치 → Elite. 각 치트 페이지나 FAQ에서 비교하세요.',
    },
    'elite-slots': {
      q: 'Elite는 왜 슬롯이 제한되나요?',
      a: 'Elite는 개발자 직접 지원과 우선 패치가 있는 프라이빗 빌드입니다. 슬롯 제한으로 패치 주기를 빠르게 유지합니다. 결제 전 상태 배너를 확인하세요.',
    },
    'stream-proof': {
      q: 'OBS가 오버레이를 캡처하나요?',
      a: 'Lite·Pro·Elite의 스트림 프루프 모드는 OBS·디스코드 화면에 오버레이를 숨깁니다. 방송 전에 로컬 녹화를 테스트하세요.',
    },
    undetected: {
      q: '미탐지 Aion 2 치트가 보장되나요?',
      a: '아니요. 미탐지는 제품 페이지의 현재 상태일 뿐 영구 보장이 아닙니다. 업데이트·테스트·탐지 표시가 나면 사용을 멈추세요.',
    },
    'esp-safer': {
      q: 'ESP 월핵이 에임봇보다 안전한가요?',
      a: 'ESP는 리플레이에서 봇 패턴보다 덜 눈에 띌 수 있지만 여전히 치트입니다. 에임봇을 꺼도 안티치트가 오버레이를 무시하지 않습니다.',
    },
    'hwid-when': {
      q: 'HWID 스푸퍼는 언제 필요한가요?',
      a: '같은 PC에서만 새 NCSOFT 계정이 즉시 실패하고 다른 PC에서는 될 때—하드웨어 제재일 때 사용합니다. 계정만의 안티치트 이슈는 UGC를 보세요.',
    },
    'ugc-what': {
      q: 'UGC란 무엇인가요?',
      a: 'UGC(Unban & Governance Control)는 NCSOFT 계정 제한·안티치트 밴 이의 제기 워크스페이스입니다. 맞춤 워크플로와 사례 추적이지, 언밴을 보장하지 않습니다.',
    },
    'skin-changer': {
      q: '코스튬 체인저가 코스튬 보관함을 바꾸나요?',
      a: '코스튬 체인저는 클라이언트에서만 로컬로 미리봅니다. 다른 플레이어는 실제 인벤을 봅니다. Elite에 포함되며 단독 구매도 가능합니다.',
    },
    'external-loader': {
      q: '로더가 NCSOFT 폴더에 주입되나요?',
      a: 'Aion 2 Cheats는 클라우드 설정 동기화의 외부 방식으로 동작하며 Aion 2 폴더에 파일을 주입하지 않습니다. 안티치트 위험은 여전히 있습니다.',
    },
    'blog-vs-cheats': {
      q: '블로그의 치트 코드가 어비스 치트와 같나요?',
      a: '아니요. 블로그의 NCSOFT 콘솔 명령은 치트가 켜진 커스텀 로비에만 해당합니다. 어비스용 Aion 2 치트는 별도 제품입니다.',
    },
    'blog-setup': {
      q: '블로그 설치 가이드는 어디로 연결되나요?',
      a: '가이드는 티어 페이지와 제품 허브로 연결됩니다. 결제는 보안 파트너를 통합니다. 임의 디스코드 DM의 로더 파일을 받지 마세요.',
    },
    'compare-plans': {
      q: '플랜을 나란히 비교하려면?',
      a: '각 치트 티어 페이지에 비교 표가 있습니다. FAQ 페이지에서 제품·치트·블로그 답변을 한곳에 모았습니다.',
    },
    'who-lite': {
      q: 'Lite를 유지하면 좋은 사람은?',
      a: 'ESP·드롭·루트만 원하고 스킬 자동화를 쓰지 않는 플레이어. 콤보 에임봇을 계속 켠다면 Pro를 구매하세요.',
    },
    'who-pro': {
      q: 'Pro는 누구에게 맞나요?',
      a: 'ESP 월핵과 함께 Aimbot·Smooth Aim·핫키 매크로가 필요한 어비스 플레이어. aion2cheats.net에서 가장 인기 있는 티어입니다.',
    },
    'who-elite': {
      q: 'Elite는 누구에게 맞나요?',
      a: '파밍 어시스트, Auto Kill, 코스튬 체인저, 우선 패치가 필요하고 슬롯이 열려 있을 때 쓰는 운영자용입니다.',
    },
    'eac-update': {
      q: '안티치트 업데이트 후에는?',
      a: 'aion2cheats.net 상태와 디스코드 #status를 확인하세요. 배너가 온라인이 될 때까지 실행하지 마세요. 패치 뒤에는 보수적인 프리셋을 쓰세요.',
    },
    'discord-help': {
      q: '설치 도움은 어떻게 받나요?',
      a: '구매 후 디스코드에 주문 이메일, Windows 버전, Aion 2 클라이언트 빌드를 알려 주세요. 스태프가 로더 설정을 안내합니다.',
    },
    'zero-build-ranked': {
      q: '인스턴스와 어비스 PvP에서도 되나요?',
      a: '네. Lite·Pro·Elite 모두 포털에 인스턴스·어비스 프리셋이 있습니다. 첫 큐 전에 거리 캡과 스크립트 딜레이를 조절하세요.',
    },
    'zoom-hack': {
      q: '레이더 핵은 어떤 티어에 있나요?',
      a: '레이더는 Lite부터 Pro·Elite까지 포함됩니다. 미니 레이더로 로테를 추측하지 않고 존을 파악할 수 있습니다.',
    },
    'auto-farm': {
      q: '파밍 어시스트는 어떤 티어인가요?',
      a: '파밍 어시스트, Flight Assist AI, Auto 로드아웃은 Elite 전용입니다. Pro는 전투 에임봇만 있고 봇 파밍은 없습니다.',
    },
    'private-cheats': {
      q: '사설 Aion 2 치트란?',
      a: '사용자별 키와 유지보수되는 빌드를 의미하며 공개 zip 팩이 아닙니다. Aion 2 Cheats는 ESP·에임봇·월핵 티어를 포털로 제공합니다.',
    },
  },

  'zh-tw': {
    status: {
      q: '要去哪裡確認 Aion 2 外掛是否在線？',
      a: '請查看 aion2cheats.net 的即時狀態橫幅與 Discord #status。每次 Aion 2 或反作弊更新後都請再確認一次。',
    },
    'after-buy': {
      q: '購買之後會解鎖什麼？',
      a: '結帳後可在入口網站取得載入器、安裝指南與設定庫。啟動 Aion 2 前請先依照指南操作。',
    },
    'ban-risk': {
      q: '使用私人 Aion 2 外掛會被封號嗎？',
      a: '會有風險。任何修改都可能被偵測，反作弊與檢舉系統也會更新。請先閱讀目前狀態並自行承擔風險。',
    },
    platforms: {
      q: '支援哪些平台？',
      a: '僅支援 Windows 10/11 64 位元與官方啟動器的 Aion 2。不支援 macOS 與 Linux。',
    },
    'license-move': {
      q: '可以把授權移到新電腦嗎？',
      a: '可以，透過入口的 HWID 重置或開 Discord 工單。次數上限依方案而定。',
    },
    'products-page': {
      q: '產品與工具在哪裡？',
      a: 'Aion 2 產品頁列出外掛方案、HWID 偽裝器、UGC、服裝變更器，以及功能說明與結帳連結。',
    },
    'what-is-esp': {
      q: '什麼是 Aion 2 ESP 穿牆／ESP？',
      a: 'ESP 穿牆與玩家 ESP 可穿透深淵地形顯示敵人位置、掉落、戰利品與營地。Lite 提供資訊疊層；Pro 與 Elite 再加腳本模組。',
    },
    'esp-vs-scripts': {
      q: 'ESP 穿牆和自瞄有什麼差別？',
      a: 'ESP 穿牆／ESP 只是資訊疊層，不會幫你施放技能。自瞄、Smooth Aim、Sticky Aim 是 Pro／Elite 的瞄準輔助。Lite 僅能做戰場感知。',
    },
    'which-tier-esp': {
      q: '只要 ESP 穿牆該選哪個方案？',
      a: 'Lite 純感知：玩家 ESP、掉落定位、戰利品計時與雷達。Pro 加自瞄；Elite 再加機器人、搶頭與服裝變更器。',
    },
    'which-tier-scripts': {
      q: '哪個方案含自瞄？',
      a: 'Pro 含 Aimbot、Smooth Aim、Sticky Aim 與快捷巨集。Elite 含 Pro 全部再加刷資源輔助與 Auto Kill。Lite 沒有技能自動化。',
    },
    'rank-lite-vs-pro': {
      q: 'Lite、Pro、Elite 怎麼選？',
      a: '只要地圖感知 → Lite；深淵交戰要自瞄 → Pro；完整機器人與優先更新 → Elite。各方案頁或 FAQ 可比較。',
    },
    'elite-slots': {
      q: '為什麼 Elite 名額有限？',
      a: 'Elite 是含開發者直接支援與優先更新的私人版本。限制名額才能加快更新節奏。結帳前請看狀態橫幅。',
    },
    'stream-proof': {
      q: 'OBS 會錄到疊層嗎？',
      a: 'Lite／Pro／Elite 的直播防護模式會對 OBS 與 Discord 分享隱藏疊層。開播前請先本地錄影測試。',
    },
    undetected: {
      q: '未偵測的 Aion 2 外掛有保證嗎？',
      a: '沒有。未偵測只代表產品頁目前狀態，不是永久保證。若顯示更新中、測試中或已偵測，請立刻停用。',
    },
    'esp-safer': {
      q: 'ESP 穿牆比自瞄更安全嗎？',
      a: '回放中 ESP 可能比明顯機器人模式低調，但仍是外掛。關掉自瞄也不代表反作弊會忽略疊層。',
    },
    'hwid-when': {
      q: '什麼時候需要 HWID 偽裝器？',
      a: '當新 NCSOFT 帳號在同一台 PC 立刻失敗、換電腦卻正常時——多半是硬體封鎖。純帳號反作弊問題請改看 UGC。',
    },
    'ugc-what': {
      q: 'UGC 是什麼？',
      a: 'UGC（Unban & Governance Control）是 NCSOFT 帳號限制與反作弊封禁的申訴工作區，提供流程與案件追蹤，不保證解封。',
    },
    'skin-changer': {
      q: '服裝變更器會改我的衣櫃嗎？',
      a: '服裝變更器只在本機客戶端預覽外觀，其他玩家仍看到真實背包。Elite 內建，也可單獨購買僅作外觀預覽。',
    },
    'external-loader': {
      q: '載入器會注入 NCSOFT 資料夾嗎？',
      a: 'Aion 2 Cheats 採外部載入並雲端同步設定，不會把檔案注入 Aion 2 目錄。反作弊風險仍然存在。',
    },
    'blog-vs-cheats': {
      q: '部落格的作弊碼跟深淵外掛一樣嗎？',
      a: '不一樣。部落格提到的 NCSOFT 控制台指令只適用於開啟作弊的自訂大廳。深淵用的 Aion 2 外掛是獨立產品。',
    },
    'blog-setup': {
      q: '部落格安裝教學會連到哪裡購買？',
      a: '教學會連到方案頁與產品總覽。結帳走安全合作夥伴，切勿從陌生 Discord 私訊下載載入器。',
    },
    'compare-plans': {
      q: '要在哪裡並排比較方案？',
      a: '每個外掛方案頁都有比較表。FAQ 頁則把產品、外掛與部落格相關解答集中在一起。',
    },
    'who-lite': {
      q: '誰適合繼續用 Lite？',
      a: '只要地圖感知（ESP、掉落、戰利品）、不碰技能自動化的玩家。若常開連招自瞄，請改買 Pro。',
    },
    'who-pro': {
      q: '誰該買 Pro？',
      a: '需要自瞄、Smooth Aim、快捷巨集，又要 ESP 穿牆的深淵玩家。這是 aion2cheats.net 最受歡迎的方案。',
    },
    'who-elite': {
      q: '誰該買 Elite？',
      a: '需要刷資源輔助、Auto Kill、服裝變更器與優先更新，且名額開放時的重度使用者。',
    },
    'eac-update': {
      q: '反作弊更新後該怎麼做？',
      a: '查看 aion2cheats.net 狀態與 Discord #status。橫幅顯示在線前不要啟動。任何更新後請先用保守預設。',
    },
    'discord-help': {
      q: '如何取得安裝協助？',
      a: '購買後在 Discord 提供訂單信箱、Windows 版本與 Aion 2 客戶端版本，客服會協助完成載入器設定。',
    },
    'zero-build-ranked': {
      q: '副本與深淵 PvP 都能用嗎？',
      a: '可以。Lite、Pro、Elite 入口都有副本與深淵預設。第一次排隊前請調好距離上限與腳本延遲。',
    },
    'zoom-hack': {
      q: '哪個方案有雷達外掛？',
      a: '雷達從 Lite 起就有，並延續到 Pro 與 Elite。小地圖雷達有助區域感知，不必瞎猜轉點。',
    },
    'auto-farm': {
      q: '哪個方案有刷資源輔助？',
      a: '刷資源輔助、飛行輔助 AI 與自動裝備配置僅 Elite。Pro 有戰鬥自瞄，沒有掛機刷怪。',
    },
    'private-cheats': {
      q: '什麼是私人 Aion 2 外掛？',
      a: '私人代表每人一把金鑰與持續維護的版本，不是公開 zip 包。Aion 2 Cheats 透過入口發放 ESP、自瞄與穿牆方案。',
    },
  },

  de: {
    status: {
      q: 'Wo sehe ich, ob Aion 2 Cheats online sind?',
      a: 'Live-Banner auf aion2cheats.net und Discord #status. Nach jedem Aion-2- oder Anti-Cheat-Update erneut prüfen.',
    },
    'after-buy': {
      q: 'Was passiert nach dem Kauf?',
      a: 'Im Portal erhältst du Loader, Setup-Guide und Config-Bibliothek. Vor dem Start von Aion 2 den Guide befolgen.',
    },
    'ban-risk': {
      q: 'Kann ich mit privaten Aion-2-Cheats gebannt werden?',
      a: 'Ja — jede Modifikation birgt Risiko. Anti-Cheat und Meldesysteme ändern sich. Status lesen und Risiko akzeptieren.',
    },
    platforms: {
      q: 'Welche Plattformen werden unterstützt?',
      a: 'Nur Windows 10/11 64-Bit mit offiziellem Launcher. macOS und Linux werden nicht unterstützt.',
    },
    'license-move': {
      q: 'Kann ich die Lizenz auf einen neuen PC umziehen?',
      a: 'Ja — HWID-Reset im Portal oder Discord-Ticket. Limits hängen vom Tier ab.',
    },
    'products-page': {
      q: 'Wo finde ich Produkte und Utilities?',
      a: 'Auf der Aion-2-Produktseite: Cheat-Tiers, HWID-Spoofer, UGC und Kostüm-Wechsler mit Feature-Listen und Checkout.',
    },
    'what-is-esp': {
      q: 'Was ist Aion 2 ESP-Wallhack / ESP?',
      a: 'ESP-Wallhack und Spieler-ESP zeigen Gegnerpositionen, Drops, Loot und Camps durch Abyss-Terrain. Lite deckt Awareness ab; Pro und Elite ergänzen Skript-Module.',
    },
    'esp-vs-scripts': {
      q: 'Unterschied zwischen ESP-Wallhack und Aimbot?',
      a: 'ESP-Wallhack/ESP sind Info-Overlays und casten keine Skills. Aimbot, Smooth Aim und Sticky Aim sind Aim-Hilfe auf Pro und Elite. Lite bleibt Awareness-only.',
    },
    'which-tier-esp': {
      q: 'Welches Tier brauche ich nur für ESP-Wallhack?',
      a: 'Lite ist Awareness-only: Spieler-ESP, Drop-Locator, Loot-Timer und Radar. Pro ergänzt Aimbot; Elite Bots, Kill Steal und Kostüm-Wechsler.',
    },
    'which-tier-scripts': {
      q: 'Welches Tier enthält Aimbot?',
      a: 'Pro liefert Aimbot, Smooth Aim, Sticky Aim und Hotkey-Makros. Elite enthält alles aus Pro plus Farm-Assist und Auto Kill. Lite hat keine Skill-Automation.',
    },
    'rank-lite-vs-pro': {
      q: 'Wie wähle ich zwischen Lite, Pro und Elite?',
      a: 'Nur Map-Awareness → Lite. Abyss-Kämpfe mit Aimbot → Pro. Volle Bot-Suite und Prioritäts-Patches → Elite. Vergleich auf den Cheat-Seiten oder in der FAQ.',
    },
    'elite-slots': {
      q: 'Warum sind Elite-Slots begrenzt?',
      a: 'Elite ist ein privater Build mit direktem Dev-Support und Prioritäts-Patches. Slot-Caps halten Patch-Zyklen schnell. Vor dem Checkout den Status-Banner prüfen.',
    },
    'stream-proof': {
      q: 'Kann OBS mein Overlay aufnehmen?',
      a: 'Stream-Proof auf Lite, Pro und Elite versteckt Overlays vor OBS und Discord-Share. Vor dem Stream lokal testen.',
    },
    undetected: {
      q: 'Sind undetected Aion-2-Cheats garantiert?',
      a: 'Nein. Undetected ist der aktuelle Status auf der Produktseite — keine Dauer-Garantie. Bei Updating, Testing oder Detected sofort stoppen.',
    },
    'esp-safer': {
      q: 'Ist ESP-Wallhack sicherer als Aimbot?',
      a: 'ESP wirkt in Replays oft unauffälliger als klare Bot-Muster, bleibt aber ein Cheat. Anti-Cheat ignoriert Overlays nicht, nur weil Aimbot aus ist.',
    },
    'hwid-when': {
      q: 'Wann brauche ich den HWID-Spoofer?',
      a: 'Wenn frische NCSOFT-Accounts auf einem PC sofort scheitern, anderswo aber funktionieren — Hardware-Sperre. Bei reinen Account-Fällen eher UGC nutzen.',
    },
    'ugc-what': {
      q: 'Was ist UGC?',
      a: 'UGC (Unban & Governance Control) ist ein Einspruchs-Workspace für NCSOFT-Sperren und Anti-Cheat-Bans — Workflows und Fall-Tracking, keine Unban-Garantie.',
    },
    'skin-changer': {
      q: 'Ändert der Kostüm-Wechsler mein Kostüm-Inventar?',
      a: 'Der Kostüm-Wechsler zeigt Optiken nur lokal. Andere Spieler sehen dein echtes Inventar. In Elite enthalten; auch einzeln für lokale Vorschau.',
    },
    'external-loader': {
      q: 'Wird der Loader in den NCSOFT-Ordner injiziert?',
      a: 'Aion 2 Cheats läuft extern mit Cloud-Config-Sync — keine Dateien im Aion-2-Verzeichnis. Anti-Cheat-Risiko bleibt bestehen.',
    },
    'blog-vs-cheats': {
      q: 'Sind Blog-Cheatcodes dasselbe wie Abyss-Cheats?',
      a: 'Nein. Blog-Artikel zu NCSOFT-Konsolenbefehlen gelten nur in Custom-Lobbys mit Cheats. Abyss-Aion-2-Cheats sind eigene Produkte.',
    },
    'blog-setup': {
      q: 'Wohin verlinken Blog-Setup-Guides zum Kauf?',
      a: 'Guides linken zu Tier-Seiten und dem Produkt-Hub. Checkout läuft über unseren Partner — keine Loader aus zufälligen Discord-DMs.',
    },
    'compare-plans': {
      q: 'Wo vergleiche ich Pläne nebeneinander?',
      a: 'Jede Cheat-Tier-Seite hat eine Vergleichstabelle. Die FAQ sammelt Produkt-, Cheat- und Blog-Antworten an einem Ort.',
    },
    'who-lite': {
      q: 'Wer sollte bei Lite bleiben?',
      a: 'Spieler, die nur Map-Awareness wollen — ESP, Drops, Loot — und keine Skill-Automation. Wenn du ständig Combo-Aimbot nutzt, nimm Pro.',
    },
    'who-pro': {
      q: 'Wer sollte Pro kaufen?',
      a: 'Abyss-Spieler, die Aimbot, Smooth Aim und Hotkey-Makros plus ESP-Wallhack wollen. Pro ist das beliebteste Tier auf aion2cheats.net.',
    },
    'who-elite': {
      q: 'Wer sollte Elite kaufen?',
      a: 'Nutzer, die Farm-Assist, Auto Kill, Kostüm-Wechsler und Prioritäts-Patches wollen — wenn Slots offen sind.',
    },
    'eac-update': {
      q: 'Was tun nach einem Anti-Cheat-Update?',
      a: 'Status auf aion2cheats.net und Discord #status prüfen. Nicht starten, bis der Banner online zeigt. Nach Patches konservative Presets laden.',
    },
    'discord-help': {
      q: 'Wie bekomme ich Installationshilfe?',
      a: 'Nach dem Kauf auf Discord Bestell-E-Mail, Windows-Version und Aion-2-Client-Build angeben. Das Team führt dich durchs Loader-Setup.',
    },
    'zero-build-ranked': {
      q: 'Funktionieren die Tiers in Instanzen und Abyss-PvP?',
      a: 'Ja — Lite, Pro und Elite haben Instanz- und Abyss-Presets im Portal. Distanz-Caps und Skript-Delay vor der ersten Queue einstellen.',
    },
    'zoom-hack': {
      q: 'Welches Tier enthält Radar-Hack?',
      a: 'Radar gibt es ab Lite und durchgängig auf Pro und Elite. Mini-Radar hilft bei Zonen-Awareness ohne Raten beim Rotieren.',
    },
    'auto-farm': {
      q: 'Welches Tier enthält Farm-Assist?',
      a: 'Farm-Assist, Flight-Assist-AI und Auto-Loadout sind Elite-only. Pro deckt Combat-Aimbot ohne Bot-Farming ab.',
    },
    'private-cheats': {
      q: 'Was sind private Aion-2-Cheats?',
      a: 'Private bedeutet pro Nutzer Keys und gepflegte Builds — keine öffentlichen Zip-Packs. Aion 2 Cheats liefert ESP-, Aimbot- und Wallhack-Tiers über das Portal.',
    },
  },

  'pt-br': {
    status: {
      q: 'Onde vejo se os cheats de Aion 2 estão online?',
      a: 'No banner ao vivo em aion2cheats.net e no Discord #status. Sempre confira após atualizações do Aion 2 ou do anticheat.',
    },
    'after-buy': {
      q: 'O que acontece depois da compra?',
      a: 'O portal libera o loader, o guia de instalação e a biblioteca de configs. Siga o guia antes de abrir o Aion 2.',
    },
    'ban-risk': {
      q: 'Posso ser banido usando cheats privados de Aion 2?',
      a: 'Sim — qualquer modificação tem risco. Anticheat e denúncias mudam. Leia o status atual e aceite o risco antes de usar.',
    },
    platforms: {
      q: 'Quais plataformas são suportadas?',
      a: 'Somente Windows 10/11 64 bits com o launcher oficial do Aion 2. macOS e Linux não são suportados.',
    },
    'license-move': {
      q: 'Posso mover a licença para outro PC?',
      a: 'Sim — use o reset de HWID no portal ou abra um ticket no Discord. Os limites dependem do plano.',
    },
    'products-page': {
      q: 'Onde ficam produtos e utilitários?',
      a: 'Na página de produtos Aion 2: planos de cheat, spoofer de HWID, UGC e trocador de trajes, com listas de recursos e checkout.',
    },
    'what-is-esp': {
      q: 'O que é ESP wallhack / ESP de Aion 2?',
      a: 'ESP wallhack e ESP de jogadores mostram posições inimigas, drops, loot e acampamentos através do terreno do Abismo. Lite cobre visão; Pro e Elite adicionam módulos de script.',
    },
    'esp-vs-scripts': {
      q: 'Qual a diferença entre ESP wallhack e aimbot?',
      a: 'ESP wallhack/ESP são overlays de informação — não lançam skills. Aimbot, Smooth Aim e Sticky Aim são assistência de mira no Pro e Elite. Lite fica só na percepção.',
    },
    'which-tier-esp': {
      q: 'Qual plano preciso só para ESP wallhack?',
      a: 'Lite é só percepção: ESP de jogadores, localizador de drops, timers de loot e radar. Pro adiciona aimbot; Elite adiciona bots, kill steal e trocador de trajes.',
    },
    'which-tier-scripts': {
      q: 'Qual plano inclui aimbot?',
      a: 'Pro traz Aimbot, Smooth Aim, Sticky Aim e macros de hotkey. Elite inclui tudo do Pro mais assistência de farm e Auto Kill. Lite não tem automação de skills.',
    },
    'rank-lite-vs-pro': {
      q: 'Como escolher entre Lite, Pro e Elite?',
      a: 'Só mapa → Lite. Lutas no Abismo com aimbot → Pro. Suite completa de bots e patches prioritários → Elite. Compare nas páginas ou no FAQ.',
    },
    'elite-slots': {
      q: 'Por que o Elite tem vagas limitadas?',
      a: 'Elite é um build privado com suporte direto dos devs e patches prioritários. O limite de vagas mantém o ciclo de updates rápido. Confira o banner antes do checkout.',
    },
    'stream-proof': {
      q: 'O OBS captura meu overlay?',
      a: 'O modo stream-proof no Lite, Pro e Elite esconde overlays do OBS e do compartilhamento do Discord. Teste uma gravação local antes de ir ao vivo.',
    },
    undetected: {
      q: 'Cheats undetected de Aion 2 são garantidos?',
      a: 'Não. Undetected é o status atual na página do produto — não é garantia permanente. Pare se o build mostrar atualizando, em teste ou detectado.',
    },
    'esp-safer': {
      q: 'ESP wallhack é mais seguro que aimbot?',
      a: 'ESP costuma parecer mais discreto em replays do que padrões óbvios de bot, mas ainda é cheat. O anticheat não ignora overlays só porque o aimbot está desligado.',
    },
    'hwid-when': {
      q: 'Quando preciso do spoofer de HWID?',
      a: 'Quando contas novas da NCSOFT falham na hora em um PC e funcionam em outro — bloqueio de hardware. Para casos só de conta, veja o UGC.',
    },
    'ugc-what': {
      q: 'O que é UGC?',
      a: 'UGC (Unban & Governance Control) é um espaço para apelar restrições de conta NCSOFT e bans do anticheat — fluxos e acompanhamento, sem garantia de unban.',
    },
    'skin-changer': {
      q: 'O trocador de trajes altera meu inventário de costumes?',
      a: 'Ele pré-visualiza cosméticos só no cliente local. Outros jogadores veem seu inventário real. Incluído no Elite; também vendido à parte só para preview.',
    },
    'external-loader': {
      q: 'O loader injeta arquivos na pasta da NCSOFT?',
      a: 'Aion 2 Cheats roda externo com sync de config na nuvem — sem injetar arquivos na pasta do Aion 2. O risco de anticheat continua.',
    },
    'blog-vs-cheats': {
      q: 'Códigos do blog são iguais aos cheats do Abismo?',
      a: 'Não. Artigos sobre comandos de console da NCSOFT valem só em lobbies custom com cheats. Cheats de Abismo são produtos separados.',
    },
    'blog-setup': {
      q: 'Para onde os guias do blog apontam na compra?',
      a: 'Os guias linkam páginas de plano e o hub de produtos. O checkout é pelo parceiro seguro — nunca baixe loader de DM aleatória no Discord.',
    },
    'compare-plans': {
      q: 'Onde comparo os planos lado a lado?',
      a: 'Cada página de plano tem tabela de comparação. O FAQ reúne respostas de produto, cheat e blog em um lugar.',
    },
    'who-lite': {
      q: 'Quem deve ficar no Lite?',
      a: 'Quem só quer percepção de mapa — ESP, drops, loot — e não usa automação de skills. Se você liga aimbot de combo o tempo todo, compre o Pro.',
    },
    'who-pro': {
      q: 'Quem deve comprar o Pro?',
      a: 'Jogadores de Abismo que querem Aimbot, Smooth Aim e macros com ESP wallhack. É o plano mais popular em aion2cheats.net.',
    },
    'who-elite': {
      q: 'Quem deve comprar o Elite?',
      a: 'Quem quer assistência de farm, Auto Kill, trocador de trajes e patches prioritários quando houver vagas.',
    },
    'eac-update': {
      q: 'O que fazer depois de um update do anticheat?',
      a: 'Confira o status em aion2cheats.net e no Discord #status. Não abra até o banner mostrar online. Após qualquer patch, use presets conservadores.',
    },
    'discord-help': {
      q: 'Como peço ajuda na instalação?',
      a: 'Após a compra, no Discord informe e-mail do pedido, versão do Windows e build do cliente Aion 2. A equipe guia a configuração do loader.',
    },
    'zero-build-ranked': {
      q: 'Os planos funcionam em instâncias e PvP do Abismo?',
      a: 'Sim — Lite, Pro e Elite têm presets de instância e Abismo no portal. Ajuste caps de distância e delay de script antes da primeira fila.',
    },
    'zoom-hack': {
      q: 'Qual plano inclui radar hack?',
      a: 'O radar vem no Lite e segue no Pro e Elite. O mini-radar ajuda na percepção de zona sem adivinhar rotações.',
    },
    'auto-farm': {
      q: 'Qual plano inclui assistência de farm?',
      a: 'Assistência de farm, Flight Assist AI e gerenciador de loadout automático são só Elite. Pro cobre aimbot de combate sem farm de bot.',
    },
    'private-cheats': {
      q: 'O que são cheats privados de Aion 2?',
      a: 'Privado significa chaves por usuário e builds mantidos — não packs zip públicos. Aion 2 Cheats entrega planos de ESP, aimbot e wallhack pelo portal.',
    },
  },

  th: {
    status: {
      q: 'เช็กได้ที่ไหนว่าโกง Aion 2 ออนไลน์อยู่?',
      a: 'ดูแบนเนอร์สถานะสดบน aion2cheats.net และ Discord #status หลังอัปเดต Aion 2 หรือแอนตี้โกงต้องเช็กอีกครั้งเสมอ',
    },
    'after-buy': {
      q: 'หลังซื้อแล้วได้อะไรบ้าง?',
      a: 'พอร์ทัลจะปลดล็อกโหลดเดอร์ คู่มือติดตั้ง และคลังคอนฟิก ให้ทำตามคู่มือก่อนเปิด Aion 2',
    },
    'ban-risk': {
      q: 'ใช้โกง Aion 2 แบบส่วนตัวแล้วโดนแบนได้ไหม?',
      a: 'ได้ — การดัดแปลงทุกอย่างมีความเสี่ยง แอนตี้โกงและระบบรายงานเปลี่ยนตลอด ให้อ่านสถานะปัจจุบันและยอมรับความเสี่ยงก่อนใช้',
    },
    platforms: {
      q: 'รองรับแพลตฟอร์มใดบ้าง?',
      a: 'เฉพาะ Windows 10/11 64 บิตกับ Aion 2 ผ่าน launcher ทางการ ไม่รองรับ macOS และ Linux',
    },
    'license-move': {
      q: 'ย้ายไลเซนส์ไปเครื่องใหม่ได้ไหม?',
      a: 'ได้ — รีเซ็ต HWID ในพอร์ทัลหรือเปิดทิกเก็ต Discord ขีดจำกัดขึ้นกับแพ็กเกจ',
    },
    'products-page': {
      q: 'สินค้าและยูทิลิตี้อยู่ที่ไหน?',
      a: 'หน้ารายการสินค้า Aion 2 มีแพ็กเกจโกง HWID Spoofer UGC และตัวเปลี่ยนชุด พร้อมรายการฟีเจอร์และชำระเงิน',
    },
    'what-is-esp': {
      q: 'ESP วอลล์แฮค / ESP ของ Aion 2 คืออะไร?',
      a: 'ESP วอลล์แฮคและ ESP ผู้เล่นแสดงตำแหน่งศัตรู ดรอป ของ และแคมป์ทะลุภูมิประเทศอบิส Lite เป็นโอเวอร์เลย์รับรู้ Pro และ Elite เพิ่มโมดูลสคริปต์',
    },
    'esp-vs-scripts': {
      q: 'ESP วอลล์แฮคกับเอมบอทต่างกันอย่างไร?',
      a: 'ESP วอลล์แฮค/ESP เป็นโอเวอร์เลย์ข้อมูล ไม่ได้ร่ายสกิลให้คุณ เอมบอท Smooth Aim Sticky Aim เป็นตัวช่วยเล็งใน Pro และ Elite Lite ใช้ได้แค่การรับรู้สนาม',
    },
    'which-tier-esp': {
      q: 'อยากได้แค่ ESP วอลล์แฮคเลือกแพ็กไหน?',
      a: 'Lite รับรู้เท่านั้น: ESP ผู้เล่น ตัวหาดรอป ตัวจับเวลาลูท และเรดาร์ Pro เพิ่มเอมบอท Elite เพิ่มบอท แย่งคิล และตัวเปลี่ยนชุด',
    },
    'which-tier-scripts': {
      q: 'แพ็กไหนมีเอมบอท?',
      a: 'Pro มี Aimbot Smooth Aim Sticky Aim และมาโครฮอตคีย์ Elite รวมของ Pro บวกตัวช่วยฟาร์มกับ Auto Kill Lite ไม่มีระบบอัตโนมัติสกิล',
    },
    'rank-lite-vs-pro': {
      q: 'เลือก Lite Pro Elite อย่างไร?',
      a: 'แค่รับรู้แผนที่ → Lite ต่อสู้ในอบิสพร้อมเอมบอท → Pro ชุดบอทเต็มและแพตช์ลำดับความสำคัญ → Elite เปรียบเทียบในหน้าสินค้าหรือ FAQ',
    },
    'elite-slots': {
      q: 'ทำไม Elite จำกัดจำนวนที่นั่ง?',
      a: 'Elite เป็นบิลด์ส่วนตัวพร้อมซัพพอร์ตนักพัฒนาและแพตช์ลำดับความสำคัญ การจำกัดที่นั่งช่วยให้รอบอัปเดตเร็ว เช็กแบนเนอร์ก่อนชำระเงิน',
    },
    'stream-proof': {
      q: 'OBS จับโอเวอร์เลย์ได้ไหม?',
      a: 'โหมดกันสตรีมใน Lite Pro Elite ซ่อนโอเวอร์เลย์จาก OBS และแชร์ Discord ทดสอบบันทึกในเครื่องก่อนไลฟ์',
    },
    undetected: {
      q: 'โกง Aion 2 แบบไม่ถูกตรวจรับประกันไหม?',
      a: 'ไม่รับประกัน สถานะไม่ถูกตรวจคือสถานะปัจจุบันบนหน้าสินค้าเท่านั้น หากขึ้นกำลังอัปเดต ทดสอบ หรือถูกตรวจ ให้หยุดใช้ทันที',
    },
    'esp-safer': {
      q: 'ESP วอลล์แฮคปลอดภัยกว่าเอมบอทไหม?',
      a: 'ในรีเพลย์ ESP มักดูเงียบกว่าแพทเทิร์นบอทชัดๆ แต่ยังเป็นโกง แอนตี้โกงไม่เพิกเฉยโอเวอร์เลย์เพียงเพราะปิดเอมบอท',
    },
    'hwid-when': {
      q: 'เมื่อไหร่ต้องใช้ HWID Spoofer?',
      a: 'เมื่อบัญชี NCSOFT ใหม่ล้มเหลวทันทีบนเครื่องเดียวแต่ใช้เครื่องอื่นได้ — เป็นการบล็อกฮาร์ดแวร์ กรณีเฉพาะบัญชีให้ดู UGC แทน',
    },
    'ugc-what': {
      q: 'UGC คืออะไร?',
      a: 'UGC (Unban & Governance Control) คือพื้นที่อุทธรณ์ข้อจำกัดบัญชี NCSOFT และแบนแอนตี้โกง มีเวิร์กโฟลว์และติดตามเคส ไม่รับประกันปลดแบน',
    },
    'skin-changer': {
      q: 'ตัวเปลี่ยนชุดแก้ตู้คอสตูมจริงไหม?',
      a: 'แสดงตัวอย่างคอสเมติกเฉพาะบนไคลเอนต์ในเครื่อง ผู้เล่นอื่นเห็นอินเวนจริง รวมใน Elite และซื้อแยกเพื่อพรีวิวได้',
    },
    'external-loader': {
      q: 'โหลดเดอร์ฉีดไฟล์เข้าโฟลเดอร์ NCSOFT ไหม?',
      a: 'Aion 2 Cheats ทำงานแบบภายนอกพร้อมซิงค์คอนฟิกบนคลาวด์ ไม่ฉีดไฟล์เข้าโฟลเดอร์ Aion 2 ความเสี่ยงแอนตี้โกงยังมีอยู่',
    },
    'blog-vs-cheats': {
      q: 'โค้ดโกงในบล็อกเหมือนโกงอบิสไหม?',
      a: 'ไม่เหมือน บทความเรื่องคำสั่งคอนโซล NCSOFT ใช้ได้เฉพาะล็อบบี้กำหนดเองที่เปิดโกง โกงอบิสเป็นสินค้าแยก',
    },
    'blog-setup': {
      q: 'คู่มือติดตั้งในบล็อกลิงก์ไปซื้อที่ไหน?',
      a: 'คู่มือลิงก์ไปหน้าแพ็กและศูนย์สินค้า การชำระเงินผ่านพาร์ทเนอร์ที่ปลอดภัย อย่ารับโหลดเดอร์จาก DM Discord แปลกๆ',
    },
    'compare-plans': {
      q: 'เปรียบเทียบแพ็กแบบเคียงข้างได้ที่ไหน?',
      a: 'แต่ละหน้าแพ็กโกงมีตารางเปรียบเทียบ หน้า FAQ รวมคำตอบเรื่องสินค้า โกง และบล็อกไว้ที่เดียว',
    },
    'who-lite': {
      q: 'ใครควรอยู่กับ Lite?',
      a: 'ผู้ที่ต้องการแค่รับรู้แผนที่ — ESP ดรอป ลูท — และไม่แตะระบบอัตโนมัติสกิล ถ้าเปิดเอมบอทคอมโอบ่อยๆ ให้ซื้อ Pro',
    },
    'who-pro': {
      q: 'ใครควรซื้อ Pro?',
      a: 'ผู้เล่นอบิสที่ต้องการ Aimbot Smooth Aim และมาโครพร้อม ESP วอลล์แฮค เป็นแพ็กยอดนิยมบน aion2cheats.net',
    },
    'who-elite': {
      q: 'ใครควรซื้อ Elite?',
      a: 'ผู้ที่ต้องการตัวช่วยฟาร์ม Auto Kill ตัวเปลี่ยนชุด และแพตช์ลำดับความสำคัญเมื่อมีที่นั่งว่าง',
    },
    'eac-update': {
      q: 'หลังอัปเดตแอนตี้โกงควรทำอย่างไร?',
      a: 'เช็กสถานะบน aion2cheats.net และ Discord #status อย่าเปิดจนกว่าแบนเนอร์จะขึ้นออนไลน์ หลังแพตช์ใดๆ ให้ใช้พรีเซ็ตแบบระมัดระวัง',
    },
    'discord-help': {
      q: 'ขอความช่วยเหลือติดตั้งอย่างไร?',
      a: 'หลังซื้อ ให้แจ้งอีเมลคำสั่งซื้อ เวอร์ชัน Windows และบิลด์ไคลเอนต์ Aion 2 ใน Discord ทีมจะพาตั้งค่าโหลดเดอร์',
    },
    'zero-build-ranked': {
      q: 'ใช้ในดันเจี้ยนและ PvP อบิสได้ไหม?',
      a: 'ได้ — Lite Pro Elite มีพรีเซ็ตดันเจี้ยนและอบิสในพอร์ทัล ปรับระยะและดีเลย์สคริปต์ก่อนเข้าคิวครั้งแรก',
    },
    'zoom-hack': {
      q: 'แพ็กไหนมีเรดาร์แฮค?',
      a: 'เรดาร์มีตั้งแต่ Lite และต่อเนื่องถึง Pro กับ Elite มินิเรดาร์ช่วยรับรู้โซนโดยไม่ต้องเดาโรเทต',
    },
    'auto-farm': {
      q: 'แพ็กไหนมีตัวช่วยฟาร์ม?',
      a: 'ตัวช่วยฟาร์ม Flight Assist AI และตัวจัดการโหลดเอาต์อัตโนมัติมีเฉพาะ Elite Pro มีเอมบอทต่อสู้โดยไม่มีบอทฟาร์ม',
    },
    'private-cheats': {
      q: 'โกง Aion 2 แบบส่วนตัวคืออะไร?',
      a: 'ส่วนตัวหมายถึงคีย์ต่อผู้ใช้และบิลด์ที่ดูแลอย่างต่อเนื่อง ไม่ใช่แพ็ก zip สาธารณะ Aion 2 Cheats ส่งแพ็ก ESP เอมบอท และวอลล์แฮคผ่านพอร์ทัล',
    },
  },
};

/** Overlay translated Q&A onto English FAQ metadata (icons, topics, ids). */
export function localizeFaqItems(locale: Locale, items: SiteFaqItem[]): SiteFaqItem[] {
  const map = FAQ_FULL[locale];
  if (!map) return items;
  return items.map((item) => {
    const copy = map[item.id];
    return copy ? { ...item, q: copy.q, a: copy.a } : item;
  });
}
