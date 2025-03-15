import { Component, OnInit } from '@angular/core';
import { Contact } from '@capacitor-community/contacts';
import { Plugins } from '@capacitor/core';
import { SMS } from '@ionic-native/sms/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
const { Contacts } = Plugins; 
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
 contacts=[];
 filterTerm: string;
 Message:string;
  constructor(private sms: SMS,private sqlite: SQLite,private router: Router) {
    this.loadContacts();
    this.GetMessageInfo();
   }

  async loadContacts()
  {
    let permission = await Contacts.getPermissions();
    if(!permission.granted)
    {
     return
    }

    Contacts.getContacts().then(result=> {
      //console.log(result);
      this.contacts = result.contacts;
      this.contacts.sort((a,b) => a.displayName.localeCompare(b.displayName));
      //console.log("this.contacts "+this.contacts);
     });
  }

  public sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
    });
  }

  GetMessageInfo()
  {
   //console.log("In Get Info");
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
 
       db.executeSql("Select * from Message", [])
       .then((data:any) =>
       {
         //console.log('SMS Message');
         //console.log('data length : '+data.rows.length);
         //console.log('Message : '+data.rows.item(0).Message); 
         //console.log(data.rows.item(0));
         this.Message =data.rows.item(0).Message;
       })
         .catch(e => console.log(e));
     })
     .catch(e => console.log(e));
  }

  ContactClicked(contact)
  {
    //console.log("Contact Clicked : "+contact.number);
    this.sms.send(contact.number, this.Message);
    ////console.log("Contact Clicked 2 : "+contact[0].number);
    ////console.log("Contact Clicked 3 : "+contact[0][0].number);
    ////console.log("Contact Clicked 4 : "+contact[0][0]);
    this.router.navigateByUrl('/folder');
  }

  ngOnInit() {
  }
}
