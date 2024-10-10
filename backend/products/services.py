from bs4 import BeautifulSoup
import requests


url_ml = "https://listado.mercadolibre.com.co/"

def get_products(articulo):
    search_url = url_ml + articulo
    response = requests.get(search_url)
    html_content = response.content

    soup = BeautifulSoup(html_content, "html.parser")
    li_elements = soup.find_all('li', class_='ui-search-layout__item')
    listado_articulos = []

    for element in li_elements:
        value = element.find('a')
        nombre = value.text.strip()
        url_product = value['href']
        precios = element.find_all('span', class_='andes-money-amount__fraction')
        precio = precios[0].text.strip() if len(precios) <= 2 else precios[1].text.strip()
        desc = element.find('span', class_='andes-money-amount__discount')
        vendedor = element.find('span', class_='poly-component__seller')
        rating = element.find('span', class_='poly-reviews__rating')
        image = element.find('img', class_='poly-component__picture')
        
        item = {
            'nombre' : nombre,
            'precio': int(precio.strip().replace('.', '')),
            'descuento': float(desc.text.strip().replace('% OFF', '')) if desc else False,
            'vendedor': vendedor.text.strip() if vendedor else False,
            'rating': float(rating.text.strip()) if rating else False,
            'image_url': image['data-src'] if 'data-src' in image.attrs else image['src'],
            'url': url_product
        }

        listado_articulos.append(item)
    return listado_articulos

def filtroArticulos(articulos):
    if not articulos:
        return {'error': 'No se encontraron articulos.'}
    
    articulo_menor_precio = min(articulos, key=lambda x: x['precio'])
    articulo_mayor_precio = max(articulos, key=lambda x: x['precio'])
    articulo_mayor_descuento = max(articulos, key=lambda x: x['descuento'] if x['descuento'] else 0)
    precio_promedio = sum(x['precio'] for x in articulos) / len(articulos)
    articulo_mejor_calificacion = max(articulos, key=lambda x: x['rating'] if x['rating'] else 0)

    return {
        'articulo_menor_precio': articulo_menor_precio,
        'articulo_mayor_precio': articulo_mayor_precio,
        'articulo_mayor_descuento': articulo_mayor_descuento,
        'precio_promedio': precio_promedio,
        'articulo_mejor_calificacion': articulo_mejor_calificacion
    }