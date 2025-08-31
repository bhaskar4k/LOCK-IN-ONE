import { Routes } from "@angular/router";
import { HomeComponent } from "./page-component/home/home.component";
import { RegisterOrgComponent } from "./page-component/register-org/register-org.component";
import { ManageOrgComponent } from "./page-component/manage-org/manage-org.component";
import { LoginComponent } from "./page-component/login/login.component";
import { LogoutComponent } from "./page-component/logout/logout.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },

    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },

    { path: 'organization/register', component: RegisterOrgComponent },
    { path: 'organization/manage', component: ManageOrgComponent },
];