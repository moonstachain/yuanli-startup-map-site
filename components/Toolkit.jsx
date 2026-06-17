// 100 · 通关锦囊 · Toolkit (觉醒20/独创30/升维30/锁定20 技能卡墙 + 每卡 AI 实操)
// 数据 window.TOOLKIT 来自 data/toolkit.jsx (由 _extract_toolkit.py 生成)。
// AI 按钮复用 window.claude.complete shim — prompt 内嵌 gate 名 → 路由对应 volume.md 做 RAG。
const { useState: useStateT, useRef: useRefT, useEffect: useEffectT } = React;

// 四关强调色 (取自 luxe 既有变量, 四关可区分)
const TK_GATE_COLOR = {
  '原力觉醒': 'var(--jade)',
  '品类独创': 'var(--gold)',
  '模式升维': 'var(--gold-foil-1)',
  '壁垒锁定': 'var(--cinnabar)'
};

function Toolkit() {
  const skills = window.TOOLKIT || [];
  const [gate, setGate] = useStateT('全部');
  const [query, setQuery] = useStateT('');
  const [active, setActive] = useStateT(null);   // 正在问 AI 的技能 (null=抽屉关)
  const [output, setOutput] = useStateT('');
  const [loading, setLoading] = useStateT(false);
  const [flipped, setFlipped] = useStateT(() => new Set());  // 已翻到背面的卡 code 集合 (多卡独立翻)
  const outRef = useRefT(null);

  const toggleFlip = (code) => setFlipped(prev => {
    const next = new Set(prev);
    next.has(code) ? next.delete(code) : next.add(code);
    return next;
  });

  useEffectT(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [output]);

  const gates = ['原力觉醒', '品类独创', '模式升维', '壁垒锁定'];
  const countOf = (g) => skills.filter(s => s.gate === g).length;

  const filtered = skills.filter(s => {
    if (gate !== '全部' && s.gate !== gate) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      if (!(s.title.includes(query) || s.body.includes(query) || s.ai.includes(query) ||
            (s.bar && s.bar.includes(query)) || (s.case && s.case.includes(query)) ||
            s.code.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const ask = async (s) => {
    setActive(s);
    setOutput('');
    setLoading(true);
    try {
      const prompt =
        `你是"${s.gate}"AI 教练，基于"借势合力·原力创业·通关地图"绿皮书 v1.0。` +
        `学员正在练第${s.gateNum}关「${s.gate}」的技能点「${s.code} · ${s.title}」。\n\n` +
        `该技能点的要义：${s.body}\n\n` +
        `过关线（可量化验收标准）：${s.bar}\n\n` +
        (s.case ? `参考真实案例：${s.case}\n\n` : '') +
        `通用 AI 辅助方向：${s.ai}\n\n` +
        `请基于绿皮书${s.gate}卷，给这位学员一套可立刻上手的具体做法：` +
        `①用 3-5 步把上面的"AI 辅助方向"落地，每步给出可直接复制粘贴的提问/动作模板，并对齐"过关线"的验收标准；` +
        `②点出执行时最容易踩的 1-2 个坑。中文，350-600 字，结构清晰，可用"·"分点。`;
      const reply = await window.claude.complete(prompt);
      setOutput(reply || '[AI 未返回内容，请重试]');
    } catch (err) {
      setOutput(`[AI 教练暂时不可达：${err && err.message ? err.message : '未知错误'}]\n\n` +
        '可稍后重试，或先看左侧技能卡上的 🤖 一句话方向自行上手。');
    } finally {
      setLoading(false);
    }
  };

  const close = () => { setActive(null); setOutput(''); setLoading(false); };

  return (
    <div>
      {/* 筛选条 */}
      <div className="tk-bar">
        <span className="label-mini">四 关</span>
        <div className="tk-filters">
          <button className={'btn-ghost' + (gate === '全部' ? ' active' : '')}
            onClick={() => setGate('全部')}>全部 · {skills.length}</button>
          {gates.map(g => (
            <button key={g}
              className={'btn-ghost tk-gbtn' + (gate === g ? ' active' : '')}
              style={{'--tk-c': TK_GATE_COLOR[g]}}
              onClick={() => setGate(g)}>
              <span className="tk-dot" /> {g} · {countOf(g)}
            </button>
          ))}
        </div>
        <input type="search" placeholder="搜索 · 技能 / 关键词 / 编号"
          value={query} onChange={e => setQuery(e.target.value)} />
        <span style={{flex: 1}} />
        <span className="pill">{filtered.length} / 100 锦囊</span>
      </div>

      <div className="tk-hint">
        正面 = 一句话点破的判断；点卡片翻面看 📏 过关线 / 💡 实锤案例 / 🤖 AI 教练。
      </div>

      {/* 卡墙 · 翻牌卡 (正面=重点 / 背面=详情) */}
      <div className="tk-grid">
        {filtered.map(s => {
          const isF = flipped.has(s.code);
          return (
            <div key={s.code}
                 className={'tk-flip' + (isF ? ' flipped' : '') + (s.milestone ? ' tk-flip-ms' : '')}
                 style={{'--tk-c': TK_GATE_COLOR[s.gate]}}
                 onClick={() => toggleFlip(s.code)}>
              <div className="tk-flip-inner">

                {/* 正面 · 重点 */}
                <div className="tk-face tk-face-front">
                  <div className="tk-top">
                    <span className="tk-code">{s.code}</span>
                    <span className="tk-gate">{s.gateLabel} · {s.gate}</span>
                  </div>
                  <div className="tk-title">
                    {s.title}{s.milestone ? <span className="tk-ms-tag">出关</span> : null}
                  </div>
                  <div className="tk-body">{s.body}</div>
                  <div className="tk-flip-hint">⇆ 翻面 · 过关线 / 实锤 / AI</div>
                </div>

                {/* 背面 · 详情 */}
                <div className="tk-face tk-face-back">
                  <div className="tk-top">
                    <span className="tk-code">{s.code}</span>
                    <span className="tk-back-lbl">详情 · DETAIL ↩</span>
                  </div>
                  {s.bar ? <div className="tk-pass"><span className="tk-ico">📏</span><span>{s.bar}</span></div> : null}
                  {s.case ? <div className="tk-case"><span className="tk-ico">💡</span><span>{s.case}</span></div> : null}
                  <div className="tk-ai"><span className="tk-ico">🤖</span><span>{s.ai}</span></div>
                  <button className="tk-ask-btn" onClick={(e) => { e.stopPropagation(); ask(s); }}>让 AI 帮我做 ▸</button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="placeholder" style={{marginTop: 24}}>没有匹配的锦囊，换个关键词或筛选试试。</div>
      )}

      {/* AI 实操抽屉 */}
      {active && (
        <div className="tk-drawer-wrap">
          <div className="tk-drawer-backdrop" onClick={close} />
          <div className="tk-drawer">
            <div className="tk-drawer-head" style={{'--tk-c': TK_GATE_COLOR[active.gate]}}>
              <div>
                <span className="disp-en" style={{fontSize: 10, color: 'var(--gold-deep)', letterSpacing: '0.3em'}}>
                  AI · {active.code} · {active.gate}
                </span>
                <div className="tk-drawer-title">{active.title}</div>
              </div>
              <button className="tk-close" onClick={close}>✕</button>
            </div>

            {active.bar ? <div className="tk-drawer-pass">📏 过关线 · {active.bar}</div> : null}
            {active.case ? <div className="tk-drawer-case">💡 实锤 · {active.case}</div> : null}
            <div className="tk-drawer-ai">🤖 {active.ai}</div>

            <div className="tk-drawer-out" ref={outRef}>
              {loading && !output
                ? <span className="tk-thinking">· AI 教练思考中 ·</span>
                : (output || '')}
            </div>

            <div className="tk-drawer-foot">
              <button className="tk-redo" onClick={() => ask(active)} disabled={loading}>
                {loading ? '生成中…' : '重新生成'}
              </button>
              <span className="tk-foot-note">基于绿皮书「{active.gate}」卷 · 千问深答</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.Toolkit = Toolkit;
