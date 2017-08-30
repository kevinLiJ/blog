import { Component,Input } from '@angular/core';

@Component({
  selector: 'common-head',
  templateUrl : './head.html',
  styleUrls :['./head.css']
})
export class HeadComponent{
  @Input()
  hasAddBtn:boolean = false;
  ngOnInit(){};
}
