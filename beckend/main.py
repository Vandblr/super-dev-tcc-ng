from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
from models import Imovel
from schemas import ImovelCriar, ImovelAtualizar, ImovelResposta

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API HouseManager")

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