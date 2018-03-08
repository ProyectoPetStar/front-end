import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public accesos: Array<any> = [
    { id: 1, descripcion: 'ETAD' },
    { id: 2, descripcion: 'ACOPIO' }
  ];

  public formLogin: FormGroup;
  public submitted: boolean;
  public usuario_acceso: string;
  public clave_accesso:string;
  public id_sistemas:number;
  

  constructor(private service: LoginService, private fb: FormBuilder) { }

  ngOnInit() {
    this.submitted = false;
    this.formLogin = this.fb.group({
      usuario_acceso: new FormControl(this.usuario_acceso, [Validators.required]),
      clave_accesso: new FormControl(this.clave_accesso, [Validators.required]),
      id_sistemas: new FormControl(this.id_sistemas, [Validators.required])
    });
  }


  login() {
    this.submitted = true;
    if (this.formLogin.valid) {
      this.service.login(this.usuario_acceso, this.clave_accesso,this.id_sistemas).subscribe(res =>{
         console.log('Resultado de login',res)
      });
    }else{
      Materialize.toast('Se encontrarón errores!', 4000, 'red');
    }
  }



}
