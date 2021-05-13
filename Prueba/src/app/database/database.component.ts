import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  usersArray: any = [];
  usersDataArray: any = [];
  userGit = {
    "id": "",
    "login": "",
    "userId": "",
    "created_at": "",
    "owned_private_repos": 0,
    "public_repos": 0,
    "total_private_repos": 0,
    "url": ""
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

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    this.getGithubUsers();
  }

  onSubmit() {
    alert(JSON.stringify(this.model));
  }

  //Get user data from database, create
  getGithubUsers(){
    this.http.get<any>('http://localhost:3000/github-users').subscribe(data => {
      this.usersDataArray = data;
    });
  }

  //Change user data show in form
  changeUser(data:any){
    this.userGit = data;
    
    
  }

  setValues(){
    this.fields = [
      {
        key: 'login',
        type: 'input',
        defaultValue: 'puta',
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Login',
          type: 'text',
          required: true,        
        },
        expressionProperties: {
          'model.c': (m) => {
            return m.a && m.b ? (m.a + m.b) : null;
          }
        }
      },
      {
        key: 'userId',
        type: 'input',
        defaultValue: this.userGit.userId,
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'User Id',
          type: 'text',
          required: true,
        },
      },
      {
        key: 'created_at',
        type: 'input',
        defaultValue: this.userGit.created_at,
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Created At',
          type: 'text',
          required: true,
        },
      },
      {
        key: 'owned_private_repos',
        type: 'input',
        defaultValue: this.userGit.owned_private_repos,
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Owned Private Repos',
          type: 'number',
          required: true,
        },
      },
      {
        key: 'public_repos',
        type: 'input',
        defaultValue: this.userGit.public_repos,
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Public Repos',
          type: 'number',
          required: true,
        },
      },
      {
        key: 'total_private_repos',
        type: 'input',
        defaultValue: this.userGit.total_private_repos,
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Private Repos',
          type: 'number',
          required: true,
        },
      },
      {
        key: 'url',
        type: 'input',
        defaultValue: this.userGit.url,
        wrappers: ['form-field-horizontal'],
        templateOptions: {
          label: 'Url',
          type: 'text',
          required: true,
        },
      },
    ];
  }

}

