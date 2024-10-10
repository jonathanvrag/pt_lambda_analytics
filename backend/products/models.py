from django.db import models

class Articulo(models.Model):
  id_articulo = models.AutoField(primary_key=True)
  usuario = models.IntegerField()
  nombre = models.CharField(max_length=255)
  imagen = models.TextField()
  precio_venta = models.IntegerField()
  url_mercadolibre = models.TextField()

  def __str__(self):
    return self.url_mercadolibre