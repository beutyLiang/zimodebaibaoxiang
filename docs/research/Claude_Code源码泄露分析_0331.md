# Claude Code 源码泄露事件 — 团队内部通报

> **发送人：** 智远  
> **抄送：** Zoey → 子默  
> **日期：** 2026-03-31  
> **紧急程度：** ⭐⭐⭐⭐ 重要但不紧急  
> **恺撒评估：** 已完成调研，已获取源码

---

## 一、发生了什么？

**今天（2026年3月31日），Claude Code 的全部源代码意外泄露了。**

具体来说：

- **Claude Code** 是 Anthropic（Claude 的母公司）做的一个 AI 编程助手，属于当前全球最顶级的 AI Agent 产品
- Anthropic 的工程师在往 npm（代码包管理平台）发布时，**不小心把 source map 调试文件打包进去了**
- 这个文件里包含了 Claude Code 的**全部原始 TypeScript 源代码**
- 安全研究员 Chaofan Shou 率先发现并公开了这一事件

### 不是开源，是泄露

| | 开源 | 这次的情况 |
|---|---|---|
| 官方授权？ | ✅ 是 | ❌ 不是 |
| 可商用？ | 看协议 | ❌ 不可以 |
| 可学习？ | ✅ 是 | ✅ 可以（学架构思路） |
| 代码可复制？ | 看协议 | ❌ 违法 |

**结论：可以学习架构思想，不能复制代码。就像你去苹果体验店看了 iPhone 的交互设计，回来做自己的 App，完全合法。**

---

## 二、多大规模？

| 指标 | 数值 |
|------|------|
| TypeScript 源文件 | **~1,884 个** |
| 代码行数 | **~512,664 行** |
| 内置工具（Tool） | **40+ 个** |
| 命令（Command） | **80+ 个** |
| 最大单文件 | `query.ts`（785KB，核心 Agent 循环） |
| 包含分析报告 | 5 篇（中英双语） |
| 未公开的隐藏功能 | **108 个** |

这相当于 **Anthropic 花了几千万美金、几十个顶级工程师打磨出来的全部成果**，一次性全部暴露。

---

## 三、为什么对我们有用？（按项目拆解）

### 简单版解释

> 你要学做菜，看小红书教程只能学个皮毛。
> 但如果米其林三星厨师的**完整菜谱和操作手册**意外掉出来了，
> 你去认真读一遍，自己的厨艺马上升好几个级别。
> Claude Code 的源码就是这个"米其林手册"。

---

### 项目 A：AI Agent 群聊系统（直接对标，价值最大）

这是我们手上**最直接受益的项目**。Claude Code 里的 6 个模块分别对应我们群聊系统的 6 个核心需求：

| Claude Code 的设计 | 对应的源码位置 | 对标我们的什么 | 怎么用 |
|---|---|---|---|
| **Agent Loop**（感知→推理→执行→反思循环） | `src/query.ts`（785KB） | AI Engine 评估管道 | 学习它的循环怎么写，用户输入→选工具→执行→结果给AI→继续想→循环 |
| **Multi-Agent Swarm** | `src/utils/swarm/` | 群聊里多个 AI Agent 协作 | Lead Agent 拆任务 → Teammate 各自认领 → 共享任务板同步进度 |
| **SendMessageTool** | `src/tools/AgentTool/` | Agent A 回复 Agent B 的串话问题 | 学习 Agent 之间如何安全传递消息，避免串话 |
| **Permission Pipeline**（4层） | `src/utils/permissions/` | 积分扣费 + 权限判断 | 验证输入→用户钩子→规则匹配→交互确认，比我们现在的简单判断高级很多 |
| **Context Compaction**（3种策略） | `src/services/compact/` | 长对话 context rot 问题 | autoCompact（自动总结）+ snipCompact（剪历史）+ contextCollapse（重组结构） |
| **StreamingToolExecutor** | `src/services/tools/StreamingToolExecutor.ts` | Agent 同时调用多个工具时的并发控制 | 区分哪些工具可以并行、哪些必须串行 |

