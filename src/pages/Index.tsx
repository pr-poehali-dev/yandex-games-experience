import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface Game {
  id: number;
  title: string;
  category: string;
  rating: number;
  players: string;
  image: string;
  isNew?: boolean;
  isFavorite?: boolean;
}

const Index = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Экшн', 'Стратегии', 'Головоломки', 'Гонки', 'Спорт', 'Аркады'];

  const games: Game[] = [
    { id: 1, title: 'Космический штурм', category: 'Экшн', rating: 4.8, players: '2.5M', image: '🚀', isNew: true },
    { id: 2, title: 'Королевство стратегов', category: 'Стратегии', rating: 4.9, players: '3.1M', image: '👑' },
    { id: 3, title: 'Загадки разума', category: 'Головоломки', rating: 4.7, players: '1.8M', image: '🧩' },
    { id: 4, title: 'Турбо гонки', category: 'Гонки', rating: 4.6, players: '2.2M', image: '🏎️', isNew: true },
    { id: 5, title: 'Футбольная лига', category: 'Спорт', rating: 4.5, players: '1.5M', image: '⚽' },
    { id: 6, title: 'Ретро аркада', category: 'Аркады', rating: 4.8, players: '1.9M', image: '🎮' },
    { id: 7, title: 'Галактический воин', category: 'Экшн', rating: 4.9, players: '3.5M', image: '⚔️' },
    { id: 8, title: 'Империя власти', category: 'Стратегии', rating: 4.7, players: '2.8M', image: '🏰', isNew: true },
    { id: 9, title: 'Мозголомка', category: 'Головоломки', rating: 4.6, players: '1.6M', image: '🎯' },
    { id: 10, title: 'Дрифт мастер', category: 'Гонки', rating: 4.8, players: '2.4M', image: '🏁' },
    { id: 11, title: 'Баскетбол про', category: 'Спорт', rating: 4.5, players: '1.4M', image: '🏀' },
    { id: 12, title: 'Классика 8-бит', category: 'Аркады', rating: 4.9, players: '2.1M', image: '👾' }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const topGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const newGames = games.filter(g => g.isNew);
  const favoriteGames = games.filter(g => favorites.includes(g.id));

  const GameCard = ({ game }: { game: Game }) => (
    <Card className="relative overflow-hidden group hover-scale hover-glow cursor-pointer bg-card border-border">
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(game.id);
          }}
        >
          <Icon 
            name={favorites.includes(game.id) ? "Heart" : "Heart"} 
            size={16}
            className={favorites.includes(game.id) ? "fill-red-500 text-red-500" : ""}
          />
        </Button>
      </div>
      
      <div className="aspect-video flex items-center justify-center text-7xl bg-gradient-to-br from-primary/20 to-secondary/20">
        {game.image}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base line-clamp-1">{game.title}</h3>
          {game.isNew && <Badge variant="secondary" className="text-xs">NEW</Badge>}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="Star" size={14} className="fill-yellow-500 text-yellow-500" />
            {game.rating}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Users" size={14} />
            {game.players}
          </span>
        </div>
        
        <Badge variant="outline" className="mt-3 text-xs">{game.category}</Badge>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🎮</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameHub
              </h1>
            </div>
            
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск игр..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button variant="ghost" size="icon">
              <Icon name="User" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary py-20">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl font-bold mb-4">Играй без границ</h2>
            <p className="text-xl text-foreground/90 mb-8 max-w-2xl mx-auto">
              Тысячи игр на любой вкус. Начни играть прямо сейчас!
            </p>
            <Button size="lg" className="bg-background text-primary hover:bg-background/90 font-semibold">
              <Icon name="PlayCircle" size={20} className="mr-2" />
              Начать играть
            </Button>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
        </section>

        <section className="container mx-auto px-4 py-12">
          <Tabs defaultValue="catalog" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted">
              <TabsTrigger value="catalog">Каталог</TabsTrigger>
              <TabsTrigger value="top">Топ игр</TabsTrigger>
              <TabsTrigger value="new">Новинки</TabsTrigger>
              <TabsTrigger value="favorites">
                Избранное
                {favorites.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{favorites.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="catalog">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Категории</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(cat)}
                      className="rounded-full"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Игры не найдены</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="top">
              <h3 className="text-2xl font-bold mb-6">🏆 Лучшие игры по рейтингу</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {topGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new">
              <h3 className="text-2xl font-bold mb-6">✨ Новинки недели</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              {favoriteGames.length > 0 ? (
                <>
                  <h3 className="text-2xl font-bold mb-6">❤️ Твои любимые игры</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoriteGames.map(game => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Heart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Здесь пока пусто</p>
                  <p className="text-sm text-muted-foreground">Добавляй игры в избранное, чтобы быстро находить их позже</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 GameHub. Играй и побеждай! 🚀</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
