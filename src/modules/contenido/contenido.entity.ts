import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Seccion } from '../seccion/seccion.entity';

@Entity('contenidos') // Nombre de la tabla en la base de datos
export class Contenido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, type: 'varchar'})
  title: string;

  @Column({nullable: false, type: 'varchar'})
  keywords: string;

  @Column({nullable: false, type: 'varchar'})
  description: string;

  @Column({nullable: true, type: 'varchar'})
  introduction: string;

  @Column({nullable: false, type: 'varchar'})
  image: string;

  @Column({nullable: false, type: 'varchar'})
  type: string; 

  @Column({nullable: true, type: 'varchar'})
  article: string; 

  @Column({nullable: true, type: 'varchar'})
  link: string; 

  @Column({nullable: true, type: 'varchar'})
  document: string; 

  @ManyToOne(() => Seccion, (seccion) => seccion.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seccion_id' }) 
  seccion: Seccion;

  @Column({nullable: false, type: 'smallint', default: 0})
  deleted: number;


  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

