import { AnimatePresence, motion } from 'framer-motion';
import React, {useState} from 'react';
import { FaChevronUp, FaChevronDown, FaArrowRight, FaSearch } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Link, useLocation, Route  } from 'react-router-dom';
import './App.css'
//Анимированное выпадающее меню

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    {name: 'Электроника', items: ['Смартфоны', 'Ноутбуки', 'Телевизоры']},
    {name: 'Одежда', items: ['Мужская', 'Женская', 'Детская']}
  ]

  return (
  <nav className='nav-items'>
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
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
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
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    {category.items.map((item, i) => (
                      <div key={i} className="subcategory-item">
                        {item}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <Link to ="/catalog"
    className="nav-item">Каталог</Link>
    <Link to ="/about"
    className="nav-item">О нас</Link>

    <div className="nav-actions">
      <button className="search-button">
        <FaSearch/>
        </button>
        <button className="cart-button">
        <FaSearch/>
      </button>
    </div>
  </nav>
)
}

const CatalogPage = () => {
  return (
    <main className="main-content">
    <h1 className = "page-title">Каталог товаров</h1>
    </main>
  )
}

const RoutesWithAnimation = () => {
  const location = useLocation();
  return (
    <Routes location={location}
    key = {location.pathname}>
    <Route path="/catalog" element ={<CatalogPage/>}  />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavMenu />
        <AnimatePresence mode="wait">
          <RoutesWithAnimation/>
        </AnimatePresence>
      </div>
      </Router>
  )
}

export default App;

