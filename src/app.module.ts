import { Module } from '@nestjs/common';
import { TarefasModule } from './modules/tarefas/tarefa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './modules/categorias/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'dados.sqlite',
      autoLoadEntities: true,
      logging: true
    }),
    TarefasModule,
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
