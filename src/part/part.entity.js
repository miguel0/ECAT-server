import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Part {
    
    @PrimaryColumn('varchar') id;
    @Column('varchar') name;
    @Column('varchar') chName;
    @Column('varchar') spName;
    @Column('varchar') otherName;
    @Column('varchar') imageURL;

}