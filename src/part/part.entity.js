import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import { ComponentPart } from "../relationships/component-part/component-part.entity";

@Entity('PART')
export class Part {
    
	@PrimaryColumn({name: 'ID', type: 'varchar2'}) id;
	@Column({name: 'REPLACEMENTID', type: 'varchar2'}) replacementId;
    @Column({name: 'NAME', type: 'varchar2'}) name;
    @Column({name: 'CHNAME', type: 'varchar2'}) chName;
    @Column({name: 'SPNAME', type: 'varchar2'}) spName;
    @Column({name: 'OTHERNAME', type: 'varchar2'}) otherName;
    @Column({name: 'IMAGEURL', type: 'varchar2'}) imageURL;

    // Relations

    @OneToMany(() => ComponentPart, componentPart => componentPart.part)
    componentParts;

}