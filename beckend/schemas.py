from pydantic import BaseModel
from typing import Optional


class ImovelBase(BaseModel):
    nome: str
    endereco: str
    status: str
    cor: Optional[str] = None
    garagem: Optional[str] = None
    quartos: Optional[int] = None
    banheiros: Optional[int] = None


class ImovelCriar(ImovelBase):
    pass


class ImovelAtualizar(ImovelBase):
    pass


class ImovelResposta(ImovelBase):
    id: int

    class Config:
        from_attributes = True


class InquilinoBase(BaseModel):
    nome: str
    contato: str
    documento: str
    pessoas: Optional[int] = None
    status_pagamento: str
    observacao: Optional[str] = None


class InquilinoCriar(InquilinoBase):
    pass


class InquilinoAtualizar(InquilinoBase):
    pass


class InquilinoResposta(InquilinoBase):
    id: int

    class Config:
        from_attributes = True