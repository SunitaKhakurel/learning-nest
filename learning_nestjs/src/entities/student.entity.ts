import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:100})
    name:string;
}