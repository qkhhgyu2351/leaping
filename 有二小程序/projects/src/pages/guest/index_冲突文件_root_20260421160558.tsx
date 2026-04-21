import { View, Text } from '@tarojs/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GuestPage = () => {
  // 模拟数据 - 每日速览
  const topics = [
    {
      id: 1,
      name: 'AI改变个体',
      count: 5,
      news: [
        '个体用AI工具提升10倍效率案例',
        '一人公司如何用AI工具同时服务5个客户'
      ]
    },
    {
      id: 2,
      name: 'AI改变职业',
      count: 5,
      news: [
        '财务人用AI工具转型财务顾问，收入翻3倍',
        '传统会计如何用AI工具升级为CFO'
      ]
    },
    {
      id: 3,
      name: 'AI协助一人公司',
      count: 5,
      news: [
        '一人公司如何用AI管理财务、客户、内容',
        '自由职业者用AI工具月入从2万到8万'
      ]
    },
    {
      id: 4,
      name: '超级个体变现',
      count: 5,
      news: [
        'AI工具助力超级个体打造个人品牌',
        '个人如何用AI工具实现睡后收入'
      ]
    },
    {
      id: 5,
      name: 'AI失业及组织重构',
      count: 5,
      news: [
        '失业后用AI工具快速转型成功案例',
        'AI时代如何构建个人核心竞争力'
      ]
    },
    {
      id: 6,
      name: 'OPC（一人公司）',
      count: 5,
      news: [
        'OPC模式：AI时代的新工作方式',
        '如何用AI工具构建自己的OPC系统'
      ]
    },
    {
      id: 7,
      name: 'AI工具实践',
      count: 5,
      news: [
        'Claude+Gemini组合提升工作流效率',
        'NotebookLM帮你整理知识库'
      ]
    },
    {
      id: 8,
      name: 'AI改变个人成长',
      count: 5,
      news: [
        '用AI工具制定个人成长计划',
        'AI如何帮助个人突破认知瓶颈'
      ]
    },
    {
      id: 9,
      name: 'AI职场转型',
      count: 5,
      news: [
        '传统职场人如何转型AI时代个体',
        '40岁职场人如何用AI工具第二曲线'
      ]
    }
  ];

  return (
    <View className="min-h-screen" style={{ backgroundColor: '#3B4C7D' }}>
      {/* 顶部Banner */}
      <View style={{ backgroundColor: '#3B4C7D', padding: '16px', paddingTop: '24px' }}>
        <Text className="block text-white text-xl font-bold mb-1">个体AI</Text>
        <Text className="block text-white text-sm opacity-90">AI助力个人，成为超级个体</Text>
      </View>

      {/* 每日速览 */}
      <View className="p-4">
        <View className="flex justify-between items-center mb-4">
          <Text className="block text-lg font-bold text-white">每日速览</Text>
          <Badge variant="outline" style={{ color: '#F5A623', borderColor: '#F5A623' }}>今日更新</Badge>
        </View>

        {topics.map(topic => (
          <Card key={topic.id} className="mb-4">
            <CardHeader>
              <View className="flex justify-between items-center">
                <CardTitle className="text-base text-white">{topic.name}</CardTitle>
                <Badge style={{ backgroundColor: '#00C49A', color: 'white' }}>{topic.count}条</Badge>
              </View>
            </CardHeader>
            <CardContent>
              {topic.news.map((item, index) => (
                <View key={index} className="mb-2">
                  <Text className="block text-sm text-white">
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

export default GuestPage;
