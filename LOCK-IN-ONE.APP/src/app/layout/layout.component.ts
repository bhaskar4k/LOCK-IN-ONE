import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    // Load saved theme if exists
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-bs-theme', savedTheme);
    this.isDarkMode = savedTheme === 'dark';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const newTheme = this.isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const checkbox = document.getElementById("checkbox");
    if (checkbox) {
      checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark")
      });
    }
  }


}
