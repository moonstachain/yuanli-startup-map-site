// 学员案例切片 · CasesRail (data 里带 hide:true 的学员先隐去, 计数动态)
function CasesRail() {
  const students = (window.STUDENTS || []).filter(s => !s.hide);
  const sList = students.filter(s => s.sabc === 'S');
  const sCount = sList.length;
  const aCount = students.length - sCount;

  return (
    <div>
      <div style={{display:'flex',alignItems:'baseline',gap:18,marginBottom:18,flexWrap:'wrap'}}>
        <span className="pill jade">S 级 · {sCount} 个{sList.length ? '（' + sList.map(s => s.name).join('·') + '）' : ''}</span>
        <span className="pill">A 级 · {aCount} 个</span>
        <span className="pill cinnabar">第四关是普遍短板</span>
        <span style={{flex:1}}/>
        <span style={{fontFamily:'var(--serif-cn)',fontSize:11,color:'var(--cream-dim)',letterSpacing:'0.18em'}}>
          ← 左右滑动 · 看四关全切片
        </span>
      </div>

      <div className="cases-rail">
        {students.map(s => (
          <div key={s.id} className="case-card">
            <span className="corner-flourish tl" />
            <span className="corner-flourish tr" />
            <span className="corner-flourish bl" />
            <span className="corner-flourish br" />

            <div className="head">
              <div>
                <div className="name">{s.name}</div>
                <div className="biz">{s.biz}</div>
              </div>
              <span className="sabc-tag">{s.sabc}</span>
            </div>

            <div className="arch">人格 · {s.archetype}</div>

            <div className="four-gates">
              <div className="gate-slice">
                <span className="lbl">壹 · 觉醒 · 三圈</span>
                {s.threeCircle}
              </div>
              <div className="gate-slice">
                <span className="lbl">貳 · 独创 · 三角</span>
                {s.triangle}
              </div>
              <div className="gate-slice">
                <span className="lbl">叁 · 升维 · 三链</span>
                前 · {s.front}<br/>
                后 · {s.back}<br/>
                财 · {s.money}
              </div>
              <div className="gate-slice">
                <span className="lbl">肆 · 锁定 · 四维</span>
                {s.moat}
              </div>
            </div>

            <div className="kpi">
              <strong style={{color:'var(--gold-bright)',letterSpacing:'0.12em'}}>KPI · </strong>{s.kpi}
            </div>

            <div style={{fontFamily:'var(--mono)',fontSize:10,color:'var(--gold-deep)',letterSpacing:'0.15em',lineHeight:1.6,paddingTop:6,borderTop:'1px dashed rgba(176,141,87,.18)'}}>
              <div style={{marginBottom:3}}>ATOMS · {s.atoms}</div>
              <div style={{color:'var(--gold)'}}>NEXT · {s.next}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.CasesRail = CasesRail;
