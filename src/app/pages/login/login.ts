import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [FormsModule,InputTextModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class TelaLogin {

}
