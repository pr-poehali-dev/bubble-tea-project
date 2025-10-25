import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentSection: string;
  onNavigate: (section: string) => void;
}

const MobileMenu = ({ isOpen, onClose, currentSection, onNavigate }: MobileMenuProps) => {
  const handleNavigate = (section: string) => {
    onNavigate(section);
    onClose();
  };

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'menu', label: 'Меню', icon: 'Coffee' },
    { id: 'promo', label: 'Акции', icon: 'Gift' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="bg-card border-primary/30">
        <SheetHeader>
          <SheetTitle className="text-2xl font-display neon-text">BUBBLE</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentSection === item.id ? 'default' : 'ghost'}
              className={`w-full justify-start text-lg ${
                currentSection === item.id
                  ? 'bg-gradient-to-r from-primary to-secondary neon-glow'
                  : 'hover:bg-primary/10'
              }`}
              onClick={() => handleNavigate(item.id)}
            >
              <Icon name={item.icon as any} size={20} className="mr-3" />
              {item.label}
            </Button>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20">
          <Button
            className="w-full bg-gradient-to-r from-accent to-primary neon-glow"
            size="lg"
            asChild
          >
            <a href="https://eda.yandex.ru/restaurant/bubble_coffee" target="_blank" rel="noopener noreferrer">
              <Icon name="ShoppingBag" size={20} className="mr-2" />
              Заказать в Яндекс.Еда
            </a>
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-sm text-foreground/70 font-semibold">Подписывайтесь на нас:</p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="border-primary/30 hover:bg-primary/10"
              asChild
            >
              <a href="https://t.me/bubble_coffee_msk" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={20} />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-primary/30 hover:bg-primary/10"
              asChild
            >
              <a href="https://www.instagram.com/bubble.coffee_rus" target="_blank" rel="noopener noreferrer">
                <Icon name="Instagram" size={20} />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-primary/30 hover:bg-primary/10"
              asChild
            >
              <a href="tel:+79600001410">
                <Icon name="Phone" size={20} />
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
