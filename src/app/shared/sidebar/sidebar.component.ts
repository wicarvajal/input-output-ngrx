import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  @Input() userName: string;

  constructor(private authSvc: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
  }

  logout() {
    this.authSvc.logout()
      .then(() => {
        this.router.navigate(['/login']);
      });

  }
}
