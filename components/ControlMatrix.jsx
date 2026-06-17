// 16 控点 4×4 矩阵 + 选中详情面板
const { useState: useStateM } = React;

function ControlMatrix() {
  const controls = window.CONTROLS;
  const [selected, setSelected] = useStateM('P09'); // 默认选学习成本

  const dims = [
    { dim: '虚', name: '心智壁垒', verdict: '进 · 不 · 来', en: 'VIRTUAL', roman: 'I' },
    { dim: '实', name: '物理壁垒', verdict: '追 · 不 · 上', en: 'SOLID',   roman: 'II' },
    { dim: '入', name: '锁定壁垒', verdict: '拿 · 不 · 走', en: 'IN',      roman: 'III' },
    { dim: '出', name: '网络壁垒', verdict: '离 · 不 · 开', en: 'OUT',     roman: 'IV' }
  ];

  const sel = controls.find(c => c.id === selected);

  return (
    <div>
      <div className="cm-grid">
        {dims.map(d => (
          <div key={d.dim} className="cm-col">
            <h4>{d.dim}</h4>
            <div className="colsub">{d.en} <span className="roman">·{d.roman}·</span></div>
            <div className="verdict">{d.verdict}</div>
            {controls.filter(c => c.dim === d.dim).map(c => (
              <div key={c.id}
                   className={'cm-cell' + (selected === c.id ? ' selected' : '') + (c.k6Only ? ' k6-only' : '')}
                   onClick={() => setSelected(c.id)}>
                <div className="row1">
                  <span className="pid">{c.id}</span>
                  <span className="nm">{c.name}</span>
                </div>
                <div className="core">{c.core}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {sel && (
        <div className="cm-detail" style={{marginTop:22}}>
          <h5>
            <span className="mono" style={{color:'var(--gold-deep)',fontSize:11,letterSpacing:'0.2em',marginRight:14}}>
              {sel.id}
            </span>
            {sel.name} · <span className="serif-en" style={{fontStyle:'italic',color:'var(--gold)',fontSize:14}}>{sel.dimDesc}</span>
          </h5>
          <div style={{fontFamily:'var(--serif-cn)',fontSize:13,color:'var(--cream)',lineHeight:1.8,marginBottom:14,letterSpacing:'0.04em'}}>
            <strong style={{color:'var(--gold-bright)'}}>核心</strong> · {sel.core}
          </div>
          <div className="anchor-row h">
            <span className="anch">高 分</span>
            <span className="val">{sel.high}</span>
          </div>
          <div className="anchor-row m">
            <span className="anch">中 分</span>
            <span className="val">{sel.mid}</span>
          </div>
          <div className="anchor-row l">
            <span className="anch">低 分</span>
            <span className="val">{sel.low}</span>
          </div>
          <div className="cases-row">
            <span className="l mono">CASES</span> {sel.cases}
          </div>
        </div>
      )}

      <div style={{marginTop:24,padding:'18px 22px',border:'1px solid var(--gold-deep)',background:'rgba(13,32,24,.55)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:16,marginBottom:10}}>
          <span className="disp-en" style={{fontSize:11,color:'var(--gold-deep)'}}>§ 30 法则 · 段永平 / 巴菲特</span>
          <span style={{fontFamily:'var(--serif-cn)',fontSize:15,color:'var(--gold-bright)',letterSpacing:'0.15em'}}>未来十年赚的钱 &gt; 过去十年</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
          <div style={{padding:12,background:'rgba(20,48,31,.5)',border:'1px solid rgba(176,141,87,.2)'}}>
            <div className="disp-en" style={{fontSize:10,color:'var(--gold-deep)',marginBottom:4}}>优 秀 公 司</div>
            <div style={{fontFamily:'var(--serif-cn)',fontSize:12,color:'var(--cream)',lineHeight:1.7}}>
              第二个十年累计 ≥ 第一个十年<br/>
              <span style={{color:'var(--gold)'}}>"我能投，但不建仓"</span>
            </div>
          </div>
          <div style={{padding:12,background:'rgba(46,95,59,.5)',border:'1px solid var(--gold)'}}>
            <div className="disp-en" style={{fontSize:10,color:'var(--gold)',marginBottom:4}}>伟 大 公 司</div>
            <div style={{fontFamily:'var(--serif-cn)',fontSize:12,color:'var(--cream)',lineHeight:1.7}}>
              第二个十年 ≥ 3 倍第一个十年<br/>
              <span style={{color:'var(--gold-bright)'}}>"我重仓 + 传给子孙"</span>
            </div>
          </div>
          <div style={{padding:12,background:'rgba(122,38,31,.18)',border:'1px solid rgba(168,54,44,.4)'}}>
            <div className="disp-en" style={{fontSize:10,color:'var(--cinnabar)',marginBottom:4}}>10 / 10 法则</div>
            <div style={{fontFamily:'var(--serif-cn)',fontSize:12,color:'var(--cream)',lineHeight:1.7}}>
              16 控点 ≥ 8 高分 · 持续投资 6+ 个月 · 流失率 &lt; 5%<br/>
              <span style={{color:'#c89a8e'}}>"段永平、巴菲特法眼"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ControlMatrix = ControlMatrix;
