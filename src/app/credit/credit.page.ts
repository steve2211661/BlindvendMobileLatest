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
import { AppLauncher } from '@capacitor/app-launcher';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {
  
  MeterNum:any;
  SGC:any;
  KRN:any;
  TI:any;
  ClearCredit:any;
  LocalClearCredit:any;
  Token:any;
  gotResponse:boolean=true;
  Message:any;
  CreditType:any;
  CreditType1:any;
  CreditTypeCurrency:any;
  Currency:any;
  Currency1:number;
  Rate:number;
  Units:number;
  HasMeterRights:boolean=false;
  PermissionGroupID:any;
  Resource:any;
  userRole:any;
  TokenMade:boolean=true;
  TokenMessage:string;
  kwh:any;
  UserName:any;
  Password:any;
  public PersonalForm: FormGroup;

  constructor(public alertController: AlertController,private plt: Platform,private sqlite: SQLite,public formBuilder: FormBuilder,private router: Router,public httpClient: HttpClient,private sms: SMS,private socialSharing: SocialSharing)
  { 
    this.plt.backButton.subscribeWithPriority(10, () => {
      //console.log('Handler was called!');
      this.router.navigateByUrl('/folder');
    });
    this.Validation();
    this.GetResourceInfo();
    this.GetUserInfo();
    this.Currency="Rand";
    this.CreditType1 = "Currency";
    this.radioChecked("Currency"); 
  }

  checkCanOpenUrl = async () => {
    const { value } = await AppLauncher.canOpenUrl({ url: 'com.facebook.katana' });
  
    console.log('Can open url: ', value);
  };

  async BasicShare()
{
  await Share.share({
    title: 'Credit Token',
    text: this.Message,
    url: null,
  });
  }
  
  async Share()
  {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
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
      MeterNum: ['',[Validators.required,Validators.minLength(11),Validators.maxLength(13)] ],
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

  //ContactsWhatsapp()
  //{
    //console.log("Whatsapp Clicked");
    //this.router.navigateByUrl('/whatsapp-contact');
    // this.socialSharing.canShareVia('whatsapp', 'Hi', null, null, null).then( () => {
   //console.log("Can share via whatssapp");
   //this.socialSharing.shareViaWhatsApp('Hi', null, null).then( () => {
     //console.log("Whatsapp sent");
  //}).catch(e => //console.log("Error sending whatsapp"+e));
//}).catch(e => //console.log("Cant send whatssapp "+e));
  //}
    //this.socialSharing.shareViaWhatsApp(this.Message, null, null).then( () => {
    ////console.log("Whatsapp sent");
  //}).catch(e => //console.log("Error sending whatsapp"+e));
  //}

  ContactEmail()
  {
    this.socialSharing.shareViaEmail(this.Message, 'Blindvend App Test', ['email@address.com'])
  }

  radioChecked(CreditType)
  {
    //console.log(CreditType)
    //this.CreditType = CreditType;
    //console.log(this.CreditType);
    if(CreditType=="Units")
    {
      //console.log("Units Clicked");
      this.CreditType=false;
      this.CreditTypeCurrency=true;
    }

    if(CreditType=="Currency")
    {
      //console.log("Currency Clicked");
      this.CreditType=true;
      this.CreditTypeCurrency=false;
    }
  }

  CurrencyChecked(Currency)
  {
    //console.log("Currency : "+Currency);
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
          this.HasMeterRights=true;
          console.log("Has Meter Rights");
          this.GetMeterInfo(this.MeterNum);
        }
        else
        {
          //console.log("Has No Meter Rights");
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

  ngOnInit() {
  }

  CheckReff()
  {
    //console.log("in Check Reff");
    //console.log("CheckReff : "+this.HasMeterRights);
    if(this.HasMeterRights==true)
    {
      //
        //console.log("Meter Number "+this.MeterNum.toString().substring(0,2));
        //console.log("Resource "+this.Resource)
        if(this.MeterNum.toString().substring(0,2)=='04' && this.Resource=="Water"||this.MeterNum.toString().substring(0,2)=='07' && this.Resource=="Water"||this.MeterNum.toString().substring(0,2)=='14' && this.Resource=="Water"||this.MeterNum.toString().substring(0,2)=='82' && this.Resource=="Water")
        {
          this.presentWaterMeterAlert()
        }
        else if(this.MeterNum.toString().substring(0,2)=='41' && this.Resource=="Electricity"||this.MeterNum.toString().substring(0,2)=='19' && this.Resource=="Electricity")
        {
          this.presentElectricityAlert()
        }
        else
        {
          //console.log("Has Meter Rights and is a valid resource");
          if(this.CreditTypeCurrency==false)
          {
            this.CreditCurrency();
          }
          else
          {
            this.CreditUnits();
          }
        }
    }
    else
    {
      //console.log("No Meter Rights");
      this.presentMeterRightsAlert();
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

  doSomething(MeterNumber)
  {
    console.log(MeterNumber);
    console.log(MeterNumber.length);
    
    if(MeterNumber.length==11 || MeterNumber.length==13)
    {
      console.log("in DoSomething : "+MeterNumber.Length);
      console.log("UserRole "+this.userRole)
      if(this.userRole=="Administrator")
      {
        this.CheckMeterRights();
      }
      else
      {
        this.CheckMeterRights();
      }  
    }
    if(MeterNumber.length==2 && this.Resource=="Water")
    {
      if(MeterNumber.toString().substring(0,2)=='04'||MeterNumber.toString().substring(0,2)=='07'||MeterNumber.toString().substring(0,2)=='14'||MeterNumber.toString().substring(0,2)=='14')
      {
        this.presentWaterMeterAlert()
      }
    }
    if(MeterNumber.length==2 && this.Resource=="Electricity")
    {
      //console.log(MeterNumber.toString().substring(0,2)=='41');
      if(MeterNumber.toString().substring(0,2)=='01' || MeterNumber.toString().substring(0,2)=='41'||MeterNumber.toString().substring(0,2)=='19')
      {
        this.presentElectricityMeterAlert()
      }
    }
  }

  GetMeterInfo(MeterNum)
  {
    try
    {
      console.log("GetMeterInfo");
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
          console.log(i);
          console.log(i.meterNumber);
          console.log(i.sgc);
          console.log(i.ti);
          console.log(i.krn);
          console.log(i.kwh);
          console.log(i.kwhRate);
          console.log(i.currencyCode);
          console.log(i.currencyValue);
          this.SGC = i.sgc;
          this.TI = i.ti;
          this.KRN = i.krn;
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



  CreditCurrency()
  {
    //console.log("this.Rate "+this.Rate); 
    this.Units =this.Currency1/this.Rate;
    //console.log("this.Units 2 "+this.Units); 
    //console.log("In CreditCurrency "+this.Units.toString());
    try
    {
      //console.log("http://services.webvend.co.za/MobileAppService/api/CreditCurrency?NoTokens=1&MeterNo="+this.MeterNum+"&SGC="+this.SGC+"&KRN="+this.KRN+"&TI="+this.TI+"&Currency="+this.Currency1+"&CurrencyCode=ZAR&CurrencyName=Rand&KWHRate="+this.Rate.toString()+"&Units="+this.Units+"&Resource="+this.Resource+"&UserName="+this.UserName+"&Password="+this.Password+"")
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/CreditCurrency?NoTokens=1&MeterNo="+this.MeterNum+"&SGC="+this.SGC+"&KRN="+this.KRN+"&TI="+this.TI+"&Currency="+this.Currency1+"&CurrencyCode=ZAR&CurrencyName=Rand&KWHRate="+this.Rate.toString()+"&Units="+this.Units+"&Resource="+this.Resource+"&UserName="+this.UserName+"&Password="+this.Password+"");
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

        this.Token = stringifiedData.substring(0,5) + "-" +stringifiedData.substring(5,9) + "-" + stringifiedData.substring(9,13) + "-" + stringifiedData.substring(13,17) + "-" +stringifiedData.substring(17,21);
        this.TokenMade = false;
        //console.log("got response");
        this.TokenMessage = this.Token.toString().replace('"','')
        this.kwh = this.Units.toFixed(2).toString()+" kWh.";
        this.Units = Number(this.Units.toFixed(2).toString());
        this.gotResponse=false;
        this.Message = "Please enter token: "+this.Token+" into Meter: "+this.MeterNum+" to perform credit of "+this.Units.toFixed(2).toString()+" kWh."
        //console.log("Token : "+this.Message);
        this.InsertMessage();

      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  CreditUnits()
  {
    //console.log("In CreditUnits");
    //console.log("this.Units 2 "+this.Units.toString().replace(',','.')); 
    //console.log("In Credit Units 2 "+this.Units);
    try
    {
      //console.log("http://services.webvend.co.za/MobileAppService/api/CreditUnits?NoTokens=1&MeterNo="+this.MeterNum+"&SGC="+this.SGC+"&KRN="+this.KRN+"&TI="+this.TI+"&Units="+this.Units.toString()+"&Resource="+this.Resource+"&UserName="+this.UserName+"&Password="+this.Password+"");
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/CreditUnits?NoTokens=1&MeterNo="+this.MeterNum+"&SGC="+this.SGC+"&KRN="+this.KRN+"&TI="+this.TI+"&Units="+this.Units.toString()+"&Resource="+this.Resource+"&UserName="+this.UserName+"&Password="+this.Password+"");
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

        this.Token = stringifiedData.substring(0,5) + "-" +stringifiedData.substring(5,9) + "-" + stringifiedData.substring(9,13) + "-" + stringifiedData.substring(13,17) + "-" +stringifiedData.substring(17,21);

        //console.log("got response");
        this.gotResponse=false;
        this.TokenMade = false;
        this.TokenMessage = this.Token.toString().replace('"','');
        this.kwh = this.Units.toFixed(2).toString()+" kWh.";
        this.Units = Number(this.Units.toFixed(2).toString());
        this.Message = "Please enter token: "+this.Token+" into Meter: "+this.MeterNum+" to perform credit of "+this.Units.toString()+" kWh."
        //console.log("Token : "+this.Message);
        this.InsertMessage();

      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }
  
  async presentWaterMeterAlert()
  {
    const alert = await this.alertController.create({
      header: 'Invalid Resource',
      subHeader: '',
      message: 'The selected resource is Water, This is a electricity meter number. Please change resource to Electricity before you continue.',
      buttons: ['OK']
    });
 
    await alert.present();
  }

  async presentElectricityMeterAlert()
  {
    const alert = await this.alertController.create({
      header: 'Invalid Resource',
      subHeader: '',
      message: 'The selected resource is Electricty, This is a water meter number. Please change resource to Water before you continue.',
      buttons: ['OK']
    });
 
    await alert.present();
  }

  async presentElectricityAlert()
  {
    const alert = await this.alertController.create({
      header: 'Invalid Resource',
      subHeader: '',
      message: 'This is not a valid Electricity Meter, Please change resource type to Water before you continue.',
      buttons: ['OK']
    });
 
    await alert.present();
  }

  async presentWaterAlert()
  {
    const alert = await this.alertController.create({
      header: 'Invalid Resource',
      subHeader: '',
      message: 'This is not a valid Water Meter, Please change resource type to Electricity before you continue.',
      buttons: ['OK']
    });
 
    await alert.present();
  }

}
