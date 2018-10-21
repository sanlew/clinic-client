import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
export class Rule {
    id: number;
    daysOfWeek:number[];
    from: NgbTimeStruct;
    to: NgbTimeStruct;

constructor(){this.daysOfWeek=[];}
}