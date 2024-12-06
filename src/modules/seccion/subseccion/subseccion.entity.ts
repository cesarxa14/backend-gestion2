import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Seccion } from '../seccion.entity';

@Entity('subsecciones') // Nombre de la tabla en la base de datos
export class Subseccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, type: 'varchar'})
  name: string;

  @Column({nullable: false, type: 'varchar'})
  description: string;

  @Column({nullable: false, type: 'varchar'})
  image_header: string;

  @ManyToOne(() => Seccion, (seccion) => seccion.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seccion_id' }) 
  seccion: Seccion;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
