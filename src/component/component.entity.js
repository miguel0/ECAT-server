import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { ComponentPart } from "../relationships/component-part";
import { GroupComponent } from "../relationships/group-component";

@Entity('COMPONENT')
export class Component {

    @PrimaryGeneratedColumn({name:'ID', type:'int'}) id;
    @Column({name: 'NAME', type:'varchar2'}) name;
    @Column({name: 'SPNAME', type:'varchar2'}) spName;
    @Column({name: 'CHNAME', type:'varchar2'}) chName;
    @Column({name: 'OTHERNAME', type:'varchar2'}) otherName;
    @Column({name: 'IMAGEURL', type: 'varchar2'}) imageURL;

    // Relations

    @OneToMany(() => GroupComponent, groupComponent => groupComponent.component)
    groupComponents;

    @OneToMany(() => ComponentPart, componentPart => componentPart.component)
    componentParts;

}