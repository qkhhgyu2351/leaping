import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Taro from '@tarojs/taro';

interface CopywritingItem {
  id: number;
  account: 'finance' | 'guest';
  accountName: string;
  content: string;
  quote: string;
  type: '认识论' | '方法论' | '解决方案';
}

const CopywritingPage = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // 模拟数据 - 朋友圈文案
  const items: CopywritingItem[] = [
    {
      id: 1,
      account: 'finance',
      accountName: '企业AI',
      content: '以前要3个会计凑2天的合并报表，现在大模型10分钟跑完初稿，还能标记出5个异常往来款。\n\n不是AI取代会计，是会用AI的会计取代不会用的。\n\n财务人，你准备好了吗？',
      quote: 'AI不是来抢饭碗的，是来递梯子的',
      type: '方法论'
    },
    {
      id: 2,
      account: 'finance',
      accountName: '企业AI',
      content: '一个上市公司老板说：我用AI财务系统，1年省了200万财务成本。\n\n这200万不是裁员来的，是效率提升来的。\n\n同样的工作，以前要10个人，现在3个人就够了。\n\nAI降本增效，不是口号，是算出来的。',
      quote: 'AI的账，从来都不是人算出来的',
      type: '解决方案'
    },
    {
      id: 3,
      account: 'guest',
      accountName: '个体AI',
      content: '我从企业高管辞职做自媒体，用了AI工具，1个人干出5个人的活。\n\n写作用Claude，生图用即梦，做视频用剪映。\n\n不是AI取代人，是用AI的人取代不用AI的人。',
      quote: 'AI是你能力的放大器，不是替代品',
      type: '认识论'
    },
    {
      id: 4,
      account: 'guest',
      accountName: '个体AI',
      content: '一个财务朋友说：以前每天加班到9点，现在用AI工具，6点就下班了。\n\n不是工作少了，是效率高了。\n\nAI不是让你少工作，是让你多创造价值。\n\n时代在变，你不变，就会被淘汰。',
      quote: 'AI时代，选择比努力更重要',
      type: '方法论'
    }
  ];

  const handleCopy = async (item: CopywritingItem) => {
    try {
      await Taro.setClipboardData({
        data: item.content
      });
      setCopiedId(item.id);
      Taro.showToast({
        title: '已复制到剪贴板',
        icon: 'success'
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      Taro.showToast({
        title: '复制失败',
        icon: 'none'
      });
    }
  };

  const getAccountColor = (account: 'finance' | 'guest') => {
    return account === 'finance' ? '#1B3A6B' : '#3B4C7D';
  };

  const getAccountBgColor = (account: 'finance' | 'guest') => {
    return account === 'finance' ? '#E8F4FD' : '#3B4C7D';
  };

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 顶部说明 */}
      <View className="p-4 bg-white mb-4">
        <Text className="block text-lg font-bold mb-2">朋友圈文案库</Text>
        <Text className="block text-sm text-gray-600">点击&ldquo;复制&rdquo;按钮，一键复制文案内容</Text>
      </View>

      {/* 文案列表 */}
      <View className="px-4 pb-8">
        {items.map(item => (
          <Card key={item.id} className="mb-4">
            <CardHeader>
              <View className="flex justify-between items-center mb-2">
                <View className="flex items-center gap-2">
                  <Text
                    className="block text-sm font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: getAccountBgColor(item.account),
                      color: item.account === 'guest' ? '#fff' : '#1B3A6B'
                    }}
                  >
                    {item.accountName}
                  </Text>
                  <Badge
                    variant="outline"
                    style={{
                      color: getAccountColor(item.account),
                      borderColor: getAccountColor(item.account)
                    }}
                  >
                    {item.type}
                  </Badge>
                </View>
              </View>
            </CardHeader>
            <CardContent>
              {/* 文案内容 */}
              <View
                className="p-3 rounded-lg mb-3"
                style={{ backgroundColor: '#f5f5f5' }}
              >
                <Text className="block text-sm leading-relaxed text-gray-800">
                  {item.content}
                </Text>
              </View>

              {/* 金句 */}
              <View className="mb-3">
                <Text className="block text-xs text-gray-500 mb-1">金句</Text>
                <Text
                  className="block text-sm font-medium italic"
                  style={{ color: getAccountColor(item.account) }}
                >
                  &ldquo;{item.quote}&rdquo;
                </Text>
              </View>

              {/* 复制按钮 */}
              <Button
                className="w-full"
                onClick={() => handleCopy(item)}
                style={{
                  backgroundColor: copiedId === item.id ? '#22C55E' : getAccountColor(item.account)
                }}
              >
                <Text className="text-white text-sm font-medium">
                  {copiedId === item.id ? '✓ 已复制' : '复制文案'}
                </Text>
              </Button>
            </CardContent>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default CopywritingPage;
