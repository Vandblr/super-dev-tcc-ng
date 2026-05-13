import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class CadastroSolicitacoes implements OnInit {
  id: number | null = null;
  modoEdicao: boolean = false;

  tipoServico: string = '';
  data: Date | null = null;
  custo: number | null = null;
  status: string = '';
  observacao: string = '';

  statusList = ['Pendente', 'Em andamento', 'Concluído', 'Cancelado'];
  servicosList = ['Encanamento', 'Pintura', 'Jardinagem', 'Elétrica', 'Outro'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = Number(idParam);
      this.modoEdicao = true;
      this.carregarSolicitacao(this.id);
    }
  }

  carregarSolicitacao(id: number) {
    this.http.get<any>(`http://localhost:8000/solicitacoes/${id}`).subscribe({
      next: (solicitacao) => {
        this.tipoServico = solicitacao.tipo_servico;
        this.data = solicitacao.data ? new Date(solicitacao.data) : null;
        this.custo = solicitacao.custo;
        this.status = solicitacao.status;
        this.observacao = solicitacao.observacao;
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao carregar solicitação.');
      }
    });
  }

  salvar() {
    const dados = {
      tipo_servico: this.tipoServico,
      data: this.data ? this.data.toISOString().split('T')[0] : '',
      custo: this.custo,
      status: this.status,
      vinculo_casa: '',
      observacao: this.observacao
    };

    if (this.modoEdicao && this.id !== null) {
      this.http.put(`http://localhost:8000/solicitacoes/${this.id}`, dados).subscribe({
        next: () => {
          alert('Solicitação atualizada com sucesso!');
          this.router.navigate(['/solicitacoes']);
        },
        error: (erro) => {
          console.error(erro);
          alert('Erro ao atualizar solicitação.');
        }
      });
    } else {
      this.http.post('http://localhost:8000/solicitacoes', dados).subscribe({
        next: () => {
          alert('Solicitação cadastrada com sucesso!');
          this.router.navigate(['/solicitacoes']);
        },
        error: (erro) => {
          console.error(erro);
          alert('Erro ao cadastrar solicitação.');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/solicitacoes']);
  }
}