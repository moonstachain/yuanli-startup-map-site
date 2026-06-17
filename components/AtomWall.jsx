// 58 商业模式原子卡墙 · AtomWall（K1-K6 演化时间线 + 筛选 + 翻面）
const { useState: useStateW, useMemo: useMemoW } = React;

function AtomWall() {
  const atoms = window.ATOMS;
  const [chain, setChain] = useStateW('全部');
  const [k6Filter, setK6Filter] = useStateW('全部');
  const [query, setQuery] = useStateW('');
  const [flipped, setFlipped] = useStateW(null);

  const chains = ['全部', '前链路', '后链路', '财链路'];
  const k6Buckets = ['全部', 'K6 主战场 ★5', 'K6 强化 ★4', 'K6 中性 ★3', 'K6 衰退 ≤★2'];

  const filtered = useMemoW(() => {
    return atoms.filter(a => {
      if (chain !== '全部' && a.chain !== chain) return false;
      if (k6Filter === 'K6 主战场 ★5' && a.k6 !== 5) return false;
      if (k6Filter === 'K6 强化 ★4' && a.k6 !== 4) return false;
      if (k6Filter === 'K6 中性 ★3' && a.k6 !== 3) return false;
      if (k6Filter === 'K6 衰退 ≤★2' && a.k6 > 2) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!(a.name.includes(query) || a.id.toLowerCase().includes(q) || a.core.includes(query) || a.cases.includes(query))) return false;
      }
      return true;
    });
  }, [chain, k6Filter, query]);

  const renderStars = (n) => {
    return (
      <span>
        {[1,2,3,4,5].map(i => (
          <span key={i} className={'dot' + (i > n ? ' off' : '')}/>
        ))}
        <span style={{marginLeft:4,color:'var(--gold)'}}>{n}/5</span>
      </span>
    );
  };

  return (
    <div>
      <div className="atom-toolbar">
        <span className="label-mini">链 路</span>
        <div className="group">
          {chains.map(c => (
            <button key={c}
              className={'btn-ghost' + (chain === c ? ' active' : '')}
              onClick={() => setChain(c)}>{c}</button>
          ))}
        </div>
        <span className="label-mini">K6 热度</span>
        <div className="group">
          {k6Buckets.map(c => (
            <button key={c}
              className={'btn-ghost' + (k6Filter === c ? ' active' : '')}
              onClick={() => setK6Filter(c)}>{c}</button>
          ))}
        </div>
        <input type="search" placeholder="搜索 · 名称 / ID / 案例" value={query} onChange={e => setQuery(e.target.value)} />
        <span style={{flex:1}}/>
        <span className="pill">{filtered.length} / 58 原子</span>
      </div>

      <div className="atom-grid">
        {filtered.map(a => (
          <div key={a.id}
               className={'atom-card' + (a.star ? ' star' : '') + (flipped === a.id ? ' flipped' : '')}
               onClick={() => setFlipped(flipped === a.id ? null : a.id)}>

            <div className="face-front" style={{display:'flex',flexDirection:'column',flex:1}}>
              <div className="id-row">
                <span className="aid">{a.id}{a.star ? ' ★' : ''}</span>
                <span className="k6">K6 {renderStars(a.k6)}</span>
              </div>
              <div className="name">{a.name}</div>
              <div className="core">{a.core}</div>
              <div className="module">{a.module}</div>
            </div>

            <div className="face-back">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:8}}>
                <span className="aid">{a.id}</span>
                <span className="name" style={{fontSize:13}}>{a.name}</span>
              </div>
              <div className="row">
                <div className="l">案 例</div>
                <div>{a.cases}</div>
              </div>
              <div className="row">
                <div className="l">何 时 用</div>
                <div>{a.when}</div>
              </div>
              <div className="row">
                <div className="l">失 败 模 式</div>
                <div style={{color:'#c89a8e'}}>{a.fail}</div>
              </div>
              <div className="row" style={{borderBottom:'none'}}>
                <div className="l">康 波 演 化 · K1 → K6</div>
                <div className="kt-list" style={{marginTop:6}}>
                  {[
                    ['K1', a.k1],['K2', a.k2],['K3', a.k3],['K4', a.k4],['K5', a.k5],['K6', a.k6]
                  ].map(([lbl, v]) => (
                    <div className="kt-row" key={lbl}>
                      <span className="lbl">{lbl}</span>
                      <span className="bar"><span className="fill" style={{width:(v*20)+'%'}}/></span>
                      <span className="v">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.AtomWall = AtomWall;
