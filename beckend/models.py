from sqlalchemy import Column, Integer, String
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