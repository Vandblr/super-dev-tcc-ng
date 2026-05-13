from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
from models import Imovel, Inquilino, Solicitacao

from schemas import (
    ImovelCriar,
    ImovelAtualizar,
    ImovelResposta,
    InquilinoCriar,
    InquilinoAtualizar,
    InquilinoResposta,
    SolicitacaoCriar,
    SolicitacaoAtualizar,
    SolicitacaoResposta
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API HouseManager")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"mensagem": "API HouseManager funcionando"}


@app.post("/imoveis", response_model=ImovelResposta)
def criar_imovel(imovel: ImovelCriar, db: Session = Depends(get_db)):
    novo_imovel = Imovel(
        nome=imovel.nome,
        endereco=imovel.endereco,
        status=imovel.status,
        cor=imovel.cor,
        garagem=imovel.garagem,
        quartos=imovel.quartos,
        banheiros=imovel.banheiros
    )

    db.add(novo_imovel)
    db.commit()
    db.refresh(novo_imovel)

    return novo_imovel


@app.get("/imoveis", response_model=list[ImovelResposta])
def listar_imoveis(db: Session = Depends(get_db)):
    return db.query(Imovel).all()


@app.get("/imoveis/{imovel_id}", response_model=ImovelResposta)
def buscar_imovel(imovel_id: int, db: Session = Depends(get_db)):
    imovel = db.query(Imovel).filter(Imovel.id == imovel_id).first()

    if not imovel:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")

    return imovel


@app.put("/imoveis/{imovel_id}", response_model=ImovelResposta)
def atualizar_imovel(imovel_id: int, dados: ImovelAtualizar, db: Session = Depends(get_db)):
    imovel = db.query(Imovel).filter(Imovel.id == imovel_id).first()

    if not imovel:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")

    imovel.nome = dados.nome
    imovel.endereco = dados.endereco
    imovel.status = dados.status
    imovel.cor = dados.cor
    imovel.garagem = dados.garagem
    imovel.quartos = dados.quartos
    imovel.banheiros = dados.banheiros

    db.commit()
    db.refresh(imovel)

    return imovel


@app.delete("/imoveis/{imovel_id}")
def deletar_imovel(imovel_id: int, db: Session = Depends(get_db)):
    imovel = db.query(Imovel).filter(Imovel.id == imovel_id).first()

    if not imovel:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")

    db.delete(imovel)
    db.commit()

    return {"mensagem": "Imóvel deletado com sucesso"}


@app.post("/inquilinos", response_model=InquilinoResposta)
def criar_inquilino(inquilino: InquilinoCriar, db: Session = Depends(get_db)):
    novo_inquilino = Inquilino(
        nome=inquilino.nome,
        contato=inquilino.contato,
        documento=inquilino.documento,
        pessoas=inquilino.pessoas,
        status_pagamento=inquilino.status_pagamento,
        observacao=inquilino.observacao
    )

    db.add(novo_inquilino)
    db.commit()
    db.refresh(novo_inquilino)

    return novo_inquilino


@app.get("/inquilinos", response_model=list[InquilinoResposta])
def listar_inquilinos(db: Session = Depends(get_db)):
    return db.query(Inquilino).all()


@app.get("/inquilinos/{inquilino_id}", response_model=InquilinoResposta)
def buscar_inquilino(inquilino_id: int, db: Session = Depends(get_db)):
    inquilino = db.query(Inquilino).filter(Inquilino.id == inquilino_id).first()

    if not inquilino:
        raise HTTPException(status_code=404, detail="Inquilino não encontrado")

    return inquilino


@app.put("/inquilinos/{inquilino_id}", response_model=InquilinoResposta)
def atualizar_inquilino(
    inquilino_id: int,
    dados: InquilinoAtualizar,
    db: Session = Depends(get_db)
):
    inquilino = db.query(Inquilino).filter(Inquilino.id == inquilino_id).first()

    if not inquilino:
        raise HTTPException(status_code=404, detail="Inquilino não encontrado")

    inquilino.nome = dados.nome
    inquilino.contato = dados.contato
    inquilino.documento = dados.documento
    inquilino.pessoas = dados.pessoas
    inquilino.status_pagamento = dados.status_pagamento
    inquilino.observacao = dados.observacao

    db.commit()
    db.refresh(inquilino)

    return inquilino


@app.delete("/inquilinos/{inquilino_id}")
def deletar_inquilino(inquilino_id: int, db: Session = Depends(get_db)):
    inquilino = db.query(Inquilino).filter(Inquilino.id == inquilino_id).first()

    if not inquilino:
        raise HTTPException(status_code=404, detail="Inquilino não encontrado")

    db.delete(inquilino)
    db.commit()

    return {"mensagem": "Inquilino deletado com sucesso"}


@app.post("/solicitacoes", response_model=SolicitacaoResposta)
def criar_solicitacao(solicitacao: SolicitacaoCriar, db: Session = Depends(get_db)):
    nova_solicitacao = Solicitacao(
        tipo_servico=solicitacao.tipo_servico,
        data=solicitacao.data,
        custo=solicitacao.custo,
        status=solicitacao.status,
        vinculo_casa=solicitacao.vinculo_casa,
        observacao=solicitacao.observacao
    )

    db.add(nova_solicitacao)
    db.commit()
    db.refresh(nova_solicitacao)

    return nova_solicitacao


@app.get("/solicitacoes", response_model=list[SolicitacaoResposta])
def listar_solicitacoes(db: Session = Depends(get_db)):
    return db.query(Solicitacao).all()


@app.get("/solicitacoes/{solicitacao_id}", response_model=SolicitacaoResposta)
def buscar_solicitacao(solicitacao_id: int, db: Session = Depends(get_db)):
    solicitacao = db.query(Solicitacao).filter(Solicitacao.id == solicitacao_id).first()

    if not solicitacao:
        raise HTTPException(status_code=404, detail="Solicitação não encontrada")

    return solicitacao


@app.put("/solicitacoes/{solicitacao_id}", response_model=SolicitacaoResposta)
def atualizar_solicitacao(
    solicitacao_id: int,
    dados: SolicitacaoAtualizar,
    db: Session = Depends(get_db)
):
    solicitacao = db.query(Solicitacao).filter(Solicitacao.id == solicitacao_id).first()

    if not solicitacao:
        raise HTTPException(status_code=404, detail="Solicitação não encontrada")

    solicitacao.tipo_servico = dados.tipo_servico
    solicitacao.data = dados.data
    solicitacao.custo = dados.custo
    solicitacao.status = dados.status
    solicitacao.vinculo_casa = dados.vinculo_casa
    solicitacao.observacao = dados.observacao

    db.commit()
    db.refresh(solicitacao)

    return solicitacao


@app.delete("/solicitacoes/{solicitacao_id}")
def deletar_solicitacao(solicitacao_id: int, db: Session = Depends(get_db)):
    solicitacao = db.query(Solicitacao).filter(Solicitacao.id == solicitacao_id).first()

    if not solicitacao:
        raise HTTPException(status_code=404, detail="Solicitação não encontrada")

    db.delete(solicitacao)
    db.commit()

    return {"mensagem": "Solicitação deletada com sucesso"}