import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  //Consult Github API to get user data
  getGithubData(){
    const headers = {'Authorization': 'token ' + this.tokenForm.value.token};
    let body = {}
    console.log(this.tokenForm.value.token)
    this.http.post<any>('https://api.github.com/user', body, { headers }).subscribe(data => {
      console.log(data);
      this.userData = data;
    });
      return this.userData;
  }

}
