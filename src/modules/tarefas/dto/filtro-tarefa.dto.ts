import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class FiltroTarefaDto {
    @IsOptional()
    @IsIn(['true', 'false'], { message: 'feita deve ser true ou false' })
    feita?: string
}