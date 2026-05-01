import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-cadastro-imoveis',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule
  ],
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

  statusList = ['Disponível', 'Alugado', 'Em manutenção'];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  salvar() {
    const dados = {
      nome: this.nome,
      endereco: this.endereco,
      status: this.status,
      cor: this.cor,
      garagem: this.garagem,
      quartos: this.quartos,
      banheiros: this.banheiros
    };

    this.http.post('http://localhost:8000/imoveis', dados).subscribe({
      next: () => {
        alert('Imóvel salvo com sucesso!');
        this.router.navigate(['/imoveis']);
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao salvar imóvel.');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/imoveis']);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.imagem = URL.createObjectURL(file);
    }
  }
}