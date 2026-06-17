// 康波 × 人格 · 案例 (卷五·第33章) — 12×6 交叉矩阵 + 翻面案例卡 + 供需相位模型
// 数据: window.CASES / window.CYCLES / window.PHASE_MODEL (data/cases.jsx)
// join: case.arch ⇄ ARCHETYPES.name ; case.atoms[] ⇄ ATOMS.id
const { useState: useStateK, useMemo: useMemoK } = React;

function CaseMatrix() {
  const cases = window.CASES || [];
  const cycles = window.CYCLES || [];
  const archs = window.ARCHETYPES || [];
  const atomsAll = window.ATOMS || [];
  const phase = window.PHASE_MODEL || {};

  const [cycleF, setCycleF] = useStateK('全部');
  const [archF, setArchF] = useStateK('全部');
  const [sideF, setSideF] = useStateK('全部');
  const [evF, setEvF] = useStateK('全部');
  const [selected, setSelected] = useStateK(null);   // 矩阵点击 → 详情面板
  const [flipped, setFlipped] = useStateK(null);      // 卡片翻面
  const [showPhase, setShowPhase] = useStateK(false);

  // id → atom 名查表 (原子编码渲染成可读名)
  const atomName = useMemoK(() => {
    const m = {};
    atomsAll.forEach(a => { m[a.id] = a.name; });
    return m;
  }, [atomsAll]);

  const cycleKeys = cycles.length ? cycles.map(c => c.key) : ['K1','K2','K3','K4','K5','K6'];

  const matchFilter = (c) => {
    if (cycleF !== '全部' && c.cycle !== cycleF) return false;
    if (archF !== '全部' && c.arch !== archF) return false;
    if (sideF !== '全部') {
      const want = sideF === '供给侧' ? 'supply' : 'demand';
      if (c.side !== want) return false;
    }
    if (evF !== '全部' && c.evidence !== evF) return false;
    return true;
  };

  const filtered = useMemoK(() => cases.filter(matchFilter), [cycleF, archF, sideF, evF, cases]);
  const filteredIds = useMemoK(() => new Set(filtered.map(c => c.id)), [filtered]);

  const tail = (id) => id.replace(/^K[1-6]-/, '');   // K1-MAG-01 → MAG-01
  const evClass = (e) => e === '🟢' ? 'ev-strong' : e === '🟡' ? 'ev-mid' : 'ev-weak';

  const selCase = selected ? cases.find(c => c.id === selected) : null;

  // 共用: 案例『加深三层 + 财务 + 原子 + 信源』深度块
  const renderDeep = (c, compact) => (
    <div className="km-deep">
      <div className="km-layer">
        <span className="km-l">① 反常识洞察</span>
        <div className="km-t">{c.insight}</div>
      </div>
      <div className="km-layer">
        <span className="km-l">② 范式跃迁机制</span>
        <div className="km-t">{c.mechanism}</div>
      </div>
      <div className="km-layer">
        <span className="km-l">③ 价值重分配</span>
        <div className="km-t">{c.redistribution}</div>
      </div>
      <div className="km-layer">
        <span className="km-l">关键财务</span>
        <div className="km-t km-fin">{c.finance}</div>
      </div>
      {!compact && (
        <div className="km-layer">
          <span className="km-l">人格驱动</span>
          <div className="km-t">{c.persona}</div>
        </div>
      )}
      <div className="km-layer">
        <span className="km-l">对应 58 原子</span>
        <div className="km-atoms">
          {c.atoms.map(code => (
            <span key={code} className="km-atom" title={atomName[code] || ''}>
              <span className="km-acode">{code}</span>
              {atomName[code] ? ' ' + atomName[code] : ''}
            </span>
          ))}
        </div>
      </div>
      <div className="km-layer" style={{borderBottom:'none'}}>
        <span className="km-l">信源</span>
        <div className="km-t km-src">{c.sources}</div>
      </div>
    </div>
  );

  return (
    <div>
      {/* 工具条 · 筛选 */}
      <div className="atom-toolbar">
        <span className="label-mini">周 期</span>
        <div className="group">
          {['全部', ...cycleKeys].map(k => (
            <button key={k} className={'btn-ghost' + (cycleF === k ? ' active' : '')}
                    onClick={() => setCycleF(k)}>{k}</button>
          ))}
        </div>
        <span className="label-mini">供 / 需</span>
        <div className="group">
          {['全部', '供给侧', '需求侧'].map(k => (
            <button key={k} className={'btn-ghost' + (sideF === k ? ' active' : '')}
                    onClick={() => setSideF(k)}>{k}</button>
          ))}
        </div>
        <span className="label-mini">证 据</span>
        <div className="group">
          {[['全部','全部'],['🟢','🟢 强'],['🟡','🟡 反推'],['🔴','🔴 稀薄']].map(([v,lbl]) => (
            <button key={v} className={'btn-ghost' + (evF === v ? ' active' : '')}
                    onClick={() => setEvF(v)}>{lbl}</button>
          ))}
        </div>
        <span style={{flex:1}}/>
        <span className="pill jade">供给侧</span>
        <span className="pill cinnabar">需求侧</span>
        <span className="pill">{filtered.length} / {cases.length} 案例</span>
      </div>

      {/* 人格行筛选 (12 原型) */}
      <div className="atom-toolbar" style={{marginTop:-6}}>
        <span className="label-mini">人 格</span>
        <div className="group">
          <button className={'btn-ghost' + (archF === '全部' ? ' active' : '')}
                  onClick={() => setArchF('全部')}>全部</button>
          {archs.map(a => (
            <button key={a.id} className={'btn-ghost' + (archF === a.name ? ' active' : '')}
                    onClick={() => setArchF(a.name)}>{a.glyph} {a.name}</button>
          ))}
        </div>
      </div>

      {/* ① 12 × 6 交叉矩阵 */}
      <div className="km-matrix-wrap">
        <div className="km-matrix" style={{gridTemplateColumns:`120px repeat(${cycleKeys.length}, 1fr)`}}>
          {/* 表头行 */}
          <div className="km-corner">人格＼周期</div>
          {cycleKeys.map(k => {
            const cy = cycles.find(c => c.key === k);
            return (
              <div key={k} className="km-head" title={cy ? (cy.era + ' · 当令: ' + cy.rulingPersona) : ''}>
                <div className="km-head-k">{k}</div>
                {cy && <div className="km-head-era">{cy.era}</div>}
              </div>
            );
          })}
          {/* 12 行 */}
          {archs.map(a => (
            <React.Fragment key={a.id}>
              <div className={'km-rowhead' + (archF === a.name ? ' on' : '')}
                   onClick={() => setArchF(archF === a.name ? '全部' : a.name)}>
                <span className="km-glyph">{a.glyph}</span>{a.name}
              </div>
              {cycleKeys.map(k => {
                const cell = cases.filter(c => c.arch === a.name && c.cycle === k);
                return (
                  <div key={k} className="km-cell">
                    {cell.length === 0 ? <span className="km-empty">—</span> : cell.map(c => (
                      <span key={c.id}
                            className={'km-chip ' + (c.side === 'supply' ? 'supply' : 'demand')
                                       + (filteredIds.has(c.id) ? '' : ' dim')
                                       + (selected === c.id ? ' sel' : '')}
                            title={c.who + ' · ' + c.oneLine}
                            onClick={() => setSelected(selected === c.id ? null : c.id)}>
                        {tail(c.id)}
                      </span>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 矩阵选中 → 详情面板 */}
      {selCase && (
        <div className="km-selpanel">
          <div className="km-selhead">
            <span className={'km-evbadge ' + evClass(selCase.evidence)}>{selCase.evidence}</span>
            <span className="km-selid">{selCase.id}</span>
            <span className="km-selwho">{selCase.who}</span>
            <span className={'pill ' + (selCase.side === 'supply' ? 'jade' : 'cinnabar')}>
              {selCase.side === 'supply' ? '供给侧' : '需求侧'} · {selCase.arch}
              {selCase.archSub ? ' / ' + selCase.archSub : ''}
            </span>
            <span style={{flex:1}}/>
            <span className="km-cyc">{selCase.cycle} · {selCase.era}</span>
            <button className="drawer-close" style={{position:'static',width:28,height:28}}
                    onClick={() => setSelected(null)}>✕</button>
          </div>
          <div className="km-selone">{selCase.oneLine}</div>
          {renderDeep(selCase, false)}
        </div>
      )}

      {/* ② 案例卡墙 (受筛选驱动 · 翻面看深度) */}
      <div className="km-cardgrid">
        {filtered.map(c => (
          <div key={c.id}
               className={'atom-card km-card ' + (c.side === 'supply' ? 'km-supply' : 'km-demand')
                          + (flipped === c.id ? ' flipped' : '')}
               onClick={() => setFlipped(flipped === c.id ? null : c.id)}>
            <div className="face-front" style={{display:'flex',flexDirection:'column',flex:1}}>
              <div className="id-row">
                <span className="aid">{c.id}</span>
                <span className={'km-evbadge ' + evClass(c.evidence)}>{c.evidence}</span>
              </div>
              <div className="km-who">{c.who}</div>
              <div className="core">{c.oneLine}</div>
              <div style={{flex:1}}/>
              <div className="module">
                {c.cycle} · {c.era} · {c.arch}
                <span className={'km-sidetag ' + (c.side === 'supply' ? 'supply' : 'demand')}>
                  {c.side === 'supply' ? '供给' : '需求'}
                </span>
              </div>
            </div>
            <div className="face-back">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}}>
                <span className="aid">{c.id}</span>
                <span className="km-who" style={{fontSize:12}}>{c.who}</span>
              </div>
              {renderDeep(c, true)}
            </div>
          </div>
        ))}
      </div>

      {/* ③ 供给侧 ↔ 需求侧 相位模型 (Sheet 7) */}
      <div className="km-phase">
        <button className="km-phase-toggle" onClick={() => setShowPhase(!showPhase)}>
          <span className="disp-en">PHASE MODEL · 供给侧 ↔ 需求侧 相位模型</span>
          <span className="km-caret">{showPhase ? '▾' : '▸'}</span>
        </button>
        {showPhase && (
          <div className="km-phase-body">
            {phase.proposition && (
              <div className="km-prop">
                <div className="drawer-section-h"><span className="title">核 心 命 题</span></div>
                <div className="km-prop-t">{phase.proposition}</div>
              </div>
            )}
            <div className="drawer-section-h" style={{marginTop:18}}>
              <span className="title">四 个 理 论 升 级 点</span>
            </div>
            <div className="pillar-grid">
              {(phase.upgrades || []).map((u, i) => (
                <div className="pillar" key={i}>
                  <h6>{(u.title || '').replace(/\n/g, ' · ')}</h6>
                  <div className="desc">{u.body}</div>
                  {u.case && <div className="test">{u.case}</div>}
                </div>
              ))}
            </div>
            {phase.meaning && (
              <div className="km-prop" style={{marginTop:18}}>
                <div className="drawer-section-h"><span className="title">对『财富 = 借势 × 合力』的意义</span></div>
                <div className="km-prop-t">{phase.meaning}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

window.CaseMatrix = CaseMatrix;
