import { IsString ,IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class ModelAnswer{

    @IsNumber()
    @IsOptional()
    temperature: number

    @IsString()
    @IsOptional()
    modelId: string

    @IsString()
    @IsNotEmpty()
    question: string
}