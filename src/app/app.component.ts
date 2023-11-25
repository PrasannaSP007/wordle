import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordle';
  rules = 'Rules';
  isStarted!: boolean;
  success!:boolean;
  failure!:boolean;
  wordArray = ['VIDEO', 'AUDIO', 'PAPER', 'APPLE', 'MANGO', 'FRUIT', 'SNAKE', 'SPACE',
               'MOUSE', 'PHONE', 'EAGLE', 'LIGHT', 'SOUND', 'RIVER', 'HEART', 'BRAIN',
               'TRAIN', 'TIGER', 'HORSE', 'STAMP', 'SMILE', 'BLACK', 'BROWN', 'GREEN', 
               'EARTH', 'INDIA', 'HOUSE', 'TABLE', 'CHAIR', 'RULER', 'BOARD', 'CHESS',
               'GLASS', 'ONION', 'SPOON', 'SWEET', 'TOUCH', 'TEACH', 'STONE', 'PIZZA', 
               'STYLE', 'BRASS', 'STEEL', 'METAL', 'SHORT', 'SWORD', 'FLOOD', 'BLOOD', 
               'BREAK', 'BRAKE', 'GHOST', 'BOOST', 'CRANE', 'DRONE', 'LOTUS', 'NOISE'];
  word!:string;
  box!:any[][];
  rowIndex!:number;
  colIndex!:number;
  keyboard = [
    {key:'Q'},
    {key:'W'},
    {key:'E'},
    {key:'R'},
    {key:'T'},
    {key:'Y'},
    {key:'U'},
    {key:'I'},
    {key:'O'},
    {key:'P'},
    {key:'A'},
    {key:'S'},
    {key:'D'},
    {key:'F'},
    {key:'G'},
    {key:'H'},
    {key:'J'},
    {key:'K'},
    {key:'L'},
    {key:'BACK'},
    {key:'Z'},
    {key:'X'},
    {key:'C'},
    {key:'V'},
    {key:'B'},
    {key:'N'},
    {key:'M'},
    {key:'ENTER'}
  ];

  togglerules() {
    if(this.rules=='Rules') {
      this.rules = 'Hide Rules';
    }
    else {
      this.rules = 'Rules';
    }
  }

  reset(): any {

  this.rules = 'Rules';
  this.isStarted = false;
  this.success = false;
  this.failure = false;
  this.word = this.wordArray[Math.floor(Math.random()*this.wordArray.length) + 1];
  this.box = [
    [{color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}],
    [{color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}],
    [{color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}],
    [{color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}],
    [{color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}],
    [{color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}, {color:'', key:''}]
  ];
  
  this.rowIndex = 0;
  this.colIndex = 0;
  
  }

  start(){
    this.reset();
    this.isStarted = true;
  }

  entervalue(key :any) {

    if(key=='BACK') {
      this.clearkey();
    }

    else if(key=='ENTER') {
      this.submitData();
    }

    else {
      if((this.colIndex<5) && (this.rowIndex<6)) {
        this.box[this.rowIndex][this.colIndex].key = key;
        this.colIndex++;
      }  
    }
  }

  clearkey() {
    if(this.colIndex!=0) {
      this.colIndex--;
      this.box[this.rowIndex][this.colIndex].key = '';
    }
  }

  submitData() {
    if((this.colIndex==5) && (this.rowIndex<6)) {
      let copy = this.word;
      let guess = this.box[this.rowIndex].map((item)=> {
        return item.key;
      }).join('');
      
      // for(let i=0; i<5; i++) {
      //   if(guess.slice(i,i+1) == this.word.slice(i,i+1)) {
      //     console.log(guess.slice(i,i+1));
      //     console.log(this.word.slice(i,i+1));
      //     this.box[this.rowIndex][i].color = 'green';
      //     copy = copy.replace(this.box[this.rowIndex][i].key,'');
      //     console.log(copy);
      //   }
      // }

      this.box[this.rowIndex].map((item,index)=> {
      if(item.key == this.word.slice(index,index+1)) {
        item.color = 'green';
        copy = copy.replace(item.key,'');
      }
      });

      this.box[this.rowIndex].map((item)=> {
        if(copy.includes(item.key) && item.color!='green') {
          item.color = 'yellow';
          copy = copy.replace(item.key,'');
        }
      });

      this.box[this.rowIndex].map((item)=> {
        if(item.color=='') {
          item.color = 'gray';
        }
      });

      this.rowIndex++;
      this.colIndex = 0;

      if(this.word == guess) {  
        this.success = true;
      }

      if(this.rowIndex==6 && this.word != guess) {
        this.failure = true;
      }
    }  
  }
}
