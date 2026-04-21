import { Injectable } from '@nestjs/common';

export interface SurveyAnswer {
  [questionId: number]: string | string[];
}

export interface SurveySubmission {
  surveyId: number;
  answers: SurveyAnswer;
  timestamp?: Date;
}

@Injectable()
export class SurveyService {
  private submissions: SurveySubmission[] = [];

  submitSurvey(submission: SurveySubmission) {
    const submissionWithTimestamp: SurveySubmission = {
      ...submission,
      timestamp: new Date()
    };
    this.submissions.push(submissionWithTimestamp);

    return {
      code: 200,
      msg: '提交成功',
      data: {
        id: this.submissions.length,
        surveyId: submission.surveyId,
        submittedAt: new Date().toISOString()
      }
    };
  }

  getSurveyResults(surveyId: number) {
    const results = this.submissions.filter(s => s.surveyId === surveyId);
    return {
      code: 200,
      msg: '获取成功',
      data: {
        total: results.length,
        results
      }
    };
  }
}
