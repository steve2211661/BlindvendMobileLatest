import { Component, OnInit } from '@angular/core';
import { Platform, NavController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-clear-credit',
  templateUrl: './clear-credit.page.html',
  styleUrls: ['./clear-credit.page.scss'],
})
export class ClearCreditPage implements OnInit {
  MeterNum:any;
  SGC:any;
  KRN:any;
  TI:any;
  ClearCredit:any;
  LocalClearCredit:any;
  gotResponse:boolean=true;
  Message:any;
  Token:any;
  HasMeterRights:boolean=false;
  PermissionGroupID:any;
  userRole:any;
  TokenMade:boolean=true;
  TokenMsg:string;
  Resource:any;
  UserName:any;
  Password:any;
  public PersonalForm: FormGroup;

  constructor(public alertController: AlertController,private sqlite: SQLite,private plt: Platform,private router: Router,public formBuilder: FormBuilder,public httpClient: HttpClient,private socialSharing: SocialSharing)
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
         this.UserName=data.rows.item(0).username;
         this.Password=data.rows.item(0).Password;
       })
         .catch(e => console.log(e));
     })
     .catch(e => console.log(e));
  }

  Validation()
  {
    this.PersonalForm = this.formBuilder.group({
      MeterNum: ['',[Validators.required,Validators.minLength(11),Validators.maxLength(13)]],
      KRN: ['',[Validators.required,Validators.minLength(1)] ],
      SGC: ['',[Validators.required,Validators.minLength(6)]],
      TI: ['',[Validators.required,Validators.minLength(1)] ],
  });
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
    this.socialSharing.shareViaEmail(this.Message, 'Blindvend', null)
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

          if(this.Resource=="Electricity" && i.resourceID!=1 &&  i.resourceID!=3)
          {
            //console.log("Resource : "+this.Resource);
            //console.log("ResourceID : "+i.resourceID);
            this.presentElectricityAlert();
          }
          else if(this.Resource=="Water" && i.resourceID!=2 &&  i.resourceID!=3)
          {
            //console.log("Resource : "+this.Resource)
            //console.log("ResourceID : "+this.Resource)
            this.presentWaterAlert();
          }
          else
          {
            this.SGC = i.sgc;
            this.TI = i.ti;
            this.KRN = i.krn;
          }
        }
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  async presentElectricityAlert()
  {
    const alert = await this.alertController.create({
      header: 'Invalid Resource',
      subHeader: '',
      message: 'This is not a valid Electricity Meter.',
      buttons: ['OK']
    });
 
    await alert.present();
  }

  async presentWaterAlert()
  {
    const alert = await this.alertController.create({
      header: 'Invalid Resource',
      subHeader: '',
      message: 'This is not a valid Water Meter.',
      buttons: ['OK']
    });
 
    await alert.present();
  }

  ionViewWillEnter()
  {
    //this.AutoSync();
    this.plt.backButton.subscribe(()=>{
      this.router.navigateByUrl('/folder');
    })  
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
          //console.log("UserRole : "+this.userRole);
          this.presentMeterRightsAlert();
          this.HasMeterRights=false;
          this.SGC = "";
          this.TI = "";
          this.KRN = "";
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
    if(MeterNumber.length==11||MeterNumber.length==13)
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
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/ClearCredit?NoTokens=1&MeterNo="+this.MeterNum+"&SGC="+this.SGC+"&KRN="+this.KRN+"&TI="+this.TI+"&UserName="+this.UserName+"&Password="+this.Password+"");
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

        this.Token = stringifiedData.substring(0,5) + "-" +stringifiedData.substring(5,9) + "-" + stringifiedData.substring(9,13) + "-" + stringifiedData.substring(13,17) + "-" +stringifiedData.substring(17,21);
        //console.log("got response");
        this.gotResponse=false;
        this.TokenMade = false;
        this.Message = "Please enter token: "+this.Token+" into Meter: "+this.MeterNum+" to clear credit."
        this.TokenMsg = this.Token.toString().replace('"','');

        //console.log("Message : "+this.Message);

        this.InsertMessage();
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  async BasicShare()
{
  await Share.share({
    title: 'Clear Credit Token',
    text: this.Message,
    url: null,
  });
}

  InsertMessage()
  {
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
 
       db.executeSql("update Message set Message = '"+this.Message+"' where id ='1'", [])
         .then(() => console.log('Message Saved : '+this.Message))
         .catch(e => console.log(e));
   
     })
     .catch(e => console.log(e));
  }

}