**一句话：Claude Code 的 Agent 架构 = 我们群聊 AI Engine 的"标准答案"。** 以前摸着石头过河，现在有了最佳实践。

---

### 项目 B：AI 社交平台（长期 Vision）

| Claude Code 的模块 | 源码位置 | 可借鉴点 |
|---|---|---|
| **KAIROS 模式**（全自主 Agent） | `src/assistant/`（feature-gated） | 后台常驻 Agent：心跳检测（`<tick>`）、推送通知、定时任务。这就是我们设想的"**AI 成员在社群里 7×24 自主发言**"的技术原型 |
| **Bridge Layer** | `src/bridge/` | Claude Desktop ↔ CLI 的连接桥梁。我们的平台做"**AI Agent 跨端同步状态**"可以参考这个跨端通信设计 |
| **Session Persistence** | `src/history.ts` | JSONL 追加写入、崩溃恢复、session resume。群聊需要这种级别的**对话持久化**，用户退出再回来能接上 |
| **Feature Flag 系统** | `src/utils/` 各处 | Bun 编译期死代码消除 + GrowthBook 运行时 AB 测试。比我们现在用 if-else 硬编的方式高级很多 |

**核心洞察：Anthropic 正在做的 KAIROS，就是我们"AI 社交平台"Vision 的技术验证。说明"AI 7×24 常驻"不是我们的臆想，是行业头部厂商的共识方向。**

---

### 项目 C：五行体质测评 Bot / Coze 智能体

| Claude Code 的设计 | 源码位置 | 可借鉴点 |
|---|---|---|
| **Tool Interface** `buildTool()` | `src/Tool.ts` | 每个工具都有：validateInput → checkPermissions → call → render。虽然 Coze 不需要这么复杂，但**工作流拆分的思路完全通用**——五行测评的流程也应该拆成"收集信息→分析体质→生成建议→推荐内容"4步 |
| **System Prompt 动态组装** | `src/query.ts` 的 `fetchSystemPromptParts()` | 系统提示语不是一整坨写死的，而是**模块化动态拼装**（工具描述 + 权限指令 + 记忆文件 CLAUDE.md）。我们的五行测评 Bot 的 prompt 也应该这样写：体质库 + 用户信息 + 输出格式分开管理 |
| **Tool Description for LLM** | `src/Tool.ts` 的 `prompt()` 方法 | 每个工具都有"给 AI 看的描述"，让 AI 知道什么时候该用这个工具。Coze 的知识库和工具描述也得这样精心设计 |

---

### 项目 D：AI SaaS 商业策略（社区教学助手等）

| Claude Code 的设计 | 对我们 SaaS 策略的启发 |
|---|---|
| **GrowthBook AB 测试** | Claude Code 用 GrowthBook 做增长实验和功能灰度。我们做 SaaS 也应该用同样的工具来管理"哪些用户看到哪些功能" |
| **远程控制 + 紧急开关** | 每小时轮询 `/api/claude_code/settings`，可以远程关闭任何功能。我们的 SaaS 也需要这种"紧急制动"能力——出了合规问题能一键关停 |
| **Telemetry 双通道** | 一路发 Anthropic 自己的分析，一路发 Datadog。SaaS 必须有完善的数据埋点，我们现在几乎没有 |
| **订阅制计费逻辑** | `src/cost-tracker.ts`（11KB）API 调用成本累计与预算控制。直接对标我们的积分/订阅计费系统 |

---

### 商业洞察（知道对手下一步棋很重要）

| 发现 | 对我们意味着什么 |
|---|---|
| **KAIROS**（全自主模式） | Anthropic 正在做后台常驻 AI Agent，能推送通知、监听 PR → **"AI 7×24 在线陪伴"是行业共识** |
| **108 个未发布模块** | 可以预判 Claude 未来 3-6 个月上什么功能，**提前布局或避开竞争** |
| **Undercover Mode** | Anthropic 员工在开源社区用 AI 写代码时伪装成人 → **"AI 身份透明度"是未来监管重点**，我们做 AI 社交要提前考虑 |
| **17 个未上线工具** | 浏览器自动化、工作流、PR 监听 → **AI Agent 的能力边界正在急剧扩展** |
| **远程控制/紧急开关** | 云端可随时改变用户行为、禁用功能 → **SaaS 必须有"紧急制动"能力** |

