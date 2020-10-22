import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('COMPONENT')
export class Component {

    @PrimaryGeneratedColumn({name:'ID', type:'int'}) id;
    @Column({name: 'NAME', type:'varchar2'}) name;
    @Column({name: 'SPNAME', type:'varchar2'}) spName;
    @Column({name: 'CHNAME', type:'varchar2'}) chName;
    @Column({name: 'OTHERNAME', type:'varchar2'}) otherName;
    @Column({name: 'IMAGEURL', type: 'varchar2'}) imageURL;

}