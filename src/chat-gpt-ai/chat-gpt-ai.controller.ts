import { ModelAnswer } from './model/model.answer';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly chatGptAiService: ChatGptAiService) {}

  @Post('/message')
  getModelAnswer(@Body() data: ModelAnswer) {
    return this.chatGptAiService.getModelAnswer(data.question);
  }

  @Get()
  listModels() {
    return this.chatGptAiService.listModels();
  }
}
