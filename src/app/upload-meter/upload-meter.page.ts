import { Component, OnInit } from '@angular/core';
import { Platform, NavController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-upload-meter',
  templateUrl: './upload-meter.page.html',
  styleUrls: ['./upload-meter.page.scss'],
})
export class UploadMeterPage implements OnInit {
  ClearCredit:any;
  LocalClearCredit:any;
  MeterNum:any;
  PermissionGroupID:any;

  public PersonalForm: FormGroup;

  constructor(public alertController: AlertController,private sqlite: SQLite,private plt: Platform,private router: Router,public formBuilder: FormBuilder,public httpClient: HttpClient,private socialSharing: SocialSharing)
  { 
    this.Validation();
    this.GetUserInfo();
  }

  GetUserInfo()
  {
   //console.log("In Get Info");
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
 
       db.executeSql("Select * from Users", [])
       .then((data:any) =>
       {
         //console.log('Setting Record');
         //console.log('data length : '+data.rows.length);
         //console.log('Data item : '+data.rows.item(0).id);

         this.PermissionGroupID = data.rows.item(0).id;

         //console.log(data.rows.item(0));
     
       })
         .catch(e => console.log(e));
     })
     .catch(e => console.log(e));
  }

  Validation()
  {
    this.PersonalForm = this.formBuilder.group({
      MeterNum: ['',[Validators.required,Validators.minLength(11),Validators.maxLength(13)]]
  });
  }

  UploadMeter()
  {
    this.CheckMeterRights();
  }

  CheckMeterRights() 
  {
    try
    {
      //console.log("In check meter rights");
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/UploadMeter?MeterNum="+this.MeterNum+"&PermissionGroupID="+this.PermissionGroupID+"");
      this.ClearCredit.subscribe((data) => 
      {
        this.LocalClearCredit = Object.values(data);
        var stringifiedData = JSON.stringify(data);
        var parsedData = JSON.parse(stringifiedData);
        //this.localUser = data;
        ////console.log('my data constructor: ', data);

        //console.log("Meter Info");

        //console.log(this.LocalClearCredit);
        //console.log(stringifiedData);
        //console.log(parsedData);
  
        this.presentLoginAlert(parsedData);
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  ngOnInit() {
  }

  async presentLoginAlert(Message:any)
  {
    const alert = await this.alertController.create({
      header: 'Upload Status',
      subHeader: '',
      message: Message,
      buttons: ['OK']
    });
 
    await alert.present();
  }

}
