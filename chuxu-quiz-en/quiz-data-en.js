/**
 * Element Quiz by Yuanmind — English Quiz Data
 * Chat-based assessment: 8 questions + profile
 * 25 element combination variants
 * FDA-compliant language throughout
 */

var CHAT_FLOW = [
    {
        id: 'welcome',
        type: 'intro',
        messages: [
            'Hey there 👋',
            "I'm your Element Guide from Yuanmind.",
            "I'll ask you a few questions about how your body and mind work together.",
            "There are no right or wrong answers — just go with your gut feeling."
        ],
        nextBtn: "I'm ready, let's go",
        next: 'profile-gender'
    },
    // ---- Profile Collection ----
    {
        id: 'profile-gender',
        type: 'profile',
        field: 'gender',
        message: "Before we start, let me get to know you a bit.\nWhat's your gender?",
        options: [
            { text: '👩 Female', value: 'female' },
            { text: '👨 Male', value: 'male' },
            { text: '🤐 Prefer not to say', value: 'other' }
        ],
        next: 'profile-age'
    },
    {
        id: 'profile-age',
        type: 'profile',
        field: 'age',
        message: "What's your age range?",
        options: [
            { text: '🌱 18-25', value: '18-25' },
            { text: '🌿 26-35', value: '26-35' },
            { text: '🌳 36-45', value: '36-45' },
            { text: '🏔️ 46+', value: '46+' }
        ],
        next: 'profile-concern'
    },
    {
        id: 'profile-concern',
        type: 'profile',
        field: 'concerns',
        multiSelect: true,
        message: "What's been bothering you the most lately? (Select all that apply)",
        options: [
            { text: '😴 Poor sleep', value: 'sleep' },
            { text: '😟 Anxiety & tension', value: 'anxiety' },
            { text: '🤢 Digestive issues', value: 'gut' },
            { text: '😪 Low energy', value: 'fatigue' },
            { text: '🌡️ Skin problems', value: 'skin' },
            { text: '🩸 Irregular cycles', value: 'period' },
            { text: '😊 Nothing right now', value: 'none' }
        ],
        next: 'profile-diet'
    },
    {
        id: 'profile-diet',
        type: 'profile',
        field: 'diet',
        message: "What's your typical eating pattern?",
        options: [
            { text: '🥬 Mostly plant-based', value: 'vegetarian' },
            { text: '🍖 Mostly meat-based', value: 'meat' },
            { text: '🍱 Fairly balanced', value: 'balanced' },
            { text: '🍔 Pretty irregular', value: 'irregular' }
        ],
        next: 'q1'
    },
    // ---- Questions ----
    {
        id: 'q1',
        type: 'question',
        dimension: 'Emotions',
        message: "Let's talk about stress 🌊\nWhen you're under heavy pressure, what's your body's first reaction?",
        options: [
            { text: '🔥 Heart races, face flushes, urge to snap', element: 'wood', score: 3 },
            { text: '😰 Chest tightness, restless, can\'t sleep', element: 'fire', score: 3 },
            { text: '🫤 Stomach upset, appetite swings', element: 'earth', score: 3 },
            { text: '😢 Shallow breathing, sighing, chest feels tight', element: 'metal', score: 3 },
            { text: '😨 Cold hands/feet, want to hide, mind goes blank', element: 'water', score: 3 }
        ],
        next: 'q2'
    },
    {
        id: 'q2',
        type: 'question',
        dimension: 'Emotions',
        message: "When you're feeling low, what's your go-to way to cope?",
        options: [
            { text: '🏃 Move — exercise, walk, do something physical', element: 'wood', score: 2 },
            { text: '🗣 Talk — vent to someone, need to be heard', element: 'fire', score: 2 },
            { text: '🍰 Eat — comfort food, sweets, carbs', element: 'earth', score: 2 },
            { text: '🎧 Withdraw — music, solitude, quiet time', element: 'metal', score: 2 },
            { text: '🛌 Sleep — hide under covers, shut everything out', element: 'water', score: 2 }
        ],
        next: 'q3'
    },
    {
        id: 'q3',
        type: 'question',
        dimension: 'Digestion',
        message: "Let's check your digestion 🌿\nWhat's your most common gut issue?",
        options: [
            { text: '💨 Stress = instant stomach problems', element: 'wood', score: 3 },
            { text: '🔥 Frequent mouth sores, dry/hard stools', element: 'fire', score: 3 },
            { text: '😮‍💨 Bloating after meals, slow digestion', element: 'earth', score: 3 },
            { text: '😐 Constipation, days without going', element: 'metal', score: 3 },
            { text: '💧 Loose stools, worse in cold weather', element: 'water', score: 3 }
        ],
        next: 'q4'
    },
    {
        id: 'q4',
        type: 'question',
        dimension: 'Sleep',
        message: "About your sleep 🌙\nWhat's your biggest sleep struggle?",
        options: [
            { text: "😤 Can't fall asleep — mind won't stop replaying the day", element: 'wood', score: 3 },
            { text: '💭 Light sleeper — vivid dreams, easily woken', element: 'fire', score: 3 },
            { text: '🥱 Can sleep but never feel rested', element: 'earth', score: 3 },
            { text: '⏰ Wake up at 3-5 AM and can\'t fall back asleep', element: 'metal', score: 3 },
            { text: '🌊 Frequent bathroom trips during the night', element: 'water', score: 3 }
        ],
        next: 'q5'
    },
    {
        id: 'q5',
        type: 'question',
        dimension: 'Cravings',
        message: "Your food cravings 🍵\nWhat have you been craving most lately?",
        options: [
            { text: '🍋 Sour things — lemon, vinegar, pickles', element: 'wood', score: 2 },
            { text: '🌶 Spicy or bitter — hot food, coffee, dark chocolate', element: 'fire', score: 2 },
            { text: '🍰 Sweet things — cake, boba tea, carbs', element: 'earth', score: 2 },
            { text: '🧂 Sharp & pungent — ginger, garlic, onion', element: 'metal', score: 2 },
            { text: '🧊 Salty or cold — chips, ice drinks, pickled foods', element: 'water', score: 2 }
        ],
        next: 'q6'
    },
    {
        id: 'q6',
        type: 'question',
        dimension: 'Body',
        message: "Body signals ✨\nWhat physical discomfort have you noticed most recently?",
        options: [
            { text: '😣 Headaches, dry eyes, stiff neck and shoulders', element: 'wood', score: 3 },
            { text: '🥵 Easily flushed, feeling hot, warm palms', element: 'fire', score: 3 },
            { text: '🫠 Heavy limbs, bloated, feeling "puffy"', element: 'earth', score: 3 },
            { text: '🤧 Dry skin, frequent colds, sore throat', element: 'metal', score: 3 },
            { text: '🥶 Always cold, lower back pain, hair thinning', element: 'water', score: 3 }
        ],
        next: 'q7'
    },
    {
        id: 'q7',
        type: 'question',
        dimension: 'Energy',
        message: "Energy rhythm ⚡\nWhen does your energy hit its lowest point?",
        options: [
            { text: "🌅 Mornings are brutal, but I come alive in the afternoon", element: 'wood', score: 2 },
            { text: "☀️ Post-lunch crash at 2-3 PM, but wired at night", element: 'fire', score: 2 },
            { text: "🌤 Drowsy after every meal, sluggish all day", element: 'earth', score: 2 },
            { text: "🌆 Energy drops at dusk, melancholy creeps in", element: 'metal', score: 2 },
            { text: "🌙 Exhausted by evening but resist going to bed", element: 'water', score: 2 }
        ],
        next: 'q8'
    },
    {
        id: 'q8',
        type: 'question',
        dimension: 'Mind',
        message: "Last question 💫\nIf you had to pick one word for your inner state right now?",
        options: [
            { text: '🌪 Frustrated — so much to say but can\'t get it out', element: 'wood', score: 2 },
            { text: '🎢 Restless — can\'t sit still, always worrying', element: 'fire', score: 2 },
            { text: '🌀 Indecisive — overthinking everything, can\'t commit', element: 'earth', score: 2 },
            { text: '🍂 Low — nothing excites me, feeling flat', element: 'metal', score: 2 },
            { text: '🌑 Lost — don\'t know what I really want', element: 'water', score: 2 }
        ],
        next: 'result'
    }
];

