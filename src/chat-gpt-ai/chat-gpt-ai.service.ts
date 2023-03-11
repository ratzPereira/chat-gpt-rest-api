import { ModelAnswer } from './model/model.answer';
import { Injectable } from '@nestjs/common';
import { Configuration } from 'openai';
import { CreateCompletionRequest, OpenAIApi } from 'openai/dist/api';

const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;
const MAX_TOKENS = 200;
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

  async getModelAnswer(input: ModelAnswer) {
    try {
      const { temperature, modelId, question } = input;

      let model = DEFAULT_MODEL_ID;
      if (modelId) {
        model = modelId;
      } else if (this.selectedModelId) {
        model = this.selectedModelId;
      }

      const params: CreateCompletionRequest = {
        prompt: question,
        model,
        temperature:
          temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
          max_tokens:MAX_TOKENS
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
