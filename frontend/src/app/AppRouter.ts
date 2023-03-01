import { Route } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { MatrixComponent } from './matrix/matrix.component'

export class AppRouter{
    public static getRoutes(): Route[]{
        return [
            { path: 'matrix', component: MatrixComponent },
            { path: '', redirectTo: '/matrix', pathMatch: 'full' },
            { path: 'login',  component: LoginComponent},
          ]
    }
}