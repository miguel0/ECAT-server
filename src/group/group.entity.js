import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { GroupComponent } from '../relationships/group-component/group-component.entity';
import { VehicleGroup } from '../relationships/vehicle-group/vehicle-group.entity';

@Entity('GRP')
export class Group {
    @PrimaryGeneratedColumn({name: 'ID', type:'int'}) id;
    @Column({name: 'NAME', type:'varchar2'}) name;
    @Column({name: 'SPNAME', type:'varchar2'}) spName;
    @Column({name: 'CHNAME', type:'varchar2'}) chName;
    @Column({name: 'OTHERNAME', type:'varchar2'}) otherName;

    // Relations

    @OneToMany(() => VehicleGroup, vehicleGroup => vehicleGroup.group)
    vehicleGroups;

    @OneToMany(() => GroupComponent, groupComponent => groupComponent.group)
    groupComponents;

}