import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-homeoffline',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './homeoffline.html',
  styleUrl: './homeoffline.scss'
})
export class TelaHomeOffline {

}
