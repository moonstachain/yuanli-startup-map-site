# {{title}}

## Project Contract
- project_id: `{{project_id}}`
- source_trigger: `CBM | OSA | manual`
- status: `探索 | 设计 | 推进 | 阻塞 | 收敛 | 复盘`
- priority: `P0 | P1 | P2`
- owner: `{{owner}}`
- north_star: {{north_star}}
- lifecycle_transition_policy: `manual_decision_only`

## Governing Thought
{{governing_thought}}

## CBM-OSA Map
- 横向能力域: 能力域 / 系统模块 / 渠道 / 数据源 / 产物 / 风险
- 纵向责任层: 战略层 / 设计层 / 执行层 / 验证层 / 递归进化层
- 本轮必须补齐的 missing cells:
  - {{layer}} / {{domain}}: {{why_it_matters}}

## OKR / Execution
- Objective: {{objective}}
- KR1: {{key_result_1}}
- KR2: {{key_result_2}}
- KR3: {{key_result_3}}

## Actions
- A1 [P0] {{next_action}} -> next

## Risks
- R1 [amber] {{risk_title}} -> {{mitigation}}

## Decisions Needed
- D1: {{decision_title}} (owner={{owner}})

## Evidence
- E1: {{evidence_path}} (待确认)

## External Projection Candidates
- online_zhiku: dry_run / closed / approval_required=true
- feishu_base: dry_run / closed / approval_required=true
- notification: dry_run / closed / approval_required=true

## Rebuild Policy
- preserve manual judgment fields through `manual_overrides`
- regenerate evidence, score, risk_light, next_action, ledgers, projection candidates

## Safety
- local_only: true
- writes_online: false
- writes_feishu: false
- mutates_real_project_status: false
