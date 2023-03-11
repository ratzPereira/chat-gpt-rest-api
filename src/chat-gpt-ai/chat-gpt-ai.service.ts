import { Injectable } from '@nestjs/common';
import { Configuration } from 'openai';
import { CreateCompletionRequest, OpenAIApi } from 'openai/dist/api';

const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;

@Injectable()
export class ChatGptAiService {
  private readonly openAiAPI: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openAiAPI = new OpenAIApi(configuration);
  }

  async getModelAnswer(question: string, temperature?: number) {
    try {
      const params: CreateCompletionRequest = {
        prompt: question,
        model: DEFAULT_MODEL_ID,
        temperature:
          temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
      };

      const response = await this.openAiAPI.createCompletion(params);

      return response.data;
    } catch (error) {}
  }
}
