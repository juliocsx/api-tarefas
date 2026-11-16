import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { FiltroTarefaDto } from './dto/filtro-tarefa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarefa } from './tarefa.entity';
import { Categoria } from '../categorias/categoria.entity';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly TarefaRepository: Repository<Tarefa>,
    
    @InjectRepository(Categoria)
    private readonly CategoriaRepository: Repository<Categoria>
  ) {}
  
  async listar() {
    return await this.TarefaRepository.find()
  }
  
  async buscar(id: number) {
    const tarefa = await this.TarefaRepository.findOneBy({ id }) 
    
    if (!tarefa) {
      throw new NotFoundException(`Tarefa ${id} não encontrado`)  
    }

    return tarefa
  }

  async criar(body: CreateTarefaDto) {
    const { id_categoria } = body

    const categoria = this.CategoriaRepository.findOneBy({ id: id_categoria })

    if (!categoria) {
      throw new NotFoundException(`Categoria ${id_categoria} não encontrado`)
    }

    return await this.TarefaRepository.save(body)
  }

  async atualizar(id: number, dados: { titulo?: string; feita?: boolean }) {
    const tarefa = await this.TarefaRepository.findOneBy({ id }) 
    
    if (!tarefa) {
      throw new NotFoundException(`Tarefa ${id} não encontrado`)  
    }

    return await this.TarefaRepository.update(id, dados);
  }

  async remover(id: number) {
    const tarefa = await this.TarefaRepository.findOneBy({ id }) 
    
    if (!tarefa) {
      throw new NotFoundException(`Tarefa ${id} não encontrado`)  
    }

    return this.TarefaRepository.remove(tarefa)
  }
}
