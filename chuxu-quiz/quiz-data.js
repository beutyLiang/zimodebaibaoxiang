/**
 * 初序 · 五行人格测试 V2.0 — 对话数据
 * 对话式测评：8-12轮对话，含动态分支
 * 25种五行组合变体结果
 */

// ---- 对话流程 ----
var CHAT_FLOW = [
    {
        id: 'welcome',
        type: 'intro',
        messages: [
            '你好呀 👋',
            '我是初序，你的五行体质解读师。',
            '接下来我会问你几个关于日常感受的问题，帮你找到属于你的五行节律。',
            '放轻松，没有标准答案，跟着感觉走就好～'
        ],
        nextBtn: '准备好了，开始吧',
        next: 'profile-gender'
    },
    // ---- 画像采集 ----
    {
        id: 'profile-gender',
        type: 'profile',
        field: 'gender',
        message: '在开始之前，让我多了解你一点～\n你的性别是？',
        options: [
            { text: '👩 女', value: 'female' },
            { text: '👨 男', value: 'male' },
            { text: '🤐 不想说', value: 'other' }
        ],
        next: 'profile-age'
    },
    {
        id: 'profile-age',
        type: 'profile',
        field: 'age',
        message: '你的年龄段是？',
        options: [
            { text: '🌱 18-25岁', value: '18-25' },
            { text: '🌿 26-35岁', value: '26-35' },
            { text: '🌳 36-45岁', value: '36-45' },
            { text: '🏔️ 46岁以上', value: '46+' }
        ],
        next: 'profile-concern'
    },
    {
        id: 'profile-concern',
        type: 'profile',
        field: 'concerns',
        multiSelect: true,
        message: '最近最困扰你的是？（可多选，选完点确认）',
        options: [
            { text: '😴 睡眠不好', value: 'sleep' },
            { text: '😟 焦虑紧张', value: 'anxiety' },
            { text: '🤢 肠胃不适', value: 'gut' },
            { text: '😪 容易疲倦', value: 'fatigue' },
            { text: '🌡️ 皮肤问题', value: 'skin' },
            { text: '🩸 经期不规律', value: 'period' },
            { text: '😊 暂时没有', value: 'none' }
        ],
        next: 'profile-diet'
    },
    {
        id: 'profile-diet',
        type: 'profile',
        field: 'diet',
        message: '你的日常饮食习惯？',
        options: [
            { text: '🥬 偏素食', value: 'vegetarian' },
            { text: '🍖 偏肉食', value: 'meat' },
            { text: '🍱 比较均衡', value: 'balanced' },
            { text: '🍔 不太规律', value: 'irregular' }
        ],
        next: 'q1'
    },
    {
        id: 'q1',
        type: 'question',
        dimension: '情绪',
        message: '先聊聊情绪 🌊\n当你压力很大的时候，身体最先出现的反应是？',
        options: [
            { text: '🔥 心跳加快、脸发烫、想发火', element: 'wood', score: 3 },
            { text: '😰 心慌胸闷、坐立不安、睡不着', element: 'fire', score: 3 },
            { text: '🫤 胃不舒服、食欲变差、一直想吃东西', element: 'earth', score: 3 },
            { text: '😢 呼吸变浅、想叹气、感觉胸口发紧', element: 'metal', score: 3 },
            { text: '😨 手脚发冷、想躲起来、脑子发空', element: 'water', score: 3 }
        ],
        next: 'q2'
    },
    {
        id: 'q2',
        type: 'question',
        dimension: '情绪',
        message: '那在情绪低落的时候，你最常用什么方式缓解？',
        options: [
            { text: '🏃 运动、走路、做点什么释放掉', element: 'wood', score: 2 },
            { text: '🗣 找人聊、倾诉、需要被关注', element: 'fire', score: 2 },
            { text: '🍰 吃东西、尤其是甜食和碳水', element: 'earth', score: 2 },
            { text: '🎧 独处、听音乐、安静待着', element: 'metal', score: 2 },
            { text: '🛌 睡觉、躲进被窝、什么都不想做', element: 'water', score: 2 }
        ],
        next: 'q3'
    },
    {
        id: 'q3',
        type: 'question',
        dimension: '肠道',
        message: '聊聊你的肠道 🌿\n你最常遇到的肠道问题是？',
        options: [
            { text: '💨 一紧张/生气就拉肚子', element: 'wood', score: 3 },
            { text: '🔥 经常口腔溃疡、大便偏干偏硬', element: 'fire', score: 3 },
            { text: '😮‍💨 吃完就胀气、消化慢、容易积食', element: 'earth', score: 3 },
            { text: '😐 便秘，好几天不排一次', element: 'metal', score: 3 },
            { text: '💧 大便不成形、拉肚子、尤其天冷时', element: 'water', score: 3 }
        ],
        next: 'q4'
    },
    {
        id: 'q4',
        type: 'question',
        dimension: '睡眠',
        message: '关于睡眠 🌙\n你最困扰的睡眠问题是？',
        options: [
            { text: '😤 入睡困难，脑子里全是白天的事', element: 'wood', score: 3 },
            { text: '💭 多梦、浅睡、容易被吵醒', element: 'fire', score: 3 },
            { text: '🥱 能睡着但怎么睡都觉得累', element: 'earth', score: 3 },
            { text: '⏰ 凌晨3-5点容易醒，醒了就睡不回去', element: 'metal', score: 3 },
            { text: '🌊 半夜频繁起来上厕所', element: 'water', score: 3 }
        ],
        next: 'q5'
    },
    {
        id: 'q5',
        type: 'question',
        dimension: '饮食',
        message: '你的饮食偏好 🍵\n最近一段时间，你最馋的食物类型是？',
        options: [
            { text: '🍋 酸的（酸辣粉、柠檬、醋）', element: 'wood', score: 2 },
            { text: '🌶 辣的/苦的（火锅、咖啡、巧克力）', element: 'fire', score: 2 },
            { text: '🍰 甜的（蛋糕、奶茶、碳水）', element: 'earth', score: 2 },
            { text: '🧂 辛辣刺激的（姜、蒜、葱）', element: 'metal', score: 2 },
            { text: '🧊 咸的或冰的（咸蛋、冰饮、腌菜）', element: 'water', score: 2 }
        ],
        next: 'q6'
    },
    {
        id: 'q6',
        type: 'question',
        dimension: '身体',
        message: '身体信号 ✨\n最近这段时间，你身体最明显的不适感是？',
        options: [
            { text: '😣 头痛/偏头痛、眼睛干涩、肩颈僵硬', element: 'wood', score: 3 },
            { text: '🥵 容易上火、心烦燥热、手心发热', element: 'fire', score: 3 },
            { text: '🫠 四肢沉重、容易水肿、总觉得湿漉漉', element: 'earth', score: 3 },
            { text: '🤧 皮肤干燥、容易感冒、嗓子不舒服', element: 'metal', score: 3 },
            { text: '🥶 怕冷、腰酸、容易掉头发', element: 'water', score: 3 }
        ],
        next: 'q7'
    },
    {
        id: 'q7',
        type: 'question',
        dimension: '能量',
        message: '能量节律 ⚡\n一天中你的能量最低的时段是？',
        options: [
            { text: '🌅 早上起不来，一到下午才有精神', element: 'wood', score: 2 },
            { text: '☀️ 下午2-3点特别困，但晚上又睡不着', element: 'fire', score: 2 },
            { text: '🌤 饭后特别困，一整天都打不起精神', element: 'earth', score: 2 },
            { text: '🌆 傍晚开始低落，入夜后容易伤感', element: 'metal', score: 2 },
            { text: '🌙 越到晚上越累，但又不想睡', element: 'water', score: 2 }
        ],
        next: 'q8'
    },
    {
        id: 'q8',
        type: 'question',
        dimension: '内心',
        message: '最后一个问题 💫\n如果用一个词形容你最近的内心状态？',
        options: [
            { text: '🌪 压抑——有很多话想说但说不出', element: 'wood', score: 2 },
            { text: '🎢 焦躁——静不下来，总在担心什么', element: 'fire', score: 2 },
            { text: '🌀 纠结——想太多，迟迟做不了决定', element: 'earth', score: 2 },
            { text: '🍂 低落——提不起兴趣，觉得什么都没意思', element: 'metal', score: 2 },
            { text: '🌑 迷茫——不知道自己想要什么', element: 'water', score: 2 }
        ],
        next: 'result'
    }
];

