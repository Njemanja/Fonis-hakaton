import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/users';
import { HttpClient } from '@angular/common/http';
//const crypto = require('crypto');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  password: string | undefined;
  password1: string | undefined;
  email: string | undefined;
  telephone: string | undefined;
  age: number | undefined;
  language: string | undefined;
  country: string | undefined;
  city: string | undefined;
  type: string | undefined; 
  languages = [] 
  message: string | undefined;  

  inputCountry: string | undefined;  
  
  constructor(private servis: UserService, private router: Router, private http: HttpClient){}

  ngOnInit(): void {
    this.age = 0
    let points = 0
  }

 

  register(){
    var found = true;

    if (
      this.username &&
      this.password &&
      this.password.length >= 8 &&
      this.password === this.password1 &&
      this.name &&
      this.surname &&
      this.country &&
      this.city &&
      this.telephone &&
      this.email &&
      this.email.includes('@') &&
      this.languages.length
    ) {

      this.http.get(`https://restcountries.com/v3.1/name/${this.country}`)
      .subscribe(
        (response: any[]) => {
          console.log("Country " + this.country + " found.");
          this.http.get(`https://nominatim.openstreetmap.org/search?city=${this.city}&country=${this.country}&format=json&addressdetails=1`)
      .subscribe(
        (response: any[]) => {
         if (response.length == 0){
          found = false;
          this.message = "This city is not in that country or does not exist."
         }else{
          if(!found){
            return;
          }
    
          this.servis.register(
            this.username, 
            this.password, 
            this.name, 
            this.surname, 
            this.country, 
            this.city, 
            this.telephone,
            this.email,
            this.languages,
            this.age,
            this.language
            ).subscribe((message: any )=>{
              if(message['message'] ==  "0"){
                this.router.navigate(["/login"]);
                return;
              }else{
                this.message = message['message']
              }
            
          
         })
         }
          
        },
        (error) => {
           this.message = "This city is not in that country or does not exist."
          found = false;
          return
        }
      );
          
        },
        (error) => {
          this.message = "This country does not exist."
          
          return
        }
      );

      
      
      
    } else {
      this.message = "The data is not correct.\n The password should contain at least 8 characters. \n You must be of legal age."
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

}
