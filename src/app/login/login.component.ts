import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'in28minutes'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

//Router
//Angular.giveMeRouter
//Dependency Injection

  constructor(private router: Router, 
    private harcodedAuthenticationService: HardcodedAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin()
  {
    //if(this.username === 'in28minutes' && this.password === 'dummy')
    if(this.harcodedAuthenticationService.authenticate(this.username, this.password))
    {
      //redirect to welcome page
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    }
    else {
      this.invalidLogin = true
    }
    console.log(this.username);
  }
}
