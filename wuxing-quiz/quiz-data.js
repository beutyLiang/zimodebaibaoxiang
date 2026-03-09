/**
 * 五行肠养 · 体质测试 — 题目数据
 * 五维度测试：情绪 / 肠道 / 睡眠 / 饮食 / 身体信号
 * 每题5个选项分别对应五行：木/火/土/金/水
 */

const QUIZ_DATA = [
    // ===== 情绪维度 (3题) =====
    {
        dimension: "emotion",
        dimensionLabel: "🌊 情绪维度",
        question: "最近一个月，你最容易出现的情绪状态是？",
        options: [
            { text: "容易烦躁、发脾气，感觉压力大想爆发", element: "wood" },
            { text: "焦虑不安、心神不宁，情绪起伏很大", element: "fire" },
            { text: "反复纠结、想太多，做决定困难", element: "earth" },
            { text: "容易感伤、低落，对很多事提不起兴趣", element: "metal" },
            { text: "莫名恐惧、缺乏安全感，担心未知的事", element: "water" }
        ]
    },
    {
        dimension: "emotion",
        dimensionLabel: "🌊 情绪维度",
        question: "当你压力很大时，身体第一反应通常是？",
        options: [
            { text: "太阳穴胀痛、眼睛干涩、两肋发胀", element: "wood" },
            { text: "心跳加速、手心出汗、脸发烫", element: "fire" },
            { text: "胃不舒服、食欲下降或暴食", element: "earth" },
            { text: "胸闷气短、想叹气、鼻子不通", element: "metal" },
            { text: "腰酸腿软、耳鸣、手脚发凉", element: "water" }
        ]
    },
    {
        dimension: "emotion",
        dimensionLabel: "🌊 情绪维度",
        question: "你和朋友倾诉完烦恼后，通常的感受是？",
        options: [
            { text: "还是憋着一口气，觉得不公平", element: "wood" },
            { text: "说完更焦虑了，越想越慌", element: "fire" },
            { text: "好像好一点了但没过多久又开始想", element: "earth" },
            { text: "说着说着就哭了，觉得好委屈", element: "metal" },
            { text: "不太敢说真正害怕的事，怕别人觉得奇怪", element: "water" }
        ]
    },

    // ===== 肠道维度 (3题) =====
    {
        dimension: "gut",
        dimensionLabel: "🫁 肠道维度",
        question: "你最常出现的肠道不适是？",
        options: [
            { text: "一紧张/生气就腹泻，肠道像被搅动", element: "wood" },
            { text: "口腔溃疡反复发作，小腹偶尔灼热感", element: "fire" },
            { text: "经常胀气、积食，吃完东西堵在那里", element: "earth" },
            { text: "容易便秘，排便困难或不规律", element: "metal" },
            { text: "肚子怕冷，吃凉的东西就不舒服", element: "water" }
        ]
    },
    {
        dimension: "gut",
        dimensionLabel: "🫁 肠道维度",
        question: "你的排便情况最接近哪种？",
        options: [
            { text: "有时正常有时突然腹泻，跟情绪挂钩", element: "wood" },
            { text: "偏干偏硬，有时大便带血或烧灼感", element: "fire" },
            { text: "大便不成形、黏腻，总觉得排不干净", element: "earth" },
            { text: "两三天一次甚至更久，干燥难排", element: "metal" },
            { text: "天刚亮就要上厕所（五更泻），或稍凉就泻", element: "water" }
        ]
    },
    {
        dimension: "gut",
        dimensionLabel: "🫁 肠道维度",
        question: "你的肠道问题在什么时候最明显？",
        options: [
            { text: "工作紧张或跟人吵架之后", element: "wood" },
            { text: "熬夜或吃辛辣食物之后", element: "fire" },
            { text: "吃太多或饮食不规律的时候", element: "earth" },
            { text: "换季或心情低落的时候", element: "metal" },
            { text: "天冷或者特别疲劳的时候", element: "water" }
        ]
    },

    // ===== 睡眠维度 (3题) =====
    {
        dimension: "sleep",
        dimensionLabel: "🌙 睡眠维度",
        question: "你最常见的睡眠问题是？",
        options: [
            { text: "半夜1-3点容易醒来，之后难以再入睡", element: "wood" },
            { text: "入睡困难，脑子停不下来，心烦意燥", element: "fire" },
            { text: "睡眠浅、多梦，醒来觉得没睡够", element: "earth" },
            { text: "凌晨3-5点早醒，容易在梦中悲伤", element: "metal" },
            { text: "夜尿频繁、睡觉怕冷、经常做噩梦", element: "water" }
        ]
    },
    {
        dimension: "sleep",
        dimensionLabel: "🌙 睡眠维度",
        question: "睡眠不好时，第二天你最明显的表现是？",
        options: [
            { text: "脾气暴躁，容忍度极低", element: "wood" },
            { text: "注意力无法集中，心慌", element: "fire" },
            { text: "整个人感觉沉重，提不起精神", element: "earth" },
            { text: "皮肤暗沉，容易感冒", element: "metal" },
            { text: "腰酸背痛，记忆力下降", element: "water" }
        ]
    },
    {
        dimension: "sleep",
        dimensionLabel: "🌙 睡眠维度",
        question: "你的精力在一天中的哪个时段最低？",
        options: [
            { text: "上午11点前（对应肝胆时段后的恢复期）", element: "wood" },
            { text: "中午12-14点（对应心经时段）", element: "fire" },
            { text: "下午14-16点（午后犯困、消化期）", element: "earth" },
            { text: "傍晚17-19点（感觉很疲惫）", element: "metal" },
            { text: "晚上过了21点就撑不住了", element: "water" }
        ]
    },

    // ===== 饮食维度 (3题) =====
    {
        dimension: "diet",
        dimensionLabel: "🍵 饮食维度",
        question: "你最偏好或最忍不住想吃的食物类型是？",
        options: [
            { text: "酸味食物（柠檬、醋、酸奶、酸菜）", element: "wood" },
            { text: "苦味或辛辣（咖啡、火锅、麻辣烫）", element: "fire" },
            { text: "甜食（蛋糕、奶茶、巧克力）", element: "earth" },
            { text: "辛味（葱姜蒜、芥末、白酒）", element: "metal" },
            { text: "咸味食物（咸菜、酱油、腌制品）", element: "water" }
        ]
    },
    {
        dimension: "diet",
        dimensionLabel: "🍵 饮食维度",
        question: "你吃饭的习惯最接近哪种？",
        options: [
            { text: "吃得快、容易吃撑，赶时间的时候更明显", element: "wood" },
            { text: "有一顿没一顿，经常忘记吃或很晚才吃", element: "fire" },
            { text: "喜欢吃但消化慢，一吃多就堵", element: "earth" },
            { text: "食欲一般般，吃什么都差不多", element: "metal" },
            { text: "喜欢热食，一吃凉的就不舒服", element: "water" }
        ]
    },
    {
        dimension: "diet",
        dimensionLabel: "🍵 饮食维度",
        question: "你喝水的习惯是？",
        options: [
            { text: "口渴才喝，经常忘记喝水", element: "wood" },
            { text: "容易口干舌燥，喝很多水还是渴", element: "fire" },
            { text: "喝水容易水肿或胃里咕噜响", element: "earth" },
            { text: "皮肤干但不太想喝水", element: "metal" },
            { text: "喜欢喝热水/温水，凉水一喝就不舒服", element: "water" }
        ]
    },

    // ===== 身体信号维度 (3题) =====
    {
        dimension: "body",
        dimensionLabel: "💫 身体信号",
        question: "你最困扰的身体问题是？",
        options: [
            { text: "眼睛干涩、偏头痛、指甲容易断裂", element: "wood" },
            { text: "口腔问题（溃疡/牙龈出血）、脸上长痘", element: "fire" },
            { text: "虚胖浮肿、湿气重、舌苔厚腻", element: "earth" },
            { text: "皮肤干燥/过敏、容易感冒咳嗽", element: "metal" },
            { text: "脱发、黑眼圈重、月经不调（女性）", element: "water" }
        ]
    },
    {
        dimension: "body",
        dimensionLabel: "💫 身体信号",
        question: "你的面色/气色最接近？",
        options: [
            { text: "偏青/暗，太阳穴附近容易冒青筋", element: "wood" },
            { text: "偏红/暗红，容易脸红上火", element: "fire" },
            { text: "偏黄/暗黄，看起来气色不好", element: "earth" },
            { text: "偏白/苍白，缺乏血色", element: "metal" },
            { text: "偏暗/黑，眼周尤其明显", element: "water" }
        ]
    },
    {
        dimension: "body",
        dimensionLabel: "💫 身体信号",
        question: "最近让你最不舒服的一个细节是？",
        options: [
            { text: "肋骨下方（两胁）经常胀痛或不适", element: "wood" },
            { text: "手脚心发热、夜间盗汗", element: "fire" },
            { text: "下午腿脚浮肿、身体感觉很沉重", element: "earth" },
            { text: "嗓子干痒、鼻塞、皮肤瘙痒", element: "metal" },
            { text: "腰膝酸软、怕冷、频繁上厕所", element: "water" }
        ]
    }
];

