import { AnimatePresence, motion } from 'framer-motion';
import React, {useState} from 'react';
import { FaChevronUp, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import './App.css'
//Анимированное выпадающее меню

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button
        onClick={
          () => setIsOpen(!isOpen)
        }
        className="dropdown-button">
        Меню {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="dropdown-content"
            >
              <a href="#">Главная</a>
              <a href="#">О нас</a>
              <a href="#">Контакты</a>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};

const AnimatedList = () => {
  const items = ['Первый элемент', 'Второй элемент', 'Третий элемент'];
  return (
    <ul className='animated-list'>
      {items.map((item, index) => (
        <motion.li
        key={index}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index*0.1, duration: 0.5 }}
      >
        {item}
        </motion.li>
      ))}
    </ul>
  );
};

const AnimatedButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
    className='animated-button'
    whileHover={{scale: 1.2}}
    whileTap={{scale: 0.8}}
    onHoverStart={()=>setIsHovered(true)}
    onHoverEnd={()=>setIsHovered(false)}
    >
      {isHovered ? 'Кликните на меня!':'Наведите на меня'}
      {isHovered && (
        <motion.span
        initial={{x:-100, opacity: 0}}
        animate={{x:500, opacity:1}}
        transition={{delay:1}}
        >
          <FaArrowRight />
          </motion.span>
      )}
    </motion.button>
  );
};

const SimpleGallery = () => {
  const images = ['https://storage.yandexcloud.net/incrussia-prod/wp-content/uploads/2025/08/logotip-kompanii-apple.webp',
    'https://www.iphones.ru/wp-content/uploads/2025/08/ultra-2-prime-day.jpeg'
  ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const nextImage = () => {
      setCurrentIndex((prev) => (prev == 0 ? images.length -1 : prev-1));
  }
  const prevImage = () => {
      setCurrentIndex((prev) => (prev == 0 ? images.length -1 : prev-1));
  }

return (
  <div className = "gallery">
    <div className="gallery-nav">
      <button onClick={prevImage}>FaArrowLeft
      </button>
      <button onClick={nextImage}>FaArrowRight
      </button>
    </div>
    <AnimatePresence mode="wait">
      <motion.img
      key={currentIndex}
      src={images[currentIndex]}
      alt="Gallery item"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
      />
    </AnimatePresence>
  </div>
);
};

const App = () => {
  return (
    <div className="app">
      <h1>Демонстрация возможностей React</h1>
      <section>
        <h2>Анимированное выпадающее меню</h2>
        <DropdownMenu />
      </section>
      <section>
        <h2>Список с анимацией</h2>
        <AnimatedList/>
      </section>
      <section>
        <h2>Кнопка с анимацией</h2>
        <AnimatedButton/>
      </section>
      <section>
        <h2>Простая галерея</h2>
        <SimpleGallery/>
      </section>

    </div>
  )
}

export default App;

