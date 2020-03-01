import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ProductdetailComponent } from '../productdetail/productdetail.component';
import { TeammemberdetailComponent} from '../teammemberdetail/teammemberdetail.component';

export const routes: Routes = [
 {path: 'home', component: HomeComponent},
 {path: 'aboutus', component: AboutComponent},
 {path: 'teammemberdetail/:id', component: TeammemberdetailComponent},
 {path: 'productdetail/:id', component: ProductdetailComponent},
 {path: '', redirectTo: '/home', pathMatch: 'full'}
];
