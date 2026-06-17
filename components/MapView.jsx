// 古卷地图 · 四关口 · MapView
const { useState } = React;

function MapView({ onGateClick, progress }) {
  const gates = window.GATES;

  // 计算每关的进度百分比
  const progressFor = (gate) => {
    const checked = gate.checklist.filter(c => progress[c.id]).length;
    return { checked, total: gate.checklist.length };
  };

  return (
    <div className="hero">
      <div className="hero-banner">
        <div className="vol disp-en">VOLUME · I — VI &nbsp;·&nbsp; GREEN BOOK V1.0</div>
        <div className="title">
          借势合力<span className="sep">·</span>原力创业<span className="sep">·</span>通关地图
        </div>
        <div className="sub">A Cartography for Founders at the K5 Winter × K6 Spring Convergence — 2025/2028</div>
      </div>

      <div className="map-stage">
        <span className="corner-flourish tl" />
        <span className="corner-flourish tr" />
        <span className="corner-flourish bl" />
        <span className="corner-flourish br" />

        {/* SVG 地图底层 — 山脉、海岸线、路径、装饰 */}
        <svg className="map-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9a961" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#d4b86a" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#c9a961" stopOpacity="0.15" />
            </linearGradient>
            <filter id="goldGlow">
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <pattern id="mtn" width="80" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40 L20 15 L35 30 L55 8 L80 40 Z"
                    fill="none" stroke="rgba(176,141,87,0.18)" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* 远山 · 山脉装饰 */}
          <g opacity="0.6">
            <path d="M0 480 Q 120 420 200 460 T 380 440 T 580 470 T 800 430 T 1000 450 L 1000 600 L 0 600 Z"
                  fill="rgba(13, 32, 24, 0.7)" />
            <path d="M0 510 Q 100 470 200 490 T 400 480 T 600 500 T 850 470 T 1000 490 L 1000 600 L 0 600 Z"
                  fill="rgba(10, 22, 18, 0.85)" />
          </g>

          {/* 山脉条纹 */}
          <g stroke="rgba(176, 141, 87, 0.16)" strokeWidth="0.6" fill="none">
            <path d="M 50 350 Q 80 320 110 340 L 110 360 Z" />
            <path d="M 130 360 Q 165 320 195 350 L 195 380 Z" />
            <path d="M 740 340 Q 770 310 800 335 L 800 365 Z" />
            <path d="M 820 360 Q 850 325 880 350 L 880 380 Z" />
          </g>

          {/* 路径 · 四关之间的盘山道 */}
          <path
            d="M 220 312 Q 320 230 420 216 T 600 336 T 800 204"
            fill="none"
            stroke="url(#path-grad)"
            strokeWidth="2.2"
            strokeDasharray="3 4"
            strokeLinecap="round"
          />

          {/* 装饰性虚线（旁支） */}
          <path d="M 320 280 Q 350 260 380 280" fill="none" stroke="rgba(176, 141, 87, 0.3)" strokeWidth="1" strokeDasharray="1 3" />
          <path d="M 620 320 Q 660 310 700 280" fill="none" stroke="rgba(176, 141, 87, 0.3)" strokeWidth="1" strokeDasharray="1 3" />

          {/* 海洋装饰（左下角） */}
          <g opacity="0.5">
            <path d="M 0 540 Q 30 535 60 540 T 120 540" fill="none" stroke="rgba(176, 141, 87, 0.3)" strokeWidth="0.6" />
            <path d="M 0 555 Q 30 550 60 555 T 120 555" fill="none" stroke="rgba(176, 141, 87, 0.3)" strokeWidth="0.6" />
          </g>

          {/* 千日窗口指示线（一道朱砂） */}
          <line x1="850" y1="80" x2="850" y2="540"
                stroke="rgba(168, 54, 44, 0.35)"
                strokeWidth="0.8" strokeDasharray="4 4" />
          <text x="855" y="80" fontFamily="Cinzel, serif" fontSize="9"
                fill="rgba(168, 54, 44, 0.8)" letterSpacing="3">2028</text>

          {/* 装饰罗经标点 */}
          <g transform="translate(916 510)" opacity="0.9">
            <circle r="36" fill="none" stroke="rgba(212,184,106,0.4)" strokeWidth="0.6" />
            <circle r="44" fill="none" stroke="rgba(212,184,106,0.2)" strokeWidth="0.4" />
            <g stroke="rgba(212,184,106,0.6)" strokeWidth="0.5">
              <line x1="0" y1="-40" x2="0" y2="40" />
              <line x1="-40" y1="0" x2="40" y2="0" />
              <line x1="-28" y1="-28" x2="28" y2="28" />
              <line x1="-28" y1="28" x2="28" y2="-28" />
            </g>
            <polygon points="0,-30 -3,0 0,30 3,0" fill="rgba(212,184,106,0.6)" />
            <polygon points="0,-30 0,0 3,0" fill="#d4b86a" />
            <text x="0" y="-46" fontFamily="Cinzel, serif" fontSize="8"
                  textAnchor="middle" fill="#c9a961" letterSpacing="2">N</text>
            <text x="0" y="56" fontFamily="Cinzel, serif" fontSize="8"
                  textAnchor="middle" fill="rgba(212,184,106,0.5)" letterSpacing="2">S</text>
          </g>

          {/* 地图中央的公式纹章（背景纹章） */}
          <g transform="translate(500 130)" opacity="0.35">
            <text textAnchor="middle" fontFamily="Cinzel, serif" fontSize="11"
                  fill="#c9a961" letterSpacing="6">WEALTH = TREND × FORCE</text>
            <line x1="-220" y1="14" x2="-30" y2="14" stroke="rgba(212,184,106,0.4)" strokeWidth="0.5" />
            <line x1="30" y1="14" x2="220" y2="14" stroke="rgba(212,184,106,0.4)" strokeWidth="0.5" />
            <text textAnchor="middle" fontFamily="Noto Serif SC, serif" fontSize="13"
                  fill="#d4b86a" letterSpacing="8" y="34">财富 ＝ 借势 × 合力</text>
          </g>

          {/* 装饰小印章 */}
          <g transform="translate(60 60)" opacity="0.7">
            <rect x="-1" y="-1" width="42" height="42" fill="none" stroke="rgba(168, 54, 44, 0.6)" strokeWidth="1" />
            <text x="20" y="16" textAnchor="middle" fontSize="11" fill="rgba(168, 54, 44, 0.9)"
                  fontFamily="Noto Serif SC, serif" letterSpacing="0">原</text>
            <text x="20" y="32" textAnchor="middle" fontSize="11" fill="rgba(168, 54, 44, 0.9)"
                  fontFamily="Noto Serif SC, serif" letterSpacing="0">力</text>
          </g>
        </svg>

        {/* 四关节点 · 城堡 */}
        {gates.map((g, idx) => {
          const p = progressFor(g);
          return (
            <div
              key={g.id}
              className="gate-node"
              style={{ left: g.coords.x + '%', top: g.coords.y + '%' }}
              onClick={() => onGateClick(g)}
            >
              <div className="gate-castle">
                {p.checked > 0 && (
                  <span className={"gate-progress " + (p.checked === p.total ? 'done' : '')}>
                    {p.checked}/{p.total}
                  </span>
                )}
                <span className="label">{g.label}</span>
              </div>
              <div className="gate-meta">
                <div className="en">GATE · {String(idx+1).padStart(2,'0')}</div>
                <div className="cn">{g.name}</div>
                <div className="sub">{g.subtitle}</div>
              </div>
            </div>
          );
        })}

        <div className="window-card">
          <div className="h">千 日 窗 口</div>
          <div className="v">
            K5 深冬 × K6 初春<br/>
            <span className="foil-bright">2025 / 2028</span><br/>
            <span style={{fontSize:'10px',color:'rgba(232,220,196,0.6)',letterSpacing:'0.15em'}}>
              错过即等下一个 50 年
            </span>
          </div>
        </div>

        <div className="wave-tag">
          <span className="k5">K5 · INFO</span>
          <span className="sep">×</span>
          <span className="k6">K6 · AI</span>
        </div>
      </div>
    </div>
  );
}

window.MapView = MapView;
