import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface DrinkSize {
  size: string;
  price: number;
}

interface Drink {
  name: string;
  description: string;
  sizes: DrinkSize[];
  category: string;
}

interface Addon {
  name: string;
  price: number;
}

interface OrderItem {
  name: string;
  size: string;
  price: number;
  addons: Addon[];
  quantity: number;
}

const syrups = [
  'Ваниль', 'Карамель', 'Жареная карамель', 'Соленая карамель', 'Имбирный пряник',
  'Шоколадное печенье', 'Шоколад', 'Тоффи', 'Брауни', 'Соленый пекан', 'Пралине',
  'Корица', 'Попкорн', 'Медовый', 'Кленовый', 'БаблГам', 'Айриш Крим', 'Амаретто',
  'Лесной орех', 'Миндаль', 'Фисташка', 'Макадамия', 'Жареный фундук', 'Каштан',
  'Тирамису', 'Мята', 'Яблоко', 'Клубника', 'Малина', 'Лесные ягоды'
];

const otherAddons: Addon[] = [
  { name: 'Сливки', price: 90 },
  { name: 'Молоко', price: 60 },
  { name: 'Шот эспрессо', price: 70 },
  { name: 'Тапиока', price: 100 },
  { name: 'Безлактозное молоко', price: 90 },
  { name: 'Кокосовое молоко', price: 90 },
  { name: 'Миндальное молоко', price: 90 },
  { name: 'Банановое молоко', price: 90 },
  { name: 'Халва', price: 50 },
  { name: 'Взрывная карамель', price: 50 },
  { name: 'Белый шоколад', price: 50 },
  { name: 'Фисташка', price: 50 }
];

const toppings = [
  'Малина', 'Карамель', 'Белый шоколад', 'Фисташка', 'Манго-маракуйя',
  'Соленая карамель', 'Клубника', 'Шоколад', 'Халва', 'Лимон-имбирь'
];

