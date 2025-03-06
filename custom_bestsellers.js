const bestSellersURL = 'http://swko8wgwcwgkk8ksg0kow8gk.138.199.158.65.sslip.io/best_sellers/';
document.addEventListener('DOMContentLoaded', function () {
	CURRENCY = '';
	if (document.URL !== bestSellersURL) {
		return;
	} else {
		let listName = document.querySelector('h2') ? document.querySelector('h2').innerText : '';
		let listId = 1234;

		let productsArr = [];
		let productContainers = document.querySelectorAll('li.wc-block-product');

		productContainers.forEach((product, index) => {
			let productId = product.dataset.wcContext ? JSON.parse(product.dataset.wcContext).productId : null;
			let nameElement = product.querySelector('h3 a');
			let priceElement = product.querySelector('.woocommerce-Price-amount');
			let imageElement = product.querySelector('img');
			let linkElement = product.querySelector('h3 a');
			let currencySymbol = product.querySelector('span.woocommerce-Price-currencySymbol');
			CURRENCY = currencySymbol ? currencySymbol.textContent : '';

			let productData = {
				id: productId.toString() || '',
				item_id: productId.toString() || '',
				item_name: nameElement ? nameElement.textContent : '',
				currency: CURRENCY,
				price: priceElement ? parseFloat(priceElement.textContent.replace(/[^\d.]/g, '')) : '',
				item_brand: '',
				item_category: product.className.match(/product_cat-([\w-]+)/)
					? product.className.match(/product_cat-([\w-]+)/)[1]
					: '',
				item_list_name: listName,
				index: index + 1,
			};

			productsArr.push(productData);

			let addToCartButton = product.querySelector('.add_to_cart_button');

			if (addToCartButton && addToCartButton.textContent !== ' Select options ') {
				addToCartButton.addEventListener('click', function (event) {
					let clickedProductData = productData;

					console.log('Product added to cart:', clickedProductData);

					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({
						event: 'add_to_cart',
						ecommerce: {
							currency: CURRENCY,
							items: [clickedProductData],
						},
					});
				});
			}
		});

		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'view_item_list',
			ecommerce: {
				currency: CURRENCY,
				item_list_id: listId,
				item_list_name: listName,
				items: productsArr,
			},
		});
		window.dataLayer.push(function () {
			this.set('ecommerce', []);
		});
	}
});
