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