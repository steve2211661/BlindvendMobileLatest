import { Component, OnInit } from '@angular/core';
import { Contact } from '@capacitor-community/contacts';
import { Plugins } from '@capacitor/core';
import { SMS } from '@ionic-native/sms/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
const { Contacts } = Plugins; 

@Component({
  selector: 'app-whatsapp-contact',
  templateUrl: './whatsapp-contact.page.html',
  styleUrls: ['./whatsapp-contact.page.scss'],
})
export class WhatsappContactPage implements OnInit {
  contacts=[];
  filterTerm: string;
  url:any;
  constructor(private sms: SMS,private socialSharing: SocialSharing) {
    this.loadContacts();
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

  ContactClicked(contact)
  {
    //console.log("Contact Clicked : "+contact.number);
    //this.sms.send(contact.number, "Blindvend App Test");
    var wa =contact.number;
    //this.url="https://wa.me/"+wa+"?text=BlindvendAppTest"
    ////console.log("Contact Clicked 2 : "+contact[0].number);
    ////console.log("Contact Clicked 3 : "+contact[0][0].number);
    ////console.log("Contact Clicked 4 : "+contact[0][0]);
      this.socialSharing.shareViaWhatsApp("Test", null, null)
  }

  ngOnInit() {
  }

}
