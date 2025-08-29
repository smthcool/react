import { AnimatePresence, motion } from 'framer-motion';
import React, {useState} from 'react';
import { FaChevronUp, FaChevronDown, FaArrowRight, FaSearch, FaShoppingCart, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
        <ProductGalleryWithPagination/>
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

const ProductGalleryWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

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
    {id: 3,
    name: "Смартфон 3",
    price: "151000",
    rating: 4,
    description: "Это просто описание смартфона с номером 3",
    image: "https://c.dns-shop.ru/thumb/st4/fit/200/200/f3c07e9d8dd6a9de9e0e28ccb83f115b/9567d18107af5c3d1264b429db988c4bc63a8089d4cb76add0236817adeb3af8.jpg.webp"
    },
    {id: 4,
    name: "Смартфон 4",
    price: "152000",
    rating: 1,
    description: "Это просто описание смартфона с номером 3",
    image: "https://c.dns-shop.ru/thumb/st4/fit/320/250/145ea547ae4e7e7b4ffa7f57915204f1/bd65317a2d3cf14bd2b3d6e1aee797491777d5b5467d2ab774a5bdcbc71c5c95.jpg"
    }
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0,0);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0,0);
    }
  };

  const goToPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
      window.scrollTo(0,0);
    }
  };

  return (
  <div>
    <section className="product-gallery">
      <h2>Все товары</h2>
      
      <div className="products-grid">
        {currentProducts.map((product) => (
          <Link to={`/product/${product.id}`} className="product-link" key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      {/*Пагинация*/}
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <FaChevronLeft/>
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
          >
            {pageNumber}
          </button>
        ))}
        
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          <FaChevronRight/>
        </button>
      </div>
    </section>
  </div>
);
}

//Компонент с карточкой товара
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(211, 125, 125, 0.1)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {isHovered && (
          <motion.div
            className="quick-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Подробнее
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};


export default App;

