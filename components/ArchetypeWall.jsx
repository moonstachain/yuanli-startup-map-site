// 12 原型卡墙 · Archetype Wall（点击翻面看深度）
const { useState: useStateA } = React;

function ArchetypeWall() {
  const archs = window.ARCHETYPES;
  const [flipped, setFlipped] = useStateA(null);
  const [quadFilter, setQuadFilter] = useStateA('全部');

  const quadrants = ['全部', '内在秩序', '自我实现', '他人认同', '认知自我'];
  const shown = quadFilter === '全部' ? archs : archs.filter(a => a.quadrant === quadFilter);

  return (
    <div>
      <div className="atom-toolbar">
        <span className="label-mini">四 象 限</span>
        {quadrants.map(q => (
          <button key={q}
            className={'btn-ghost' + (quadFilter === q ? ' active' : '')}
            onClick={() => setQuadFilter(q)}>
            {q}
          </button>
        ))}
        <span style={{flex:1}}/>
        <span className="pill jade">点击卡片 · 翻面看深度</span>
      </div>

      <div className="arch-grid">
        {shown.map(a => (
          <div key={a.id}
               className={'arch-card' + (flipped === a.id ? ' flipped' : '')}
               onClick={() => setFlipped(flipped === a.id ? null : a.id)}>
            {flipped !== a.id ? (
              <React.Fragment>
                <div className="quadrant">{a.quadrant}</div>
                <div className="glyph">{a.glyph}</div>
                <div className="name">{a.name}</div>
                <div className="en">{a.en}</div>
                <div className="drive">{a.drive}</div>
                <div className="quote-snip">"{a.motto}"</div>
                <div className="flip-hint">FLIP →</div>
              </React.Fragment>
            ) : (
              <div style={{height:'100%',display:'flex',flexDirection:'column',gap:8}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                  <div>
                    <div className="name">{a.name} <span className="glyph" style={{fontSize:14}}>{a.glyph}</span></div>
                    <div className="en">{a.en}</div>
                  </div>
                  <span className="seal-mark">阴影</span>
                </div>

                <div style={{fontFamily:'var(--serif-cn)',fontSize:11,lineHeight:1.65,marginTop:4}}>
                  <div style={{color:'var(--gold-deep)',letterSpacing:'0.18em',fontSize:9,marginBottom:2}}>阴 影</div>
                  <div style={{color:'#c89a8e'}}>{a.shadow}</div>
                </div>

                <div style={{fontFamily:'var(--serif-cn)',fontSize:11,lineHeight:1.65}}>
                  <div style={{color:'var(--gold-deep)',letterSpacing:'0.18em',fontSize:9,marginBottom:2}}>转 化 路 径</div>
                  <div style={{color:'var(--gold-light)'}}>{a.transform}</div>
                </div>

                <div style={{fontFamily:'var(--serif-cn)',fontSize:11,lineHeight:1.65}}>
                  <div style={{color:'var(--gold-deep)',letterSpacing:'0.18em',fontSize:9,marginBottom:2}}>商 业 适 配</div>
                  <div style={{color:'var(--cream-dim)'}}>{a.business}</div>
                </div>

                <div style={{fontFamily:'var(--serif-cn)',fontSize:11,lineHeight:1.65}}>
                  <div style={{color:'var(--gold-deep)',letterSpacing:'0.18em',fontSize:9,marginBottom:2}}>AI 协 同</div>
                  <div style={{color:'var(--cream-dim)'}}>{a.aiTip}</div>
                </div>

                <div className="flip-hint" style={{position:'static',marginTop:'auto'}}>← BACK</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

window.ArchetypeWall = ArchetypeWall;
