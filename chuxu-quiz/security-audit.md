# 🔒 初序 H5 代码安全审计报告

> 📅 审计时间：2026-03-12  
> 📂 审计范围：`D:\projects\test\chuxu-quiz\` 全部 18 个文件  
> 🔍 审计方法：逐文件人工代码审查（两轮）

---

## 总结

| 等级 | 数量 |
|---|---|
| 🔴 **严重** | 6 个 |
| 🟡 **中等** | 9 个 |
| 🟢 **低风险** | 3 个 |

---

## 🔴 严重漏洞（6个）

### #1 DeepSeek API Key 明文硬编码在前端

**文件**：`ai-service.js` 第 13 行

```javascript
var API_KEY = 'sk-58236ee21abb47458c60f6b76845cb79';
```

**影响**：任何人打开浏览器 DevTools 即可盗用 Key，产生巨额费用或导致账号被封。

**修复**：迁移到 Supabase Edge Function 中转调用；上线前先在 DeepSeek 后台设每日消费上限。

---

### #2 注册流程安全缺陷 — 任何人可自助获得系统权限

**文件**：`login.html` 第 263-283 行

注册成功后自动向 `user_profiles` 写入记录（`role: 'user'`），而系统用 `user_profiles` 有记录 = 合法用户。任何人自助注册即可获得权限。如果 `user_profiles` 的 RLS 没限制 `role` 字段写入，甚至可自封管理员。

**修复**：删除公开注册功能，或注册后进入待审批状态，管理员批准后才写入 `user_profiles`。

---

### #3 SQL RLS 策略过于宽松

**文件**：`setup.sql` 第 43-45 行

```sql
CREATE POLICY "Allow anonymous insert" ON quiz_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert" ON checkins FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert" ON events FOR INSERT WITH CHECK (true);
```

**影响**：任何人可往三张表插入任意数据，污染统计或耗光 Supabase 免费额度。

**修复**：添加频率限制和数据校验策略。

---

### #4 管理后台 XSS

**文件**：`admin.js` 第 198-210 行

用户数据（昵称等）直接拼接进 `innerHTML` 和 `onclick` 属性。攻击者注册时填恶意昵称，管理员打开后台时执行攻击代码，可劫持管理员 session。

**修复**：用 `textContent` 替代 `innerHTML`，或对所有用户输入做 HTML 转义。

```javascript
function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
```

---

### #5 测试完成人数是造假的

**文件**：`app.js` 第 602-604 行 / `app2.js` 同位置

```javascript
var base = 3281;
var extra = Math.floor(Math.random() * 500);
document.getElementById('test-count').textContent = (base + extra).toLocaleString();
```

每次刷新页面随机显示 3281~3781，不是真实数据。用户截图分享后重新打开发现数字变了，品牌信任崩塌。

**修复**：从 Supabase 查 `quiz_results` 的 count 动态显示，或移除人数显示。

---

### #6 `const`/`var` 混用 — 旧浏览器白屏

**文件**：`quiz-data.js` 和 `features-data.js` 全文件用 `const`，其他文件用 `var`

`const` 在旧版微信内置浏览器、iOS 9 以下不支持，页面直接白屏。目标用户（25-40岁女性/小红书/微信生态）一定有人踩雷。

**修复**：全局替换 `const` → `var`。

---

## 🟡 中等漏洞（9个）

### #7 管理员邮箱硬编码在前端

**文件**：`auth.js` 第 11 行、`admin-login.html` 第 181 行

```javascript
var ADMIN_EMAILS = ['glaydsbernhwenkuph@gmail.com'];
```

管理员邮箱对所有人可见，可被用于钓鱼攻击。

**修复**：移除前端检查，全部依赖 `user_profiles.role` 服务端验证。

---

### #8 AI 报告缓存 Key 不完整

**文件**：`ai-service.js` 第 60 行

```javascript
var cacheKey = 'chuxu_ai_report_' + JSON.stringify(scores);
```

只用 `scores` 做 key，不含 `profile`。同分数不同画像的用户看到相同报告。

**修复**：`cacheKey` 加入 `profile` 的 hash。

---

### #9 Supabase 凭证在 5 个文件中重复

**文件**：`supabase.js`、`auth.js`、`admin.js`、`login.html`、`admin-login.html`

换项目要改 5 处，极易漏改。

**修复**：统一为一个 `config.js` 配置文件。

---

### #10 `user_profiles` 表缺少 RLS 策略

**文件**：`setup.sql`

`setup.sql` 只为 3 张表设了 RLS，`user_profiles`（核心权限表）未出现。如果未启用 RLS，任何请求可读写所有用户数据。

**修复**：立即检查 Supabase Dashboard，确认 RLS 已开启并添加合理策略。

---

### #11 打卡数据读取策略不可用

**文件**：`setup.sql` 第 48 行

```sql
USING (user_id = current_setting('request.headers')::json->>'x-user-id');
```

Supabase SDK 不发送 `x-user-id` header，策略不生效。

**修复**：改为 `USING (user_id = auth.uid()::text)`。

---

### #12 两套 app.js 重复 95%+ 代码

`app.js`（609行）和 `app2.js`（957行）几乎完全相同。修 bug 要修两遍，已出现漏改（`app.js` 没接 AI 服务）。

**修复**：确定主版本（建议 `app2.js`），删除另一个。

---

### #13 重测时 userProfile 和 userAnswers 不清空

**文件**：`app.js` / `app2.js` 的 `handleRetest()` 函数

重置了 `scores` 但没清空 `userProfile` 和 `userAnswers`，旧数据残留影响新结果。

**修复**：在 `handleRetest()` 中加 `userProfile = {}; userAnswers = {};`

---

### #14 AI 报告生成失败无错误提示

**文件**：`app2.js` 第 286-290 行

失败返回 `{ _error: ... }`，但渲染代码不检查此字段，用户看到空白卡片。

**修复**：添加 `_error` 检查，显示友好错误提示。

---

### #15 Prompt 注入隐患

**文件**：`ai-prompt.js` 第 93-97 行

用户选项文本直接拼入 Prompt。当前选项是预定义的所以安全，但如果将来添加自由文本输入，存在注入风险。

**预防**：对所有用户输入清洗，去除 `##`、`System:` 等 LLM 指令标记。

