import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity('PART')
export class Part {
    
    @PrimaryColumn({name: 'ID', type: 'varchar2'}) id;
    @Column({name: 'NAME', type: 'varchar2'}) name;
    @Column({name: 'CHNAME', type: 'varchar2'}) chName;
    @Column({name: 'SPNAME', type: 'varchar2'}) spName;
    @Column({name: 'OTHERNAME', type: 'varchar2'}) otherName;
    @Column({name: 'IMAGEURL', type: 'varchar2'}) imageURL;

}