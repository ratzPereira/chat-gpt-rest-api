import { SetSelectedModel } from './model/set-selected-model';
import { ModelAnswer } from './model/model.answer';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly chatGptAiService: ChatGptAiService) {}

  @Post('/message')
  @UsePipes(ValidationPipe)
  getModelAnswer(@Body() data: ModelAnswer) {
    return this.chatGptAiService.getModelAnswer(data);
  }

  @Get()
  listModels() {
    return this.chatGptAiService.listModels();
  }

  @Post('/model')
  @UsePipes(ValidationPipe)
  setModel(@Body() data: SetSelectedModel){
    this.chatGptAiService.setModelId(data.modelId);
  }
}
