// 58 商业模式原子 (卷四·第27章)
// 字段：id / 链路 / 模块 / 名称 / 一句话 / K6评分 / 案例 / 何时用 / 失败模式
const ATOMS = [
  // 前链路 · 用户细分 CS (4)
  { id:'FL-CS-01', chain:'前链路', module:'CS · 用户细分', name:'大众市场', core:'面向广泛同质消费者，规模化覆盖', k6:2, k1:5,k2:5,k3:5,k4:5,k5:4, cases:'可口可乐 · 宝洁 · 微信', when:'刚需高频 + 技术门槛低 + 规模效应明显', fail:'AI 时代正在塌方，被精准细分挤压' },
  { id:'FL-CS-02', chain:'前链路', module:'CS · 用户细分', name:'利基市场', star:true, core:'针对特定垂直/小众人群，做"第一"而非"更好"', k6:4, k1:2,k2:2,k3:3,k4:3,k5:4, cases:'涛哥智能少年 · 水月随身寺庙 · 韬哥家族传承', when:'资源有限 + 需小而美突围 + 追求高客单', fail:'细分过小导致天花板低' },
  { id:'FL-CS-03', chain:'前链路', module:'CS · 用户细分', name:'多边平台', core:'同时服务两类或多类相互依赖的用户群', k6:3, k1:1,k2:2,k3:2,k4:3,k5:5, cases:'淘宝 · Airbnb · Uber', when:'两边都有强需求 + 数量级匹配', fail:'冷启动死亡螺旋 · 单边占优最终崩盘' },
  { id:'FL-CS-04', chain:'前链路', module:'CS · 用户细分', name:'多元化市场', core:'服务多个完全无关的客户细分', k6:2, k1:1,k2:2,k3:3,k4:4,k5:4, cases:'亚马逊 · 腾讯', when:'已有现金牛业务 + 资源充裕', fail:'主航道未清晰前盲目多元化' },

  // 前链路 · 价值主张 VP (11)
  { id:'FL-VP-05', chain:'前链路', module:'VP · 价值主张', name:'极致性价比', core:'低价是天下第一动力', k6:3, k1:4,k2:5,k3:5,k4:5,k5:5, cases:'优衣库 · 良久团购 · 范德比尔特船票', when:'经济下行周期 + 大众消费降级 + 供应链可深度优化', fail:'被巨头价格战秒杀' },
  { id:'FL-VP-06', chain:'前链路', module:'VP · 价值主张', name:'极致成本', core:'成本驱动定价', k6:3, k1:3,k2:4,k3:5,k4:5,k5:4, cases:'苹果妈妈 · 瑞幸 · 拼多多', when:'大宗品 / 标准品 / 规模化赛道', fail:'差异化缺失，被新技术降维打击' },
  { id:'FL-VP-07', chain:'前链路', module:'VP · 价值主张', name:'深度定制', core:'按客户独特需求端到端深度交付', k6:4, k1:2,k2:2,k3:3,k4:4,k5:4, cases:'华为 Total Solution · 麦肯锡咨询', when:'高客单 ToB / 高净值 ToC', fail:'无法标准化 → 规模化困难' },
  { id:'FL-VP-08', chain:'前链路', module:'VP · 价值主张', name:'深度美学', core:'卖审美 / 意义 / 文化（不是性能）', k6:4, k1:2,k2:2,k3:3,k4:4,k5:4, cases:'水月文创 · 爱马仕 · 日本工匠', when:'高净值 + 情绪/社交账户', fail:'美学过于小众 → 市场太薄' },
  { id:'FL-VP-09', chain:'前链路', module:'VP · 价值主张', name:'按效果付费', star:true, core:'你不成功我不收钱', k6:5, k1:3,k2:3,k3:4,k4:4,k5:4, cases:'三一重工 · 14岁少年 AI 猎头 · 华为按效果付费', when:'结果可量化 + 客户风险厌恶', fail:'中间环节服务全被绞杀' },
  { id:'FL-VP-10', chain:'前链路', module:'VP · 价值主张', name:'一键搞定', star:true, core:'把 15 步流程压缩为 1 步', k6:5, k1:1,k2:2,k3:3,k4:4,k5:5, cases:'涛哥智能少年 · iPhone · 14岁少年端到端 AI 猎头', when:'流程复杂 + 用户决策疲劳', fail:'做不到真"一键"反而劝退' },
  { id:'FL-VP-11', chain:'前链路', module:'VP · 价值主张', name:'风险兜底', core:'先用后买，不满意全额退', k6:4, k1:2,k2:3,k3:3,k4:4,k5:4, cases:'三一重工分润兜底 · Costco 无忧退货', when:'高决策成本 + 用户信任不足', fail:'羊毛党 · 逆向选择' },
  { id:'FL-VP-12', chain:'前链路', module:'VP · 价值主张', name:'身份地位', core:'产品本身是阶层信号，越贵越对', k6:4, k1:5,k2:5,k3:5,k4:5,k5:5, cases:'水月老师 · 茅台 · 爱马仕铂金包', when:'社交账户 + 高净值人群', fail:'装腔走调，反成笑柄' },
  { id:'FL-VP-13', chain:'前链路', module:'VP · 价值主张', name:'颠覆存在', star:true, core:'用户不知道自己想要什么（从 0 到 1）', k6:5, k1:5,k2:4,k3:5,k4:4,k5:5, cases:'乔布斯 iPhone · 特斯拉 · SpaceX', when:'100 年出一个的天才——普通人勿模仿', fail:'早死 / 被巨头收割' },
  { id:'FL-VP-14', chain:'前链路', module:'VP · 价值主张', name:'服务下沉', star:true, core:'高端产品降维到中产甚至基层', k6:5, k1:2,k2:3,k3:4,k4:5,k5:4, cases:'苹果妈妈良久 · 优衣库 · 小米', when:'高端技术降维 + 下沉市场购买力上升', fail:'品质崩塌 / 品牌被稀释' },
  { id:'FL-VP-15', chain:'前链路', module:'VP · 价值主张', name:'情绪疗愈', star:true, core:'解决用户情感/心灵痛苦（进入情绪/社交/投资账户）', k6:5, k1:1,k2:1,k3:2,k4:3,k5:3, cases:'花姐 · 达哥直播间疗愈 · 水月佛学疗愈', when:'经济下行 + 老龄化 + 孤独感时代', fail:'被定义为"功能账户"立刻塌方' },

  // 前链路 · 渠道结构 CH (5)
  { id:'FL-CH-16', chain:'前链路', module:'CH · 渠道结构', name:'自营直销', core:'DTC（Direct to Consumer）', k6:4, k1:3,k2:3,k3:3,k4:4,k5:5, cases:'苹果直营店 · Tesla 直销 · 良久私域直销', when:'品牌势能强 + 需掌握用户数据', fail:'流量获取成本高 + 扩张慢' },
  { id:'FL-CH-17', chain:'前链路', module:'CH · 渠道结构', name:'私域社群', star:true, core:'流量是别人的，用户是自己的', k6:5, k1:1,k2:1,k3:2,k4:3,k5:5, cases:'涛哥 · 苹果妈妈 · 复利合伙人', when:'高客单 / 高复购 / 强关系赛道', fail:'养号不变现 · 粉丝沉默' },
  { id:'FL-CH-18', chain:'前链路', module:'CH · 渠道结构', name:'直播电商', core:'所见即所买', k6:4, k1:0,k2:0,k3:0,k4:1,k5:5, cases:'达哥直播间疗愈 · 涛哥 199 课引流', when:'标品 / 快消 / 情绪驱动', fail:'主播翻车 · 平台流量绞杀' },
  { id:'FL-CH-19', chain:'前链路', module:'CH · 渠道结构', name:'内容引流', star:true, core:'内容即广告，广告即内容', k6:5, k1:1,k2:2,k3:3,k4:3,k5:5, cases:'涛哥康波内容 · 水月文化内容', when:'高客单 + 认知型产品', fail:'内容水化 · 用户不复购' },
  { id:'FL-CH-20', chain:'前链路', module:'CH · 渠道结构', name:'平台分发', core:'借势平台，省去拉新成本', k6:3, k1:0,k2:1,k3:2,k4:3,k5:5, cases:'良久私域分销 · 早期淘宝品牌', when:'快速起量 + 流量主在平台', fail:'被平台绑架，规则一变全垮' },

  // 前链路 · 客户关系 CR (6)
  { id:'FL-CR-21', chain:'前链路', module:'CR · 客户关系', name:'个人助理', core:'人对人的高接触服务', k6:4, k1:5,k2:5,k3:4,k4:4,k5:3, cases:'花姐为高层做体检 · 水月 VIP 通道 · 良久干部一对一陪跑', when:'高客单 + 复杂决策', fail:'人肉化 · 规模不动' },
  { id:'FL-CR-22', chain:'前链路', module:'CR · 客户关系', name:'自助服务', core:'工具好用，无需服务', k6:4, k1:1,k2:2,k3:2,k4:3,k5:5, cases:'飞书自助开通 · 小米手机售后 · Notion 模板', when:'标品 + 用户技术接受度高', fail:'复杂问题需人工补位' },
  { id:'FL-CR-23', chain:'前链路', module:'CR · 客户关系', name:'社群运营', core:'用户带用户，老带新', k6:4, k1:2,k2:2,k3:3,k4:3,k5:5, cases:'原力创业三年共修 · 涛哥智能少年家长群', when:'用户有强烈分享/认同欲望', fail:'社群冷场 · KOL 流失全垮' },
  { id:'FL-CR-24', chain:'前链路', module:'CR · 客户关系', name:'转介绍机制', star:true, core:'一传十、十传百', k6:5, k1:3,k2:3,k3:4,k4:4,k5:5, cases:'良久家庭+朋友推荐 · 智能少年家长口碑', when:'复购率高 + 用户满意度高', fail:'激励错位变传销' },
  { id:'FL-CR-25', chain:'前链路', module:'CR · 客户关系', name:'高净值私董', star:true, core:'5 个名额，过年截止', k6:4, k1:4,k2:4,k3:4,k4:4,k5:4, cases:'原力创业 168K 私董会 · 段永平投资圈', when:'超高客单 + 长期关系', fail:'老板精力被掏空 · 无法扩张' },
  { id:'FL-CR-26', chain:'前链路', module:'CR · 客户关系', name:'用户共创', star:true, core:'用户即股东', k6:5, k1:1,k2:1,k3:2,k4:3,k5:4, cases:'小米参与感 · B 站 UP 主生态', when:'产品深度依赖用户洞察', fail:'用户疲于贡献 · 激励缺位' },

  // 后链路 · 核心资源 KR (4)
  { id:'BL-KR-27', chain:'后链路', module:'KR · 核心资源', name:'创始人 IP', star:true, core:'人就是公司，公司就是人', k6:5, k1:3,k2:3,k3:3,k4:4,k5:5, cases:'涛哥 IP · 水月老师 IP · 达哥直播 IP · 李明 IP', when:'知识/咨询/疗愈/教育类', fail:'过度依赖创始人导致游轮测试失败' },
  { id:'BL-KR-28', chain:'后链路', module:'KR · 核心资源', name:'数据 / 算法', star:true, core:'数据沉淀越久越值钱', k6:5, k1:0,k2:1,k3:1,k4:2,k5:5, cases:'字节算法 · 苹果妈妈良久 200 干部 AI 大脑', when:'数据可累积 + 越多越值钱', fail:'数据隐私法律风险' },
  { id:'BL-KR-29', chain:'后链路', module:'KR · 核心资源', name:'牌照 / 特许', core:'我有牌照你没有，免谈', k6:3, k1:4,k2:5,k3:5,k4:4,k5:3, cases:'水月玉佛寺特许通道 · 爱琳市政府专家特许', when:'高合规门槛行业', fail:'政策变化牌照贬值' },
  { id:'BL-KR-30', chain:'后链路', module:'KR · 核心资源', name:'知识 / 方法论', star:true, core:'我有一套体系别人没有', k6:5, k1:2,k2:2,k3:3,k4:4,k5:4, cases:'原力借势合力体系 · 麦肯锡 30 秒 · 段永平 30 法则', when:'教育 / 咨询 / 培训类', fail:'被同行抄袭 · 低估难度' },

  // 后链路 · 关键业务 KA (3)
  { id:'BL-KA-31', chain:'后链路', module:'KA · 关键业务', name:'内容生产', star:true, core:'内容是最便宜的获客方式', k6:5, k1:1,k2:2,k3:3,k4:3,k5:5, cases:'原力复利系列短视频 · 涛哥康波内容', when:'知识 / 品牌型业务', fail:'内容水化 · 同质化' },
  { id:'BL-KA-32', chain:'后链路', module:'KA · 关键业务', name:'平台运营', core:'我搭舞台，你们唱戏', k6:4, k1:1,k2:2,k3:2,k4:3,k5:5, cases:'原力创业学员-导师匹配 · 智能少年家长-资源匹配', when:'双边 / 多边强需求', fail:'冷启动死亡螺旋' },
  { id:'BL-KA-33', chain:'后链路', module:'KA · 关键业务', name:'服务交付', star:true, core:'把约好的价值交出去', k6:5, k1:4,k2:4,k3:4,k4:4,k5:4, cases:'涛哥"去人肉化"交付 · 苹果妈妈 AI 大脑赋能 · 麦肯锡咨询', when:'所有服务型业务', fail:'人肉化无法规模化' },

  // 后链路 · 伙伴网络 KP (4)
  { id:'BL-KP-34', chain:'后链路', module:'KP · 伙伴网络', name:'战略联盟', core:'我有的你没有，反之亦然', k6:4, k1:2,k2:3,k3:4,k4:4,k5:4, cases:'涛哥与高校+海外学校 · 水月与寺庙', when:'补短板 + 扩资源', fail:'利益不对等 → 联盟瓦解' },
  { id:'BL-KP-35', chain:'后链路', module:'KP · 伙伴网络', name:'供应链协同', star:true, core:'零库存 / 精益生产', k6:5, k1:3,k2:4,k3:5,k4:5,k5:5, cases:'良久供应链直采 · 优衣库一体化', when:'实体商品 / 快消', fail:'信任 · 数据壁垒 → 协同失败' },
  { id:'BL-KP-36', chain:'后链路', module:'KP · 伙伴网络', name:'AI 工具栈', star:true, core:'我的合伙人是 AI', k6:5, k1:0,k2:0,k3:0,k4:1,k5:3, cases:'原力 AI 教练矩阵 · 苹果妈妈 AI 大脑 · 涛哥一句入脑 AI', when:'知识型 / 创意型业务', fail:'过度依赖 AI → 失去自主能力' },
  { id:'BL-KP-37', chain:'后链路', module:'KP · 伙伴网络', name:'渠道分销网络', core:'千军万马帮我卖', k6:4, k1:3,k2:4,k3:4,k4:5,k5:4, cases:'良久团购分销（苹果妈妈 1 亿流水）· 老学员转介绍', when:'快速规模化覆盖', fail:'渠道乱价 · 品牌失控' },

  // 财链路 · 收入来源 RS (8)
  { id:'VL-RS-38', chain:'财链路', module:'RS · 收入来源', name:'一次性交易', core:'一锤子买卖', k6:2, k1:5,k2:5,k3:5,k4:4,k5:3, cases:'传统课程一次性收费 · 单次咨询', when:'低频 / 耐用品 / 工具型', fail:'LTV 极低 · 获客成本难收回' },
  { id:'VL-RS-39', chain:'财链路', module:'RS · 收入来源', name:'订阅会员', star:true, core:'ARR 即护城河', k6:5, k1:1,k2:2,k3:3,k4:4,k5:5, cases:'涛哥终身会员 · Netflix · Notion', when:'持续价值交付 + 高复购', fail:'价值衰减 · 流失率高' },
  { id:'VL-RS-40', chain:'财链路', module:'RS · 收入来源', name:'知识付费', core:'卖思想，不卖体力', k6:4, k1:1,k2:2,k3:2,k4:3,k5:5, cases:'原力 9980/29800/99800 阶梯 · 涛哥 · 水月文化课', when:'创始人 IP 强 + 知识体系成型', fail:'内容稀薄 · 复购低' },
  { id:'VL-RS-41', chain:'财链路', module:'RS · 收入来源', name:'广告 / 佣金', core:'流量主 + 撮合方', k6:3, k1:1,k2:2,k3:3,k4:4,k5:5, cases:'小红书种草佣金 · 抖音直播带货', when:'流量大平台 / 撮合双边', fail:'流量见顶 · CPM 暴跌' },
  { id:'VL-RS-42', chain:'财链路', module:'RS · 收入来源', name:'分润对赌', star:true, core:'不成功不收钱，成功大分成', k6:5, k1:2,k2:3,k3:3,k4:3,k5:4, cases:'14 岁少年 AI 猎头按入职月分润 · 三一重工按效果付费', when:'结果可量化 + 客户风险厌恶', fail:'中间过程付费模式全被绞杀' },
  { id:'VL-RS-43', chain:'财链路', module:'RS · 收入来源', name:'终身会员', star:true, core:'终身陪伴', k6:5, k1:0,k2:1,k3:2,k4:3,k5:4, cases:'涛哥智能少年终身会员 · 原力核心圈', when:'高客单 + 长期信任', fail:'前期回款不足 · 服务断档' },
  { id:'VL-RS-44', chain:'财链路', module:'RS · 收入来源', name:'项目咨询', star:true, core:'5 万到 500 万的私教', k6:5, k1:3,k2:3,k3:4,k4:4,k5:5, cases:'原力 250K+ 旗舰私教 · 涛哥战略咨询', when:'高客单 + 定制化深度', fail:'老板精力天花板' },
  { id:'VL-RS-45', chain:'财链路', module:'RS · 收入来源', name:'投资 / 孵化收益', star:true, core:'既是客户也是股东', k6:5, k1:1,k2:2,k3:3,k4:4,k5:5, cases:'涛哥未来火种创投基金 · YC 模式', when:'已有优秀项目池', fail:'投资失误整体亏损' },

  // 财链路 · 定价机制 PM (6)
  { id:'VL-PM-46', chain:'财链路', module:'PM · 定价机制', name:'成本加成', core:'成本 × 利润率（最差——客户带你算成本）', k6:1, k1:5,k2:5,k3:5,k4:5,k5:4, cases:'传统制造业 · 家装报价', when:'成本可控 + 客户理性 + B2B 标品', fail:'报价羞耻感 · 永远赚不到大钱' },
  { id:'VL-PM-47', chain:'财链路', module:'PM · 定价机制', name:'价值定价', star:true, core:'客户认为值多少就值多少', k6:5, k1:3,k2:3,k3:4,k4:5,k5:5, cases:'水月文创 · 原力 99800 · 涛哥 30 万年费', when:'情绪 / 社交 / 投资账户', fail:'价值感无法传递 · 用户带你算成本' },
  { id:'VL-PM-48', chain:'财链路', module:'PM · 定价机制', name:'阶梯定价', star:true, core:'199 / 9980 / 99800 / 168000 / 250000+', k6:5, k1:1,k2:2,k3:3,k4:4,k5:5, cases:'原力完整产品阶梯 · Salesforce 多版本', when:'用户分层差异大', fail:'阶梯断档导致跃迁失败' },
  { id:'VL-PM-49', chain:'财链路', module:'PM · 定价机制', name:'动态定价', core:'晚买贵 10%，早买更便宜', k6:4, k1:0,k2:0,k3:1,k4:2,k5:5, cases:'机票 · 酒店 · 滴滴 · 广告竞价', when:'标品 + 实时供需变化', fail:'用户感到被宰' },
  { id:'VL-PM-50', chain:'财链路', module:'PM · 定价机制', name:'拍卖竞价', core:'价高者得', k6:3, k1:3,k2:4,k3:3,k4:3,k5:4, cases:'苏富比艺术品 · Google 广告竞价', when:'稀缺品 + 多买家', fail:'参与人数不足 · 流拍' },
  { id:'VL-PM-51', chain:'财链路', module:'PM · 定价机制', name:'倒贴引流', core:'前端亏本/免费，后端高客单回血', k6:4, k1:4,k2:5,k3:4,k4:4,k5:4, cases:'原力 199 班型 · 范德比尔特免费船票二次消费', when:'高 LTV + 长漏斗', fail:'后端转化率不达预期' },

  // 财链路 · 成本结构 CO (7)
  { id:'VL-CO-52', chain:'财链路', module:'CO · 成本结构', name:'极致压缩供应链', star:true, core:'砍到脚踝掌', k6:4, k1:2,k2:4,k3:5,k4:5,k5:5, cases:'良久砍掉中间环节做到 50 亿 · 优衣库 · 苹果妈妈', when:'实体品 / 规模化', fail:'链路过长 · 利益分配失衡' },
  { id:'VL-CO-53', chain:'财链路', module:'CO · 成本结构', name:'AI 替代人力', star:true, core:'一人即独角兽公司', k6:5, k1:0,k2:0,k3:0,k4:1,k5:3, cases:'14 岁少年 1 万个 AI 猎头 · 苹果妈妈 AI 大脑', when:'重复性知识工作', fail:'人机协作设计不当反而效率下降' },
  { id:'VL-CO-54', chain:'财链路', module:'CO · 成本结构', name:'平台共享成本', star:true, core:'基建一次性投入，多方使用', k6:5, k1:0,k2:1,k3:2,k4:3,k5:5, cases:'AWS · Salesforce · Shopify', when:'基础设施重投入 + 多边用户', fail:'早期成本回收周期长' },
  { id:'VL-CO-55', chain:'财链路', module:'CO · 成本结构', name:'重资产投入', core:'砸钱砸出门槛（K6 算力是新石油）', k6:4, k1:5,k2:5,k3:5,k4:5,k5:4, cases:'芯片厂 · 特斯拉超级工厂 · OpenAI 万亿算力', when:'行业 No.1 + 资本充裕', fail:'资本回收不达预期' },
  { id:'VL-CO-56', chain:'财链路', module:'CO · 成本结构', name:'轻资产运营', star:true, core:'打地铺也能开公司', k6:5, k1:1,k2:1,k3:2,k4:3,k5:5, cases:'原力创业 · 麦肯锡 · Airbnb', when:'创业初期 / 服务型 / 咨询型', fail:'无壁垒易被复制' },
  { id:'VL-CO-57', chain:'财链路', module:'CO · 成本结构', name:'用户共建（UGC）', star:true, core:'用户即员工', k6:5, k1:1,k2:1,k3:2,k4:2,k5:5, cases:'B 站 · 小红书 · Reddit · 原力学员案例反哺', when:'社区 / 内容 / 工具平台', fail:'激励机制崩溃 · 优质创作者流失' },
  { id:'VL-CO-58', chain:'财链路', module:'CO · 成本结构', name:'公益免费引流', core:'做善事的同时做生意', k6:4, k1:2,k2:3,k3:3,k4:3,k5:4, cases:'原力 199 班型 · 水月非遗推广', when:'长漏斗 + 品牌建设', fail:'后端转化失败 · 纯亏钱' }
];

window.ATOMS = ATOMS;