---

### 12 个核心架构设计模式（通用知识资产）

不管做哪个项目，这 12 个模式都是通用的硬核知识：

| # | 模式 | 说明 | 源码位置 |
|---|---|---|---|
| 1 | **Agent Loop** | 工业级 LLM 循环调用 | `src/query.ts` |
| 2 | **Tool Registry** | 动态注册工具，运行时发现 | `src/tools.ts` |
| 3 | **Permission Pipeline** | 4层权限链（hooks→rules→prompt→tool） | `src/utils/permissions/` |
| 4 | **Context Compaction** | 对话压缩，解决长对话问题 | `src/services/compact/` |
| 5 | **Streaming Execution** | 流式响应 + 并行工具执行 | `src/services/tools/` |
| 6 | **Sub-Agent Spawning** | Fork 子 Agent，独立上下文 | `src/tools/AgentTool/` |
| 7 | **Session Persistence** | JSONL 追加写入 + 崩溃恢复 | `src/history.ts` |
| 8 | **Feature Gating** | 编译期死代码消除 | Bun `feature()` |
| 9 | **MCP Protocol** | 5种连接方式 + OAuth + 断线重连 | `src/services/mcp/` |
| 10 | **Telemetry Pipeline** | 双通道遥测数据收集 | `src/services/analytics/` |
| 11 | **Bridge Architecture** | 跨端通信桥接（Desktop ↔ CLI） | `src/bridge/` |
| 12 | **Swarm Coordination** | 多 Agent 任务分发与协作 | `src/utils/swarm/` |

---

## 四、怎么获取源码？

### 方法 1：我已经下载了（推荐）

源码位置：`c:\projects\doubao\claude-code-source\`

Zoey / 子默可以直接拷贝这个文件夹。

### 方法 2：自行下载

```bash
git clone https://github.com/sanbuphy/claude-code-source-code.git
```

### 方法 3：只读分析报告（最省时间）

源码里自带 5 篇深度分析报告，在 `docs/zh/` 目录下：

1. `01-遥测与隐私分析.md` — 收集了什么数据
2. `02-隐藏功能与模型代号.md` — 内部代号和隐藏功能
3. `03-卧底模式分析.md` — AI 在开源社区伪装成人
4. `04-远程控制与紧急开关.md` — 远程控制用户行为
5. `05-未来路线图.md` — 未公开的未来功能

**建议子默至少读一遍 05-未来路线图，1小时就能读完，信息密度极高。**

---

## 五、学习建议（按优先级）

| 优先级 | 做什么 | 时间 | 适合谁 |
|--------|--------|------|--------|
| P0 | 读 `docs/zh/` 的 5 篇分析报告 | 2-3小时 | 所有人 |
| P1 | 读 `src/services/compact/`（对话压缩） | 半天 | 技术同学 |
| P2 | 读 `src/utils/swarm/`（多 Agent 协作） | 半天 | 技术同学 |
| P3 | 把源码当字典——遇到设计问题先搜 Claude Code 怎么做的 | 持续 | 所有人 |

---

## 六、法律红线（必须遵守）

1. ✅ 可以：学习架构思想、设计模式
2. ✅ 可以：用自己的代码实现类似的设计模式（洁净室实现）
3. ✅ 可以：在技术讨论中引用其设计思路
4. ❌ 不可以：复制粘贴任何源码用于我们的产品
5. ❌ 不可以：将源码公开分享给团队外的人
6. ❌ 不可以：用于任何商业目的

---

## 七、一句话总结

> **这是一本价值几千万美金的 AI Agent 工程教科书，全球最好的，免费摆在面前了。**
> 
> 不用抄一行代码，光是理解它的架构思想，就能让我们少走半年弯路。
> 
> — 恺撒
