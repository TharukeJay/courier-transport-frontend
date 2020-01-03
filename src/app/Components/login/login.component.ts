import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {

  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
