const promoLink = "http://swko8wgwcwgkk8ksg0kow8gk.138.199.158.65.sslip.io/best_sellers/";
const cartLink = "http://swko8wgwcwgkk8ksg0kow8gk.138.199.158.65.sslip.io/cart/";

const header = document.querySelector("header");
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
banner.style.cursor = "pointer";

document.addEventListener("DOMContentLoaded", function () {
    header.appendChild(banner);
    banner.addEventListener("click", async (event) => {
		event.preventDefault(); // !!!!!
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: "promotion_click",
                    promotion: { id: "dd-promo-1", name: "dd-bestsellers", creative: banner.id }
                });
                console.log("Event pushed to dataLayer.");
            } else {
                console.warn("dataLayer is not defined");
            }
            const resp = await Iterable.track({ eventName: "banner-promo_click" });
			console.log("Track response:", JSON.stringify(resp, null, 2));

		window.location.href = promoLink;
    });
});
