# Looki 自动运营

## Project Contract
- project_id: `looki-auto-operations`
- source_trigger: `CBM`
- status: `推进`
- priority: `P0`
- owner: `liming`
- north_star: 把 Looki 生活记忆变成每日可归档、可搜索、可剪辑、可复盘的自动化生产系统。
- scope: Looki 的战略价值不在单次回忆，而在把生活数据持续转成 NAS、飞书、视频和决策证据。
- lifecycle: `推进` / transition_policy=`manual_decision_only`

## Governing Thought
Looki 的战略价值不在单次回忆，而在把生活数据持续转成 NAS、飞书、视频和决策证据。

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
- E1: looki-maximize-playbook (high)
- E2: looki-memory-ops (high)
- E3: looki-api-使用攻略.md (high)
- E4: 公开 API 端点 (high)
- E5: 内部读端点 (high)
- E6: 写操作 (high)

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