---

## 🟢 低风险（3个）

### #16 两套 HTML 入口

`index.html` 加载 `app.js`，`index2.html` 加载 `app2.js`，功能重复易不同步。

### #17 Supabase SDK 版本未锁定

`@supabase/supabase-js@2` 会自动升级小版本，可能因 breaking change 导致网站挂掉。建议锁定具体版本。

### #18 首页测试人数硬编码

`index.html` 中 `<span id="test-count">3,281</span>` 写死（与 #5 同一问题的 HTML 侧）。

---

## ⚡ 修复优先级

| 优先级 | 漏洞 | 预计耗时 |
|---|---|---|
| 🔴 立即 | #1 去 DeepSeek 后台设消费上限 | 5 分钟 |
| 🔴 立即 | #10 检查 user_profiles RLS | 10 分钟 |
| 🔴 立即 | #6 const → var 全局替换 | 5 分钟 |
| 🔴 今天 | #5 移除假数据 | 5 分钟 |
| 🔴 今天 | #2 关闭公开注册 | 30 分钟 |
| 🔴 今天 | #4 管理后台 XSS 修复 | 30 分钟 |
| 🟡 本周 | #1 迁移到 Edge Function | 3-4 小时 |
| 🟡 本周 | #3 RLS 策略加强 | 1 小时 |
| 🟡 本周 | #8 修复缓存 key | 5 分钟 |
| 🟡 本周 | #9 配置文件统一 | 30 分钟 |
| 🟡 本周 | #12 删除重复代码 | 30 分钟 |
| 🟡 本周 | #13 重测清空状态 | 5 分钟 |
| 🟡 本周 | #14 AI 错误提示 | 10 分钟 |
| 🟢 有空 | #7, #11, #15, #16, #17, #18 | 各 10-30 分钟 |

---

*子默 · 2026-03-12 · 代码安全审计（两轮合并版）*
