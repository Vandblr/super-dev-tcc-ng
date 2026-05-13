from sqlalchemy import Column, Integer, String, Float
from database import Base


class Imovel(Base):
    __tablename__ = "imoveis"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    endereco = Column(String, nullable=False)
    status = Column(String, nullable=False)
    cor = Column(String, nullable=True)
    garagem = Column(String, nullable=True)
    quartos = Column(Integer, nullable=True)
    banheiros = Column(Integer, nullable=True)


class Inquilino(Base):
    __tablename__ = "inquilinos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    contato = Column(String, nullable=False)
    documento = Column(String, nullable=False)
    pessoas = Column(Integer, nullable=True)
    status_pagamento = Column(String, nullable=False)
    observacao = Column(String, nullable=True)


class Solicitacao(Base):
    __tablename__ = "solicitacoes"

    id = Column(Integer, primary_key=True, index=True)
    tipo_servico = Column(String, nullable=False)
    data = Column(String, nullable=False)
    custo = Column(Float, nullable=True)
    status = Column(String, nullable=False)
    vinculo_casa = Column(String, nullable=True)
    observacao = Column(String, nullable=True)