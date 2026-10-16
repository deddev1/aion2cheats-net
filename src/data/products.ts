import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['aion-2-esp-wallhack-setup', 'aion-2-lite-vs-pro', 'aion-2-radar-hack-guide', 'anticheat-patch-day-checklist'],
  pro: [
    'aion-2-aimbot-pvp-guide',
    'aion-2-skill-script-guide',
    'aion-2-lite-vs-pro',
    'aion-2-stream-proof-setup',
  ],
  elite: [
    'aion-2-elite-tier-guide',
    'aion-2-cheats-features-guide',
    'aion-2-esp-wallhack-setup',
    'anticheat-patch-day-checklist',
    'how-to-buy-aion-2-cheats-2026',
  ],
  'hwid-spoofer': [
    'aion-2-hwid-spoofer-after-ban',
    'anticheat-bypass-aion-2-guide',
    'anticheat-patch-day-checklist',
    'aion-2-external-cheat-guide',
  ],
  ugc: [
    'anticheat-bypass-aion-2-guide',
    'aion-2-hwid-spoofer-after-ban',
    'how-to-buy-aion-2-cheats-2026',
  ],
  'unlock-all': [
    'aion-2-costume-changer-guide',
    'aion-2-cheats-features-guide',
    'aion-2-stream-proof-setup',
  ],
};

const productBase = '/products/aion-2-cheats/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on aion2cheats.net and Discord #status before purchase—especially after an Aion 2 or anti-cheat update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Elite aion 2 cheats or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, NCSOFT platform, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal, patch loader, and setup guide. Test in a safe zone, load presets, then enter Abyss or instances.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Aion 2 and anti-cheat receive frequent updates. Confirm module availability on the live status panel at aion2cheats.net before you purchase or launch. Overlay behavior may differ in lobbies, replays and spectator mode after patches.';

const sharedLimitations =
  'Third-party software in Aion 2 can violate NCSOFT Terms of Service and lead to anti-cheat bans or account action. You use this software at your own risk. Compatibility and availability can change after game, anti-cheat, or Windows updates without notice.';

const aion2SystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqNcsoft', text: 'Current Aion 2 client via the official launcher with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and patch updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets Aion 2 published hardware requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = '/images/gameplay';

