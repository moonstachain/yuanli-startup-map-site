// 主应用 · App
const { useState: useStateApp, useEffect: useEffectApp, useCallback } = React;

const STORAGE_KEY = 'yuanli_tongguan_progress_v1';
const VIEW_KEY = 'yuanli_tongguan_view_v1';

function App() {
  const [progress, setProgress] = useStateApp(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });
  const [activeGate, setActiveGate] = useStateApp(null);
  const [drawerOpen, setDrawerOpen] = useStateApp(false);
  const [activeTab, setActiveTab] = useStateApp(() => {
    try { return localStorage.getItem(VIEW_KEY) || 'archetype'; } catch { return 'archetype'; }
  });

  useEffectApp(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
  }, [progress]);

  useEffectApp(() => {
    try { localStorage.setItem(VIEW_KEY, activeTab); } catch {}
  }, [activeTab]);

  const toggleCheck = useCallback((id) => {
    setProgress(p => ({ ...p, [id]: !p[id] }));
  }, []);

  const openGate = (g) => {
    setActiveGate(g);
    setDrawerOpen(true);
  };
  const closeDrawer = () => setDrawerOpen(false);

  // 计算 SABC 段位 + 总分
  const gates = window.GATES;
  const gateScores = gates.map(g => {
    const done = g.checklist.filter(c => progress[c.id]).length;
    return done / g.checklist.length * 100;
  });
  const totalScore = Math.round(gateScores.reduce((s, x) => s + x, 0) / 4);
  let sabc = 'C';
  if (totalScore >= 85) sabc = 'S';
  else if (totalScore >= 70) sabc = 'A';
  else if (totalScore >= 55) sabc = 'B';
  const allChecked = Object.values(progress).filter(Boolean).length;

  const tabs = [
    { id: 'archetype', num: '§ 01', name: '12 原型 · 卡墙', sub: 'TWELVE ARCHETYPES', vol: '卷二' },
    { id: 'atom',      num: '§ 02', name: '58 原子 · 卡墙', sub: 'BUSINESS DNA',      vol: '卷四' },
    { id: 'matrix',    num: '§ 03', name: '16 控点 · 矩阵', sub: 'FOUR-DIM MOAT',     vol: '卷五' },
    { id: 'kangbo',    num: '§ 04', name: '康波 × 人格 · 案例', sub: 'KONDRATIEV × PERSONA', vol: '卷五' },
    { id: 'cases',     num: '§ 05', name: '8 学员 · 切片',  sub: 'CASE LIBRARY',      vol: '卷六' },
    { id: 'check',     num: '§ 06', name: '通关 · 检查',    sub: 'PASSAGE CHECKLIST', vol: '诊断' },
    { id: 'coach',     num: '§ 07', name: 'AI · 教练',      sub: 'YUANLI COACH',      vol: '加速器' },
    { id: 'toolkit',   num: '§ 08', name: '100 · 通关锦囊', sub: 'PASSAGE TOOLKIT',   vol: '加速器' }
  ];

  const activeTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <div className="app-shell">
      {/* TOP BAR */}
      <div className="topbar">
        <div className="brandmark">
          <span className="seal-mark seal">原 力 · 出 品</span>
          <span className="name">绿 皮 书 · 借 势 合 力 通 关 地 图</span>
        </div>
        <div className="formula-bar">
          <span className="cn">财富</span>
          <span style={{color:'var(--gold-deep)',margin:'0 14px'}}>＝</span>
          <span className="cn">借势</span>
          <span className="x">×</span>
          <span className="cn">合力</span>
        </div>
        <div className="meta-strip">
          <span>V 1 · 0 · 0</span>
          <span>·</span>
          <span>本期段位 <span className="pulse">{sabc} · {totalScore}</span></span>
          <span>·</span>
          <span>通关 <span className="pulse">{allChecked} / 20</span></span>
        </div>
      </div>

      {/* HERO MAP */}
      <window.MapView onGateClick={openGate} progress={progress} />

      {/* 关下小卡 */}
      <window.GateGrid onGateClick={openGate} />

      {/* TAB NAVIGATION */}
      <div className="tab-nav">
        {tabs.map(t => (
          <button key={t.id}
                  className={'btn-ghost' + (activeTab === t.id ? ' active' : '')}
                  onClick={() => setActiveTab(t.id)}>
            <span className="tab-num">{t.num}</span>
            {t.name}
          </button>
        ))}
      </div>

      {/* 当前段 SECTION */}
      <div className="section">
        <div className="section-head">
          <span className="section-num">{activeTabInfo.num}</span>
          <span className="section-title">
            {activeTabInfo.name}
            <span className="en">· {activeTabInfo.sub}</span>
          </span>
          <span className="section-meta">
            <div className="big">{activeTabInfo.vol}</div>
            <div>绿皮书 GREEN BOOK</div>
          </span>
        </div>

        {activeTab === 'archetype' && <window.ArchetypeWall />}
        {activeTab === 'atom'      && <window.AtomWall />}
        {activeTab === 'matrix'    && <window.ControlMatrix />}
        {activeTab === 'kangbo'    && <window.CaseMatrix />}
        {activeTab === 'cases'     && <window.CasesRail />}
        {activeTab === 'check'     && <window.Checklist progress={progress} onToggleCheck={toggleCheck} />}
        {activeTab === 'coach'     && <window.Coach />}
        {activeTab === 'toolkit'   && <window.Toolkit />}
      </div>

      {/* MANIFEST 收尾 */}
      <div className="manifest">
        <div className="vow">
          觉 醒 <span className="or">→</span>
          独 创 <span className="or">→</span>
          升 维 <span className="or">→</span>
          锁 定
        </div>
        <div style={{fontFamily:'var(--serif-cn)',fontSize:13,color:'var(--cream-dim)',letterSpacing:'0.18em',lineHeight:1.8,fontStyle:'italic',marginBottom:14}}>
          左手现金流 · 右手资产雪球<br/>
          四 关 通 完 叫 出 师
        </div>
        <div className="endf">
          FINIS<span className="x">◆</span>WEALTH = TREND × FORCE<span className="x">◆</span>FINIS
        </div>
      </div>

      {/* DRAWER */}
      <window.Drawer
        gate={activeGate}
        open={drawerOpen}
        onClose={closeDrawer}
        progress={progress}
        onToggleCheck={toggleCheck}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
