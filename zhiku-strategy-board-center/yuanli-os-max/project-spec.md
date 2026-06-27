# 原力OS-MAX

## Project Contract
- project_id: `yuanli-os-max`
- source_trigger: `OSA`
- status: `设计`
- priority: `P0`
- owner: `liming`
- north_star: 把原力 OS 的 CBM-OSA 能力域、责任层、递归进化机制压成一张可执行总图。
- scope: 原力OS-MAX 的关键是横向不漏能力域，纵向不丢责任层，并把每次项目推进反写成系统进化。
- lifecycle: `设计` / transition_policy=`manual_decision_only`

## Governing Thought
原力OS-MAX 的关键是横向不漏能力域，纵向不丢责任层，并把每次项目推进反写成系统进化。

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
- R1 [red] 看板草案可能先于真实状态更新 -> 标注 local_generated，外部状态以审批后的 Feishu/Base/API 为准。
- R2 [amber] CBM-OSA 矩阵存在 missing cells -> 把 missing/risk cells 固定放在右侧拍板区。

## Decisions Needed
- D1: 本项目是否进入 P0-P1 周推进 (liming)
- D2: 是否允许生成 Feishu/Base dry-run 字段映射 (liming)

## Evidence
- E1: yuanli-os-max (high)
- E2: yuanli-strategy-cbm-osa-merged (high)
- E3: yuanli-strategy-cbm-osa-atlas (high)

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
