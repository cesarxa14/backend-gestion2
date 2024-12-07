import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Contenido } from '../contenido.entity';

@Entity('bloques') // Nombre de la tabla en la base de datos
export class Bloque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, type: 'varchar'})
  content: string;

  @ManyToOne(() => Contenido, (content) => content.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contenido_id' }) 
  contenido: Contenido;


  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

