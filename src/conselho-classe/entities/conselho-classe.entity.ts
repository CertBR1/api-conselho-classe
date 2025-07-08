import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RelatorioConselhoClasse } from "./relatorio-conselho-classe.entity";

@Entity('conselho_classe')
export class ConselhoClasse {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    data: Date;

    @Column()
    idCordenador: number;

    @OneToMany(() => RelatorioConselhoClasse, relatorio => relatorio.conselho)
    relatorios: RelatorioConselhoClasse[];
}
