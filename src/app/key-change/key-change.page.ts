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
  selector: 'app-key-change',
  templateUrl: './key-change.page.html',
  styleUrls: ['./key-change.page.scss'],
})
export class KeyChangePage implements OnInit {
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
  Token1:any;
  Token2:any;
  UserName:any;
  Password:any;
  Resource:any;
  public PersonalForm: FormGroup;
  constructor(public alertController: AlertController,private plt: Platform,private sqlite: SQLite,public formBuilder: FormBuilder,private router: Router,public httpClient: HttpClient,private sms: SMS,private socialSharing: SocialSharing)
  { 
    this.Validation();
    this.GetUserInfo();
    this.GetResourceInfo();
  }

  GetResourceInfo()
  {
   //console.log("In Get Info");
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
 
       db.executeSql("Select * from Resource", [])
       .then((data:any) =>
       {
         //console.log('Meter Resource');
         //console.log('Message : '+data.rows.item(0).Resource); 
         this.Resource= data.rows.item(0).Resource
       })
         .catch(e => console.log(e));
     })
     .catch(e => console.log(e));
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
         this.UserName = data.rows.item(0).username;
         this.Password = data.rows.item(0).Password;
         
       })
         .catch(e => console.log(e));
     })
     .catch(e => console.log(e));
  }

  Validation()
  {
    this.PersonalForm = this.formBuilder.group({
      MeterNum: ['',[Validators.required,Validators.minLength(11),Validators.maxLength(13)] ],
      KRNF: ['',[Validators.required,Validators.minLength(1)] ],
      SGCF: ['',[Validators.required,Validators.minLength(6)]],
      TIF: ['',[Validators.required,Validators.minLength(1)] ],
      KRNT: ['',[Validators.required,Validators.minLength(1)] ],
      SGCT: ['',[Validators.required,Validators.minLength(6)]],
      TIT: ['',[Validators.required,Validators.minLength(1)] ],
  });
  }

  ionViewWillEnter()
  {
    //this.AutoSync();
    this.plt.backButton.subscribe(()=>{
      this.router.navigateByUrl('/folder');
    })  
  }

  Contacts()
  {
    //console.log("Contacts Clicked");
    this.router.navigateByUrl('/contact');
  }

  ContactsWhatsapp()
  {
    //console.log("Contacts Clicked");
    //this.router.navigateByUrl('/whatsapp-contact');
    this.socialSharing.shareViaWhatsApp(this.Message, null, null)
  }

  ContactEmail()
  {
    this.socialSharing.shareViaEmail(this.Message, 'Blindvend App Test', ['email@address.com'])
  }

  GetMeterInfo(MeterNum)
  {
    try
    {
      //console.log("GetMeterInfo");
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/MeterInfo?MeterNo="+MeterNum+"");
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
          //console.log(i);
          //console.log(i.meterNumber);
          //console.log(i.sgc);
          //console.log(i.ti);
          //console.log(i.krn);
          //console.log(i.kwh);
          //console.log(i.kwhRate);
          //console.log(i.currencyCode);
          //console.log(i.currencyValue);
          this.SGCF = i.sgc;
          this.TIF = i.ti;
          this.KRNF = i.krn;
        }
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  InsertMessage()
  {
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
 
       db.executeSql("update Message set Message = '"+this.Message+"' where id ='1'", [])
         .then(() => console.log('Message Saved'))
         .catch(e => console.log(e));
   
     })
     .catch(e => console.log(e));
  }

  ngOnInit() {
  }

  checkReff()
  {
    //console.log("CheckReff : "+this.HasMeterRights);
    if(this.HasMeterRights==true)
    {
      //console.log("Has Meter Rights");
      this.InsertRateCard();
    }
    else
    {
      //console.log("No Meter Rights");
      this.presentMeterRightsAlert();
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
          this.SGCF = "";
          this.TIF = "";
          this.KRNF = "";
        }
  
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  doSomething(MeterNumber)
  {
    ////console.log(MeterNumber);
    //console.log(MeterNumber.length);
    if(MeterNumber.length==11 || MeterNumber.length==13)
    {
      //console.log("in 11");
      //this.GetMeterInfo(MeterNumber);
      this.CheckMeterRights();
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

  InsertRateCard()
  {
    try
    {
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/KeyChange?NoTokens=1&MeterNo="+this.MeterNum+"&SGC="+this.SGCF+"&KRN="+this.KRNF+"&TI="+this.TIF+"&ToSGC="+this.SGCT+"&ToTI="+this.TIT+"&ToKRN="+this.KRNT+"&UserName="+this.UserName+"&Password="+this.Password+"&Resource="+this.Resource+"");
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
        //console.log("Length :"+stringifiedData.length);

        this.Token = stringifiedData;

        this.TokenMade=false;

        let fulltoken =stringifiedData;
        let tokens = fulltoken.split(",");
        this.Token1 = tokens[0].toString().replace('"Token 1 :','');
        var t2 = tokens[1].toString().replace('Token 2 :','');
        this.Token2 = t2.toString().replace('"','');

        //console.log("got response");
        this.gotResponse=false;
        this.Message = "Please enter tokens "+this.Token+" into Meter: "+this.MeterNum+" to key change"
        //console.log("Token : "+this.Message);
        this.InsertMessage();

      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

}
