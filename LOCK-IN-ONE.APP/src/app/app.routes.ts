import { Routes } from "@angular/router";
import { HomeComponent } from "./page-component/home/home.component";
import { RegisterOrgComponent } from "./page-component/register-org/register-org.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },

    { path: 'register-your-org', component: RegisterOrgComponent },
];