// ---- Element Results (FDA-compliant, functional terminology) ----
var ELEMENT_RESULTS = {
    wood: {
        name: 'Wood',
        fullName: 'Wood Dominant',
        emoji: '🌿',
        color: '#2D8B55',
        colorSoft: 'rgba(45,139,85,0.12)',
        title: 'The Driven Force',
        system: 'Energy Flow System',
        emotion: 'Frustration & Suppressed Anger',
        season: 'Spring',
        time: '1:00–5:00 AM',
        bodyLink: 'Stress triggers digestive upset — your drive overloads your nourishment system',
        description: "You're someone with intense drive and ambition. When your energy can't find an outlet, it turns into frustration, tension, and restlessness. This overflow tends to disrupt your digestive system — when you're stressed, your stomach takes the hit first.",
        tips: [
            '🌿 Take a 15-minute aimless walk daily — let your energy flow naturally',
            '🍋 Add sour foods to your diet (lemon water, pickles) — they support your Energy Flow System',
            '😤 Allow yourself to express frustration — suppressing it puts pressure on your gut',
            '🌅 Be asleep by 1 AM — this is when your Energy Flow System recharges'
        ]
    },
    fire: {
        name: 'Fire',
        fullName: 'Fire Dominant',
        emoji: '🔥',
        color: '#C9544D',
        colorSoft: 'rgba(201,84,77,0.12)',
        title: 'The Sensitive Perceiver',
        system: 'Emotional Balance System',
        emotion: 'Anxiety & Overstimulation',
        season: 'Summer',
        time: '11:00 AM–1:00 PM',
        bodyLink: 'Anxiety disrupts absorption — your emotional sensitivity affects your gut-brain connection',
        description: "You feel everything deeply. You're perceptive, empathetic, and emotionally rich — but this also means you're easily overwhelmed. When your mind races, your body struggles to absorb nutrients properly. 90% of your serotonin is actually produced in your gut, so when your emotions are turbulent, your digestion follows.",
        tips: [
            '🔴 Rest at midday — even 10 minutes of closing your eyes helps your Emotional Balance System',
            '🫖 Try calming teas like chamomile or passionflower',
            '📵 No screens 1 hour before bed — reduce stimulation to your system',
            '❤️ A small amount of bitter foods (dark chocolate, green tea) may support emotional balance'
        ]
    },
    earth: {
        name: 'Earth',
        fullName: 'Earth Dominant',
        emoji: '🌾',
        color: '#C6983A',
        colorSoft: 'rgba(198,152,58,0.12)',
        title: 'The Nurturing Ground',
        system: 'Nourishment System',
        emotion: 'Overthinking & Worry',
        season: 'Late Summer (Transitions)',
        time: '9:00–11:00 AM',
        bodyLink: 'Overthinking weakens digestion — your worry literally weighs down your stomach',
        description: "You're the one who takes care of everyone else. But constant worrying and overthinking overloads your Nourishment System. Think of your digestion as a processing machine — when your mind is churning, your stomach churns too. That's why you experience bloating, cravings, and energy crashes after meals.",
        tips: [
            '🟡 Eat breakfast between 7-9 AM — this is when your Nourishment System is most active',
            '🍠 Yellow/orange foods support your system: sweet potato, pumpkin, millet',
            '🧠 Practice deciding ONE thing at a time — indecision is your system\'s biggest drain',
            '🫁 Rest 20 minutes after eating — let your body focus on digesting'
        ]
    },
    metal: {
        name: 'Metal',
        fullName: 'Metal Dominant',
        emoji: '🌙',
        color: '#8C8C98',
        colorSoft: 'rgba(140,140,152,0.12)',
        title: 'The Refined Sensitive',
        system: 'Recovery System',
        emotion: 'Sadness & Melancholy',
        season: 'Autumn',
        time: '3:00–7:00 AM',
        bodyLink: 'Unprocessed grief slows elimination — emotional weight becomes physical weight',
        description: "You have refined taste, deep inner life, and strong aesthetics. But you're also prone to sadness and a lingering sense of loss. When emotions aren't released, your Recovery System slows down — leading to constipation, dry skin, and a weakened immune response. Your body holds onto what your mind refuses to let go of.",
        tips: [
            '⚪ Let yourself cry — it\'s your Recovery System\'s natural release mechanism',
            '🫁 Practice 3 minutes of deep belly breathing daily — exhale longer than you inhale',
            '🍐 White foods may support your system: pears, mushrooms, almonds, coconut',
            '🌅 If you wake between 3-5 AM regularly, your Recovery System may need attention'
        ]
    },
    water: {
        name: 'Water',
        fullName: 'Water Dominant',
        emoji: '🌊',
        color: '#2E6B9E',
        colorSoft: 'rgba(46,107,158,0.12)',
        title: 'The Deep Thinker',
        system: 'Vitality System',
        emotion: 'Fear & Insecurity',
        season: 'Winter',
        time: '5:00–11:00 PM',
        bodyLink: 'Chronic fear drains core energy — your body\'s battery slowly depletes',
        description: "You're a deep thinker with a rich inner world that you rarely show others. Your Vitality System is like your body's battery — when you live in a constant state of low-grade fear or insecurity, it slowly drains. Feeling cold, lower back discomfort, hair thinning, and waking at night are all signals that your battery needs recharging.",
        tips: [
            '🔵 Be in bed by 11 PM — this is when your Vitality System begins its recharge cycle',
            '🫘 Dark-colored foods may support your system: black beans, black sesame, blueberries',
            '🦶 Warm foot soaks for 15 minutes before bed (comfortable warm water)',
            '💆 Reduce exposure to fear-based content — anxiety is your system\'s biggest energy leak'
        ]
    }
};

// ---- Transition Messages ----
var TRANSITION_MESSAGES = [
    'Hmm, I see...',
    'Interesting...',
    'Got it, noted 📝',
    'That tells me a lot...',
    'Okay, let\'s continue...',
    'Getting clearer now...'
];

// ---- Sub-element descriptions ----
var SUB_ELEMENT_DESC = {
    wood: "You also carry Wood energy — you have strong drive, but watch out for tension building up in your body.",
    fire: "Your secondary element is Fire — you're perceptive and empathetic, but be mindful of overstimulation affecting your rest.",
    earth: "Your secondary element is Earth — you're naturally nurturing, but remember to take care of your own nourishment first.",
    metal: "Your secondary element is Metal — you have refined sensitivity, so make sure to regularly release emotions instead of holding them in.",
    water: "Your secondary element is Water — you think deeply, but prioritize recharging your energy through rest and warmth."
};
