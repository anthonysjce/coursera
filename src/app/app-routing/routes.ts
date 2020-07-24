import { HomeComponent } from "../home/home.component";
import { MenuComponent } from "../menu/menu.component";

export const routes = [
    {path: 'home', component:HomeComponent},
{path: 'menu', component:MenuComponent},
{ path: '', redirectTo: '/home', pathMatch: 'full' }]