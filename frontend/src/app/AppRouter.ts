import { Route } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { MatrixComponent } from './matrix/matrix.component'
import { RegisterComponent } from './register/register.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'

export class AppRouter{
    public static getRoutes(): Route[]{
        return [
            { path: 'matrix', component: MatrixComponent },
            { path: '', redirectTo: '/matrix', pathMatch: 'full' },
            { path: 'login',  component: LoginComponent},
            { path: 'reset-password',  component: ResetPasswordComponent},
            { path: 'register',  component: RegisterComponent},
          ]
    }
}