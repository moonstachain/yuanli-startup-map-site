// 通关检查清单 · 4 关 × 5 项 + SABC 实时评分 + 进度持久化
function Checklist({ progress, onToggleCheck }) {
  const gates = window.GATES;

  // 计算 SABC 总分（每关 25 分，按完成比例）
  const gateScores = gates.map(g => {
    const total = g.checklist.length;
    const done = g.checklist.filter(c => progress[c.id]).length;
    return { id: g.id, done, total, score: Math.round(done / total * 100) };
  });
  const totalScore = Math.round(gateScores.reduce((s, x) => s + x.score, 0) / 4);
  let sabc = 'C';
  if (totalScore >= 85) sabc = 'S';
  else if (totalScore >= 70) sabc = 'A';
  else if (totalScore >= 55) sabc = 'B';
  const sabcMap = {
    'S': { name: '金牌 · 穿越周期', range: '85-100', desc: '四关全部通关 + 30 法则成立' },
    'A': { name: '银牌 · 模式跑通', range: '70-84',  desc: '前三关通关 · 第四关在构建' },
    'B': { name: '铜牌 · 在跑测试', range: '55-69',  desc: '前两关通关 · 第三关在跑九宫格' },
    'C': { name: '起步 · 求之不得', range: '0-54',   desc: '第一关在反复 · 求之不得期' }
  };

  const labels = ['壹', '貳', '叁', '肆'];

  return (
    <div>
      {/* SABC 仪表 */}
      <div className="sabc-bar">
        {['S','A','B','C'].map(lv => (
          <div key={lv} className={'sabc-cell' + (sabc === lv ? ' active' : '')}>
            <div className="lvl">{lv}</div>
            <div className="name">{sabcMap[lv].name}</div>
            <div className="range">{sabcMap[lv].range} 分 · {sabcMap[lv].desc}</div>
          </div>
        ))}
      </div>

      <div style={{padding:'18px 22px',border:'1px solid var(--gold)',background:'rgba(13,32,24,.7)',marginBottom:22}}>
        <div style={{display:'flex',alignItems:'baseline',gap:18,flexWrap:'wrap'}}>
          <div className="disp-en" style={{fontSize:11,letterSpacing:'0.35em',color:'var(--gold-deep)'}}>YOUR CURRENT SCORE</div>
          <div style={{fontFamily:'var(--display)',fontSize:42,fontWeight:600,color:'var(--gold-bright)',letterSpacing:'0.15em',lineHeight:1}}>
            {sabc}
            <span style={{fontSize:18,marginLeft:14,color:'var(--gold)'}}>{totalScore} <span style={{color:'var(--gold-deep)'}}>/ 100</span></span>
          </div>
          <span style={{flex:1}}/>
          {gateScores.map((s,i) => (
            <div key={s.id} style={{textAlign:'center'}}>
              <div className="mono" style={{fontSize:18,color:'var(--gold-bright)'}}>{s.done}<span style={{color:'var(--gold-deep)',fontSize:11}}>/{s.total}</span></div>
              <div style={{fontFamily:'var(--serif-cn)',fontSize:10,color:'var(--gold-deep)',letterSpacing:'0.2em'}}>{labels[i]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="check-grid">
        {gates.map((g, gi) => {
          const gs = gateScores[gi];
          return (
            <div key={g.id} className="check-col">
              <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:2}}>
                <span className="roman" style={{fontSize:24,background:'linear-gradient(180deg,var(--gold-bright),var(--gold-deep))',
                  WebkitBackgroundClip:'text',backgroundClip:'text',WebkitTextFillColor:'transparent',fontWeight:600}}>{g.label}</span>
                <h4>{g.name}</h4>
              </div>
              <div className="gate-label">GATE {g.en}</div>

              {g.checklist.map(c => (
                <div key={c.id}
                     className={'check-row' + (progress[c.id] ? ' done' : '')}
                     onClick={() => onToggleCheck(c.id)}>
                  <span className="box">{progress[c.id] ? '✓' : ''}</span>
                  <span className="text">{c.text}</span>
                </div>
              ))}

              <div className="check-progress">
                <span>{g.metric.split(' · ')[0]}</span>
                <span><span className="v">{gs.score}</span> / 100</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{marginTop:20,fontFamily:'var(--serif-cn)',fontSize:12,color:'var(--cream-dim)',letterSpacing:'0.08em',lineHeight:1.8,textAlign:'center',fontStyle:'italic'}}>
        所有勾选自动保存到本地。<br/>
        4 关 × 5 项 = 20 项全过 → 出师 → 触发下一阶段投资机会 + 原力人生融合。
      </div>
    </div>
  );
}

window.Checklist = Checklist;
