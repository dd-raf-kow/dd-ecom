const promoLink = "http://swko8wgwcwgkk8ksg0kow8gk.138.199.158.65.sslip.io/best_sellers/";
const cartLink = "http://swko8wgwcwgkk8ksg0kow8gk.138.199.158.65.sslip.io/cart/";

const header = document.querySelector('header');
const banner = document.createElement("a");
	banner.setAttribute("href", promoLink);
	banner.setAttribute("id", "special_offer_banner");
	banner.style.display = "block";
	banner.innerText = "See our best-sellers!";
	banner.style.textAlign = "center";
	banner.style.width = "100vw";
    banner.style.height = "auto";
	banner.style.padding = "10px 0 10px 0";
	banner.style.margin = "10px 0 20px 0";
	banner.style.backgroundColor = "violet";
    banner.style.position = "top"; 

	banner.style.cursor = "pointer";

document.addEventListener("DOMContentLoaded", function () {
	if(document.URL == promoLink || document.URL == cartLink) {
		return
	} else {
	header.appendChild(banner);	
	banner.addEventListener('click', async () => { 	
        dataLayer.push({
	        event: "promotion_click",
		     	promotion: {
			    id: 'dd-promo-1',
			    name: 'dd-bestsellers',
			    creative: banner.id
		        }
            });
		await Iterable.track({ eventName: 'banner-promo_click' }).then().catch();
		});
	}
});
		
