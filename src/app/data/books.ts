export type Trope =
  | 'enemies-to-lovers'
  | 'forbidden-love'
  | 'second-chance'
  | 'fake-dating'
  | 'forced-proximity'
  | 'dark-romance'
  | 'mafia'
  | 'billionaire'
  | 'age-gap'
  | 'reverse-harem'
  | 'slow-burn'
  | 'sports-romance';

export type Mood = 'dark' | 'light' | 'mixed';
export type ReadingStatus = 'want-to-read' | 'reading' | 'read';

// Interface para representar um livro com informações detalhadas
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  spice: number;
  dark: number;
  rating: number;
  ratingCount: number;
  synopsis: string;
  tropes: Trope[];
  mood: Mood;
  happilyEverAfter: boolean;
  isSeries: boolean;
  seriesName?: string;
  seriesBook?: number;
  contentWarnings: string[];
  detailedRatings: { romance: number; chemistry: number; plot: number; characters: number };
  similarBooks: string[];
  affiliateLink: string;
  trendingThisWeek?: boolean;
  viralOnBooktok?: boolean;
  genre: string[];
  comments: Comment[];
}

// Interface para representar um comentário feito por um usuário sobre um livro
export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  date: string;
  likes: number;
}

// Lista de livros com informações detalhadas sobre cada um
export const books: Book[] = [
  {
    id: '1',
    title: 'Haunting Adeline',
    author: 'H.D. Carlton',
    cover: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=300&h=450&fit=crop&auto=format',
    spice: 5,
    dark: 5,
    rating: 4.2,
    ratingCount: 48293,
    synopsis:
      'Adeline segue os passos de sua bisavó e se muda para a mansão da família. Mas ela não está sozinha. Um perseguidor das sombras a observa, a deseja, e não vai parar até tê-la. O que começa como medo se transforma em algo que ela não consegue nomear.',
    tropes: ['dark-romance', 'forbidden-love', 'enemies-to-lovers'],
    mood: 'dark',
    happilyEverAfter: true,
    isSeries: true,
    seriesName: 'Cat and Mouse Duet',
    seriesBook: 1,
    contentWarnings: ['Perseguição', 'Violência', 'Dubcon', 'Trauma psicológico', 'Stalking'],
    detailedRatings: { romance: 4.5, chemistry: 5.0, plot: 4.0, characters: 4.2 },
    similarBooks: ['2', '5', '8', '13'],
    affiliateLink: '#',
    trendingThisWeek: true,
    viralOnBooktok: true,
    genre: ['Dark Romance', 'Suspense'],
    comments: [
      {
        id: 'c1',
        user: 'malu_reads',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
        text: 'Esse livro me destruiu de um jeito que eu precisava ser destruída. A química entre eles é insana.',
        date: '2 dias atrás',
        likes: 284,
      },
      {
        id: 'c2',
        user: 'bookwitch_br',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop',
        text: 'Cuidado com os gatilhos, mas se você curte dark romance de verdade, é obrigatório.',
        date: '5 dias atrás',
        likes: 197,
      },
    ],
  },
  {
    id: '2',
    title: 'Ugly Love',
    author: 'Colleen Hoover',
    cover: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=450&fit=crop&auto=format',
    spice: 4,
    dark: 2,
    rating: 4.4,
    ratingCount: 89123,
    synopsis:
      'Tate Collins se apaixona pelo piloto Miles Archer, mas ele tem uma regra: sem amor, sem futuro. Apenas aqui e agora. Ela concorda. Mas o amor não segue regras — especialmente quando há feridas que ele nunca deixou cicatrizar.',
    tropes: ['forbidden-love', 'slow-burn', 'second-chance'],
    mood: 'mixed',
    happilyEverAfter: true,
    isSeries: false,
    contentWarnings: ['Trauma', 'Perda gestacional', 'Passado doloroso'],
    detailedRatings: { romance: 4.8, chemistry: 4.5, plot: 4.0, characters: 4.6 },
    similarBooks: ['3', '6', '7', '14'],
    affiliateLink: '#',
    viralOnBooktok: true,
    genre: ['Contemporary Romance'],
    comments: [
      {
        id: 'c3',
        user: 'carol_livros',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop',
        text: 'Chorei minha alma toda. Que final lindo.',
        date: '1 semana atrás',
        likes: 412,
      },
    ],
  },
  {
    id: '3',
    title: 'Icebreaker',
    author: 'Hannah Grace',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop&auto=format',
    spice: 4,
    dark: 1,
    rating: 4.6,
    ratingCount: 62847,
    synopsis:
      'Anastasia Allen é patinadora artística. Nathan Hawkins é o capitão do hóquei. Quando precisam dividir o gelo, a tensão entre eles é mais quente do que qualquer aquecimento. E a melhor amiga do ex dela não deveria ser tão irresistível.',
    tropes: ['enemies-to-lovers', 'forced-proximity', 'sports-romance'],
    mood: 'light',
    happilyEverAfter: true,
    isSeries: true,
    seriesName: 'Maple Hills',
    seriesBook: 1,
    contentWarnings: ['Linguagem forte'],
    detailedRatings: { romance: 4.7, chemistry: 4.8, plot: 4.3, characters: 4.7 },
    similarBooks: ['4', '2', '9'],
    affiliateLink: '#',
    trendingThisWeek: true,
    genre: ['Sports Romance', 'New Adult'],
    comments: [
      {
        id: 'c4',
        user: 'readingqueen_sp',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop',
        text: 'Nathan Hawkins é tudo que eu precisava na vida. Esse livro é perfeito!',
        date: '3 dias atrás',
        likes: 338,
      },
    ],
  },
  {
    id: '4',
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    cover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&h=450&fit=crop&auto=format',
    spice: 4,
    dark: 3,
    rating: 4.7,
    ratingCount: 120394,
    synopsis:
      'Violet Sorrengail foi forçada a entrar na Ala dos Dragoneiros. Lá ela encontra Xaden Riorson, o líder mais poderoso e perigoso — e inimigo jurado de sua família. Dragões, guerra e um romance que pode destruir tudo.',
    tropes: ['enemies-to-lovers', 'forbidden-love', 'slow-burn'],
    mood: 'dark',
    happilyEverAfter: true,
    isSeries: true,
    seriesName: 'The Empyrean',
    seriesBook: 1,
    contentWarnings: ['Violência', 'Mortes', 'Guerra'],
    detailedRatings: { romance: 4.6, chemistry: 4.8, plot: 4.5, characters: 4.7 },
    similarBooks: ['1', '5', '10', '15'],
    affiliateLink: '#',
    trendingThisWeek: true,
    viralOnBooktok: true,
    genre: ['Fantasy Romance', 'Dark Fantasy'],
    comments: [
      {
        id: 'c5',
        user: 'fantasybr_reads',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop',
        text: 'Xaden Riorson não é um personagem, é uma experiência. Esse livro mudou minha vida.',
        date: '4 dias atrás',
        likes: 621,
      },
    ],
  },
  {
    id: '5',
    title: 'Twisted Love',
    author: 'Ana Huang',
    cover: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&h=450&fit=crop&auto=format',
    spice: 4,
    dark: 3,
    rating: 4.3,
    ratingCount: 41829,
    synopsis:
      'Alex Volkov prometeu ao melhor amigo que cuidaria de sua irmã. Ele é frio, calculista, e sente algo que prometeu nunca sentir — por ela. Um protetor que se torna algo muito mais complicado.',
    tropes: ['forbidden-love', 'enemies-to-lovers', 'forced-proximity'],
    mood: 'dark',
    happilyEverAfter: true,
    isSeries: true,
    seriesName: 'Twisted',
    seriesBook: 1,
    contentWarnings: ['Trauma', 'Manipulação', 'Obsessão'],
    detailedRatings: { romance: 4.4, chemistry: 4.5, plot: 4.1, characters: 4.3 },
    similarBooks: ['6', '1', '8'],
    affiliateLink: '#',
    viralOnBooktok: true,
    genre: ['Contemporary Romance', 'Dark Romance'],
    comments: [],
  },
  {
    id: '6',
    title: 'It Ends With Us',
    author: 'Colleen Hoover',
    cover: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=300&h=450&fit=crop&auto=format',
    spice: 3,
    dark: 4,
    rating: 4.5,
    ratingCount: 198432,
    synopsis:
      'Lily Bloom sempre soube o que não queria: um amor como o dos seus pais. Mas quando encontra Ryle Kincaid, as linhas entre amor e dor começam a se borrar de formas que ela nunca imaginou possível.',
    tropes: ['second-chance', 'forbidden-love'],
    mood: 'dark',
    happilyEverAfter: false,
    isSeries: false,
    contentWarnings: ['Violência doméstica', 'Abuso', 'Trauma', 'Suicídio (menção)'],
    detailedRatings: { romance: 4.3, chemistry: 4.4, plot: 4.8, characters: 4.6 },
    similarBooks: ['2', '7', '11', '14'],
    affiliateLink: '#',
    viralOnBooktok: true,
    genre: ['Contemporary Romance', "Women's Fiction"],
    comments: [
      {
        id: 'c6',
        user: 'literaria_br',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
        text: 'Um livro que precisa ser lido mas também precisa de cuidado. Poderoso.',
        date: '1 semana atrás',
        likes: 891,
      },
    ],
  },
  {
    id: '7',
    title: 'People We Meet on Vacation',
    author: 'Emily Henry',
    cover: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=450&fit=crop&auto=format',
    spice: 3,
    dark: 1,
    rating: 4.4,
    ratingCount: 73291,
    synopsis:
      'Alex e Poppy passam verões juntos por anos, até que algo destrói tudo. Dois anos depois, ela tenta consertar — uma última viagem para recuperar o melhor amigo e talvez algo que deveria ter sido desde o começo.',
    tropes: ['slow-burn', 'second-chance', 'forced-proximity'],
    mood: 'light',
    happilyEverAfter: true,
    isSeries: false,
    contentWarnings: ['Leve linguagem adulta'],
    detailedRatings: { romance: 4.5, chemistry: 4.3, plot: 4.4, characters: 4.6 },
    similarBooks: ['2', '6', '12'],
    affiliateLink: '#',
    genre: ['Contemporary Romance', 'Chick Lit'],
    comments: [],
  },
  {
    id: '8',
    title: 'King of Wrath',
    author: 'Ana Huang',
    cover: 'https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=300&h=450&fit=crop&auto=format',
    spice: 5,
    dark: 3,
    rating: 4.2,
    ratingCount: 29847,
    synopsis:
      'Dante Russo precisa de uma noiva. Viviana Greco foi escolhida sem consultá-la. Um casamento de conveniência que nenhum dos dois quer — até quererem com uma intensidade que os assusta.',
    tropes: ['enemies-to-lovers', 'fake-dating', 'billionaire'],
    mood: 'mixed',
    happilyEverAfter: true,
    isSeries: true,
    seriesName: 'Kings of Sin',
    seriesBook: 1,
    contentWarnings: ['Linguagem forte', 'Conteúdo adulto'],
    detailedRatings: { romance: 4.3, chemistry: 4.5, plot: 4.0, characters: 4.2 },
    similarBooks: ['5', '1', '13'],
    affiliateLink: '#',
    trendingThisWeek: true,
    genre: ['Dark Romance', 'Billionaire Romance'],
    comments: [],
  },
  {
    id: '9',
    title: 'Check & Mate',
    author: 'Ali Hazelwood',
    cover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=450&fit=crop&auto=format',
    spice: 2,
    dark: 1,
    rating: 4.1,
    ratingCount: 18293,
    synopsis:
      'Mallory Greenleaf jurou nunca mais jogar xadrez. Então enfrenta o campeão mundial Nolan Sawyer num torneio. E perde apenas sua promessa — e talvez o coração.',
    tropes: ['enemies-to-lovers', 'sports-romance', 'slow-burn'],
    mood: 'light',
    happilyEverAfter: true,
    isSeries: false,
    contentWarnings: ['Nenhum significativo'],
    detailedRatings: { romance: 4.2, chemistry: 4.1, plot: 4.0, characters: 4.3 },
    similarBooks: ['3', '7', '12'],
    affiliateLink: '#',
    genre: ['YA Romance', 'Contemporary'],
    comments: [],
  },
  {
    id: '10',
    title: 'A Court of Thorns and Roses',
    author: 'Sarah J. Maas',
    cover: 'https://images.unsplash.com/photo-1455793655573-a4bce41de4c0?w=300&h=450&fit=crop&auto=format',
    spice: 3,
    dark: 3,
    rating: 4.5,
    ratingCount: 284729,
    synopsis:
      'Feyre caça para sobreviver. Quando mata um lobo na floresta, é capturada por uma fera — um faerie que a leva para o mundo além do Muro. Um mundo de perigo, magia e um amor que pode custar tudo.',
    tropes: ['enemies-to-lovers', 'forbidden-love', 'slow-burn'],
    mood: 'dark',
    happilyEverAfter: true,
    isSeries: true,
    seriesName: 'ACOTAR',
    seriesBook: 1,
    contentWarnings: ['Violência', 'Trauma', 'Conteúdo adulto (livros seguintes)'],
    detailedRatings: { romance: 4.4, chemistry: 4.3, plot: 4.6, characters: 4.7 },
    similarBooks: ['4', '11', '15'],
    affiliateLink: '#',
    viralOnBooktok: true,
    genre: ['Fantasy Romance', 'Fae Romance'],
    comments: [],
  },
  {
    id: '11',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    cover: 'https://images.unsplash.com/photo-1532299033-8d5b5bae0e1a?w=300&h=450&fit=crop&auto=format',
    spice: 3,
    dark: 3,
    rating: 4.7,
    ratingCount: 156738,
    synopsis:
      'A lendária atriz de Hollywood Evelyn Hugo escolhe uma jornalista desconhecida para contar sua história. O que se revela é uma vida de ambição, amor queer e segredos devastadores que atravessam décadas.',
    tropes: ['forbidden-love', 'age-gap'],
    mood: 'mixed',
    happilyEverAfter: false,
    isSeries: false,
    contentWarnings: ['Representação LGBTQ+', 'Morte', 'Abuso', 'Vício'],
    detailedRatings: { romance: 4.6, chemistry: 4.5, plot: 4.9, characters: 5.0 },
    similarBooks: ['6', '7', '14'],
    affiliateLink: '#',
    viralOnBooktok: true,
    genre: ['Historical Fiction', 'LGBTQ+ Romance'],
    comments: [],
  },
  {
    id: '12',
    title: 'Beach Read',
    author: 'Emily Henry',
    cover: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=300&h=450&fit=crop&auto=format',
    spice: 3,
    dark: 1,
    rating: 4.2,
    ratingCount: 48291,
    synopsis:
      'January Andrews, escritora de romance, e Augustus Everett, autor literário, fazem uma aposta: escrever no gênero um do outro por um verão. Resultado: caos emocional, revelações dolorosas e muito mais.',
    tropes: ['enemies-to-lovers', 'forced-proximity', 'slow-burn'],
    mood: 'light',
    happilyEverAfter: true,
    isSeries: false,
    contentWarnings: ['Perda (luto)', 'Depressão leve'],
    detailedRatings: { romance: 4.4, chemistry: 4.3, plot: 4.0, characters: 4.5 },
    similarBooks: ['7', '11', '9'],
    affiliateLink: '#',
    genre: ['Contemporary Romance'],
    comments: [],
  },
  {
    id: '13',
    title: 'The Villain',
    author: 'L.J. Shen',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=450&fit=crop&auto=format',
    spice: 5,
    dark: 4,
    rating: 4.1,
    ratingCount: 22847,
    synopsis:
      'Cillian Fitzpatrick é o vilão da cidade. Prue Savannah é a única pessoa que não tem medo dele. Ele precisa destruí-la. Ela tem outros planos. E nenhum dos dois sai ileso.',
    tropes: ['enemies-to-lovers', 'dark-romance', 'billionaire'],
    mood: 'dark',
    happilyEverAfter: true,
    isSeries: false,
    contentWarnings: ['Dubcon', 'Violência', 'Linguagem forte', 'Manipulação'],
    detailedRatings: { romance: 4.2, chemistry: 4.6, plot: 3.9, characters: 4.1 },
    similarBooks: ['1', '8', '5'],
    affiliateLink: '#',
    trendingThisWeek: true,
    genre: ['Dark Romance'],
    comments: [],
  },
  {
    id: '14',
    title: 'Reminders of Him',
    author: 'Colleen Hoover',
    cover: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=300&h=450&fit=crop&auto=format',
    spice: 3,
    dark: 3,
    rating: 4.5,
    ratingCount: 67293,
    synopsis:
      'Depois de cinco anos presa, Kenna Rowan volta à cidade tentando se reconectar com a filha que nunca conheceu. Ledger Ward é o único obstáculo — e sua única esperança.',
    tropes: ['second-chance', 'forbidden-love', 'slow-burn'],
    mood: 'mixed',
    happilyEverAfter: true,
    isSeries: false,
    contentWarnings: ['Perda', 'Prisão', 'Drogas', 'Luto'],
    detailedRatings: { romance: 4.4, chemistry: 4.3, plot: 4.7, characters: 4.6 },
    similarBooks: ['6', '2', '11'],
    affiliateLink: '#',
    viralOnBooktok: true,
    genre: ['Contemporary Romance'],
    comments: [],
  },
  {
    id: '15',
    title: 'Powerless',
    author: 'Lauren Roberts',
    cover: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=300&h=450&fit=crop&auto=format',
    spice: 2,
    dark: 2,
    rating: 4.3,
    ratingCount: 34782,
    synopsis:
      'Em um reino onde os sem poderes são descartáveis, Paedyn Gray sobrevive fingindo ter uma habilidade. Mas o Príncipe Elite Kai tem razões para suspeitar dela — e razões que não entende para protegê-la.',
    tropes: ['enemies-to-lovers', 'forbidden-love', 'slow-burn'],
    mood: 'mixed',
    happilyEverAfter: false,
    isSeries: true,
    seriesName: 'Powerless',
    seriesBook: 1,
    contentWarnings: ['Violência', 'Morte'],
    detailedRatings: { romance: 4.3, chemistry: 4.4, plot: 4.2, characters: 4.5 },
    similarBooks: ['4', '10', '9'],
    affiliateLink: '#',
    trendingThisWeek: true,
    genre: ['Fantasy Romance', 'YA Fantasy'],
    comments: [],
  },
];

