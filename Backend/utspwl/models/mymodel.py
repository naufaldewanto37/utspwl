# from tugaspwl4 import db_connect
import pymysql

def init_db():
    conn = pymysql.connect(host='localhost', user='root', password='', db='utspwl')
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        imageSrc VARCHAR(255) NOT NULL,
        imageAlt VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        color VARCHAR(255) NOT NULL
    );
    """)
    
    # Data Dummy
    
    cursor.execute("""
    INSERT INTO products (name, imageSrc, imageAlt, price, color) Values
    (
        'Basic Tee',
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        'Front of mens Basic Tee in black.',
        35,
        'Black'
    ),
    (
        'Basic Tee',
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
        'Front of mens Basic Tee in White.',
        30,
        'Aspen White'
    ),
    (
        'Basic Tee',
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
        'Front of mens Basic Tee in charcoal.',
        40,
        'Charcoal'
    ),
    (
        'Artwork Tee',
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
        'Front of womens Basic Tee in artwork.',
        50,
        'Iso Dots'
    );
    
    """)
    
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == '__main__':
    init_db()