import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('submit')
  submitSurvey(@Body() body: { surveyId: number; answers: Record<number, string | string[]> }) {
    return this.surveyService.submitSurvey(body);
  }

  @Get('results/:surveyId')
  getResults(@Param('surveyId') surveyId: string) {
    return this.surveyService.getSurveyResults(parseInt(surveyId));
  }
}
