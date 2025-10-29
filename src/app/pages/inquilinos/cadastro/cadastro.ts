import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-cadastro',
  standalone: true,
   imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class CadastroInquilinos {

   nome: string = '';
  contato: string = '';
  documento: string = '';
  pessoas: number | null = null;
  statusPagamento: string = '';
  observacao: string = '';

  statusList = ['Em dia', 'Atrasado', 'Sem contrato'];

  salvar() {
    console.log({
      nome: this.nome,
      contato: this.contato,
      documento: this.documento,
      pessoas: this.pessoas,
      statusPagamento: this.statusPagamento,
      observacao: this.observacao
    });
    alert('Inquilino cadastrado com sucesso!');
  }

  cancelar() {
    alert('Cadastro cancelado!');
  }

}
