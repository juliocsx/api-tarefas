import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTarefaDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    titulo: string;

    @IsNumber()
    @IsOptional()
    id_categoria?: number;
}