const menu: Drink[] = [
  { name: 'Эспрессо', description: 'Классический крепкий кофе', sizes: [{ size: '30мл', price: 150 }], category: 'coffee' },
  { name: 'Американо', description: 'Эспрессо с горячей водой', sizes: [{ size: '30мл', price: 260 }, { size: '200мл', price: 300 }, { size: '300мл', price: 330 }], category: 'coffee' },
  { name: 'Капучино', description: 'Эспрессо с молочной пенкой', sizes: [{ size: '30мл', price: 290 }, { size: '200мл', price: 330 }, { size: '300мл', price: 380 }], category: 'coffee' },
  { name: 'Латте', description: 'Эспрессо с большим количеством молока', sizes: [{ size: '200мл', price: 330 }, { size: '300мл', price: 380 }], category: 'coffee' },
  { name: 'Раф', description: 'Кофе со сливками и ванильным сиропом', sizes: [{ size: '200мл', price: 380 }, { size: '300мл', price: 430 }], category: 'coffee' },
  { name: 'Флэт-уайт', description: 'Двойной эспрессо с микропенкой', sizes: [{ size: '30мл', price: 350 }], category: 'coffee' },
  
  { name: 'Горячий шоколад', description: 'Насыщенный шоколадный напиток', sizes: [{ size: '200мл', price: 290 }, { size: '300мл', price: 330 }, { size: '400мл', price: 380 }], category: 'hot' },
  { name: 'Какао', description: 'Классическое какао на молоке', sizes: [{ size: '200мл', price: 290 }, { size: '300мл', price: 330 }, { size: '400мл', price: 380 }], category: 'hot' },
  { name: 'Матча-латте', description: 'Японский зеленый чай с молоком', sizes: [{ size: '200мл', price: 290 }, { size: '300мл', price: 330 }, { size: '400мл', price: 380 }], category: 'hot' },
  { name: 'Глинтвейн', description: 'Горячий напиток с пряностями', sizes: [{ size: '300мл', price: 390 }, { size: '400мл', price: 440 }], category: 'hot' },
  
  { name: 'Раф Соленая фисташка', description: 'Нежный раф с фисташковым вкусом', sizes: [{ size: '300мл', price: 400 }, { size: '400мл', price: 450 }], category: 'signature' },
  { name: 'Раф Халва', description: 'Восточная сладость в кофейном напитке', sizes: [{ size: '300мл', price: 400 }, { size: '400мл', price: 450 }], category: 'signature' },
  { name: 'Раф Арахисовый', description: 'Кремовый раф с арахисовой пастой', sizes: [{ size: '300мл', price: 400 }, { size: '400мл', price: 450 }], category: 'signature' },
  { name: 'Латте Взрывная карамель', description: 'Латте с карамельными нотками', sizes: [{ size: '300мл', price: 380 }, { size: '400мл', price: 430 }], category: 'signature' },
  { name: 'Латте Белый шоколад', description: 'Нежный латте с белым шоколадом', sizes: [{ size: '300мл', price: 380 }, { size: '400мл', price: 430 }], category: 'signature' },
  
  { name: 'БаблТи Кофейный', description: 'Кофейный напиток с жемчужинами тапиоки', sizes: [{ size: '300мл', price: 400 }, { size: '400мл', price: 450 }], category: 'bubble' },
  { name: 'БаблТи Матча', description: 'Зеленый чай матча с тапиокой', sizes: [{ size: '300мл', price: 400 }, { size: '400мл', price: 450 }], category: 'bubble' },
  { name: 'БаблТи Матча-Клубника', description: 'Сочетание матчи и клубники', sizes: [{ size: '300мл', price: 440 }, { size: '400мл', price: 490 }], category: 'bubble' },
  { name: 'БаблТи Синнабон', description: 'Вкус знаменитой булочки с корицей', sizes: [{ size: '300мл', price: 440 }, { size: '400мл', price: 490 }], category: 'bubble' },
  { name: 'БаблТи Тропик', description: 'Тропические фрукты с тапиокой', sizes: [{ size: '300мл', price: 440 }, { size: '400мл', price: 490 }], category: 'bubble' },
  { name: 'БаблТи Малиновый пирог', description: 'Сладкий малиновый вкус', sizes: [{ size: '300мл', price: 440 }, { size: '400мл', price: 490 }], category: 'bubble' },
  { name: 'БаблТи Шоколад', description: 'Шоколадный напиток с тапиокой', sizes: [{ size: '300мл', price: 440 }, { size: '400мл', price: 490 }], category: 'bubble' },
  { name: 'БаблТи Попкорн', description: 'Необычный попкорновый вкус', sizes: [{ size: '300мл', price: 440 }, { size: '400мл', price: 490 }], category: 'bubble' },
  { name: 'БаблТи Соленая карамель', description: 'Соленая карамель с жемчужинами', sizes: [{ size: '300мл', price: 440 }, { size: '400мл', price: 490 }], category: 'bubble' },
  
  { name: 'Ананас-маракуйя', description: 'Освежающий фруктовый чай', sizes: [{ size: '300мл', price: 330 }, { size: '400мл', price: 360 }], category: 'functional' },
  { name: 'Малиновый', description: 'Витаминный напиток с малиной', sizes: [{ size: '300мл', price: 390 }, { size: '400мл', price: 440 }], category: 'functional' },
  { name: 'Имбирный', description: 'Согревающий имбирный чай', sizes: [{ size: '300мл', price: 390 }, { size: '400мл', price: 440 }], category: 'functional' },
  { name: 'Облепиховый', description: 'Полезный облепиховый напиток', sizes: [{ size: '300мл', price: 390 }, { size: '400мл', price: 440 }], category: 'functional' },
  { name: 'Смузи ягодный', description: 'Микс из свежих ягод', sizes: [{ size: '300мл', price: 330 }, { size: '400мл', price: 360 }], category: 'functional' },
  { name: 'Смузи мята-маракуйя', description: 'Освежающий мятный смузи', sizes: [{ size: '300мл', price: 330 }, { size: '400мл', price: 360 }], category: 'functional' },
  { name: 'Смузи ананас-манго', description: 'Тропический микс фруктов', sizes: [{ size: '300мл', price: 330 }, { size: '400мл', price: 360 }], category: 'functional' }
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [selectedSize, setSelectedSize] = useState<DrinkSize | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDrinkModal = (drink: Drink) => {
    setSelectedDrink(drink);
    setSelectedSize(null);
    setSelectedAddons([]);
    setIsModalOpen(true);
  };

  const toggleAddon = (addonName: string, price: number) => {
    const addon = { name: addonName, price };
    const exists = selectedAddons.find(a => a.name === addonName);
    
    if (exists) {
      setSelectedAddons(selectedAddons.filter(a => a.name !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addToOrder = () => {
    if (!selectedDrink || !selectedSize) return;

    const totalPrice = selectedSize.price + selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const itemName = selectedDrink.name;

    const existingItemIndex = order.findIndex(
      item => item.name === itemName && item.size === selectedSize.size && 
      JSON.stringify(item.addons) === JSON.stringify(selectedAddons)
    );

    if (existingItemIndex !== -1) {
      const newOrder = [...order];
      newOrder[existingItemIndex].quantity += 1;
      setOrder(newOrder);
    } else {
      setOrder([...order, {
        name: itemName,
        size: selectedSize.size,
        price: totalPrice,
        addons: selectedAddons,
        quantity: 1
      }]);
    }

    setIsModalOpen(false);
    setSelectedDrink(null);
    setSelectedSize(null);
    setSelectedAddons([]);
  };

  const updateQuantity = (index: number, change: number) => {
    const newOrder = [...order];
    newOrder[index].quantity += change;
    
    if (newOrder[index].quantity <= 0) {
      newOrder.splice(index, 1);
    }
    
    setOrder(newOrder);
  };

  const removeFromOrder = (index: number) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
  };

  const totalPrice = order.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'coffee': return 'Coffee';
      case 'hot': return 'Flame';
      case 'signature': return 'Sparkles';
      case 'bubble': return 'CircleDot';
      case 'functional': return 'Apple';
      default: return 'Coffee';
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'coffee': return 'Кофе';
      case 'hot': return 'Горячие напитки';
      case 'signature': return 'Авторский кофе';
      case 'bubble': return 'БаблТи';
      case 'functional': return 'Функциональные напитки';
      default: return '';
    }
  };

  const categories = ['coffee', 'hot', 'signature', 'bubble', 'functional'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0415] via-[#1a0a2e] to-[#16001e]">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-display font-bold neon-text">BUBBLE</div>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {['home', 'menu', 'promo', 'delivery', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => setCurrentSection(section)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    currentSection === section
                      ? 'text-primary neon-text'
                      : 'text-foreground/70 hover:text-primary'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'menu' && 'Меню'}
                  {section === 'promo' && 'Акции'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>

            <Button
              onClick={() => setCurrentSection('menu')}
              className="relative bg-gradient-to-r from-primary to-secondary hover:opacity-90 neon-glow"
            >
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Заказать
              {order.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-accent">{order.length}</Badge>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {currentSection === 'home' && (
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center space-y-8 animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-display font-bold neon-text">
                BUBBLE
              </h1>
              <p className="text-2xl md:text-3xl text-primary/90 font-semibold">
                Bubble Tea & Coffee Bar
              </p>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Погрузитесь в мир вкуса! Авторские БаблТи с тапиокой, кофейные шедевры и уникальные напитки в атмосфере неонового уюта
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button
                  size="lg"
                  onClick={() => setCurrentSection('menu')}
                  className="bg-gradient-to-r from-primary to-accent text-lg px-8 py-6 neon-glow hover:scale-105 transition-transform"
                >
                  <Icon name="CircleDot" size={24} className="mr-2" />
                  Открыть меню
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setCurrentSection('promo')}
                  className="border-primary/50 text-lg px-8 py-6 hover:bg-primary/10"
                >
                  <Icon name="Sparkles" size={24} className="mr-2" />
                  Акции
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
                <Card className="bg-card/50 backdrop-blur border-primary/30 neon-border hover:scale-105 transition-transform">
                  <CardContent className="pt-6 text-center space-y-3">
                    <Icon name="Clock" size={48} className="mx-auto text-primary" />
                    <h3 className="font-display font-semibold text-xl">Часы работы</h3>
                    <p className="text-foreground/70">08:00 - 22:00</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-primary/30 neon-border hover:scale-105 transition-transform">
                  <CardContent className="pt-6 text-center space-y-3">
                    <Icon name="MapPin" size={48} className="mx-auto text-secondary" />
                    <h3 className="font-display font-semibold text-xl">Адрес</h3>
                    <p className="text-foreground/70">Москва, Юлиана Семенова, 8к2</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-primary/30 neon-border hover:scale-105 transition-transform">
                  <CardContent className="pt-6 text-center space-y-3">
                    <Icon name="CircleDot" size={48} className="mx-auto text-accent animate-glow-pulse" />
                    <h3 className="font-display font-semibold text-xl">Специализация</h3>
                    <p className="text-foreground/70">Bubble Tea с тапиокой</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentSection === 'menu' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {categories.map((category) => {
                const categoryDrinks = menu.filter(d => d.category === category);
                if (categoryDrinks.length === 0) return null;

                return (
                  <div key={category} className="animate-fade-in">
                    <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-t-2xl">
                      <div className="flex items-center space-x-3">
                        <Icon name={getCategoryIcon(category)} size={32} className="text-white" />
                        <h2 className="text-3xl font-display font-bold text-white">
                          {getCategoryTitle(category)}
                        </h2>
                      </div>
                    </div>
                    
                    <div className="bg-card/50 backdrop-blur rounded-b-2xl border border-primary/20 overflow-hidden">
                      {categoryDrinks.map((drink, index) => (
                        <div
                          key={drink.name}
                          className={`p-6 cursor-pointer transition-all hover:bg-primary/10 hover:translate-x-2 border-l-4 border-transparent hover:border-primary ${
                            index !== 0 ? 'border-t border-muted' : ''
                          }`}
                          onClick={() => openDrinkModal(drink)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-xl font-display font-semibold mb-2">{drink.name}</h3>
                              <p className="text-sm text-foreground/70 mb-2">{drink.description}</p>
                              {drink.sizes.length > 1 && (
                                <p className="text-xs text-primary/80">
                                  {drink.sizes.map(s => `${s.size}: ${s.price}₽`).join(' | ')}
                                </p>
                              )}
                            </div>
                            <Badge className="ml-4 bg-gradient-to-r from-primary to-accent text-white px-4 py-2">
                              {drink.sizes.length === 1 ? `${drink.sizes[0].price}₽` : `от ${drink.sizes[0].price}₽`}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 bg-card/80 backdrop-blur border-primary/30 neon-border">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-display font-bold mb-6 neon-text">Ваш заказ</h3>
                  
                  {order.length === 0 ? (
                    <div className="text-center py-12 text-foreground/50">
                      <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 opacity-30" />
                      <p>Выберите напитки из меню</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {order.map((item, index) => (
                        <Card key={index} className="bg-muted/30 border-primary/20">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <p className="text-xs text-foreground/60">{item.size}</p>
                                {item.addons.length > 0 && (
                                  <p className="text-xs text-primary/80 mt-1">
                                    + {item.addons.map(a => a.name).join(', ')}
                                  </p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromOrder(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(index, -1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(index, 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                              <span className="font-bold text-primary">{item.price * item.quantity}₽</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <Separator className="my-4" />
                      
                      <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-lg">
                        <div className="flex justify-between items-center text-white">
                          <span className="text-xl font-display font-bold">Итого:</span>
                          <span className="text-2xl font-display font-bold">{totalPrice}₽</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {currentSection === 'promo' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-4xl font-display font-bold text-center mb-12 neon-text">Акции</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur border-primary/30 neon-border hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <Icon name="Gift" size={48} className="text-primary mb-4" />
                <h3 className="text-2xl font-display font-bold mb-3">Счастливые часы</h3>
                <p className="text-foreground/80 mb-4">С 14:00 до 16:00 скидка 20% на все БаблТи</p>
                <Badge className="bg-accent">Каждый день</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur border-accent/30 neon-border hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <Icon name="Heart" size={48} className="text-accent mb-4" />
                <h3 className="text-2xl font-display font-bold mb-3">Второй в подарок</h3>
                <p className="text-foreground/80 mb-4">При покупке 2х напитков — третий БаблТи в подарок</p>
                <Badge className="bg-primary">Выходные</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {currentSection === 'delivery' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-4xl font-display font-bold text-center mb-12 neon-text">Доставка</h2>
          
          <Card className="bg-card/50 backdrop-blur border-primary/30 neon-border">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <Icon name="Truck" size={32} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-bold mb-2">Бесплатная доставка</h3>
                  <p className="text-foreground/80">При заказе от 1000₽ доставка бесплатная в пределах 3 км</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start space-x-4">
                <Icon name="Clock" size={32} className="text-secondary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-bold mb-2">Время доставки</h3>
                  <p className="text-foreground/80">30-45 минут в зависимости от загруженности</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start space-x-4">
                <Icon name="MapPin" size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-bold mb-2">Зона доставки</h3>
                  <p className="text-foreground/80">В радиусе 5 км от кофейни</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentSection === 'contacts' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-4xl font-display font-bold text-center mb-12 neon-text">Контакты</h2>
          
          <Card className="bg-card/50 backdrop-blur border-primary/30 neon-border">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <Icon name="MapPin" size={32} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-bold mb-2">Адрес</h3>
                  <p className="text-foreground/80">Москва, Юлиана Семенова, 8к2</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start space-x-4">
                <Icon name="Clock" size={32} className="text-secondary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-bold mb-2">Режим работы</h3>
                  <p className="text-foreground/80">Ежедневно с 08:00 до 22:00</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start space-x-4">
                <Icon name="Phone" size={32} className="text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-bold mb-2">Телефон</h3>
                  <p className="text-foreground/80">+7 (XXX) XXX-XX-XX</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start space-x-4">
                <Icon name="Instagram" size={32} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-display font-bold mb-2">Социальные сети</h3>
                  <p className="text-foreground/80">@bubble_coffee_moscow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display neon-text">
              {selectedDrink?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Выберите размер:</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedDrink?.sizes.map((sizeOption) => (
                  <Button
                    key={sizeOption.size}
                    variant={selectedSize?.size === sizeOption.size ? "default" : "outline"}
                    className={`h-auto py-4 ${
                      selectedSize?.size === sizeOption.size
                        ? 'bg-gradient-to-r from-primary to-secondary neon-glow'
                        : 'border-primary/30 hover:border-primary'
                    }`}
                    onClick={() => setSelectedSize(sizeOption)}
                  >
                    <div className="text-center">
                      <div className="font-semibold">{sizeOption.size}</div>
                      <div className="text-sm">{sizeOption.price}₽</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Сиропы (+50₽):</h4>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
                {syrups.map((syrup) => (
                  <label
                    key={syrup}
                    className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-all border ${
                      selectedAddons.find(a => a.name === syrup)
                        ? 'bg-primary/20 border-primary'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.some(a => a.name === syrup)}
                      onChange={() => toggleAddon(syrup, 50)}
                      className="rounded"
                    />
                    <span className="text-sm">{syrup}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Другие дополнения:</h4>
              <div className="space-y-2">
                {otherAddons.map((addon) => (
                  <label
                    key={addon.name}
                    className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all border ${
                      selectedAddons.find(a => a.name === addon.name)
                        ? 'bg-primary/20 border-primary'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedAddons.some(a => a.name === addon.name)}
                        onChange={() => toggleAddon(addon.name, addon.price)}
                        className="rounded"
                      />
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-semibold text-primary">+{addon.price}₽</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Топпинги (+50₽):</h4>
              <div className="grid grid-cols-2 gap-2">
                {toppings.map((topping) => (
                  <label
                    key={topping}
                    className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-all border ${
                      selectedAddons.find(a => a.name === topping)
                        ? 'bg-primary/20 border-primary'
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.some(a => a.name === topping)}
                      onChange={() => toggleAddon(topping, 50)}
                      className="rounded"
                    />
                    <span className="text-sm">{topping}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-primary/30"
                onClick={() => setIsModalOpen(false)}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-secondary neon-glow"
                onClick={addToOrder}
                disabled={!selectedSize}
              >
                Добавить в заказ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="mt-20 border-t border-primary/20 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-foreground/60">
            <p className="font-display text-2xl font-bold neon-text mb-2">BUBBLE</p>
            <p className="text-sm">© 2025 Bubble Coffee Bar. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
