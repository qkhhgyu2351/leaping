import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Network } from '@/network';
import Taro from '@tarojs/taro';

/**
 * 测评问卷功能
 * 包含：问卷列表、答题页、结果页
 */

// 问卷数据类型
interface Question {
  id: number;
  type: 'single' | 'multiple' | 'text';
  title: string;
  options?: string[];
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

// 示例问卷数据
const SURVEY_DATA: Survey = {
  id: 1,
  title: '工作效率测评',
  description: '通过几个简单问题，了解您的工作效率情况',
  questions: [
    {
      id: 1,
      type: 'single',
      title: '您每天的工作时间通常是？',
      options: ['6小时以下', '6-8小时', '8-10小时', '10小时以上']
    },
    {
      id: 2,
      type: 'multiple',
      title: '您在工作中遇到的主要困难是？（可多选）',
      options: ['时间管理', '沟通协作', '技能不足', '压力大', '缺乏工具支持']
    },
    {
      id: 3,
      type: 'single',
      title: '您对目前工作效率的满意度是？',
      options: ['非常满意', '满意', '一般', '不满意', '非常不满意']
    }
  ]
};

const IndexPage = () => {
  const [currentView, setCurrentView] = useState<'list' | 'survey' | 'result'>('list');
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string>('');

  const startSurvey = () => {
    setCurrentView('survey');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleSingleChoice = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultipleChoice = (questionId: number, value: string) => {
    setAnswers(prev => {
      const current = (prev[questionId] as string[]) || [];
      if (current.includes(value)) {
        return { ...prev, [questionId]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [questionId]: [...current, value] };
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < SURVEY_DATA.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitSurvey = async () => {
    setIsSubmitting(true);
    try {
      const res = await Network.request({
        url: '/api/survey/submit',
        method: 'POST',
        data: {
          surveyId: SURVEY_DATA.id,
          answers
        }
      });

      console.log('提交成功:', res.data);

      // 计算简单结果
      setResult('感谢您的参与！您的答卷已提交成功。');

      setCurrentView('result');
      setIsSubmitting(false);
    } catch (error) {
      console.error('提交失败:', error);
      Taro.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      });
      setIsSubmitting(false);
    }
  };

  const resetSurvey = () => {
    setCurrentView('list');
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult('');
  };

  // 渲染问卷列表页
  const renderListView = () => (
    <View className="p-4">
      <Text className="block text-2xl font-bold mb-2">测评问卷</Text>
      <Text className="block text-gray-600 mb-6">选择问卷开始测评</Text>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{SURVEY_DATA.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="block text-gray-600 mb-4">{SURVEY_DATA.description}</Text>
          <View className="flex justify-between items-center mb-4">
            <Text className="block text-sm text-gray-500">
              共 {SURVEY_DATA.questions.length} 道题
            </Text>
            <Text className="block text-sm text-blue-600">预计用时 3 分钟</Text>
          </View>
          <Button className="w-full" onClick={startSurvey}>
            开始测评
          </Button>
        </CardContent>
      </Card>
    </View>
  );

  // 渲染答题页
  const renderSurveyView = () => {
    const currentQuestion = SURVEY_DATA.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / SURVEY_DATA.questions.length) * 100;
    const isLastQuestion = currentQuestionIndex === SURVEY_DATA.questions.length - 1;
    const currentAnswer = answers[currentQuestion.id];

    const canProceed = () => {
      if (!currentAnswer) return false;
      if (Array.isArray(currentAnswer) && currentAnswer.length === 0) return false;
      return true;
    };

    return (
      <View className="p-4 h-full flex flex-col">
        {/* 顶部导航 */}
        <View className="flex justify-between items-center mb-4">
          <Text className="block text-lg font-bold">{SURVEY_DATA.title}</Text>
          <Text className="block text-sm text-gray-500">
            {currentQuestionIndex + 1}/{SURVEY_DATA.questions.length}
          </Text>
        </View>

        {/* 进度条 */}
        <Progress value={progress} className="mb-6" />

        {/* 题目卡片 */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-base">
              {currentQuestionIndex + 1}. {currentQuestion.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* 单选题 */}
            {currentQuestion.type === 'single' && currentQuestion.options && (
              <RadioGroup
                value={currentAnswer as string}
                onValueChange={(value) => handleSingleChoice(currentQuestion.id, value)}
              >
                {currentQuestion.options.map((option, index) => (
                  <View key={index} className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label for={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </View>
                ))}
              </RadioGroup>
            )}

            {/* 多选题 */}
            {currentQuestion.type === 'multiple' && currentQuestion.options && (
              <View>
                {currentQuestion.options.map((option, index) => (
                  <View key={index} className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id={`option-${index}`}
                      checked={(currentAnswer as string[] || []).includes(option)}
                      onCheckedChange={() => handleMultipleChoice(currentQuestion.id, option)}
                    />
                    <Label for={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </View>
                ))}
              </View>
            )}
          </CardContent>
        </Card>

        {/* 底部操作栏 */}
        <View style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'row', gap: '12px', padding: '12px', backgroundColor: '#fff', borderTop: '1px solid #e5e5e5', zIndex: 100 }}>
          <Button
            variant="outline"
            className="flex-1"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            上一题
          </Button>
          {isLastQuestion ? (
            <Button
              className="flex-1"
              onClick={submitSurvey}
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? '提交中...' : '提交'}
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={nextQuestion}
              disabled={!canProceed()}
            >
              下一题
            </Button>
          )}
        </View>
      </View>
    );
  };

  // 渲染结果页
  const renderResultView = () => (
    <View className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-center">测评完成</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Text className="block text-2xl mb-4">✅</Text>
          <Text className="block text-gray-700 mb-6">{result}</Text>
          <Button className="w-full" onClick={resetSurvey}>
            返回首页
          </Button>
        </CardContent>
      </Card>
    </View>
  );

  return (
    <View className="h-full bg-gray-50">
      {currentView === 'list' && renderListView()}
      {currentView === 'survey' && renderSurveyView()}
      {currentView === 'result' && renderResultView()}
    </View>
  );
};

export default IndexPage;
