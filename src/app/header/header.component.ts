import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;
  isLoggedIn: boolean = false;

  lang;

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';

    this.isLoggedIn = this.usersService.isLoggedIn();
    this.usersService.authenticationStatusChanged.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  toggleOpen(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeLang(lang){
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

}
