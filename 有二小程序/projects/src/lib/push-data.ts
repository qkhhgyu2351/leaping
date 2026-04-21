// 推送数据管理模块
// 用于处理每日推送内容的更新和展示

// 推送数据类型定义
export interface NewsItem {
  id: string;
  content: string;
  source: string;
  url: string;
}

export interface Topic {
  id: number;
  name: string;
  count: number;
  news: NewsItem[];
}

export interface CopywritingItem {
  id: number;
  account: 'finance' | 'guest';
  accountName: string;
  content: string;
  quote: string;
  type: '认识论' | '方法论' | '解决方案';
}

export interface PushData {
  date: string;
  finance: {
    topics: Topic[];
    copywritings: CopywritingItem[];
  };
  guest: {
    topics: Topic[];
    copywritings: CopywritingItem[];
  };
}

// 2026-04-20 推送数据
export const pushData20260420: PushData = {
  date: '2026-04-20',
  finance: {
    topics: [
      {
        id: 1,
        name: 'AI改变个体',
        count: 5,
        news: [
          {
            id: '1-1',
            content: '前程无忧《2025职场AI应用趋势报告》显示，45.5%的受访者明确选择"提升与AI协同工作的能力"作为职业发展方向，掌握AI协同能力的职员薪资溢价达45.5%，晋升速度快2倍。72.3%的行政支持岗位每天都在用AI撰写文档。',
            source: '前程无忧/搜狐',
            url: 'https://www.sohu.com/a/870780443_122006510/'
          },
          {
            id: '1-2',
            content: '2026年3月科技行业裁员18720人，同比增长24%。AI导致的裁员占到裁员计划的四分之一——每4个被裁的人里，就有1个是因为公司把预算投向了AI。',
            source: 'Challenger, Gray & Christmas/头条',
            url: 'https://m.toutiao.com/group/7628035906716402219/'
          },
          {
            id: '1-3',
            content: '人社部明确2026年全年开展补贴性培训超1000万人次，重点覆盖AI技术、新能源汽车、低空经济等领域。转岗人员、在职职工、高校毕业生都能参加，很多地方还会给每日50-80元的生活补贴。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7620745690007765513/'
          },
          {
            id: '1-4',
            content: '麦肯锡最新研究显示，到2030年全球30%的工作岗位将被生成式AI重构或替代，首当其冲的是高薪白领岗位——数据分析师、初级律师、报告撰写员、客服代表。不是体力劳动者先被替代，而是白领。',
            source: '麦肯锡/头条',
            url: 'https://m.toutiao.com/group/7623435468037767734/'
          },
          {
            id: '1-5',
            content: '2026年劳动仲裁部门已明确，单纯"岗位被AI替代"不构成合法裁员理由。企业因技术变革调整岗位，需优先提供培训或转岗机会。这意味着企业不能直接以"AI能干你的活"为由裁人。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7624938940381790739/'
          }
        ]
      },
      {
        id: 2,
        name: 'AI改变财税',
        count: 5,
        news: [
          {
            id: '2-1',
            content: '2026年金税四期已全面进入深水区，"以数治税"彻底替代"以票控税"。工商、银行、社保、海关、电力、物流等14部门数据全打通，AI数据画像让企业经营近乎透明。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7629193261743096329/'
          },
          {
            id: '2-2',
            content: '金税四期打通47个部门数据，实现全方位穿透监控。AI构建税务画像，税负偏离行业20%、私户月流水超50万等，直接列为稽查对象。以前人工抽查"人找税"，现在大数据锁定"数找税"。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7615437273835848198/'
          },
          {
            id: '2-3',
            content: '某餐饮老板将180万回款转私户未入账，被认定少缴税款76万，最终补缴+罚款合计119万，门店濒临倒闭。金税四期下，私户收款隐匿收入已成为稽查TOP1行为。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7615437273835848198/'
          },
          {
            id: '2-4',
            content: '德勤《2026年金融趋势报告》调研数据显示，71%的企业表示已在财务领域应用人工智能，约41%的企业达到中等或较高应用水平。当企业在犹豫"AI财务靠不靠谱"的时候，竞争对手已经在用AI重构财务流程了。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7628460587202216458/'
          },
          {
            id: '2-5',
            content: '随着金税四期系统在全国范围内的深度应用与功能迭代，税务监管的精准化程度大幅提升。国家税务总局最新工作部署要求中小企业加快财税合规转型，传统代理记账模式面临升级压力。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7629764812938953250/'
          }
        ]
      },
      {
        id: 3,
        name: '私募AI投资动态',
        count: 5,
        news: [
          {
            id: '3-1',
            content: '4月19日，AI编程工具Cursor估值冲刺500亿美元，融资大战升温。AI开发工具赛道成为2026年一级市场最热门方向之一。',
            source: 'TechCrunch/头条',
            url: 'https://m.toutiao.com/group/7630311481015288366/'
          },
          {
            id: '3-2',
            content: 'OpenAI完成1220亿美元私募融资，投后估值8520亿美元，成为全美市值最高的私有企业之一。本轮由亚马逊、英伟达、软银领衔投资。',
            source: 'Crunchbase',
            url: 'https://www.toutiao.com/article/7623659215084700186/'
          },
          {
            id: '3-3',
            content: '2026年Q1全球AI领域融资总额达2980亿美元，同比暴涨超150%。单季度融资额逼近2025年全年的70%，超越2018年之前任何一整年的风投总和。',
            source: 'Crunchbase',
            url: 'https://www.toutiao.com/article/7626748008230584859/'
          },
          {
            id: '3-4',
            content: '4月18日，第十届财富·私募先锋年度盛典在广州举行。私募排排网发布数据，2026年私募产品发行呈"减量提质"趋势，百亿私募主导新发，量化产品占比达48%。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7630110211281437236/'
          },
          {
            id: '3-5',
            content: 'AI视觉生成公司生数科技完成近20亿元B轮融资，由阿里云领投。本轮融资将用于加速大模型研发和商业化落地。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7627133547270226432/'
          }
        ]
      },
      {
        id: 4,
        name: 'AI改变企业',
        count: 5,
        news: [
          {
            id: '4-1',
            content: '4月17日，微软打破与OpenAI的排他合作关系，将Anthropic的Claude Opus 4.7集成到GitHub Copilot等9个关键开发环境。Claude Opus 4.7多文件代码重构错误率降低28%、令牌处理能力提升50%至200万、视觉理解准确率从62%提升到85%。',
            source: '搜狐',
            url: 'https://m.sohu.com/a/1011207327_121956424/'
          },
          {
            id: '4-2',
            content: '4月19日，谷歌发布开源大模型Gemma 4系列，包含31B Dense旗舰版等四个版本，AIME2026数学测试得分从20.8%飙升至89.2%，性能大幅跃升。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7630304454134301224/'
          },
          {
            id: '4-3',
            content: 'OpenAI 4月19日推出垂直领域模型GPT-Rosalind，专注蛋白质结构预测、基因序列分析、药物靶点发现等生命科学任务。这标志着AI从通用助手向专业垂直工具转变。',
            source: 'The Verge/OpenAI Blog/头条',
            url: 'https://m.toutiao.com/group/7630311481015288366/'
          },
          {
            id: '4-4',
            content: 'Anthropic 4月19日发布AI协作设计工具Claude Design，用户可与AI共同创建设计稿、原型、幻灯片等视觉内容，与Figma、Canva等主流设计工具深度集成。',
            source: 'Anthropic Blog/头条',
            url: 'https://m.toutiao.com/group/7630311481015288366/'
          },
          {
            id: '4-5',
            content: '华为昇腾950PR芯片已获得字节跳动和阿里巴巴的订单，计划2026年出货约75万颗。国产GPU在推理市场的占有率预计2028年突破40%。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7629901470090969626/'
          }
        ]
      },
      {
        id: 5,
        name: 'AI金融观察',
        count: 5,
        news: [
          {
            id: '5-1',
            content: '22家上市券商2025年信息技术投入总额达219亿元，同比增长14.03%，占营业收入比重升至6.05%。国泰海通、华泰证券明确提出"ALL IN AI"战略，信达证券、中泰证券率先引入DeepSeek大模型。',
            source: '《每日经济新闻》',
            url: 'https://www.toutiao.com/article/7629570148696916489/'
          },
          {
            id: '5-2',
            content: '新华网4月15日报道，13家上市银行2025年金融科技总投入超1800亿元，六大行投入超1300亿。AI大模型应用从试点走向规模化，在风控、客服、运营效率等场景全面铺开。',
            source: '新华网',
            url: 'https://www.xinhuanet.com/20260415/d9222a7625f640fa9cb5fda34f12e6b9/c.html'
          },
          {
            id: '5-3',
            content: '上海证券报4月9日报道，金融机构AI应用正经历从"单点突破"到"全域渗透"的转变。早期AI多用于智能客服等边缘场景，如今已深入到风控审批、投研分析、合规检查等核心业务环节。',
            source: '上海证券报',
            url: 'https://paper.cnstock.com/html/2026-04/09/content_2197839.htm'
          },
          {
            id: '5-4',
            content: '生成式AI已深度嵌入信贷审批、智能风控、客户服务、投资交易等金融核心业务链条，从"锦上添花"的技术点缀演变为推动金融机构降本增效的关键力量。但券商在AI投顾领域面临合规性挑战。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7629159639573381684/'
          },
          {
            id: '5-5',
            content: '4月18日，第十届财富·私募先锋年度盛典聚焦AI技术与投研融合，探讨大模型在量化投资、风险定价、投研自动化等场景的应用前景，超百家头部私募机构参会。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7630073361334321698/'
          }
        ]
      },
      {
        id: 6,
        name: 'AI失业及组织重构',
        count: 5,
        news: [
          {
            id: '6-1',
            content: 'Meta计划于5月20日启动今年首轮大规模裁员，首批涉及约8000人（占全球员工总数10%），旨在推动以AI为核心的组织重构。值得注意的是，Meta 2023年营收1349亿美元（同比+16%），净利润391亿美元（同比+69%），财务稳健为AI转型提供底气。',
            source: '路透社/头条',
            url: 'https://m.toutiao.com/group/7630475936864928283/'
          },
          {
            id: '6-2',
            content: '甲骨文4月初宣布裁员约3万人，成为2026年迄今最大规模的单次裁员。与此同时大幅增加AI基础设施投资，折射出传统科技巨头"用人力成本换AI能力"的典型路径。',
            source: '新浪财经',
            url: 'https://finance.sina.cn/2026-04-08/detail-inhttaet6944363.d.html'
          },
          {
            id: '6-3',
            content: '2026年的职场出现新型"软辞退"：披着"数字化转型""组织优化"外衣，通过提高KPI要求、调整岗位描述、强制学习新工具等方式，让员工"主动"离开。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7629943653029347855/'
          },
          {
            id: '6-4',
            content: '谷歌合并DeepMind与Google Brain、微软调整Office团队投入Copilot、亚马逊扩大AWS AI团队同时削减零售技术岗位——全球科技巨头正从"人海战术"转向"人机协同"新范式。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7630475936864928283/'
          },
          {
            id: '6-5',
            content: '一个程序员花1000块买了AI会员，效率翻倍后主动跟老板说"一个人顶俩"。结果三个月后被裁员，留下的同事工资比他还低4000块。AI时代的职场悖论：效率提升不等于岗位安全。',
            source: '网易',
            url: 'https://www.163.com/dy/article/KQNSG4KJ05566SCS.html'
          }
        ]
      },
      {
        id: 7,
        name: '美股及A股上市公司分析',
        count: 5,
        news: [
          {
            id: '7-1',
            content: '截至4月17日收盘，创业板指报3678.29点，4月以来累计涨幅超16%，续创近11年新高。沪指报4051.43点。深市成交额达14121亿，沪市10135亿。CPO概念持续活跃，通信板块12天狂涨25%。',
            source: '东方财富/头条',
            url: 'https://m.toutiao.com/group/7630364614810796544/'
          },
          {
            id: '7-2',
            content: '4月14日-17日A股周复盘：周一沪指重返4000点，周二创业板暴涨3.78%创2021年12月以来新高，周五创业板指再创近11年新高。全周市场围绕AI算力、CPO概念展开。',
            source: '东方财富/证券时报',
            url: 'https://m.toutiao.com/group/7630486498982330926/'
          },
          {
            id: '7-3',
            content: 'DeepSeek V4首次深度适配华为昇腾等国产芯片，部署成本仅为英伟达方案的1/3，推理成本低至GPT-4的1/70。这标志着中国AI在"去CUDA化"道路上迈出了决定性一步。',
            source: '东方财富',
            url: 'https://stock.eastmoney.com/a/202604133702667745.html'
          },
          {
            id: '7-4',
            content: '创业板50成分股中，胜宏科技涨7.95%，新易盛涨7.27%，信维通信涨6.16%。CPO（共封装光学）概念持续活跃，光模块板块成为AI算力链最强主线。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7629596633642910259/'
          },
          {
            id: '7-5',
            content: '4月20日（下周一）A股走势分析：周五收盘后全球市场信号偏暖、一季报高增标的密集涌现，但高位获利盘兑现压力与五一节前资金避险需求形成制约。创业板指受科技主线带动或相对强势。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7630095819294736936/'
          }
        ]
      },
      {
        id: 8,
        name: 'AI协助一人公司及超级个体变现',
        count: 5,
        news: [
          {
            id: '8-1',
            content: '五岁博客2026年AI副业报告显示，AI副业中位数收入3000-6000元/月，AI智能体接单月入5000-8000元。但报告同时指出，AI副业窗口期可能只有6-18个月，越早入局越有优势。',
            source: '五岁博客/头条',
            url: 'https://m.toutiao.com/group/7623435468037767734/'
          },
          {
            id: '8-2',
            content: '4月15日，视频平台Utopai Studios宣布重大升级：三分钟4K视频一键生成。叠加AI写作、AI设计等工具的成熟，一个人完成以前需要一个团队才能做的事，正在从概念变成日常。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7628994545358733839/'
          },
          {
            id: '8-3',
            content: '4月10日，海淀区正式发布《关于全面打造OPC创业生态的若干措施》，八条政策涵盖模型券补贴（最高200万）、租金补贴、创业启动资金、安居保障等。',
            source: '中新网',
            url: 'https://www.chinanews.com.cn/'
          },
          {
            id: '8-4',
            content: '中国经济网评论文章指出，OPC的终局不是"一个人干所有事"，而是"一个人负责判断和品控，AI负责执行"。关键壁垒不是AI工具的使用能力，而是行业认知深度和商业化能力。',
            source: '中国经济网',
            url: 'http://views.ce.cn/view/ent/202604/t20260413_2898813.shtml'
          },
          {
            id: '8-5',
            content: '人社部2026年政策：符合条件个人最高可申请30万元创业担保贷款，免息担保贷款额度提升到20万。个体工商户、小微企业主可享税费减免、稳岗返还等政策。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7620745690007765513/'
          }
        ]
      },
      {
        id: 9,
        name: 'AI培训行业资讯',
        count: 5,
        news: [
          {
            id: '9-1',
            content: '教育部4月13日明确将人工智能纳入教师资格考试和认证内容。《"人工智能+教育"行动计划》提出四大重点任务：推动AI人才培养与素养提升、促进AI与教育深度融合、建设AI教育基础设施、完善AI教育治理体系。',
            source: '教育部官网',
            url: 'http://www.moe.gov.cn/fbh/live/2026/77927/mtbd/202604/t20260413_1433413.html'
          },
          {
            id: '9-2',
            content: '新华社4月10日报道，教育部等五部门联合印发《"人工智能+教育"行动计划》，将AI素养定为全学段教师的硬性考核标准。全国1600万教师群体面临职业能力升级。',
            source: '新华社',
            url: 'https://www.cqcb.com/shuzijingji/2026-04-10/6112988_pc.html'
          },
          {
            id: '9-3',
            content: '前程无忧《2026届校招市场AI人才需求报告》显示，大模型算法工程师月薪中位值达24760元，深度学习工程师、NLP工程师等核心AI岗位校招月薪中位值均超2.4万元。AI人才被抢疯了。',
            source: '前程无忧/头条',
            url: 'https://m.toutiao.com/group/7615562191965553167/'
          },
          {
            id: '9-4',
            content: '五部门联合印发计划后，中国AI教育已形成从政策制定到课堂落地的完整闭环。各省市正在加速推进AI课程进校园、AI辅助教学工具部署、教师AI能力培训等工作。',
            source: '头条',
            url: 'https://www.toutiao.com/article/7630057875833913892/'
          },
          {
            id: '9-5',
            content: '国家提供的AI转型公开课每月1-2期，可在线申请。人社部补贴性培训覆盖AI技术、新能源汽车、低空经济等领域，很多地方还给每日50-80元生活补贴。',
            source: '头条',
            url: 'https://m.toutiao.com/group/7620745690007765513/'
          }
        ]
      }
    ],
    copywritings: [
      {
        id: 1,
        account: 'finance',
        accountName: '有二财经',
        content: '4月19日，300多台人形机器人跑半马，冠军50分26秒，超人类世界纪录。

这不是科幻，是产业信号。具身智能的基础设施已经成熟。

3-5年内，制造业和物流仓储会率先看到规模化落地。',
        quote: '就像2016年AlphaGo下围棋，当时觉得没关系，3年后AI已经在各行各业落地了。',
        type: '认识论'
      },
      {
        id: 2,
        account: 'finance',
        accountName: '有二财经',
        content: '一个仓库10个分拣员，年人力成本80-100万。
3年后一台人形机器人替代3个分拣员，前期投入60万，3年省240-300万。

不需要今天买机器人，但需要今天就开始算这笔账。',
        quote: '不是让你现在买机器人，是让你现在就想清楚哪些环节会被替代。',
        type: '方法论'
      }
    ]
  },
  guest: {
    topics: [
      {
        id: 1,
        name: 'AI改变个体',
        count: 5,
        news: [
          {
            id: '1-1',
            content: '前程无忧《2025职场AI应用趋势报告》显示，45.5%的受访者明确选择"提升与AI协同工作的能力"作为职业发展方向，掌握AI协同能力的职员薪资溢价达45.5%，晋升速度快2倍。72.3%的行政支持岗位每天都在用AI撰写文档。',
            source: '前程无忧/搜狐',
            url: '