// Mapeamento de rótulos legíveis para cada tropo
export const tropeLabels: Record<Trope, string> = {
  'enemies-to-lovers': 'Enemies to Lovers',
  'forbidden-love': 'Amor Proibido',
  'second-chance': 'Segunda Chance',
  'fake-dating': 'Namoro Falso',
  'forced-proximity': 'Proximidade Forçada',
  'dark-romance': 'Dark Romance',
  mafia: 'Máfia',
  billionaire: 'Bilionário',
  'age-gap': 'Age Gap',
  'reverse-harem': 'Reverse Harem',
  'slow-burn': 'Slow Burn',
  'sports-romance': 'Sports Romance',
};

// Perfil do usuário com informações detalhadas sobre suas preferências de leitura
export const userProfile = {
  name: 'Isabela Martins',
  username: '@isabelareads',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&auto=format',
  booksRead: 47,
  avgSpice: 3.8,
  favTrope: 'Enemies to Lovers',
  avgRating: 4.2,
  literaryProfile:
    'Você é uma leitora de alto risco — ama dark romance e enemies to lovers, mas também ama um final feliz que conquiste. Sua paleta literária vai do intenso ao irresistível. Você não tem medo de sentir.',
  readingList: {
    'want-to-read': ['9', '12', '15'],
    reading: ['4', '13'],
    read: ['1', '2', '3', '5', '6', '7', '8', '10', '11', '14'],
  } as Record<ReadingStatus, string[]>,
};
