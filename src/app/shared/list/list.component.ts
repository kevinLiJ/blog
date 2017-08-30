import { Component,Input } from '@angular/core';
import { ContactService } from '../../shared/service/contact.service';

@Component({
  selector: 'lists',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:[ContactService]
})
export class ListComponent {
  
  @Input() contacts:any[] = [];
}
