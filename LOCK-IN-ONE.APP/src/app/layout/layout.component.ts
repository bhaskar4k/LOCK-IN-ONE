import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  IsDarkMode = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Load saved theme if exists
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-bs-theme', savedTheme);
    this.IsDarkMode = savedTheme === 'dark';
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
}
