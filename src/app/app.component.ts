import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  resource:string="None";

  clearCredit:boolean=false;
  clearTamper:boolean=false;
  credit:boolean=false;
  keyChange:boolean=false;
  loadLimit:boolean=false;
  selectResults:any;
  userRight:Boolean=false;
  userRole:any;
  ElectColor:any;
  WaterColor:any;

  public appPages = [
    { title: 'Credit', url: '/credit', icon: 'cash' },
    { title: 'Clear Credit', url: '/clear-credit', icon: 'remove-circle' },
    { title: 'Clear Tamper', url: '/clear-tamper', icon: 'refresh-circle' },
    { title: 'Load Limit', url: '/load-limit', icon: 'trending-up' },
    { title: 'Key Change', url: '/key-change', icon: 'key' },
    { title: 'TID', url: '/key-change', icon: 'sync' },
    { title: 'Upload Meter To Region', url: '/select-region', icon: 'cloud-upload' },
    { title: 'View Last Token Made', url: '/last-token', icon: 'eye' }
  ];

  public labels = [
    { title: 'Electricity', icon: 'flash', color: "primary"},
    { title: 'Water', icon: 'water', color: "secondary"}
  ];

  //public labels = ['Electricity', 'Water'];
  constructor(public alertController: AlertController,private router : Router,private sqlite: SQLite)
  {
    this.GetUserRightsInfo();
  }

  initializeApp() {
      this.router.navigateByUrl('login');
  }

  ionViewWillEnter()
  {
    //console.log("IonViewWillEnter()");
    this.resource="None";
  }

  resourceSelected(resource)
  {
    //console.log(resource);
    this.UpdateResource(resource);
      if(resource=="Electricity")
      {
        this.ElectColor = "success"
        //console.log("Success");
      }
      else
      {
        this.ElectColor  = ""
        //console.log("Blank");
      }

      if(resource=="Water")
      {
        this.WaterColor = "success"
        //console.log("Success");
      }
      else
      {
        this.WaterColor = ""
        //console.log("Blank");
      }
      ////console.log(value);
    this.resource=resource;
  }

  GetUserInfo(page)
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
         
         //console.log(data);
         //console.log('Setting User Record');
         //console.log('data length : '+data.rows.length);
         //console.log('Data item : '+data.rows.item(0).username);
         //console.log('Data item : '+data.rows.item(0).Password);
         //console.log("UserRole :"+data.rows.item(0).Role);
 
         this.userRole = data.rows.item(0).Role;
         //console.log(data.rows.item(0));
         //console.log("Role :"+this.userRole);

         if(this.resource=="None")
         {
           if(page=="Upload Meter To Region")
           {
             //console.log("282 Upload Meter To Region");
             //console.log("283 "+this.userRole);
             if(this.userRole=="Administrator"||this.userRole=="Meter Administrator")
             {
               this.router.navigateByUrl('/select-region');
             }
             else
             {
               this.presentPermissionAlert();
             }
           }
           else if(page=="Upload Meter")
           {
             if(this.userRole=="Administrator")
             {
               this.router.navigateByUrl('/upload-meter');
             }
             else
             {
               this.presentPermissionAlert();
             }
           }
           else if(page=="View Last Token Made")
           {
             
             this.router.navigateByUrl('/last-token');
           }
           else
           {
             this.presentResourceAlert()
           } 
         }
         else if(page=="Upload Meter To Region")
         {
           //console.log("316 Upload Meter To Region");
           //console.log("317 "+this.userRole);
           if(this.userRole=="Administrator"||this.userRole=="Meter Administrator")
           {
             this.router.navigateByUrl('/select-region');
           }
           else
           {
             this.presentPermissionAlert();
           }
         }
         else if(page=="Upload Meter")
         {
           if(this.userRole=="Administrator")
           {
             this.router.navigateByUrl('/upload-meter');
           }
           else
           {
             this.presentPermissionAlert();
           }
         }
         else
         {
           //console.log("Page selected : "+page);
           
           //if(page=="Upload Meter To Region")
           //{
             //if(this.userRole=="Administrator")
             //{
               //this.router.navigateByUrl('/select-region');
             //}
             //else
             //{
               //this.presentPermissionAlert();
             //}
           //}
     
     
           if(page=="Credit")
           {
             this.GetUserRight("Credit Token")
           }
       
             if(page=="Clear Credit")
             {
               this.GetUserRight("Clear Credit")
             }
     
             if(page=="TID")
             {
               this.router.navigateByUrl('/tid');
             }
       
             if(page=="Clear Tamper")
             {
               this.GetUserRight("Clear Tamper")
             }
       
             if(page=="Load Limit")
             { 
               this.GetUserRight("Load Limit")
             }
       
             if(page=="Key Change")
             {
               this.GetUserRight("Key Change")
             }

            if(page=="View Last Token Made")
           {
             
             this.router.navigateByUrl('/last-token');
           }
             //console.log(page);
         }
     
       })
         .catch(e => console.log(e));
   
   
     })
     .catch(e => console.log(e));
  }

  GetUserRightsInfo()
  {
   //console.log("In Get user rightsInfo");
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
 
       db.executeSql("Select * from UserRights", [])
       .then((data:any) =>
       {
        for (let i = 0; i < data.rows.length; i++)
        {
          let item = data.rows.item(i);
          // do something with it

          //console.log('UserRight : '+ item.UserRight);
        }
     
       })
         .catch(e => console.log(e));
   
   
     })
     .catch(e => console.log(e));
  }

  GetUserRole()
  {
   //console.log("In Get user rightsInfo");
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
 
       db.executeSql("Select * from UserRights", [])
       .then((data:any) =>
       {
        for (let i = 0; i < data.rows.length; i++)
        {
          let item = data.rows.item(i);
          // do something with it

          //console.log('UserRight : '+ item.UserRight);
        }
     
       })
         .catch(e => console.log(e));
   
   
     })
     .catch(e => console.log(e));
  }

  async presentResourceAlert()
  {
    const alert = await this.alertController.create({
      header: 'Resource',
      subHeader: '',
      message: 'Please select resource first.',
      buttons: ['OK']
    });
 
    await alert.present();
  }

  UpdateResource(Resource:any)
  {
    //console.log("In Update Resource :"+Resource);
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
  
        db.executeSql("Update Resource set Resource = '"+Resource+"'", [])
        .then(() =>{})
        .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));
  }

  async presentPermissionAlert()
  {
    const alert = await this.alertController.create({
      header: 'Limited Permission',
      subHeader: '',
      message: 'Permission Denied.',
      buttons: ['OK']
    });
 
    await alert.present();
  }

  GetUserRight(UserRight)
  {
   //console.log("In Get specific User Right");
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
 
       db.executeSql("Select * from UserRights where UserRight='"+UserRight+"' ", [])
       .then((data:any) =>
       {
         //console.log('Setting Record');
         //console.log('data length : '+data.rows.length);

         //console.log(data.rows.item(0));
         
         if(data.rows.length>0)
         {
          if(UserRight=="Key Change")
          {
            this.router.navigateByUrl('/key-change');
          }

          if(UserRight=="Credit Token")
          {
            this.router.navigateByUrl('/credit');
          }

          if(UserRight=="Clear Credit")
          {
            this.router.navigateByUrl('/clear-credit');
          }

          if(UserRight=="Clear Tamper")
          {
            this.router.navigateByUrl('/clear-tamper');
          }

          if(UserRight=="Key Change")
          {
            this.router.navigateByUrl('/key-change');
          }

          if(UserRight=="Load Limit")
          {
            this.router.navigateByUrl('/load-limit');
          }

         }
         else
         {
          this.presentPermissionAlert();
         }
     
       })
         .catch(e => console.log(e));
     })
     .catch(e => console.log(e));
  }

  pageSelected(page)
  {
    this.GetUserInfo(page);
  }

}
