import { View, Text } from '@tarojs/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FinancePage = () => {
  // 模拟数据 - 每日速览
  const topics = [
    {
      id: 1,
      name: 'AI改变个体',
      count: 5,
      news: [
        '某企业用AI财务助手将月报制作时间从3天缩短到2小时',
        'AI税务筹划工具帮助中小企业合规节税平均15%'
      ]
    },
    {
      id: 2,
      name: 'AI改变财税',
      count: 5,
      news: [
        '普华永道报告：AI可将财务审计效率提升60%',
        '深圳200家企业试点AI财税系统，平均降本30%'
      ]
    },
    {
      id: 3,
      name: '私募AI投资动态',
      count: 5,
      news: [
        '红杉资本领投AI财税平台A轮5000万美元',
        '经纬创投注资AI财报分析公司'
      ]
    },
    {
      id: 4,
      name: 'AI改变企业',
      count: 5,
      news: [
        '阿里云发布AI财税解决方案，服务10万+企业',
        '腾讯财务云引入AI助手，准确率达98%'
      ]
    },
    {
      id: 5,
      name: 'AI金融观察',
      count: 5,
      news: [
        '花旗银行AI风控系统减少坏账率25%',
        '高盛用AI分析财报，投资准确率提升18%'
      ]
    },
    {
      id: 6,
      name: 'AI失业及组织重构',
      count: 5,
      news: [
        '四大会计师事务所：AI不会取代会计，但会改变会计',
        '某上市公司财务部裁员40%，AI助手承担基础工作'
      ]
    },
    {
      id: 7,
      name: '上市公司AI应用',
      count: 5,
      news: [
        '万科引入AI财务机器人，处理90%报销单',
        '平安银行AI财报分析，自动化率达85%'
      ]
    },
    {
      id: 8,
      name: '一人公司变现',
      count: 5,
      news: [
        '财务咨询师用AI工具，月入从3万提升到8万',
        'CFO顾问用AI工具同时服务10家企业'
      ]
    },
    {
      id: 9,
      name: 'AI培训行业资讯',
      count: 5,
      news: [
        '财务AI培训市场规模今年增长200%',
        '某高校开设AI财务专业，首年招生300人'
      ]
    }
  ];

  return (
    <View className="min-h-screen" style={{ backgroundColor: '#E8F4FD' }}>
      {/* 顶部Banner */}
      <View style={{ backgroundColor: '#1B3A6B', padding: '16px', paddingTop: '24px' }}>
        <Text className="block text-white text-xl font-bold mb-1">企业AI</Text>
        <Text className="block text-white text-sm opacity-90">AI赋能企业，提升核心竞争力</Text>
      </View>

      {/* 每日速览 */}
      <View className="p-4">
        <View className="flex justify-between items-center mb-4">
          <Text className="block text-lg font-bold" style={{ color: '#1B3A6B' }}>每日速览</Text>
          <Badge variant="outline" style={{ color: '#1B3A6B', borderColor: '#1B3A6B' }}>今日更新</Badge>
        </View>

        {topics.map(topic => (
          <Card key={topic.id} className="mb-4">
            <CardHeader>
              <View className="flex justify-between items-center">
                <CardTitle className="text-base" style={{ color: '#1B3A6B' }}>{topic.name}</CardTitle>
                <Badge style={{ backgroundColor: '#22C55E', color: 'white' }}>{topic.count}条</Badge>
              </View>
            </CardHeader>
            <CardContent>
              {topic.news.map((item, index) => (
                <View key={index} className="mb-2">
                  <Text className="block text-sm" style={{ color: '#1A2E5C' }}>
                    <Text className="font-bold">• </Text>
                    {item}
                  </Text>
                </View>
              ))}
            </CardContent>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default FinancePage;
