import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Share } from '@capacitor/share';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:any;
  password:any;
  public photos: Photo[] = [];
constructor(public alertController: AlertController,public httpClient: HttpClient,private router: Router,private sqlite: SQLite,private socialSharing: SocialSharing)
{
  this.CreateUserTable();
  this.GetUserInfo();
  this.CreateUserRightsTable();
  this.CreateMessageTable();
  this.CreateRegionsTable();
  this.CreateSelectedRegionTable();
  this.CreateResourceTable();
}
ClearCredit:any;
LocalClearCredit:any;

CreateSelectedRegionTable()
{
 this.sqlite.create({
   name: 'data.db',
   location: 'default'
 })
   .then((db: SQLiteObject) => {

     db.executeSql('create table if not exists SelectedRegion(id Text,SelectedRegion Text)', [])
       .then(() => console.log('SelectedRegion Table Created'))
       .catch(e => console.log('Error Createing SelectedRegion Table'+e));

       db.executeSql("Delete from SelectedRegion", [])
       .then(() => console.log('SelectedRegion Table Cleared'))
       .catch(e => console.log('Error Deleteing SelectedRegion Table'+e));

       db.executeSql("Insert into SelectedRegion(id,SelectedRegion) values('1','')", [])
       .then(() => console.log('SelectedRegion Table Inserted Into'))
       .catch(e => console.log('Error inserting into SelectedRegion Table'+e));
   })
   .catch(e => console.log(e));
}


async BasicShare()
{
  await Share.share({
    title: 'Share',
    text: 'Test',
    url: null,
  });
}

//ContactsWhatsapp()
//{
  //console.log("Whatsapp Clicked");
  //this.router.navigateByUrl('/whatsapp-contact');
   //this.socialSharing.canShareVia('whatsapp', 'Hi', null, null, null).then( () => {
 //console.log("Can share via whatssapp");
 //this.socialSharing.shareViaWhatsApp('Hi', null, null).then( () => {
   //console.log("Whatsapp sent");
