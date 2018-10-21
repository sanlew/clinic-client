// import { Graphic } from './graphic';
// import { Visit } from './visit';

export class Event {
    id: number;
    available: boolean;
    date: Date;
    from: string;
    to: string;
//    visit: Visit;
//    graphic:Graphic;

costructor(available:boolean,date:Date,from:string,to:string){
    this.available = available;
    this.date = date;
    this.from = from;
    this.to = to;
}

}