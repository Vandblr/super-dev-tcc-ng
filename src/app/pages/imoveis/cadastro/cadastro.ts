import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-cadastroimoveis',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule,SelectModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class CadastroImoveis {
  nome: string = '';
  endereco: string = '';
  status: string = '';
  cor: string = '';
  garagem: string = '';
  quartos: number | null = null;
  banheiros: number | null = null;
  imagem: string | null = null;

 statusList = ['Disponível', 'Ocupado', 'Em manutenção'];
 
 salvar() {
    console.log({
      nome: this.nome,
      endereco: this.endereco,
      status: this.status,
      cor: this.cor,
      garagem: this.garagem,
      quartos: this.quartos,
      banheiros: this.banheiros,
      imagem: this.imagem
    });
    alert('Imóvel cadastrado com sucesso!');
  }

  cancelar() {
    alert('Cadastro cancelado!');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagem = URL.createObjectURL(file); 
    }
  }
  
}
