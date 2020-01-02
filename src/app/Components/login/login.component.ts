import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    document.querySelector('.img__btn').addEventListener('click', function() {
      document.querySelector('.cont').classList.toggle('s--signup');
    });
  }

}