//}).catch(e => //console.log("Error sending whatsapp"+e));
//}).catch(e => //console.log("Cant send whatssapp "+e));
//}

 Login()
 {
   //console.log("Login Clicked");
   this.InsertRateCard();
   //this.router.navigateByUrl('/folder');
 }

 CreateMessageTable()
 {
  //console.log("In Get Info");
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {

      db.executeSql("create table if not exists Message(id Text,Message Text)", [])
      .then((data:any) =>
      {
        //console.log('Message Table Created');

        db.executeSql("Delete from Message", [])
        .then((data:any) =>
        {
          db.executeSql("Insert into Message(id,Message) values('1','')", [])
          .then((data:any) =>
          {
            //console.log("Message table sorted");
          })
            .catch(e => console.log(e));
        })
          .catch(e => console.log(e));
      })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
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
        console.log('Setting Record');
        console.log('data length : '+data.rows.length);
        console.log('Data item : '+data.rows.item(0).username);
        console.log('Data item : '+data.rows.item(0).Password);

        this.email = data.rows.item(0).username;
        this.password = data.rows.item(0).Password;
        console.log(data.rows.item(0));
    
      })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
 }

 CreateUserTable()
 {
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {

      db.executeSql('create table if not exists Users(id Text,username Text,Password Text,Role Text,UserID Text)', [])
        .then(() => console.log('Users Table Created'))
        .catch(e => console.log('Error Createing User Table'+e));
  
  
    })
    .catch(e => console.log(e));
 }

 CreateRegionsTable()
 {
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {

      db.executeSql('create table if not exists Regions(id TEXT,Region Text)', [])
        .then(() => console.log('User Regions Table Created'))
        .catch(e => console.log(e));

        db.executeSql("delete from Regions", [])
        .then(() => console.log('Regions Records deleted SQL'))
        .catch(e => console.log(e));

    })
    .catch(e => console.log(e));
 }

 CreateUserRightsTable()
 {
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {

      db.executeSql('create table if not exists UserRights(UserRight Text)', [])
        .then(() => console.log('User Rights Table Created'))
        .catch(e => console.log(e));

        db.executeSql("delete from UserRights", [])
        .then(() => console.log('UserRights Records deleted SQL'))
        .catch(e => console.log(e));

    })
    .catch(e => console.log(e));
 }

 CreateResourceTable()
 {
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {

      db.executeSql('create table if not exists Resource(id TEXT,Resource Text)', [])
        .then(() => console.log('Resource Table Created'))
        .catch(e => console.log(e));

        db.executeSql("delete from Resource", [])
        .then(() => console.log('Resource Records deleted SQL'))
        .catch(e => console.log(e));

        db.executeSql("Insert into Resource(id,Resource) values('1','None')", [])
        .then(() => console.log('Resource Inserted'))
        .catch(e => console.log(e));

    })
    .catch(e => console.log(e));
 }

 InsertIntoUserTable(GroupID,name,password,role,userID)
 {
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {
  
      
  
      db.executeSql("delete from Users", [])
      .then(() => console.log('User Records deleted SQL'))
      .catch(e => console.log(e));

      console.log("Insert Into User Table");
      console.log("GroupID "+GroupID);
      console.log("name "+name);
      console.log("password "+password);
      console.log("role "+role);
      console.log("userID "+userID);

      //console.log("Insert Statement : ");
      console.log("insert into Users(id,username,Password,Role,UserID) values('"+GroupID+"','"+name+"','"+password+"','"+role+"','"+userID+"');");

      db.executeSql("insert into Users(id,username,Password,Role,UserID) values('"+GroupID+"','"+name+"','"+password+"','"+role+"','"+userID+"');", [])
        .then(() => console.log('User Records Inserted'))
        .catch(e => console.log('Error inserting user record'+e.value));
  
  
    })
    .catch(e => console.log(e));
 }

 InsertIntoUserRightsTable(UserRights)
 {
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {

      db.executeSql("insert into UserRights(UserRight) values('"+UserRights+"')", [])
        .then(() => console.log('Executed SQL '+UserRights))
        .catch(e => console.log(e));
  
  
    })
    .catch(e => console.log(e));
 }

 GetUserRights(UserID:string)
 {
   //console.log("Insert UserRights");
   try
   {
     this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/UserRights?UserID="+UserID+"");
     this.ClearCredit.subscribe((data) => 
     {
       this.LocalClearCredit = Object.values(data);
       var stringifiedData = JSON.stringify(data);
       var parsedData = JSON.parse(stringifiedData);
       //this.localUser = data;
       ////console.log('my data constructor: ', data);

       console.log(this.LocalClearCredit);
       console.log(stringifiedData);
       console.log(parsedData);
       console.log(parsedData.length);
       for (var i of parsedData)
       {
         //qp.push(i.quantity_produced);
         console.log(i);
         console.log("User Right")
         console.log(i.userRight);
         this.InsertIntoUserRightsTable(i.userRight);
       }
       //console.log("Login");

     });
   }
   catch(e)
   {
     //console.log('Error Clearing Credit : '+e)
   }
 }


 InsertRateCard()
 {
   //console.log("Insert");
   try
   {
     console.log("http://services.webvend.co.za/MobileAppService/api/Login?username="+this.email+"&password="+this.password+"");
     this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/Login?username="+this.email+"&password="+this.password+"");
     this.ClearCredit.subscribe((data) => 
     {
       this.LocalClearCredit = Object.values(data);
       var stringifiedData = JSON.stringify(data);
       var parsedData = JSON.parse(stringifiedData);
       //this.localUser = data;
       ////console.log('my data constructor: ', data);

       console.log(this.LocalClearCredit);
       console.log(stringifiedData);
       console.log(parsedData);
       console.log(parsedData.length);
       for (var i of parsedData)
       {
         //qp.push(i.quantity_produced);
         console.log("Here");
         console.log(i);
         console.log(i.userId);
         console.log(i.username);
         console.log(i.roleName);
         console.log(i.permissionGroupID);
         this.InsertIntoUserTable(i.permissionGroupID,this.email,this.password,i.roleName,i.userId);
         this.GetUserRights(i.userId);
       }

       //console.log("Julien");
       //console.log("Parsed Data "+parsedData.length);

       if(parsedData.length>=1)
       {
         this.router.navigateByUrl('/folder');
       }
       else
       {
         this.presentLoginAlert();
       }
       //console.log("Login");

     });
   }
   catch(e)
   {
     //console.log('Error Clearing Credit : '+e)
   }
 }

 async presentLoginAlert()
 {
   const alert = await this.alertController.create({
     header: 'Invalid Credentials',
     subHeader: '',
     message: 'Invalid Email or Password.',
     buttons: ['OK']
   });

   await alert.present();
 }

  ngOnInit() 
  {
  }

}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
