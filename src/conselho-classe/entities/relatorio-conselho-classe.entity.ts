import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConselhoClasse } from "./conselho-classe.entity";

@Entity('relatorio_conselho_classe')
export class RelatorioConselhoClasse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    idAluno: number;

    @Column()
    idDisciplina: number;

    @Column({ default: false })
    conversaDeMais: boolean;

    @Column({ default: false })
    naoPrestaAtencao: boolean;

    @Column({ default: false })
    naoFazTarefas: boolean;

    @Column({ default: false })
    naoFazParaCasa: boolean;

    @Column({ nullable: true })
    outros: string;

    @ManyToOne(() => ConselhoClasse, conselho => conselho.relatorios, { onDelete: 'CASCADE' })
    conselho: ConselhoClasse;
}