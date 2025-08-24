import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonService } from '../service/common/common.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../common-components/custom-alert/custom-alert.component';
import { ResponseType, TrueFalse } from '../common-constants/enum-constants';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CommonModule, MatProgressBarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  IsDarkMode = false;
  matProgressBarVisible = false;
  readonly dialog = inject(MatDialog);

  Menu: any[] = [];

  constructor(
    private router: Router,
    private commonService: CommonService,
    private sanitizer: DomSanitizer
  ) { }

  selectedMenuId: string = 'MENU001';

  ngOnInit(): void {
    this.GetMenu();
    // Load saved theme if exists
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-bs-theme', savedTheme);
    this.IsDarkMode = savedTheme === 'dark';

    const menuToggle = document.getElementById("menu_toggle");
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        console.log("HI")
        const menu = document.getElementById("show_menu");
        if (menu) {
          menu.style.height = (menu.style.height === "0px") ? "1000px" : "0px";
        }
      });
    }
  }

  ToggleTheme() {
    this.IsDarkMode = !this.IsDarkMode;
    const newTheme = this.IsDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const checkbox = document.getElementById("checkbox");
    if (checkbox) {
      checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark")
      });
    }
  }

  RedirectToHome() {
    this.router.navigate(['home']);
  }

  GetMenu() {
    this.matProgressBarVisible = true;

    this.commonService.GetMenu().subscribe({
      next: async (response) => {
        this.matProgressBarVisible = false;

        if (response && response.success === TrueFalse.FALSE) {
          this.OpenDialog(response.message, ResponseType.ERROR, false);
        }

        this.Menu = response.data;
      },
      error: (err) => {
        this.matProgressBarVisible = false;
        this.OpenDialog(err.error.message ?? "Failed to process the request!", ResponseType.ERROR, false);
      }
    });
  }

  OpenDialog(dialogText: string, dialogType: string, pageReloadNeeded: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '30rem',
      height: 'max-content',
      disableClose: true,
      data: { text: dialogText, type: dialogType }
    });

    dialogRef.afterClosed().subscribe(() => {
      if (pageReloadNeeded) {
        window.location.reload();
      }
    });
  }
}
