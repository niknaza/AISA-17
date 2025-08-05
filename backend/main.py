import hashlib
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from schemas import AdminUserCreate
from database import get_db_connection
import mysql.connector

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    try:
        conn = get_db_connection()
        conn.close()
        print("Database connection successful.")
    except Exception as e:
        print(f"Database connection failed: {e}")

@app.get("/")
def read_root():
    return {"message": "Welcome to the AISA Backend"}

@app.get("/api/menu")
def get_menu(db: mysql.connector.MySQLConnection = Depends(get_db_connection)):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM menus ORDER BY id")
    menus = cursor.fetchall()
    cursor.close()
    db.close()

    menu_map = {menu['id']: menu for menu in menus}
    root_menus = []

    for menu in menus:
        menu['children'] = []
        if menu['parent_id'] is None:
            root_menus.append(menu)
        else:
            parent = menu_map.get(menu['parent_id'])
            if parent:
                parent['children'].append(menu)

@app.get("/api/admin_users")
def get_admin_users(db: mysql.connector.MySQLConnection = Depends(get_db_connection)):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT id, username, email FROM admin_users")
    admin_users = cursor.fetchall()
    cursor.close()
    db.close()
    return admin_users


@app.post("/api/admin_users")
def create_admin_user(user: AdminUserCreate, db: mysql.connector.MySQLConnection = Depends(get_db_connection)):
    cursor = db.cursor()
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    try:
        cursor.execute(
            "INSERT INTO admin_users (username, email, password) VALUES (%s, %s, %s)",
            (user.username, user.email, hashed_password)
        )
        db.commit()
        return {"message": "Admin user created successfully", "id": cursor.lastrowid}
    except mysql.connector.Error as err:
        db.rollback()
        return {"error": str(err)}, 400
    finally:
        cursor.close()
        db.close()
