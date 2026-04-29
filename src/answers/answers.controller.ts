import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('questions/:questionId/answers')
  create(
    @Param('questionId') questionId: string,
    @Req() req: any,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    return this.answersService.create(questionId, req.user.id, createAnswerDto);
  }

  @Get('questions/:questionId/answers')
  findByQuestion(@Param('questionId') questionId: string) {
    return this.answersService.findByQuestion(questionId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('answers/:id')
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answersService.update(id, req.user.id, updateAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('answers/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.answersService.remove(id, req.user.id);
  }
}