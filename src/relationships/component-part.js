import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('COMPONENTPART')
export class ComponentPart {

    @PrimaryGeneratedColumn({name: 'ID', type: 'int'}) id;
    
}