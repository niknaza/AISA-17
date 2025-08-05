from pydantic import BaseModel

class AdminUserCreate(BaseModel):
    username: str
    email: str
    password: str

class AdminUser(BaseModel):
    id: int
    username: str
    email: str
