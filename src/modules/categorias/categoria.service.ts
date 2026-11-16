import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly CategoriaRepository: Repository<Categoria>
  ) {}
  
  async listar() {
    return await this.CategoriaRepository.find()
  }
  
  async buscar(id: number) {
    const categoria = await this.CategoriaRepository.findOneBy({ id }) 
    
    if (!categoria) {
      throw new NotFoundException(`Categoria ${id} não encontrado`)  
    }

    return categoria
  }

  async criar(body: CreateCategoriaDto) {
    return await this.CategoriaRepository.save(body)
  }

  async atualizar(id: number, dados: { nome?: string }) {
    const categoria = await this.CategoriaRepository.findOneBy({ id }) 
    
    if (!categoria) {
      throw new NotFoundException(`Categoria ${id} não encontrado`)  
    }

    return await this.CategoriaRepository.update(id, dados);
  }

  async remover(id: number) {
    const categoria = await this.CategoriaRepository.findOneBy({ id }) 
    
    if (!categoria) {
      throw new NotFoundException(`Categoria ${id} não encontrado`)  
    }

    return this.CategoriaRepository.remove(categoria)
  }
}
