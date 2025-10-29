import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-cadastro',
  standalone: true,
   imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, DatePickerModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class CadastroSolicitacoes {

  tipoServico: string = '';
  data: Date | null = null;
  custo: number | null = null;
  status: string = '';
  observacao: string = '';

   statusList = ['Pendente', 'Em andamento', 'Concluído', 'Cancelado'];
  servicosList = ['Encanamento', 'Pintura', 'Jardinagem', 'Elétrica', 'Outro'];

}