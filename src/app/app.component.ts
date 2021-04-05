import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HomeService } from './shared/service/home.service';
@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
userType = 'home';
title = 'my-newnormal';
constructor(
private homeService: HomeService,
) {
homeService.$userType.subscribe(data => {
console.log('LOGGGG >>> :: userType ::', data);
this.userType = data;
});
}
ngOnInit(): void {
this.homeService.$userType = of('home');
}

setHome() {
  this.homeService.$userType = of('home');
}

setDoctor() {
  this.homeService.$userType = of('doctor');
}

setAdmin() {
  this.homeService.$userType = of('admin');
}

setUser() {
  this.homeService.$userType = of('user');
}
}