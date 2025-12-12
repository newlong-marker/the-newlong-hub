// 1. Product Data: 10 Northeast Traditional Items
// Note: Using placeholder images. Replace 'image' URLs with your real photos.
const products = [
    {
        id: 1,
        name: "Assamese Paat Silk Mekhela Sador",
        category: "Mekhela Sador",
        price: 4500,
        originalPrice: 8000,
        discount: "43% off",
        image: "C:\Users\hp\OneDrive\Pictures\Camera Roll\WIN_20251206_13_58_52_Pro.jpg", 
        desc: "Authentic Paat Silk Mekhela Sador with traditional Guna work."
    },
    {
        id: 2,
        name: "Naga Warrior Shawl (Red & Black)",
        category: "Shawls",
        price: 1800,
        originalPrice: 2500,
        discount: "28% off",
        image: "https://via.placeholder.com/300?text=Naga+Shawl",
        desc: "Premium wool Naga shawl featuring traditional tribal motifs."
    },
    {
        id: 3,
        name: "Manipuri Muga Phanek",
        category: "Phanek",
        price: 2200,
        originalPrice: 3000,
        discount: "26% off",
        image: "https://via.placeholder.com/300?text=Manipuri+Phanek",
        desc: "Handwoven Manipuri Phanek with intricate border embroidery."
    },
    {
        id: 4,
        name: "Mizo Puan Chei",
        category: "Puan",
        price: 3500,
        originalPrice: 4500,
        discount: "22% off",
        image: "https://via.placeholder.com/300?text=Mizo+Puan",
        desc: "Colorful and vibrant Mizo Puan, perfect for festive occasions."
    },
    {
        id: 5,
        name: "Arunachal Gale (Wrap Skirt)",
        category: "Gale",
        price: 1500,
        originalPrice: 2000,
        discount: "25% off",
        image: "https://via.placeholder.com/300?text=Arunachal+Gale",
        desc: "Traditional woven Gale from Arunachal Pradesh with geometric patterns."
    },
    {
        id: 6,
        name: "Tripura Rignai and Risa Set",
        category: "Rignai",
        price: 2800,
        originalPrice: 3500,
        discount: "20% off",
        image: "https://via.placeholder.com/300?text=Tripura+Rignai",
        desc: "Complete traditional attire of Tripura, handloom cotton."
    },
    {
        id: 7,
        name: "Khasi Jainsem (Silk)",
        category: "Jainsem",
        price: 3200,
        originalPrice: 5000,
        discount: "36% off",
        image: "https://via.placeholder.com/300?text=Khasi+Jainsem",
        desc: "Elegant 2-piece Jainsem worn by Khasi women of Meghalaya."
    },
    {
        id: 8,
        name: "Traditional Bamboo Handbag",
        category: "Handicrafts",
        price: 850,
        originalPrice: 1200,
        discount: "29% off",
        image: "https://via.placeholder.com/300?text=Bamboo+Bag",
        desc: "Eco-friendly handmade bamboo bag from Assam."
    },
    {
        id: 9,
        name: "Garo Dakmanda",
        category: "Dakmanda",
        price: 1900,
        originalPrice: 2400,
        discount: "20% off",
        image: "https://via.placeholder.com/300?text=Garo+Dakmanda",
        desc: "Handwoven Dakmanda with floral motifs, traditional Garo attire."
    },
    {
        id: 10,
        name: "Northeast Tribal Necklace",
        category: "Jewelry",
        price: 450,
        originalPrice: 999,
        discount: "55% off",
        image: "https://via.placeholder.com/300?text=Tribal+Necklace",
        desc: "Multi-colored beaded necklace, traditional Naga style."
    }
];

// 2. Render Products Function
const productGrid = document.getElementById('product-grid');

function renderProducts(productsToRender) {
    productGrid.innerHTML = ""; // Clear existing content

    productsToRender.forEach(product => {
        // Create WhatsApp Message
        // Format: "Hello, I want to order [Product Name] - Price: [Price]"
        const message = `Hello, I want to order ${product.name} (ID: ${product.id}) - Price: ₹${product.price}`;
        const whatsappLink = `https://wa.me/917630808203?text=${encodeURIComponent(message)}`;
        // REPLACE '917630808203' with your actual phone number

        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <div>
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-info">
                    <h3>${product.category}</h3>
                    <div class="product-name" title="${product.name}">${product.name}</div>
                    <div style="margin: 5px 0;">
                        <span class="product-price">₹${product.price}</span>
                        <span class="original-price">₹${product.originalPrice}</span>
                        <span class="discount">${product.discount}</span>
                    </div>
                </div>
            </div>
            <a href="${whatsappLink}" target="_blank" class="order-btn">
                <i class="fab fa-whatsapp"></i> Order on WhatsApp
            </a>
        `;
        productGrid.appendChild(card);
    });
}

// Initial Render
renderProducts(products);

// 3. Search Functionality
const searchInput = document.getElementById('searchInput');

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) || 
               product.category.toLowerCase().includes(searchTerm);
    });

    renderProducts(filteredProducts);
    
    if(filteredProducts.length === 0) {
        productGrid.innerHTML = `<p style="text-align:center; width:100%; padding:20px;">No products found for "${searchTerm}"</p>`;
    }
}

// Add event listener for "Enter" key in search
searchInput.addEventListener('keyup', (e) => {
    filterProducts();
});