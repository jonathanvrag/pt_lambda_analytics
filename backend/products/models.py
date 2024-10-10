from django.db import models

class Articulo(models.Model):
  usuario = models.IntegerField()
  nombre = models.CharField(max_length=255)
  imagen = models.URLField()
  precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
  url_mercadolibre = models.URLField()

  def __str__(self):
    return self.url_mercadolibre