// AI 教练 · window.claude.complete (Claude API in prototypes)
const { useState: useStateC, useRef: useRefC, useEffect: useEffectC } = React;

function Coach() {
  const [activeGate, setActiveGate] = useStateC('g1');
  const [input, setInput] = useStateC('');
  const [output, setOutput] = useStateC('');
  const [loading, setLoading] = useStateC(false);
  const outRef = useRefC(null);

  useEffectC(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [output]);

  const gateInfo = {
    g1: {
      name: '12 人格 · 原力觉醒',
      sys: '你是"原力觉醒"AI 教练，基于"借势合力·原力创业·通关地图"绿皮书 v1.0 卷二。核心概念：三圈交集（非对称优势 ∩ 非理性痴迷 ∩ 非线性回报）+ 12 原型人格（英雄/反叛者/魔法师/统治者/关怀者/创造者/情人/小丑/普通人/天真者/智者/探索者）+ 3-2-1 阴影练习 + 天才区/卓越区。你要做的：通过追问 3-5 个具体问题，帮用户识别主原型 Top 3、看见阴影、找到金色阴影、输出一句话天赋定位（≤30 字）。语气：克制、有洞察、不灌鸡汤。回答用中文，结构清晰但保持文人质感。',
      presets: [
        '我做事最持续的动力是什么？怎么判断我的主原型？',
        '我能力很强但总觉得做完很累，这是天才区还是卓越区？',
        '我反复怼伴侣后又后悔，这是什么阴影？怎么做 3-2-1？',
        '帮我输出一句话天赋定位（30 字内）',
        '我有 3 件事免费/倒贴做过——可能是我的非理性痴迷吗？'
      ]
    },
    g2: {
      name: '一句入脑 · 品类独创',
      sys: '你是"品类独创"AI 教练，基于绿皮书卷三。核心概念：16 字真言（无法分类/重新定义/自带预算/品类独创）+ 三角定位（甜用户×贵任务×入脑表达）+ 四大心理账户（功能/情绪/社交/投资）+ 麦肯锡 30 秒电梯法则（帮谁+解决什么+怎么做+不同点）+ 10 大套路。你的任务：帮用户验证品类是否"独创"、把贵任务从功能升到情绪/社交/投资账户、写出 ≤60 字 30 秒电梯演讲 + ≤5 字品类词。语气：直接、给数字、不空谈。回答用中文。',
      presets: [
        '我做的是 X，能不能验证是不是品类独创？',
        '帮我把贵任务从功能账户升到投资账户',
        '生成 3 版我的麦肯锡 30 秒电梯演讲',
        '我转化率只有 2%，问题可能出在哪一角？',
        '甜用户 4 维筛选——我的目标用户能打几分？'
      ]
    },
    g3: {
      name: '58 原子 · 模式升维',
      sys: '你是"模式升维"AI 教练，基于绿皮书卷四。核心概念：三链路（前链路 4 模块 + 后链路 3 模块 + 财链路 3 模块）+ 58 商业原子组件 + K1-K6 演化 + 9 张闭环验证测试卡（2 万 / 4 周 / 10 倍空间）+ ABCS 段位（想法级/叫好级/付费级/模型级）。你的任务：帮用户从 58 原子里选 6-10 个组合、识别 K6 衰退原子、设计具体测试卡（含假设/动作/成本/成功标准/失败行动）、自评 ABCS 段位。语气：工程化、量化、像段永平用 30 法则说话。回答用中文。',
      presets: [
        '我的业务用了哪些原子？K6 适配度如何？',
        '帮我设计 3 张闭环验证测试卡（前 1 后 1 财 1）',
        '我转化率 10%、毛利 30%，ABCS 在哪一段？',
        '游轮测试——我离开 60 天业务能正常运转吗？',
        '把我的财链路从"成本加成"升级到"价值定价"'
      ]
    },
    g4: {
      name: 'K6 适配 · 壁垒锁定',
      sys: '你是"壁垒锁定"AI 教练，基于绿皮书卷五。核心概念：四维护城（虚×实×入×出）+ 16 战略控制点（每维 4 个，每个有高/中/低分锚点）+ 30 法则（未来十年 > 过去十年）+ K1-K6 康波 + 病毒系数（≥1 自传播）+ K6 第 16 控点数据飞轮。你的任务：帮用户给 16 控点逐个打分、识别"竞品 6 个月追不上"的真壁垒、推演 30 法则、给出守富升级路径。语气：像段永平/巴菲特那样敬畏律法、看长期。回答用中文。',
      presets: [
        '我的 16 控点诊断——哪些是高分锚点？',
        '我有没有满足 30 法则？过去十年 vs 未来十年',
        '帮我识别一个"竞品 6 个月追不上"的真壁垒',
        '病毒系数 / K6 数据飞轮——我能怎么设计？',
        '善战者无赫赫战功——我该怎么"守"而不是"打"？'
      ]
    }
  };

  const info = gateInfo[activeGate];

  const ask = async (q) => {
    if (!q || !q.trim() || loading) return;
    const sys = info.sys;
    const userText = q.trim();
    setOutput(prev => prev +
      (prev ? '\n\n' : '') +
      `<<USER>>\n${userText}\n\n<<COACH>>\n`);
    setInput('');
    setLoading(true);
    try {
      const prompt = `${sys}\n\n用户提问：${userText}\n\n请给出克制、有洞察的回答（中文，350-600 字，结构清晰，可以用"·"分点）。`;
      const reply = await window.claude.complete(prompt);
      setOutput(prev => prev + reply);
    } catch (err) {
      setOutput(prev => prev + `\n[AI 教练暂时不可达：${err && err.message ? err.message : '未知错误'}]`);
    } finally {
      setLoading(false);
    }
  };

  // 渲染带 ROLE 标签的输出
  const renderOut = () => {
    if (!output) {
      return <div className="placeholder">在右下方输入问题，或点击左侧的"AI 教练问答模板"开始。<br/><br/>本教练已接入全站知识总览（12 人格 · 58 原子 · 16 控点 · 康波周期案例 · 学员切片 · 绿皮书六卷），并按你的问题路由到最相关的卷与案例做深答。<br/><br/>你的提问越具体，回答越有洞察。</div>;
    }
    const parts = output.split(/(<<USER>>|<<COACH>>)/g);
    const nodes = [];
    let role = null;
    parts.forEach((p, i) => {
      if (p === '<<USER>>') { role = 'user'; nodes.push(<span key={'l'+i} className="role-lbl">— 你 ——</span>); }
      else if (p === '<<COACH>>') { role = 'coach'; nodes.push(<span key={'l'+i} className="role-lbl">— AI 教练 ——</span>); }
      else if (p.trim()) {
        nodes.push(<div key={'p'+i} style={{color: role === 'user' ? 'var(--gold-light)' : 'var(--cream)'}}>{p}</div>);
      }
    });
    return nodes;
  };

  return (
    <div className="coach-shell">
      <div className="coach-aside">
        <h5>四 关 教 练</h5>
        <div style={{display:'grid',gap:6,marginBottom:18}}>
          {['g1','g2','g3','g4'].map(gid => {
            const g = window.GATES.find(x => x.id === gid);
            return (
              <button key={gid}
                className={'btn-ghost' + (activeGate === gid ? ' active' : '')}
                style={{justifyContent:'flex-start',gap:10,padding:'8px 12px',fontSize:12}}
                onClick={() => { setActiveGate(gid); setOutput(''); }}>
                <span style={{fontFamily:'var(--serif-cn)',fontSize:16,color:'var(--gold)'}}>{g.label}</span>
                <span>{g.name}</span>
              </button>
            );
          })}
        </div>

        <h5>提 问 模 板</h5>
        {info.presets.map((p, i) => (
          <button key={i} className="preset" onClick={() => ask(p)}>{p}</button>
        ))}
      </div>

      <div className="coach-main">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:14,paddingBottom:10,borderBottom:'1px solid var(--gold-deep)'}}>
          <div>
            <span className="disp-en" style={{fontSize:10,color:'var(--gold-deep)',letterSpacing:'0.35em'}}>AI COACH · {activeGate.toUpperCase()}</span>
            <div style={{fontFamily:'var(--serif-cn)',fontSize:17,color:'var(--gold-bright)',letterSpacing:'0.15em',marginTop:2}}>
              {info.name}
            </div>
          </div>
          {loading && <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--cinnabar)',letterSpacing:'0.2em'}}>· 思 考 中 ·</span>}
        </div>

        <div className="coach-out" ref={outRef}>
          {renderOut()}
        </div>

        <div className="coach-input-row">
          <textarea
            className="coach-input"
            placeholder="向 AI 教练提问（Enter 发送 · Shift+Enter 换行）"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                ask(input);
              }
            }}
          />
          <button className="coach-send" onClick={() => ask(input)} disabled={loading || !input.trim()}>
            送 出
          </button>
        </div>
      </div>
    </div>
  );
}

window.Coach = Coach;
