import { HomeComponent } from "../home/home.component";
import { MenuComponent } from "../menu/menu.component";
import { ContactComponent } from "../contact/contact.component";
import { DishdetailComponent } from "../dishdetail/dishdetail.component";

export const routes = [
    {path: 'home', component:HomeComponent },
{path: 'menu', component:MenuComponent },
{path: 'contactus', component:ContactComponent },
{ path: 'dishdetail/:id',     component: DishdetailComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }]