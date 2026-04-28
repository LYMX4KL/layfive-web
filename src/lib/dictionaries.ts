// Bilingual content dictionary for LayFive site.
// Add new strings here and reference them from page components.
// Source-of-truth content lives in:
//   /4-LayFive/Roulett/Cruise Roulette Series/literture/
//   /4-LayFive/Roulett/Cruise Roulette Series/Scripts/

export type Locale = "en" | "zh";

export const dictionaries = {
  en: {
    nav: {
      about: "About",
      learn: "Learn",
      pricing: "Pricing",
      tracker: "Open Tracker",
      signup: "Sign Up",
    },
    home: {
      eyebrow: "Cruise Roulette · 邮轮轮盘",
      heroTitle1: "Not to Win.",
      heroTitle2: "But to Play Longer.",
      heroTitle3: "And Earn Free Cruises.",
      heroSub:
        "LayFive is NOT a strategy to beat the casino. It is a structured way for cruise players to make their bankroll last, earn casino comps, and enjoy roulette without losing control. Casinos reward time played and consistency — not big wins.",
      ctaPrimary: "Start the Series",
      ctaSecondary: "Open the Tracker",
      elementsTitle: "Five Elements. Five Layouts.",
      elementsBody:
        "Each Wuxing element — Metal (金), Wood (木), Water (水), Fire (火), Earth (土) — represents one balanced 18-number layout. 12 straight bets, 3 split bets, 15 chips per spin. Pick one element, stay consistent, let the casino pay for your next vacation.",
      whatItIsTitle: "What LayFive actually is",
      whatItIsBody1:
        "Most roulette content on the internet promises a way to beat the wheel. Every one of those promises is false. The casino's mathematical edge is unchanged by any layout, any progression, or any so-called system.",
      whatItIsBody2:
        "LayFive is honest about that. Instead of selling you a fantasy, it teaches a structured discipline: cover almost half the wheel, keep bets small and steady, follow strict walk-away rules, and stretch your bankroll long enough to earn the comps cruise casinos give to consistent players — free cruises, free rooms, free drinks, free play.",
      whatItIsBody3:
        "It is also a way to make roulette social. With five different element layouts, friends and family can sit at the same table, each playing their own style, comparing results, and enjoying the experience together — instead of gambling silently and emotionally on their own.",
      pillarsTitle: "The three pillars",
      pillars: [
        {
          title: "Coverage, not prediction",
          body:
            "Roulette is random and the wheel does not remember you. We do not chase hot numbers or hunt cold ones. Each layout covers 18 numbers — almost half the wheel — so you stay involved without ever betting big on a single guess.",
        },
        {
          title: "Discipline, not luck",
          body:
            "Bring no more than 4 full bets to the table. Set your walk-away point in advance, both for winning and losing. Never lend money in a casino, never chase, never raise bets out of emotion. The rules are simple, but they are non-negotiable.",
        },
        {
          title: "Comps, not winnings",
          body:
            "Cruise casinos reward time played and average bet size, not how clever or lucky you are. Calm, steady, structured play earns the free cruises. Wild swings get you nothing except an empty wallet by night two.",
        },
      ],
      curriculumTitle: "The Cruise Roulette Series — Free",
      curriculumBody:
        "Eight short videos walk you through the entire system, from why casinos give free cruises to how to manage your bankroll across a full session. Every video is free, no signup needed.",
      videos: [
        { n: 1, title: "Not to Win — But to Play Longer & Get Free Cruises" },
        { n: 2, title: "The Five Elements — Metal, Wood, Water, Fire, Earth" },
        { n: 3, title: "Win, Lose, or Nothing Hits — What Each Spin Means" },
        { n: 4, title: "Bet Size, Units, and How Casinos Rate You" },
        { n: 5, title: "How Long to Play — Knowing When to Stop" },
        { n: 6, title: "A Complete Session — Sit Down to Walk Away" },
        { n: 7, title: "Bankroll Math — The Math Behind the Layouts" },
        { n: 8, title: "Advanced Session Control — Protecting Your Bankroll" },
      ],
      pricingTitle: "Simple pricing",
      pricingSub: "Everything educational is free. The interactive Tracker tools are the membership.",
      free: {
        label: "Free",
        price: "$0",
        items: [
          "✓ All 8 video lessons",
          "✓ Full curriculum & disclaimer",
          "✓ Five element reference cards",
          "✓ Basic Scorecard in the Tracker",
          "✗ Cover suggestions",
          "✗ Practice simulator",
          "✗ W/L Log & Reports",
          "✗ Session history",
        ],
      },
      paid: {
        label: "Member",
        price: "$2.99",
        per: "/month",
        annual: "or $30/year — save 16%",
        popular: "Most Popular",
        items: [
          "✓ Everything in Free",
          "✓ Cover element suggestions",
          "✓ Practice casino simulator",
          "✓ Full session history",
          "✓ W/L tracking, reports & exports",
          "✓ Coaching signals & analysis",
          "✓ Priority AI support",
        ],
      },
      disclaimerShort:
        "LayFive is for entertainment and education only. No layout, strategy, or progression changes the casino's mathematical edge. Every spin is independent and the casino always wins over time. Play responsibly. Must be of legal gambling age. Read the full disclaimer before playing.",
      readDisclaimer: "Read the full disclaimer",
    },
    footer: {
      sections: {
        layfive: "LayFive",
        content: "Content",
        shop: "Shop",
        legal: "Legal",
      },
      links: {
        about: "About",
        pricing: "Pricing",
        tracker: "Tracker",
        learn: "Cruise Roulette Series",
        testimonials: "Testimonials",
        cruise: "Cruise Offerings",
        merch: "Merchandise ↗",
        terms: "Terms",
        privacy: "Privacy",
        disclaimer: "Disclaimer",
      },
      copyright:
        "© 2026 Kenny Lin / LayFive™. All rights reserved. LayFive strategies, reference cards, and app designs are proprietary intellectual property. For entertainment and educational purposes only — no guarantee of winnings.",
    },
  },
  zh: {
    nav: {
      about: "关于",
      learn: "学习",
      pricing: "会员",
      tracker: "打开记录器",
      signup: "注册",
    },
    home: {
      eyebrow: "五行轮盘系统  ·  The 5-Element Roulette System",
      heroTitle1: "玩得更久。",
      heroTitle2: "玩得更稳。",
      heroTitle3: "一起玩。",
      heroSub:
        "LayFive 不是用来赢钱的系统。它是一套有结构的纪律方法，帮助邮轮玩家延长资金寿命、获得赌场的免费回赠 (comps)，并把轮盘变成一种社交娱乐——而不是失控的孤独赌博。",
      ctaPrimary: "观看第一集（免费）",
      ctaSecondary: "打开记录器",
      elementsTitle: "五种布局。一套系统。",
      elementsBody:
        "每种布局用 15 个小筹码覆盖 18 个号码——12 个直注和 3 个分注。每一节选一种元素，遵守你的纪律规则，让赌场来支付你的下一次旅行。",
      whatItIsTitle: "LayFive 到底是什么",
      whatItIsBody1:
        "网上大多数轮盘内容都承诺有办法击败轮盘。每一个这样的承诺都是假的。任何布局、任何加注法、任何所谓的系统，都无法改变赌场的数学优势。",
      whatItIsBody2:
        "LayFive 对此非常坦诚。它不卖给你幻想，而是教你一套结构化的纪律：覆盖将近一半的号码，保持小而稳的下注，严格执行离场规则，让你的资金活得够久，足以赢得邮轮赌场提供给稳定玩家的回赠——免费邮轮、免费房间、免费饮料、免费游戏码。",
      whatItIsBody3:
        "它也是把轮盘变成社交活动的一种方式。五种不同的元素布局，让朋友和家人可以坐在同一张桌子上，各自玩自己的风格，比较结果，一起享受体验——而不是默默地、情绪化地独自下注。",
      pillarsTitle: "三大支柱",
      pillars: [
        {
          title: "覆盖，不是预测",
          body:
            "轮盘是随机的，轮盘不会记得你。我们不追热号，也不猎冷号。每种布局覆盖 18 个号码——将近半个轮盘——让你保持参与，但永远不在单一猜测上下大注。",
        },
        {
          title: "纪律，不是运气",
          body:
            "上桌不带超过 4 个完整下注的资金。事先设好赢和输的离场点。绝不在赌场借钱给别人，绝不追亏，绝不情绪化加注。规则简单，但不可妥协。",
        },
        {
          title: "回赠，不是赢钱",
          body:
            "邮轮赌场奖励的是游戏时间和平均下注，不是你有多聪明或多幸运。冷静、稳定、有结构的玩法才能换来免费邮轮。剧烈起伏只会让你第二个晚上就空着钱包。",
        },
      ],
      curriculumTitle: "邮轮轮盘教学系列 — 免费",
      curriculumBody:
        "六集短视频带你走完整套系统，从赌场为什么给免费邮轮，到如何在整局中管理资金。每一集都免费，不需要注册。",
      videos: [
        { n: 1, title: "邮轮轮盘：不为赢钱——而是为了玩得更久并获得免费邮轮" },
        { n: 2, title: "五行布局——金、木、水、火、土" },
        { n: 3, title: "覆盖到底是什么意思（不是什么）" },
        { n: 4, title: "下注规模、单位与赌场如何评级你" },
        { n: 5, title: "离场规则——盈利 50%、亏损 100%、或 100 圈" },
        { n: 6, title: "团体玩法——五个朋友，五种布局，一张桌子" },
      ],
      pricingTitle: "简单的价格",
      pricingSub: "所有教学内容都免费。互动记录器工具是会员内容。",
      free: {
        label: "免费",
        price: "$0",
        items: [
          "✓ 全部 8 集视频教学",
          "✓ 完整课程与免责声明",
          "✓ 五行参考卡",
          "✓ 记录器基础计分卡",
          "✗ 覆盖建议",
          "✗ 练习模拟器",
          "✗ 赢亏日志与报表",
          "✗ 历史记录",
        ],
      },
      paid: {
        label: "会员",
        price: "$2.99",
        per: "/月",
        annual: "或 $30/年——节省 16%",
        popular: "最受欢迎",
        items: [
          "✓ 包含免费版全部内容",
          "✓ 元素覆盖建议",
          "✓ 练习模拟器",
          "✓ 完整历史记录",
          "✓ 赢亏追踪、报表与导出",
          "✓ 教练信号与分析",
          "✓ 优先 AI 客服",
        ],
      },
      disclaimerShort:
        "LayFive 仅供娱乐和教育目的。任何布局、策略或加注法都无法改变赌场的数学优势。每一圈都是独立的，长期来看赌场总会赢。请理性娱乐。必须达到当地合法赌博年龄。下注前请阅读完整免责声明。",
      readDisclaimer: "阅读完整免责声明",
    },
    footer: {
      sections: {
        layfive: "LayFive",
        content: "内容",
        shop: "商店",
        legal: "法律",
      },
      links: {
        about: "关于",
        pricing: "会员",
        tracker: "记录器",
        learn: "邮轮轮盘系列",
        testimonials: "用户评价",
        cruise: "邮轮活动",
        merch: "周边商品 ↗",
        terms: "服务条款",
        privacy: "隐私",
        disclaimer: "免责声明",
      },
      copyright:
        "© 2026 林肯尼 / LayFive™ 版权所有。LayFive 的策略、参考卡和应用设计均为专有知识产权。仅供娱乐和教育用途——不保证任何盈利。",
    },
  },
} as const;

export type Dict = typeof dictionaries.en;
