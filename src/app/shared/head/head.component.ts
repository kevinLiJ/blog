import { Component, OnInit, TemplateRef  } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { LoginService } from '../../shared/service/login.service';
import { LoginStatusService } from '../../shared/service/loginStatus.service';

@Component({
  selector: 'common-head',
  templateUrl : './head.html',
  styleUrls :['./head.css']
})
export class HeadComponent{
  public modalRef: BsModalRef;
  private userName:string = '';
  private password:string = '';
  private isLogin:Boolean;
  constructor(
    private modalService: BsModalService,
    private _loginService: LoginService,
    private _loginStatusService: LoginStatusService
  ) {}
 
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'login-dialog'});
  }

  ngOnInit(){
    this.upateLoginStatus();
  }

  login(){
    let loginObj = {
      userName : this.userName,
      password: this.password
    }
    this._loginService.login(loginObj)
    .subscribe(
      resp => {
        if(resp.success){
          this.modalRef.hide();
          localStorage.setItem("isLogin","true");
          this.upateLoginStatus();
        }
      },
      error => console.log(error)
    )
  }

  logout(){
    localStorage.removeItem('isLogin');
    this.upateLoginStatus();
  }

  upateLoginStatus(){
    this.isLogin = this._loginStatusService.getLoginStatus()
  }
}
