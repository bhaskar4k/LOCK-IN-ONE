import { Routes } from "@angular/router";
import { HomeComponent } from "./page-component/home/home.component";
import { RegisterOrgComponent } from "./page-component/register-org/register-org.component";
import { ManageOrgComponent } from "./page-component/manage-org/manage-org.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },

    { path: 'organization/register', component: RegisterOrgComponent },
    { path: 'organization/manage', component: ManageOrgComponent },
];