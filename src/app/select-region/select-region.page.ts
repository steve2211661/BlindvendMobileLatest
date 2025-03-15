import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-select-region',
  templateUrl: './select-region.page.html',
  styleUrls: ['./select-region.page.scss'],
})
export class SelectRegionPage implements OnInit {
  ClearCredit:any;
  LocalClearCredit:any;
  Regions:any;
  contacts=[];
  filterTerm: string;
  userRole:any;
  constructor(public alertController: AlertController,public httpClient: HttpClient,private router: Router,private sqlite: SQLite) 
  {
    this.GetUserInfo();
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
         if(data.rows.item(0).Role=="Administrator")
         {
          this.GetRegions();
         }
         else
         {
           this.GetRegionsByPermissionGroupID(data.rows.item(0).id)
         }
       })
         .catch(e => console.log(e));
     })
     .catch(e => console.log(e));
  }

  ngOnInit() {
  }

  ContactClicked(contact)
  {
    //console.log("Region Clicked : "+contact);
    this.CreateUserTable(contact)
  }


  CreateUserTable(SelectedRegion:any)
  {
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
 
       db.executeSql("Update SelectedRegion set SelectedRegion ='"+SelectedRegion+"' ", [])
         .then(() => 
         this.router.navigateByUrl('upload-meter-region'))
         
         .catch(e => console.log(e));
     })
     .catch(e => console.log(e));
  }

  GetRegions()
  {
    //console.log("Insert");
    try
    {
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/Regions?id=1");
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
        //console.log(parsedData.length);

        this.Regions=parsedData;
        //for (var i of parsedData)
        //{
          //qp.push(i.quantity_produced);
          ////console.log(i);
          ////console.log(i.userRight);
          //this.InsertIntoRegionsTable(i.id,i.Region);
        //}
        //console.log("Login");
 
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  GetRegionsByPermissionGroupID(id)
  {
    //console.log("Insert");
    try
    {
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/RegionsByPermissionGroupID?id="+id+"");
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
        //console.log(parsedData.length);

        this.Regions=parsedData;
        //for (var i of parsedData)
        //{
          //qp.push(i.quantity_produced);
          ////console.log(i);
          ////console.log(i.userRight);
          //this.InsertIntoRegionsTable(i.id,i.Region);
        //}
        //console.log("Login");
 
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  InsertIntoRegionsTable(id:any,Region:any)
  {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
        db.executeSql("insert into Regions(id,Region) values('"+id+"','"+Region+"')", [])
          .then(() => console.log('Executed SQL '+Region))
          .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));
  }

}
