import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Component {

    @PrimaryGeneratedColumn('int') id;
    @Column('varchar') name;
    @Column('varchar') chName;
    @Column('varchar') spName;
    @Column('varchar') otherName;
    @Column('varchar') imageURL;
    
}