// ---- 五行结果定义（25种主副组合的主行数据）----
var ELEMENT_RESULTS = {
    wood: {
        name: '木',
        fullName: '木行人',
        emoji: '🌿',
        color: '#2D8B55',
        colorSoft: 'rgba(45,139,85,0.12)',
        title: '疏达之木 · 行动派',
        organ: '肝 — 胆',
        emotion: '怒（愤怒/压抑/急躁）',
        season: '春',
        time: '丑时-寅时（1:00-5:00）',
        gutLink: '一紧张就拉肚子 · 肝气犯脾 · 木克土',
        description: '你是一个行动力很强的人，内心有很多想法和能量。但当这些能量找不到出口时，就会化为压抑和烦躁，最终让你的肠道承受不住——这就是中医说的"肝气犯脾"。你的肝（木）太强势，踩了脾（土）的地盘。',
        tips: [
            '🌿 每天留出15分钟做"无目的散步"——让肝气自然疏散',
            '🍋 适当吃酸味食物（柠檬水、话梅），酸入肝，帮助肝气条达',
            '😤 允许自己表达愤怒，不要压——压下去的怒气会变成肠道的暴动',
            '🌅 凌晨1-3点是肝经当值，这个时段一定要在睡觉'
        ]
    },
    fire: {
        name: '火',
        fullName: '火行人',
        emoji: '🔥',
        color: '#C9544D',
        colorSoft: 'rgba(201,84,77,0.12)',
        title: '明耀之火 · 感知者',
        organ: '心 — 小肠',
        emotion: '喜/焦（过度兴奋/焦虑/失眠）',
        season: '夏',
        time: '午时（11:00-13:00）',
        gutLink: '焦虑影响小肠吸收 · 心与小肠相表里 · 90%血清素在肠道合成',
        description: '你对世界的感知力很强，情绪丰富且敏锐。但这也意味着你容易被外界刺激牵动——焦虑、失眠、心神不宁。中医说"心与小肠相表里"，你的心太忙了，小肠就跟着不安稳。你体内90%的血清素其实是肠道产生的，心不安，肠也不安。',
        tips: [
            '🔴 午休很重要——午时（11-13点）是心经当值，哪怕闭眼10分钟',
            '🫖 喝莲子心茶/百合茶，清心安神',
            '📵 睡前1小时不看手机——减少心火的燃料',
            '❤️ 适量的"苦"对你是良药：苦瓜、黑巧克力，苦入心'
        ]
    },
    earth: {
        name: '土',
        fullName: '土行人',
        emoji: '🌾',
        color: '#C6983A',
        colorSoft: 'rgba(198,152,58,0.12)',
        title: '厚载之土 · 照顾者',
        organ: '脾 — 胃',
        emotion: '思（思虑/纠结/操心过度）',
        season: '长夏（换季时节）',
        time: '巳时（9:00-11:00）',
        gutLink: '思伤脾 · 消化不良/胀气/食欲异常 · 脾主运化水谷',
        description: '你是那个总在照顾别人的人。但"思伤脾"——想太多、操心太多，脾胃就罢工了。你的脾就像一台搅拌机，你吃进去的东西都要经过它打碎、分拣、输送。它一旦超负荷，你就会胀气、消化不良、越焦虑越想吃。',
        tips: [
            '🟡 早上7-9点必须吃早餐——辰时胃经当值，这是脾胃最需要食物的时间',
            '🍠 多吃黄色食物：南瓜、红薯、小米，黄色入脾',
            '🧠 练习"只想当下这一件事"——纠结是脾最大的毒药',
            '🫁 饭后不要马上工作/刷手机——给脾胃20分钟专心消化'
        ]
    },
    metal: {
        name: '金',
        fullName: '金行人',
        emoji: '🌙',
        color: '#8C8C98',
        colorSoft: 'rgba(140,140,152,0.12)',
        title: '清肃之金 · 敏感者',
        organ: '肺 — 大肠',
        emotion: '悲/忧（悲伤/低落/失落感）',
        season: '秋',
        time: '寅时-卯时（3:00-7:00）',
        gutLink: '悲伤肺 · 肺与大肠相表里 · 便秘/排便困难',
        description: '你内心细腻、审美力强，但也容易被悲伤和失落笼罩。中医说"肺与大肠相表里"——当你的肺气因为悲伤而收缩时，大肠的传导功能也跟着变弱。所以你容易便秘，不是因为缺水，是因为你太久没有好好释放情绪了。',
        tips: [
            '⚪ 允许自己哭——哭泣是肺气最自然的释放方式',
            '🫁 每天做3分钟深呼吸：腹式呼吸，呼气比吸气长一倍',
            '🍐 多吃白色食物：雪梨、百合、银耳、山药，白色入肺',
            '🌅 凌晨3-5点是肺经当值——如果这个时间段容易醒，说明肺气需要关注'
        ]
    },
    water: {
        name: '水',
        fullName: '水行人',
        emoji: '🌊',
        color: '#2E6B9E',
        colorSoft: 'rgba(46,107,158,0.12)',
        title: '深藏之水 · 思想家',
        organ: '肾 — 膀胱',
        emotion: '恐（恐惧/不安/缺乏安全感）',
        season: '冬',
        time: '酉时-亥时（17:00-23:00）',
        gutLink: '恐伤肾 · 肾主骨生髓通脑 · 生物钟紊乱/代谢变慢',
        description: '你是一个有深度的思考者，内心世界丰富但不轻易示人。肾是你身体的"蓄电池"——当你长期处于恐惧和不安全感中时，肾气就会持续消耗。怕冷、掉头发、半夜醒来、记忆力下降——这些都是"电量不足"的信号。',
        tips: [
            '🔵 晚上11点前必须睡觉——亥时(21-23点)三焦经当值，是身体充电的开始',
            '🫘 多吃黑色食物：黑豆、黑芝麻、黑米、桑葚，黑色入肾',
            '🦶 每晚泡脚15分钟（水温40度），脚底涌泉穴是肾经起点',
            '💆 减少恐惧源的刺激——少刷负面新闻，恐惧是肾气最大的漏洞'
        ]
    }
};

// ---- Zoey的分析语 ——随机抽取用于过渡 ----
var TRANSITION_MESSAGES = [
    '嗯，我理解了…',
    '原来是这样呀～',
    '好的，记下来了 📝',
    '这个很重要哦…',
    '了解！继续～',
    '嗯嗯，越来越清晰了…'
];

// ---- 副行描述 ----
var SUB_ELEMENT_DESC = {
    wood: '你体内还有一股木行的力量——行动力强，但要注意不要让急躁变成肠道的负担。',
    fire: '你的副行是火——感知力敏锐，但小心焦虑影响睡眠和小肠吸收。',
    earth: '你的副行是土——你很会照顾人，但别忘了先照顾好自己的脾胃。',
    metal: '你的副行是金——你内心细腻敏感，记得定期释放情绪，别让大肠替你扛。',
    water: '你的副行是水——你思考深入，但要注意保存能量，早睡是最好的补肾方式。'
};
