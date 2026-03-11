-- 初序 H5 · Supabase 数据库建表脚本
-- 请在 Supabase Dashboard → SQL Editor 中运行此脚本

-- ① 测试结果表
CREATE TABLE quiz_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id TEXT NOT NULL,
    main_element TEXT NOT NULL,
    sub_element TEXT,
    scores JSONB,
    user_agent TEXT,
    referrer TEXT
);

-- ② 打卡记录表
CREATE TABLE checkins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id TEXT NOT NULL,
    element TEXT,
    mood INT CHECK (mood BETWEEN 1 AND 5),
    sleep INT CHECK (sleep BETWEEN 1 AND 5),
    gut INT CHECK (gut BETWEEN 1 AND 5),
    note TEXT
);

-- ③ 行为埋点表
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id TEXT NOT NULL,
    event TEXT NOT NULL,
    data JSONB
);

-- 开启 RLS (行级安全策略)
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户插入数据 (只写不读，保护隐私)
CREATE POLICY "Allow anonymous insert" ON quiz_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert" ON checkins FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert" ON events FOR INSERT WITH CHECK (true);

-- 允许用户读取自己的打卡数据
CREATE POLICY "Allow read own checkins" ON checkins FOR SELECT USING (user_id = current_setting('request.headers')::json->>'x-user-id');
