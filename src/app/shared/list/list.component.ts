import { Component,Input } from '@angular/core';

@Component({
  selector: 'lists',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  
  @Input() contacts:any[] = [];
}
