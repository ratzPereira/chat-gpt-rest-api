import { Injectable } from '@nestjs/common';
import { Configuration } from 'openai';
import { CreateCompletionRequest, OpenAIApi } from 'openai/dist/api';

const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;

@Injectable()
export class ChatGptAiService {
  private readonly openAiAPI: OpenAIApi;
  private selectedModelId: string | undefined;

  constructor() {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openAiAPI = new OpenAIApi(configuration);
  }

  setModelId(modelId: string) {
    this.selectedModelId = modelId;
  }

  async listModels() {
    const models = await this.openAiAPI.listModels();

    return models.data;
  }

  async getModelAnswer(question: string, temperature?: number) {
    try {
      const params: CreateCompletionRequest = {
        prompt: question,
        model: this.selectedModelId ? this.selectedModelId : DEFAULT_MODEL_ID,
        temperature:
          temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
      };

      const response = await this.openAiAPI.createCompletion(params);

      const { data } = response;

      if (data.choices.length) {
        return data.choices;
      }
      return response.data;
    } catch (error) {}
  }
}
