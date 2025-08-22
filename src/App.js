import { AnimatePresence, motion } from 'framer-motion';
import React, {useState} from 'react';
import { FaChevronUp, FaChevronDown, FaArrowRight, FaSearch, FaShoppingCart, FaStar } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Link, useLocation, Route  } from 'react-router-dom';
import './App.css'
//Анимированное выпадающее меню

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavMenu />
        
        <AnimatePresence mode="wait">
          <RoutesWithAnimation />
        </AnimatePresence>
        
      </div>
    </Router>
  );
};

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    { name: 'Электроника', items: ['Смартфоны', 'Ноутбуки', 'Телевизоры'] },
    { name: 'Одежда', items: ['Мужская', 'Женская', 'Детская'] },
    { name: 'Дом и сад', items: ['Мебель', 'Текстиль', 'Инструменты'] }
  ];

  return (
    <nav className="nav-menu">
      <Link to="/" className="nav-logo">ShopOnline</Link>
      
      <div className="nav-items">
        <div 
          className="nav-item"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <span>Категории <FaChevronDown size={12} /></span>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="categories-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {categories.map((category, index) => (
                  <div 
                    key={index}
                    className="category-item"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {category.name}
                    
                    {hoveredItem === index && (
                      <motion.div
                        className="subcategories"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {category.items.map((item, i) => (
                          <div key={i} className="subcategory-item">{item}</div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <Link to="/catalog" className="nav-item">Каталог</Link>
        <Link to="/about" className="nav-item">О нас</Link>
      </div>
      
      <div className="nav-actions">
        <button className="search-button">
          <FaSearch />
        </button>
        <button className="cart-button">
          <FaShoppingCart /> <span className="cart-count">0</span>
        </button>
      </div>
    </nav>
  );
};


const CatalogPage = () => {
  return (
    <main className="main-content">
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
      transition={{duration: 0.3}}
      >
      <h1 className = "page-title">Каталог товаров</h1>
      
      </motion.div>
    </main>
  )
}

const ProductDetailPage = () => {
  const product = {
    id: 1,
    name: "Смартфон 1",
    price: "50000",
    rating: 5,
    description: "Это просто описание смартфона",
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/c61450e8925f55042ebd96993cd543e0/9286da569d27aabbc02281390acc90a90d1e3a3ae90d90f58510810c9e6870b3.jpg.webp"
  };

  const [isAdded, setIsAdded] = useState(false);
  return (
     <main className="main-content">
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{duration: 0.3}}
        className="product-detail"
      >
      <Link to="/catalog"  className="back-link">
      Назад к каталогу
      </Link>
      <div className="product-detail-content">
      <div className="product-detail-image">
        <img src = {product.image} alt={product.name}/>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
        <div className="product-rating">
          {[...Array(5)].map((_, i)=>(<FaStar key={i} color={i < product.rating ? "#FFD700":"#C0C0C0"} /> ))}
        </div>
        <motion.button
        className={'add-to-cart $ {isAdded ? "added": ""}'}
        whileHover={{scale: isAdded? 1: 1.05}}
        whileTap={{scale: 0.95}}
        onClick={() => setIsAdded(!isAdded)}
        >
          {isAdded? 'Товар в корзине':'Добавить в корзину'}
        </motion.button>
        </div>
      </div>
      </div>
      </motion.div>  
     </main>
  )
}

const ProductGallery = ({limit}) => {
  const products = [
    {id: 1,
    name: "Смартфон 1",
    price: "50000",
    rating: 5,
    description: "Это просто описание смартфона",
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/c61450e8925f55042ebd96993cd543e0/9286da569d27aabbc02281390acc90a90d1e3a3ae90d90f58510810c9e6870b3.jpg.webp"
    },
    {id: 2,
    name: "Смартфон 2",
    price: "150000",
    rating: 3,
    description: "Это просто описание смартфона с номером 2",
    image: "https://c.dns-shop.ru/thumb/st1/fit/500/500/0765718a0de075eeb7b70e870b0a4287/a571943317c536941223f6847b2cff2535f6f8d1b34c49ce598d8fdcae0573ac.jpg.webp"
    },
  ];
  const displayedProducts = limit ? products.slice(0, limit) : products;
  return (
    <section className='product-gallery'>
      <h2> {limit ? 'Популярные товары': 'Все товары'}</h2>'
      <div className='products-grid'>
        {displayedProducts.map((product) => (
          <Link to={'/prodct/${product.id}'} key = {product.id}
          className='product-link'>
          </Link>
        ))}
      </div>
    </section>
  )
}

const HomePage = () => {
  return (
    <main className="main-content">
      <ProductGallery limit={3}/>
    </main>
  )
}

const RoutesWithAnimation = () => {
  const location = useLocation();
  return (
    <Routes location={location}
    key = {location.pathname}>
    <Route path="/catalog" element ={<CatalogPage/>}  />
    <Route path="/" element={<HomePage/>}/>
    <Route path="/product/:id" element={<ProductDetailPage/>}/>
    </Routes>
  );
};


export default App;

