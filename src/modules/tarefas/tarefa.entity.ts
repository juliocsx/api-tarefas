import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../categorias/categoria.entity";

@Entity('tarefas')
export class Tarefa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    titulo: string;

    @Column({ default: false })
    feita: boolean;

    @CreateDateColumn()
    criadaEm: Date;

    @ManyToOne(() => Categoria, (c) => c.tarefas,
    { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_categoria' })
    categoria?: Categoria

    @Column({ nullable: true })
    id_categoria: number;
}