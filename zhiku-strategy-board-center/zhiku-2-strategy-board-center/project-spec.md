# 随身智库 2.0 · 战略看板中心

## Project Contract
- project_id: `zhiku-2-strategy-board-center`
- source_trigger: `manual`
- status: `推进`
- priority: `P0`
- owner: `liming`
- north_star: 战略型任务启动后，10 分钟内自动生成可本地打开的高密度战略看板草案。
- scope: 随身智库 2.0 不能只做组件市场，它要把复杂任务自动升格为可管控、可拍板、可复盘的项目驾驶舱。
- lifecycle: `推进` / transition_policy=`manual_decision_only`

## Governing Thought
随身智库 2.0 不能只做组件市场，它要把复杂任务自动升格为可管控、可拍板、可复盘的项目驾驶舱。

## Success Criteria
- 每个项目至少 1 个北极星、1 个状态、1 个下一步、1 个证据引用
- CBM-OSA 至少覆盖横向能力域和纵向责任层
- 外部同步默认 dry-run，不直接写入

## Typed Relationships
- strategic_task creates project-spec.md
- project-spec.md feeds dashboard-data.json
- dashboard-data.json renders dashboard.html
- dashboard.html surfaces decisions only; external writes require approval

## Actions
- A1 [P0] 补齐 project-spec.md 的范围、验收项和 typed relationships -> next
- A2 [P0] 审一遍 CBM-OSA 矩阵的 missing/risk cells -> waiting_decision
- A3 [P1] 生成外部同步 dry-run 清单 -> planned

## Risks
- R1 [amber] 看板草案可能先于真实状态更新 -> 标注 local_generated，外部状态以审批后的 Feishu/Base/API 为准。
- R2 [amber] CBM-OSA 矩阵存在 missing cells -> 把 missing/risk cells 固定放在右侧拍板区。

## Decisions Needed
- D1: 本项目是否进入 P0-P1 周推进 (liming)
- D2: 是否允许生成 Feishu/Base dry-run 字段映射 (liming)

## Evidence
- E1: zhiku-self-assess (high)
- E2: zhiku-self-assess/audit.json (high)
- E3: zhiku-self-assess/zhiku-market-roadmap.html (high)

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
