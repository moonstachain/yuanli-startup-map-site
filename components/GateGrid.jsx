// 关下 4 卡片 + Drawer（深读抽屉）
const { useEffect } = React;

function GateGrid({ onGateClick }) {
  const gates = window.GATES;
  const triLabels = ['三圈交集', '三角定位', '三链贯通', '四维护城'];
  const tris = [
    ['非对称', '非理性', '非线性'],
    ['甜用户', '贵任务', '入脑'],
    ['前链路', '后链路', '财链路'],
    ['虚', '实', '入', '出']
  ];
  return (
    <div className="gate-grid">
      {gates.map((g, i) => (
        <div key={g.id} className="gate-card" onClick={() => onGateClick(g)}>
          <div className="index disp-en">GATE {String(i+1).padStart(2,'0')}</div>
          <div className="label">{g.label}</div>
          <div className="name">{g.name}</div>
          <div className="en">{g.en}</div>
          <div className="triangle">
            <span className="l">{triLabels[i]}</span> · {tris[i].join(' × ')}
          </div>
          <div className="duration mono">通关时长 · {g.duration}</div>
        </div>
      ))}
    </div>
  );
}

function Drawer({ gate, open, onClose, progress, onToggleCheck }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!gate) return null;

  return (
    <React.Fragment>
      <div className={'drawer-backdrop ' + (open ? 'open' : '')} onClick={onClose} />
      <aside className={'drawer ' + (open ? 'open' : '')} role="dialog" aria-hidden={!open}>
        <button className="drawer-close" onClick={onClose} aria-label="关闭">×</button>
        <div className="drawer-inner">

          {/* 头部：印 + 关名 */}
          <div className="drawer-h">
            <div className="drawer-label">{gate.label}</div>
            <div className="meta">
              <div className="gate-en">GATE {gate.en}</div>
              <div className="gate-cn">{gate.name}</div>
              <div className="gate-sub">{gate.subtitle} · {gate.metaphor}</div>
            </div>
          </div>

          {/* 度量工具 + 通关时长 */}
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:14}}>
            <span className="pill">度量 · {gate.metric}</span>
            <span className="pill">通关 · {gate.duration}</span>
            <span className="pill cinnabar">产物 · {gate.output}</span>
          </div>

          {/* 核心命题 */}
          <div className="drawer-claim">{gate.claim}</div>

          {/* 第一性问题 */}
          <div className="drawer-section-h">
            <span className="num">§ 01</span>
            <span className="title">第一性问题</span>
          </div>
          <div className="drawer-q">"{gate.question}"</div>

          {/* 核心结构（三圈 / 三角 / 三链 / 四维） */}
          <div className="drawer-section-h">
            <span className="num">§ 02</span>
            <span className="title">核心结构</span>
          </div>
          <div className="pillar-grid">
            {gate.pillars.map((p, i) => (
              <div key={i} className="pillar">
                <h6>{p.name} <span className="en">{p.en}</span></h6>
                <div className="desc">{p.desc}</div>
                <div className="test">{p.test}</div>
              </div>
            ))}
          </div>

          {/* 通关检查 */}
          <div className="drawer-section-h">
            <span className="num">§ 03</span>
            <span className="title">通关检查 · 5 项</span>
          </div>
          <ul className="ch-list">
            {gate.checklist.map(c => (
              <li key={c.id} className={progress[c.id] ? 'done' : ''} onClick={() => onToggleCheck(c.id)}>
                <span className="b">{progress[c.id] ? '✓' : ''}</span>
                <span>{c.text}</span>
              </li>
            ))}
          </ul>

          {/* 章节列表 */}
          <div className="drawer-section-h">
            <span className="num">§ 04</span>
            <span className="title">章节索引</span>
          </div>
          <div className="chapter-list">
            {gate.chapters.map((ch, i) => {
              const [n, ...rest] = ch.split(' ');
              return (
                <div className="ch" key={i}>
                  <span className="n">{n}</span>
                  <span>{rest.join(' ')}</span>
                </div>
              );
            })}
          </div>

          {/* 失败模式 */}
          <div className="drawer-section-h">
            <span className="num">§ 05</span>
            <span className="title">失败模式</span>
          </div>
          <div style={{fontFamily:'var(--serif-cn)',fontSize:13,color:'var(--cinnabar)',lineHeight:1.8,letterSpacing:'0.05em'}}>
            ✗ {gate.fail}
          </div>

          {/* 真言 */}
          <div className="truth">"{gate.truth}"</div>

        </div>
      </aside>
    </React.Fragment>
  );
}

window.GateGrid = GateGrid;
window.Drawer = Drawer;
