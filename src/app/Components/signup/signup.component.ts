import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppModule} from "../../app.module";
import {UserObj} from "../../Models/UserObj";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email1: string = null;
  fname1: string = null;
  lname1: string = null;
  username1: string = null;
  paswd1: string = null;
  repswrd1: string = null;
  userRole: string;
  uniqueUsername: boolean;
  uniqueEmail: boolean;

  constructor(private toastr: ToastrService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.clearFields();

  }

  checkInputFieldEmpty(fNmae: string, lName: string, email: string, userName: string, password: string, repswrd: string) {
    const pattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

    if (fNmae.trim() === '') {
      this.toastr.error('Please fill First Name');
      return true;
    }

    if (lName.trim() === '') {
      this.toastr.error('Please fill Last Name');
      return true;
    }

    if (userName.trim() === '') {
      this.toastr.error('Please fill Username');
      return true;
    }

    if (email.trim() === '') {
      this.toastr.error('Please fill the email');
      return true;
    }

    if (password.trim() === '') {
      this.toastr.error('Cannot continue without password');
      return true;
    }

    if (repswrd.trim() !== password.trim()) {
      this.toastr.error('Passwords do not match');
      return true;
    }

    // if (email.match(pattern)) {
    //   this.toastr.error('Please enter a valid email address');
    //   return true;
    // }

    if (this.userRole === undefined) {
      this.toastr.error('Please select the User Role');
      return true;
    }
  }

  selectUserRole(userRole: string) {
    this.userRole = userRole;
    alert(userRole);
  }

  registerUser(fName: string, lName: string, email: string, userName: string, paswrd: string, repswrd: string) {

    const checkInputFieldEmpty = this.checkInputFieldEmpty(fName, lName, email, userName, paswrd, repswrd);

    if (checkInputFieldEmpty) {
      return;
    }

    this.http.get<string>(`${AppModule.resourceBaseURL}` + 'api/user/getExistEmail/' + email, {observe: 'response'}).subscribe(
      res => {

        if (res.body.toString() === 'true') {
          this.toastr.error('Email you entered already exist', 'Email error!');
        } else if (this.uniqueUsername || this.uniqueEmail) {
          this.toastr.error('Username or Email already exist', 'Username error!');
        } else {
          const user = new UserObj(fName, lName, email, userName, paswrd, this.userRole, 'PENDING');

          this.http.post<UserObj>(`${AppModule.resourceBaseURL}` + 'api/signup', user, {observe: 'response'}).subscribe(
            res => {

              if (res.ok === true) {
                this.toastr.success('You have successfully registered to RML courier transport', 'Registered!');
                this.router.navigate(['/login']);
              }else {
                this.toastr.error('Error occurred while registering the user', 'Registration Error!');
                this.router.navigate(['/signup']);
              }
            }
          );
        }
      });
  }

  validateUniqueUsername(userName) {
    if (userName !== null) {
      this.http.get<any>(`${AppModule.resourceBaseURL}` + 'api/unique/' + userName, {
        observe: 'response',
      }).subscribe( res => {
        this.uniqueUsername = res.body.status;
      });
    }
  }

  validateUniqueEmail(email) {
    if (email !== null) {
      this.http.get<any>(`${AppModule.resourceBaseURL}` + 'api/unique/email' + email, {
        observe: 'response'
      }).subscribe( res => {
        this.uniqueEmail = res.body.status;
      });
    }
  }

  clearFields() {
    this.email1 = null;
    this.fname1 = null;
    this.lname1 = null;
    this.paswd1 = null;
    this.repswrd1 = null;
  }

}
