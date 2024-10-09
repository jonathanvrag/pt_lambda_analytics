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

      precios = element.find('span', class_='andes-money-amount__fraction')
      precio = precios.text.strip()

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