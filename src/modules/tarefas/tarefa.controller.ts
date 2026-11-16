import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { FiltroTarefaDto } from './dto/filtro-tarefa.dto';

@Controller('tarefas')
export class TarefaController {
    constructor(private readonly tarefasService: TarefaService) {}
    
    @Get()
    listar(
      @Query() filtro: FiltroTarefaDto  
    ) { return this.tarefasService.listar(); }
    
    @Get(':id')
    buscar(
        @Param('id', ParseIntPipe)
        id: number 
    ) {
        return this.tarefasService.buscar(id)
    }

    @Post()
    criar(
        @Body() body: CreateTarefaDto
    ) {
        return this.tarefasService.criar(body)
    }

    @Patch(':id')
    atualizar(
        @Param('id', ParseIntPipe)
        id: number, 
        @Body()
        body: UpdateTarefaDto
    ) {
        return this.tarefasService.atualizar(id, body)
    }

    @Delete(':id')
    @HttpCode(204)
    remover(
        @Param('id', ParseIntPipe)
        id: number
    ) {
        this.tarefasService.remover(id)
    }
}