// 五行结果数据
const ELEMENT_RESULTS = {
    wood: {
        name: "木",
        type: "木行偏弱型",
        fullName: "🟢 木·疏泄不畅型",
        color: "#2D8B55",
        colorLight: "#E8F5E9",
        organ: "肝·胆",
        emotion: "怒（压抑/易怒/急躁）",
        gutLink: "肝气犯脾 → 情绪性腹泻/肠躁",
        rhythm: "丑时(1-3时)肝经修复期最关键",
        description: "你的五行肠道体质属于「木行偏弱」型。在五行结构里，肝属木，主疏泄——就像一棵树需要自由生长，你的情绪也需要顺畅流动。当压力过大或情绪被压抑时，肝气郁结，会通过「木克土」的路径直接影响脾胃，表现为一紧张就拉肚子、一生气就胃疼。",
        tips: [
            "情绪通道：「怒从肠起」——你的愤怒在通过肠道表达",
            "节律关键：丑时(1-3时)务必入睡，这是肝脏自我修复的黄金窗口",
            "五行调和：多接触绿色自然环境，肝喜「条达」"
        ],
        hashtag: "#怒从肠起 #木行偏弱 #五行肠养"
    },
    fire: {
        name: "火",
        type: "火行偏亢型",
        fullName: "🔴 火·心神不宁型",
        color: "#D4423E",
        colorLight: "#FFEBEE",
        organ: "心·小肠",
        emotion: "焦躁（焦虑/失眠/情绪波动）",
        gutLink: "心火旺 → 小肠功能紊乱 → 血清素不足 → 睡眠+消化双失调",
        rhythm: "午时(11-13时)心经当令，子时(23-1时)必须入眠",
        description: "你的五行肠道体质属于「火行偏亢」型。心属火，心与小肠互为表里。现代科学发现，90%以上的血清素（快乐+安眠激素）在肠道合成——所以你的失眠和焦虑，很可能不是「想太多」，而是肠道发出的信号没有被听到。",
        tips: [
            "情绪通道：「肠道失眠」——你的睡不着可能是肠道在喊救命",
            "节律关键：子时(23-1时)前必须入睡，午时(11-13时)闭眼小憩15分钟",
            "五行调和：远离过度刺激（辛辣/咖啡/熬夜），心需要的是「安静」"
        ],
        hashtag: "#肠道失眠 #火行偏亢 #五行肠养"
    },
    earth: {
        name: "土",
        type: "土行偏虚型",
        fullName: "🟡 土·运化停滞型",
        color: "#D4A12A",
        colorLight: "#FFF8E1",
        organ: "脾·胃",
        emotion: "思（过度思虑/犹豫不决/拖延）",
        gutLink: "思伤脾 → 脾不运化 → 胀气/积食/消化不良",
        rhythm: "辰时(7-9时)胃经当令，是进食黄金期",
        description: "你的五行肠道体质属于「土行偏虚」型。脾属土，是消化系统的总指挥——中医说它是「后天之本」，所有吃进去的东西都要经过脾的「运化」才能变成身体可用的能量。当你想太多、反复纠结时，脾就在「加班」，时间一长，脾罢工了——胀气、没胃口、消化不良就来了。",
        tips: [
            "情绪通道：「思伤脾」——想太多真的会把胃搞坏",
            "节律关键：辰时(7-9时)一定要吃早餐，脾胃在这个时段消化力最强",
            "五行调和：少吃冷饮/生食，脾喜「温燥」，规律进食比吃什么更重要"
        ],
        hashtag: "#思伤脾 #土行偏虚 #五行肠养"
    },
    metal: {
        name: "金",
        type: "金行偏弱型",
        fullName: "⚪ 金·排浊受阻型",
        color: "#8C8C8C",
        colorLight: "#F5F5F5",
        organ: "肺·大肠",
        emotion: "悲/忧（悲伤/低落/丧失感）",
        gutLink: "悲伤伤肺 → 肺与大肠相表里 → 排便不畅/便秘",
        rhythm: "卯时(5-7时)大肠经当令，是最佳排便时间",
        description: "你的五行肠道体质属于「金行偏弱」型。肺属金，肺与大肠互为表里——这意味着你的呼吸系统和排泄系统由同一条「管道」管理。当悲伤和抑郁累积时，肺气不足，大肠的传导功能也会跟着下降，表现为便秘、排便困难、肠道缺乏动力。你的身体在用便秘告诉你：有些情绪该排出去了。",
        tips: [
            "情绪通道：「悲从肠排」——你的便秘可能是情绪淤堵的信号",
            "节律关键：卯时(5-7时)起床后一杯温水，顺应大肠经排毒节律",
            "五行调和：深呼吸练习，肺主气——呼吸通畅则肠道通畅"
        ],
        hashtag: "#悲从肠排 #金行偏弱 #五行肠养"
    },
    water: {
        name: "水",
        type: "水行偏虚型",
        fullName: "🔵 水·节律紊乱型",
        color: "#2E6B9E",
        colorLight: "#E3F2FD",
        organ: "肾·膀胱",
        emotion: "恐（恐惧/不安/失控感）",
        gutLink: "恐伤肾 → 肾阳不足 → 生物钟紊乱 → 代谢全面减速",
        rhythm: "亥时(21-23时)三焦经当令，应开始放松准备入睡",
        description: "你的五行肠道体质属于「水行偏虚」型。肾属水，掌管人体的「底层能量」——包括生物钟节律、内分泌、代谢速度。当恐惧和不安成为你的常态时，肾气被消耗，你的生物钟就开始紊乱——该睡时睡不着，该醒时醒不来，肠道的蠕动节律也跟着乱了。你不是体质差，是你的生物钟需要重新校准。",
        tips: [
            "情绪通道：「恐损节律」——内心的不安全感在打乱你的生物钟",
            "节律关键：亥时(21-23时)开始远离屏幕，帮助身体进入修复模式",
            "五行调和：泡脚/艾灸涌泉穴，肾主水——温暖才能让水流动"
        ],
        hashtag: "#恐损节律 #水行偏虚 #五行肠养"
    }
};
