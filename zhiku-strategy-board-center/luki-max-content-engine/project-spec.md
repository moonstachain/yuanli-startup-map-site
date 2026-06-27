# Luki Max 全自动内容工程

## Project Contract
- project_id: `luki-max-content-engine`
- source_trigger: `OSA`
- status: `设计`
- priority: `P0`
- owner: `liming`
- north_star: 每天把 24 小时伴随素材转成生产力证据、选题队列、样片任务、私人提醒和原力大脑审核候选。
- scope: 以工作的生产力为第一性原理：素材不是终点，能证明行动、生成内容、驱动复盘并安全写回系统的素材才是资产。
- lifecycle: `设计` / transition_policy=`manual_decision_only`

## Governing Thought
以工作的生产力为第一性原理：素材不是终点，能证明行动、生成内容、驱动复盘并安全写回系统的素材才是资产。

## Success Criteria
- 每周至少 5 张高价值生产力证据卡进入 not-authorized 审核候选
- 每周至少 12 个短视频选题具备脚本、分镜、素材目录和隐私边界
- 每周至少 1 条 Top 1 样片通过 ffprobe 或写明 failed receipt
- daily/weekly/clips/yuanli-gate/strategy_board 均有 receipt 或 validator 证据

## Typed Relationships
- strategic_task creates project-spec.md
- project-spec.md feeds dashboard-data.json
- dashboard-data.json renders dashboard.html
- dashboard.html surfaces decisions only; external writes require approval

## Actions
- A1 [P0] 升级 Looki daily 真相层：为每个 moment 写入 production_score、moment_category、privacy_reason、next_action -> next
- A2 [P0] 把 clips 流程从文件夹级候选升级为镜头级 dossier，并保留 Top 1 自动样片上限 -> planned
- A3 [P0] 将 weekly brief 升级为生产力周报：时间投入、工作密度、内容资产、证据卡、下周动作 -> planned
- A4 [P1] 建立 Luki Topic Factory：每天 Top 12 选题、脚本、分镜、素材目录、隐私边界 -> planned
- A5 [P1] 保持原力大脑 evidence writeback preview lane，核心写回必须等待人工授权记录 -> gated
- A6 [P1] 把本项目状态回流到随身智库战略看板中心，保留 local-only 与 external_sync approval gate -> in_progress

## Risks
- R1 [red] 工作/私人画面被误判为公开候选 -> public_candidate_after_review 只是候选；公开发布、对外群和平台分发必须人工复核画面与上下文。
- R2 [amber] 素材数量排序掩盖真实生产力价值 -> 按工作密度、证据价值、视觉质量、叙事潜力、可剪辑性、外部适配度、稀缺性综合打分。
- R3 [amber] 样片渲染失败阻断每日经营闭环 -> 剪辑失败只写 failed receipt，不阻断 daily/weekly/看板重建。

## Decisions Needed
- D1: 本项目是否进入 P0-P1 周推进 (liming)
- D2: 是否允许生成 Feishu/Base dry-run 字段映射 (liming)

## Evidence
- E1: looki-memory-ops/luki-max-content-engine-plan.json (high)
- E2: looki-memory-ops/Luki-Max-全自动内容工程升级方案.md (high)
- E3: looki-memory-ops/build_luki_max_content_engine.py (high)
- E4: strategic-projects/luki-max-content-engine (high)
- E5: zhiku-self-assess/strategy-boards/luki-max-content-engine (high)
- E6: Luki Clip Pro (high)
- E7: Luki Topic Factory (high)
- E8: Luki Topic Radar (high)
- E9: Luki Ops Scheduler (high)
- E10: Luki Strategy Board (high)
- E11: Luki Evidence Brain Gate (high)

## External Projection Candidates
- online_zhiku: dry_run / closed / approval_required=True
- feishu_base: dry_run / closed / approval_required=True
- notification: dry_run / closed / approval_required=True

## Rebuild Policy
- mode: `regenerate_operational_signals_preserve_manual_judgment`
- regenerated_fields: `evidence_refs, cbm_osa_map, density_score, dashboard_score, data_freshness, risk_light, next_action, operating_ledgers, external_projection_candidates`
- manual_override_fields: `status, status_machine, north_star, governing_thought, okr, milestones, actions, risks, decisions_needed, progress`

## Safety
- local_only: true
- writes_online: false
- writes_feishu: false
- mutates_real_project_status: false
