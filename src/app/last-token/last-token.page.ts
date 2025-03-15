import { Component, OnInit } from '@angular/core';
import { Platform, NavController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SMS } from '@ionic-native/sms/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-last-token',
  templateUrl: './last-token.page.html',
  styleUrls: ['./last-token.page.scss'],
})
export class LastTokenPage implements OnInit {
  MeterNum:any;
  SGCF:any;
  KRNF:any;
  TIF:any;
  SGCT:any;
  KRNT:any;
  TIT:any;
  ClearCredit:any;
  LocalClearCredit:any;
  Token:any;
  gotResponse:boolean=true;
  Message:any;
  HasMeterRights:boolean=false;
  PermissionGroupID:any;
  userRole:any;
  TokenMade:boolean=true;
  TokenTypeB:boolean=true;
  Token1:any;
  Token2:any;

  TokenType:any;
  DateTokensMade:any;
  TimeTokensMade:any;
  TokenAmount:any;
  MeterNumber:any;
  CostOfUnits:any;
  Units:any;
  Username:any;

  public PersonalForm: FormGroup;
  constructor(public alertController: AlertController,private plt: Platform,private sqlite: SQLite,public formBuilder: FormBuilder,private router: Router,public httpClient: HttpClient,private sms: SMS,private socialSharing: SocialSharing)
  {
    //console.log("In Last Token");
    this.Validation();
    this.GetUserInfo();
  }

  async BasicShare()
  {
    await Share.share({
      title: 'Key Change Tokens',
      text: this.Message,
      url: null,
    });
  }
  
    GetUserInfo()
    {
     //console.log("In Get user Info");
     this.sqlite.create({
       name: 'data.db',
       location: 'default'
     })
       .then((db: SQLiteObject) => {
   
         db.executeSql("Select * from Users", [])
         .then((data:any) =>
         {
           //console.log('User Details');
           //console.log('Details id : '+data.rows.item(0).id); 
           //console.log('Details username : '+data.rows.item(0).username); 
           //console.log('Details Password : '+data.rows.item(0).Password); 
           //console.log('Details Role : '+data.rows.item(0).Role); 
           //console.log('Details UserID : '+data.rows.item(0).UserID); 
           this.userRole = data.rows.item(0).Role;
           this.PermissionGroupID = data.rows.item(0).id;
         })
           .catch(e => console.log(e));
       })
       .catch(e => console.log(e));
    }
  
    Validation()
    {
      this.PersonalForm = this.formBuilder.group({
        MeterNum: ['',[Validators.required,Validators.minLength(11)] ]
    });
    }

  doSomething(MeterNumber)
  {
    ////console.log(MeterNumber);
    //console.log(MeterNumber.length);
    if(MeterNumber.length==11||MeterNumber.length==13)
    {
      //console.log("in 11");
      //this.GetMeterInfo(MeterNumber);
      this.CheckMeterRights();
    }
  }

  CheckMeterRights() 
  {
    try
    {
      //console.log("In check meter rights");
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/MeterRights?MeterNum="+this.MeterNum+"&PermissionGroupID="+this.PermissionGroupID+"");
      this.ClearCredit.subscribe((data) => 
      {
        this.LocalClearCredit = Object.values(data);
        var stringifiedData = JSON.stringify(data);
        var parsedData = JSON.parse(stringifiedData);
        //this.localUser = data;
        ////console.log('my data constructor: ', data);

        //console.log("Meter Info");

        ////console.log(this.LocalClearCredit);
        ////console.log(stringifiedData);
        //console.log(parsedData);
        if(parsedData=="Has Meter Rights" || this.userRole=="Administrator")
        {
          //console.log("Has Meter Rights");
          this.GetMeterInfo(this.MeterNum);
          this.HasMeterRights=true;
        }
        else
        {
          //console.log("Has No Meter Rights");
          this.presentMeterRightsAlert();
          this.HasMeterRights=false;
        }
  
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  GetMeterInfo(MeterNum)
  {
    try
    {
      //console.log("GetMeterInfo");
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/LastToken?MeterNo="+MeterNum+"");
      this.ClearCredit.subscribe((data) => 
      {
        this.LocalClearCredit = Object.values(data);
        var stringifiedData = JSON.stringify(data);
        var parsedData = JSON.parse(stringifiedData);
        //this.localUser = data;
        ////console.log('my data constructor: ', data);

        //console.log(this.LocalClearCredit);
        //console.log(stringifiedData);
        //console.log(parsedData);

        //console.log("Meter Info");

        var qp = []
        for (var i of parsedData)
        {
          //qp.push(i.quantity_produced);
          //console.log("HERE");
          //console.log(i);
          //console.log(i.tokenType);
          //console.log(i.dateTokensMade);
          //console.log(i.timeTokensMade);
          //console.log(i.tokenAmount);
          //console.log(i.meterNumber);
          //console.log(i.costOfUnits);
          //console.log(i.units);
          //console.log(i.token);
          //console.log(i.token2);
          //console.log(i.userName);

          this.TokenType=i.tokenType;
          this.DateTokensMade=i.dateTokensMade.toString().substring(0,10);
          this.TimeTokensMade=i.timeTokensMade;
          this.TokenAmount=i.tokenAmount;
          this.CostOfUnits=i.costOfUnits;
          this.Units=i.units;
          this.Token=i.token;
          this.Token2=i.token2;
          this.Username=i.userName;

          this.Token1=this.Token = i.token.substring(0,4) + "-" +i.token.substring(4,8) + "-" + i.token.substring(8,12) + "-" + i.token.substring(12,16) + "-" +i.token.substring(16,20);
          this.gotResponse=false;
          this.Message = "REPRINT "+this.TokenType+", Date Token Made :"+this.DateTokensMade +", Units :"+this.Units +", Token : "+this.Token1

          this.TokenMade=false;
          if(i.tokenType=="Credit")
          {
            this.TokenTypeB=false;
          }

        }
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  async presentMeterRightsAlert()
  {
    const alert = await this.alertController.create({
      header: 'Invalid User Rights',
      subHeader: '',
      message: 'You do not have any rights to this meter.',
      buttons: ['OK']
    });
 
    await alert.present();
  }

  ngOnInit() {
  }

}
