import scrapy
import requests
# import sys
import os.path

global url
with open(os.path.dirname(__file__) + '/../../url.txt',"r") as f:
    url=((f.read()))

class AmazonSpider(scrapy.Spider):
    name = 'darkpatterns'
    start_urls = [url]

    def parse(self, response):
        products = response.css('div.s-main-slot div.s-asin')
        for product in products:
            yield {

                '1': product.css("span.a-color-secondary::text").get(),
                '1_selector': "span.a-color-secondary::text",
                '2': product.css("span.a-badge-text::text").get(),
                '3': product.css('span.a-text-normal::text').get(),
                '2_selector': "span.a-badge-text::text",
                '3': product.css('span.a-text-normal::text').get(),
                '3_selector' : "span.a-text-normal::text"


            }


        