const galleryRaw = {
  gpMapHack: {
    src: `${gameplay}/aion-2-esp-wallhack.png`,
    alt: 'Aion 2 cheat gameplay with leveling bot panel open beside players on a sunny cliff overlooking a valley',
    caption: 'Leveling bot',
    captionDesc: 'On-task leveling panel with players gathered on a cliff.',
  },
  gpScripts: {
    src: `${gameplay}/aion-2-skill-script.png`,
    alt: 'Aion 2 automated quest bot overlay showing target level 45 skill upgrades and healing potion settings',
    caption: 'Quest automation',
    captionDesc: 'Target level, skill upgrades and potion restock controls.',
  },
  gpZoomHack: {
    src: `${gameplay}/aion-2-radar-hack.png`,
    alt: 'Aion 2 cheat menu with Abyss-ready leveling settings while characters stand in a dark rocky zone',
    caption: 'Bot controls',
    captionDesc: 'Full leveling worker panel over rocky open-world terrain.',
  },
  gpSkinChanger: {
    src: `${gameplay}/aion-2-costume-changer.png`,
    alt: 'Aion 2 dialogue scene with purple cheat overlay waiting for game API bindings during a quest cutscene',
    caption: 'Quest bot',
    captionDesc: 'Bot stays loaded through NPC dialogue and cutscenes.',
  },
  gpAutoKill: {
    src: `${gameplay}/aion-2-auto-aim.png`,
    alt: 'Aion 2 extraction reward popup with leveling worker cheat overlay and chat showing Kinah and quest loot',
    caption: 'Loot & extraction',
    captionDesc: 'Extraction results with bot panel and quest loot chat.',
  },
  gpFarmBot: {
    src: `${gameplay}/aion-2-loot-radar.png`,
    alt: 'Aion 2 inventory and gem tooltip open while the On task cheat bot manages restock and market options',
    caption: 'Farm assist',
    captionDesc: 'Inventory, restock and market automation during farming.',
  },
  gpHeroEsp: {
    src: `${gameplay}/aion-2-player-esp.png`,
    alt: 'Aion 2 players and mounts in a rocky outpost with an active cheat leveling menu on the left',
    caption: 'Open-world bot',
    captionDesc: 'Leveling worker active near players and mounts.',
  },
  gpThermal: {
    src: `${gameplay}/aion-2-thermal-esp.png`,
    alt: 'Aion 2 night scene with winged character near a glowing portal and leveling worker cheat menu running',
    caption: 'Flight zone bot',
    captionDesc: 'Leveling worker active near portal and winged players.',
  },
  gpBuildFight: {
    src: `${gameplay}/aion-2-instance-esp.png`,
    alt: 'Aion 2 cheat gameplay showing Start Stop Pause bot controls beside the native hotbar and HP MP bars',
    caption: 'One-click start',
    captionDesc: 'Start, stop and pause controls beside the Aion 2 hotbar.',
  },
  gpArena: {
    src: `${gameplay}/aion-2-abyss-wallhack.png`,
    alt: 'Aion 2 multiplayer gathering on a grassy cliff with On task bot prioritizing feathers skills and equipment',
    caption: 'Group farming',
    captionDesc: 'Feather priority, skill upgrades and equipment automation.',
  },
  gpSpawn: {
    src: `${gameplay}/aion-2-spawn-esp.png`,
    alt: 'Aion 2 starting-area gameplay with leveling bot target level 45 and main quest until level enabled',
    caption: 'Main quest bot',
    captionDesc: 'Main-quest leveling path set to target level 45.',
  },
  gpLongRange: {
    src: `${gameplay}/aion-2-long-range-esp.png`,
    alt: 'Aion 2 open-world cheat overlay with recovery profile Aether Energy and market listing options visible',
    caption: 'Recovery profile',
    captionDesc: 'Recovery, Aether Energy and market listing options.',
  },
  gpAimLock: {
    src: `${gameplay}/aion-2-aimbot-lock.png`,
    alt: 'Aion 2 cheat panel in validation mode with leveling worker started and Portuguese quest tracker on screen',
    caption: 'Validation mode',
    captionDesc: 'Leveling worker started in validation mode.',
  },
  gpChams: {
    src: `${gameplay}/aion-2-chams-esp.png`,
    alt: 'Aion 2 cave dialogue with blonde NPC Niror and purple automation menu for potions and quest recovery',
    caption: 'Cutscene-safe bot',
    captionDesc: 'Automation stays up during contaminated-zone dialogue.',
  },
  gpSquad: {
    src: `${gameplay}/aion-2-group-esp.png`,
    alt: 'Aion 2 players with glowing wings near a temporary investigation base while cheat leveling settings stay open',
    caption: 'Winged party',
    captionDesc: 'Party near portal with live leveling worker settings.',
  },
  gpCombat: {
    src: `${gameplay}/aion-2-combat-esp.png`,
    alt: 'Aion 2 combat-ready hotbar and chat log with Kinah rewards while the On task cheat bot panel remains visible',
    caption: 'Live session',
    captionDesc: 'Hotbar, Kinah chat and On task bot in one session.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'aion-2-cheats';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'Aion 2 Lite is built for players who want map awareness first. In Abyss PvP, knowing enemy positions, drop locations and loot timings wins more fights than raw mechanics—Lite gives you that edge without skill automation.',
    },
    { type: 'h2', text: 'Abyss-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Aimbot and bot modules entirely. Your gameplay looks natural while ESP, radar hack and loot timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'Aion 2 Pro is the sweet spot for Abyss grinders. Aimbot, Smooth Aim and Sticky Aim help you win group fights without obvious bot patterns—when you tune Smoothness sliders using our portal presets.',
    },
    { type: 'h2', text: 'Aimbot + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds Skill Assist, Target Priority, Hotkey macros and FOV and smoothness drawing. You see the fight before it starts and win it with skill assist that stays human at default settings.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'Aion 2 Elite is the private build for players who want everything—Farm Assist, Auto Kill, Auto Interrupt, Costume Changer, full ESP wallhack and direct developer support. Limited slots keep the build maintainable and patch cycles fast.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first Abyss queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Player ESP with distance and name tags, drop and gather locator, loot spawn timers, radar hack, and stream-safe overlay hiding. Config presets for Abyss, Arena and instances ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Aimbot and automation' },
    {
      type: 'p',
      text: 'Skill Assist, Smooth Aim, Sticky Aim with Prediction, Target Priority and hotkey macros for heals and flight. Smoothness sliders tunes cast timing so skill assist stays natural in Abyss PvP. Start with portal presets, not max sliders.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at aion2cheats.net—enough firepower for high Abyss rank fights without Elite slot limits. Pair with our skill-assist guide in the blog before your first Abyss session.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full bot and finish suite' },
    {
      type: 'p',
      text: 'Farm Assist, Flight Assist AI, Auto Kill, Auto Interrupt, Costume Changer and full ESP wallhack with stealth alerts. Use safe-zone testing before Abyss PvP—Elite power requires disciplined profiles, not rage settings.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite shows as limited slots on the status banner. Open a Discord ticket if checkout is gated—staff confirm slot availability before purchase.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When you need it' },
    {
      type: 'p',
      text: 'Use when fresh NCSOFT accounts fail instantly on one PC but work elsewhere—classic HWID enforcement. Do not use for account-only anti-cheat cases; see [UGC](/products/aion-2-cheats/ugc/) instead.',
    },
    { type: 'h2', text: 'Full workflow' },
    {
      type: 'p',
      text: 'Restore point, driver cleanup, spoof application, cold reboot, identifier verification, then conservative cheat profile before Abyss PvP. Full checklist ships in the portal and in our HWID blog guide.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for NCSOFT account restrictions, anti-cheat bans, trade holds and security flags. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some anti-cheat bans cannot be reversed. UGC organizes evidence and follow-ups for NCSOFT review. Pair with [HWID Spoofer](/products/aion-2-cheats/hwid-spoofer/) when hardware is flagged, or a new account when reputation is burned.',
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players nearby see your actual inventory, not preview costumes.',
    },
    { type: 'h2', text: 'Included with Elite' },
    {
      type: 'p',
      text: 'Costume Changer ships inside the Elite tier. Buy standalone here if you want cosmetic preview without full combat modules.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: slide('gpHeroEsp', 'gpLongRange', 'gpSquad'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: aion2SystemRequirements,
    fullFeatures: [
      'Player ESP & player boxes',
      'Drop & loot locator',
      'Zone awareness',
      'Health & shield tracking',
      'Mini-radar overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team color filter',
      'Loot spawn timers',
      'Radar hack',
      'instance preset config',
      'Abyss preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Aion 2 Lite: ESP and radar',
      paragraphs: [
        'Lite is for player ESP, drop markers, loot timers and radar. No skill assist. Set distance, colors and stream-proof in the portal before you queue.',
        'Best if you want awareness in Abyss, arenas and instances without combat automation. Overlays are updated after Aion 2 patches.',
      ],
    },
  },
  pro: {
    images: slide('gpScripts', 'gpAimLock', 'gpCombat'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: aion2SystemRequirements,
    fullFeatures: [
      'All Lite ESP & ESP wallhack modules',
      'Aimbot',
      'Smooth Aim',
      'Sticky Aim & Prediction',
      'Target Priority',
      'Hotkey macros (heals/buffs)',
      'Auto Heal',
      'FOV & smoothness tuning',
      'Per-class skill-assist profiles',
      'Third-party alert integration',
      'Abyss-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord operator support',
    ],
    overview: {
      title: 'Aion 2 Pro: skill assist plus ESP',
      paragraphs: [
        'Pro includes everything in Lite, plus Aimbot, Smooth Aim, Sticky Aim and hotkey macros. Aim settings live in one tab. Start with a portal preset, not max sliders.',
        'Most people pick Pro for Abyss, arenas and instances. Target priority (torso/chest) and macros help in fights while defaults stay smooth.',
      ],
    },
  },
  elite: {
    images: slide('gpAutoKill', 'gpThermal', 'gpBuildFight'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: aion2SystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      'Farm Assist',
      'Flight Assist AI',
      'Drop respawn timer',
      'Auto loadout manager',
      'Auto Kill',
      'Auto Interrupt',
      'Full ESP wallhack suite',
      'Third-party alert system',
      'Visibility detector',
      'Costume Changer (Unlock All)',
      'Priority patch queue',
      'Direct dev Discord support',
      'Elite conservative presets',
      'Cloud config backup',
      'Patch auto-updater',
      'Private slot access',
    ],
    overview: {
      title: 'Aion 2 Elite: full cheat + extras',
      paragraphs: [
        'Elite includes Lite and Pro modules, plus farm assist, Auto Kill, Auto Interrupt, Costume Changer, full ESP wallhack and faster patch priority.',
        'Slots are limited. Discord support helps you set safer profiles before Abyss PvP. Check the status banner on aion2cheats.net before you buy.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpSpawn', 'gpArena', 'gpChams'),
    goodToKnow:
      'Run the compatibility scan in the portal before spoofing. Create a Windows restore point first. Verify identifiers changed after a cold reboot before launching Aion 2.',
    limitations:
      'Spoofing does not help account-only anti-cheat cases. Never stack two spoof tools. Shared or work PCs may not be suitable. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching Aion 2 after spoofing.' },
      { icon: 'reqWifi', text: 'Stable connection for portal verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Discord recovery support',
    ],
    overview: {
      title: 'HWID Spoofer for Aion 2 PC bans',
      paragraphs: [
        'Use the HWID Spoofer when NCSOFT anti-cheat flags your PC hardware but the NCSOFT account is still fine. Includes disk and MAC tools, a restore-point checklist, a compatibility scan and post-spoof checks.',
        'Use it when new accounts die on one PC but work on another. It does not fix account-only anti-cheat bans. After spoofing, use a safer cheat profile before Abyss PvP.',
      ],
    },
  },
  ugc: {
    images: slide('gpZoomHack', 'gpFarmBot', 'gpLongRange'),
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent anti-cheat bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on aion2cheats.net or at checkout on aion2cheats.net.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'UGC account appeal tools',
      paragraphs: [
        'UGC (Unban & Governance Control) helps you organize appeals for NCSOFT restrictions and anti-cheat bans. It does not guarantee an unban.',
        'Track cases, keep evidence in one place and follow up from the dashboard. Discord support can walk you through steps when needed.',
      ],
    },
  },
  'unlock-all': {
    images: slide('gpSkinChanger', 'gpChams', 'gpCombat'),
    goodToKnow:
      'Unlock All previews cosmetics locally on your client. Other players nearby see your real inventory—not preview costumes. Included with Elite tier.',
    limitations:
      'Local preview only—does not modify costume wardrobe or store state. Other players cannot see previewed skins or sets.',
    systemRequirements: aion2SystemRequirements,
    fullFeatures: [
      'Outfit skin swap',
      'Costume & appearance preview',
      'Weapon & wing customizer',
      'Loading screen editor',
      'Cursor & HUD theme',
      'Drop & loot replacer',
      'Favorites list',
      'Loadout export',
    ],
    overview: {
      title: 'Costume Changer / Unlock All',
      paragraphs: [
        'Unlock All lets you preview outfits, appearances and wings on your Aion 2 client. It does not change your costume wardrobe or store purchases.',
        'Only you see the preview costumes. Other players see your real inventory. Included with Elite, or buy it alone without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = cheat.name === 'Lite' ? 'Aion 2 Lite' : cheat.name === 'Pro' ? 'Aion 2 Pro' : 'Aion 2 Elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpAimLock', 'gpThermal', 'gpArena');

/** One slide per unique gameplay screenshot (5 source shots). */
export const heroSlides = slide(
  'gpMapHack',
  'gpScripts',
  'gpHeroEsp',
  'gpZoomHack',
  'gpAutoKill',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'Aion 2 Elite cheats with ESP and skill assist, plus HWID spoofer, UGC recovery and Costume Changer for PC.',
  buyUrl: checkoutPath('aion2'),
};
