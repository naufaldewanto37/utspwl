import jwt
from pyramid.view import view_config
from pyramid.response import Response
from passlib.hash import pbkdf2_sha256
from pyramid.httpexceptions import HTTPNotFound
import pymysql

def validate_product(request):
    data = request.json_body
    if not isinstance(data.get('name'), str) or not isinstance(data.get('price'), (int)):
        request.response.status = 400
        return {'error': 'Invalid data type'}

@view_config(route_name='get_products', request_method='GET', renderer='json')
def get_products(request):
    # Terhubung ke database
    conn = pymysql.connect(host='localhost', user='root', password='', db='utspwl')
    cursor = conn.cursor()
    
    select_query = "SELECT * FROM products"
    cursor.execute(select_query)
    product = cursor.fetchall()
    
    return {'products': product}

@view_config(route_name='add_product', request_method='POST', renderer='json')
def add_product(request):
    # validation_result = validate_product(request)
    # if validation_result:
    #     return validation_result  # mengembalikan pesan error jika validasi gagal
    
    # Terhubung ke database
    conn = pymysql.connect(host='localhost', user='root', password='', db='utspwl')
    cursor = conn.cursor()
    
    # mendapatkan data dari request
    data = request.json_body
    
    # Menentukan ID baru
    cursor.execute("SELECT MAX(id) FROM products")
    max_id = cursor.fetchone()[0]
    new_id = max_id + 1 if max_id else 1
    
    # Simpan data ke database
    insert_query = """
    INSERT INTO products (id, name, imageSrc, imageAlt, price, color) VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(insert_query, (new_id, data['name'], data['imageSrc'], data['imageAlt'], data['price'], data['color']))
    conn.commit()
    
    # Tutup koneksi ke database
    cursor.close()
    conn.close()
    
    return {'status': 'success', 'product': {'id': new_id, **data}}

@view_config(route_name='get_products_specific',request_method='GET', renderer='json')
def get_products_specific(request):
    # Terhubung ke database
    conn = pymysql.connect(host='localhost', user='root', password='', db='utspwl')
    cursor = conn.cursor()
    
    product_id = int(request.matchdict['id'])
    
    select_query = "SELECT * FROM products WHERE id = %s"
    cursor.execute(select_query, (product_id,))
    product = cursor.fetchone()
    
    return {'products': product}

@view_config(route_name='delete_product', request_method='DELETE', renderer='json')
def delete_product(request):
    # Terhubung ke database
    conn = pymysql.connect(host='localhost', user='root', password='', db='utspwl')
    cursor = conn.cursor()

    # Dapatkan id produk dari parameter URL
    product_id = int(request.matchdict['id'])

    # Cek apakah produk ada di database
    select_query = "SELECT * FROM products WHERE id = %s"
    cursor.execute(select_query, (product_id,))
    product = cursor.fetchone()

    if product is None:
        cursor.close()
        conn.close()
        return HTTPNotFound()

    # Hapus produk dari database
    delete_query = "DELETE FROM products WHERE id = %s"
    cursor.execute(delete_query, (product_id,))
    conn.commit()

    # Tutup koneksi ke database
    cursor.close()
    conn.close()

    return {'status': 'deleted', 'id': product_id}

@view_config(route_name='update_product', request_method='PUT', renderer='json')
def update_product(request):
    # Terhubung ke database
    conn = pymysql.connect(host='localhost', user='root', password='', db='utspwl')
    cursor = conn.cursor()

    # Dapatkan id produk dari parameter URL
    product_id = int(request.matchdict['id'])
    
    # Dapatkan data baru dari body request
    updated_data = request.json_body

    # Cek apakah produk ada di database
    select_query = "SELECT * FROM products WHERE id = %s"
    cursor.execute(select_query, (product_id,))
    product = cursor.fetchone()

    if product is None:
        cursor.close()
        conn.close()
        return HTTPNotFound()

    # Update produk di database
    update_query = """
    UPDATE products
    SET name = %s, imageSrc = %s, imageAlt = %s, price = %s, color = %s
    WHERE id = %s
    """
    cursor.execute(update_query, (
        updated_data['name'], 
        updated_data['imageSrc'], 
        updated_data['imageAlt'], 
        updated_data['price'], 
        updated_data['color'],
        product_id
    ))
    conn.commit()

    # Ambil produk yang telah diperbarui dari database untuk dikembalikan sebagai respon
    cursor.execute(select_query, (product_id,))
    updated_product = cursor.fetchone()

    # Tutup koneksi ke database
    cursor.close()
    conn.close()

    return {'status': 'updated', 'product': {'id': product_id, **updated_data}}

from pyramid.response import Response
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound
import pymysql

@view_config(route_name='purchase_product', request_method='POST', renderer='json')
def purchase_product(request):
    # Terhubung ke database
    conn = pymysql.connect(host='localhost', user='root', password='', db='utspwl')
    cursor = conn.cursor()

    # Dapatkan id produk dari parameter URL
    product_id = int(request.matchdict['id'])

    # Cek apakah produk ada di database
    select_query = "SELECT * FROM products WHERE id = %s"
    cursor.execute(select_query, (product_id,))
    product = cursor.fetchone()

    if product is None:
        cursor.close()
        conn.close()
        return HTTPNotFound()

    # Disini Anda bisa menambahkan logika untuk memproses pembelian jika diperlukan
    # Misalnya, mengurangi stok produk atau membuat catatan transaksi pembelian

    # Tutup koneksi ke database
    cursor.close()
    conn.close()

    return {'status': 'purchased', 'product': {
        'id': product[0], 
        'name': product[1],
        'imageSrc': product[2],
        'imageAlt': product[3],
        'price': product[4],
        'color': product[5]
        }
    }
