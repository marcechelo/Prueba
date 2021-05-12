import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  userData:any = null;
  tokenForm = this.formBuilder.group({
    token: ['',Validators.required]
  })

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  //Consult Github API to get user data
  getGithubData(){
    const headers = {'Authorization': 'token ' + this.tokenForm.value.token};
    let body = {}
    this.http.post<any>('https://api.github.com/user', body, { headers }).subscribe(data => {
      console.log(data);
      this.userData = data;
    });
      return this.userData;
  }

  //Save github user data into database using Loopback API
  saveGithubUser(){
    let headers = {};
    let body = {
      login: this.userData['login'],
      userId: this.userData['id'].toString(),
      created_at: this.userData['created_at'],
      owned_private_repos: this.userData['owned_private_repos'],
      public_repos: this.userData['public_repos'],
      total_private_repos: this.userData['total_private_repos'],
      url: this.userData['url'],
    };
    
    this.http.post<any>('http://localhost:3000/github-users', body, { headers })
    .pipe(
      catchError((err) => {
        this.openSnackBar("No se registro el usuario", "Error");
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    )
    .subscribe(data => {
      this.userData = null;
      this.tokenForm.reset();
      this.openSnackBar("Se registro el usuario", "Correcto");
    });
    
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, 
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
  }

}
