import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'USR'})
export class User {

    @PrimaryColumn({name: 'ID', type: 'varchar2'}) id;
    @Column({name: 'EMAIL', type: 'varchar2'}) email;
    @Column({name: 'NAME', type: 'varchar2'}) name;
    @Column({name: 'ROLE', type: 'char'}) role;
    @Column({name: 'TEL', type: 'varchar2'}) tel;
    @Column({name: 'POSITION', type: 'varchar2'}) position;
    @Column({name: 'AREA', type: 'varchar2'}) area;

}