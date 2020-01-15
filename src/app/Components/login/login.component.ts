import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fname: string;
  lname: string;
  email: string;
  userRole: string;
  password: string;
  username: string;
  userStatus: string;


  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {

  }

}
