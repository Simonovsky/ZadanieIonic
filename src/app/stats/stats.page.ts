import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Transaction } from '../Transaction';
import { Chart } from 'chart.js';
import { User } from '../User';
import { TransactionServiceService } from '../transaction-service.service';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  @ViewChild('lineCanvas',null) lineCanvas;

  mUser: User = new User();
  mTransactions: Transaction[] = new Array();
  mTypesAndAmounts = new Map<string,number>();

  mTransactionService= new TransactionServiceService(this.storage);
  mUserService = new UserServiceService(this.storage);

  lineChart: any;

  constructor(private storage:Storage, private navController:NavController) {
    this.mUserService.fetchUser().then(usr =>{
      this.mUser = usr;
      this.mTransactionService.fetchTransactions().then(trans => {
        trans.forEach(tr => {
          if(tr.senderId === this.mUser.userId){
            this.mTransactions.push(tr);
            //if my map contains type than we add amount of transaction to value in map else we create new map record
            if(this.mTypesAndAmounts.has(tr.type)){
              this.mTypesAndAmounts.set(tr.type,(this.mTypesAndAmounts.get(tr.type) + tr.amount));
            }else{
              this.mTypesAndAmounts.set(tr.type,tr.amount);
            }
          }
        });
        this.createDoughnut(this.mTypesAndAmounts)
      });
    });
  }

  backOnClick(){
    this.navController.back();
  }

  ngOnInit() {
    
  }
  public createDoughnut(inDataMap: Map<string,number>) {

    let bgColors = new Array();
    let bgHowerColors = new Array();
    inDataMap.forEach(()=>{
      bgColors.push( this.hexToRgbA(this.getRandomColor()));
      console.log("hex to rgbA = ", bgColors[bgColors.length-1]);
      bgHowerColors.push(this.getRandomColor());
    })

    console.log(inDataMap);
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: "doughnut",
        data: {
          datasets: [
            {
              label: "Stats",
              data: Array.from( inDataMap.values() ),
              backgroundColor: bgColors,
              hoverBackgroundColor: bgHowerColors
            }
          ],
          labels: Array.from( inDataMap.keys() )
        },
        options:{
          legend:{
            position:'bottom'
          }
        }
      });
      
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  hexToRgbA(hex){
    let c;
    c= hex.substring(1).split('');
    if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    // tslint:disable-next-line: no-bitwise
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
}

}
