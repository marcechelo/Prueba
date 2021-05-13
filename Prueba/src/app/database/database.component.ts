import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { MatSnackBar, _SnackBarContainer } from '@angular/material/snack-bar';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  modelButton = {
    left: true,
    middle: false,
    right: false
  };
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  usersArray: any = [];
  usersDataArray: any = [];
  apiUrl:string = 'http://localhost:3000/github-users/'
  userGit = {
    "id": null,
    "login": null,
    "userId": null,
    "created_at": null,
    "owned_private_repos": null,
    "public_repos": null,
    "total_private_repos": null,
    "url": null
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'login',
      type: 'input',
      wrappers: ['form-field-horizontal'],
      templateOptions: {
        label: 'Login',
        type: 'text',
        required: true,        
      },
      expressionProperties: {
        'model.login': (m) => {
          return this.userGit.login;
        }
      }
    },
    
    {
      key: 'userId',
      type: 'input',
      wrappers: ['form-field-horizontal'],
      templateOptions: {
        label: 'User Id',
        type: 'text',
        required: true,
      },
      expressionProperties: {
        'model.userId': (m) => {
          return this.userGit.userId;
        }
      }
    },
    {
      key: 'created_at',
      type: 'input',
      wrappers: ['form-field-horizontal'],
      templateOptions: {
        label: 'Created At',
        type: 'text',
        required: true,
      },
      expressionProperties: {
        'model.created_at': (m) => {
          return this.userGit.created_at;
        }
      }
    },
    {
      key: 'owned_private_repos',
      type: 'input',
      wrappers: ['form-field-horizontal'],
      templateOptions: {
        label: 'Owned Private Repos',
        type: 'number',
        required: true,
      },
      expressionProperties: {
        'model.owned_private_repos': (m) => {
          return this.userGit.owned_private_repos;
        }
      }
    },
    {
      key: 'public_repos',
      type: 'input',
      wrappers: ['form-field-horizontal'],
      templateOptions: {
        label: 'Public Repos',
        type: 'number',
        required: true,
      },
      expressionProperties: {
        'model.public_repos': (m) => {
          return this.userGit.public_repos;
        }
      }
    },
    {
      key: 'total_private_repos',
      type: 'input',
      wrappers: ['form-field-horizontal'],
      templateOptions: {
        label: 'Private Repos',
        type: 'number',
        required: true,
      },
      expressionProperties: {
        'model.total_private_repos': (m) => {
          return this.userGit.total_private_repos;
        }
      }
    },
    {
      key: 'url',
      type: 'input',
      wrappers: ['form-field-horizontal'],
      templateOptions: {
        label: 'Url',
        type: 'text',
        required: true,
      },
      expressionProperties: {
        'model.url': (m) => {
          return this.userGit.url;
        }
      }
    },
  ];;

  constructor(private http: HttpClient,
              private _snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.getGithubUsers();
  }

  //Get user data from database, create
  getGithubUsers(){
    this.http.get<any>(this.apiUrl).subscribe(data => {
      this.usersDataArray = data;
    });
  }

  //Change user data show in form
  changeUser(data:any){
    this.userGit = data; 
  }

  //Reset model to clean inputs
  resetModel(){
    this.model = {};

    this.userGit = {
      "id": null,
      "login": null,
      "userId": null,
      "created_at": null,
      "owned_private_repos": null,
      "public_repos": null,
      "total_private_repos": null,
      "url": null
    }
  }

  //Update values of user data
  updateUserData(){
    let header = {};
    let body = this.model;
    let url = this.apiUrl + this.userGit.id;
    this.http.put<any>(url, body)
    .pipe(
      catchError((err) => {
        this.openSnackBar("User not modified", "Error");
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    )
    .subscribe(data => {
      this.openSnackBar("User " + this.model.login + " modified", "Success");
      this.getGithubUsers();
    });
  }

  //Delete user from database
  deleteUser(){
    let url = this.apiUrl + this.userGit.id;
    this.http.delete<any>(url)
    .pipe(
      catchError((err) => {
        this.openSnackBar("User not deleted", "Error");
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    )
    .subscribe(data => {
      this.openSnackBar("User " + this.model.login + " deleted", "Success");
      this.resetModel();
      this.getGithubUsers();
    });
  }

  //Create new user record in database
  newUser(){
    let headers = {};
    let body = this.model;
    let url = this.apiUrl;
    this.http.post<any>(url, body)
    .pipe(
      catchError((err) => {
        this.openSnackBar("User not created", "Error");
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    )
    .subscribe(data => {      
      this.openSnackBar("User " + this.model.login + " created", "Success");
      this.resetModel();
      this.getGithubUsers();
    });
  }

  //Open snackBar to show success or error messages
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, 
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
  }

}

