export interface CustomerReview {
  id: number;
  platform: 'Instagram' | 'Facebook' | 'Messages';
  imageWebp: string;
  imagePng: string;
  highlight: string;
  fullText: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    platform: 'Instagram',
    imageWebp: '/assets/reviews/review_1.webp',
    imagePng: '/assets/reviews/review_1.png',
    highlight: 'All good , great job ❤️',
    fullText: 'Yes got the service. Its all good. How\'s your experience? All good , great job ❤️',
  },
  {
    id: 2,
    platform: 'Messages',
    imageWebp: '/assets/reviews/review_2.webp',
    imagePng: '/assets/reviews/review_2.png',
    highlight: 'It was excellent they were very professional and pleasant',
    fullText: 'Did my technicians came or Called yet? Yes, they came around 1 PM and left around two. Great how was the service? It was excellent they were very professional and pleasant',
  },
  {
    id: 3,
    platform: 'Facebook',
    imageWebp: '/assets/reviews/review_3.webp',
    imagePng: '/assets/reviews/review_3.png',
    highlight: 'They were quite quick and efficient I\'m very happy thank you',
    fullText: 'Hello, Did you get our services? Yes I did thank you very much. How was our service? They were quite quick and efficient I\'m very happy thank you. Please do recommend... I will indeed thank you',
  },
  {
    id: 4,
    platform: 'Messages',
    imageWebp: '/assets/reviews/review_4.webp',
    imagePng: '/assets/reviews/review_4.png',
    highlight: 'The gentlemen were very efficient and respectful. I assume that the cleaning was well done',
    fullText: 'THU AT 9:33 PM How was the service? The gentlemen were very efficient and respectful. I assume that the cleaning was well done and that my house will be more dustless. Thanks.',
  },
  {
    id: 5,
    platform: 'Facebook',
    imageWebp: '/assets/reviews/review_5.webp',
    imagePng: '/assets/reviews/review_5.png',
    highlight: 'They r doing a gr8 job n Freindly respectful',
    fullText: 'Okay, How was the service of your house? They r doing a gr8 job n Freindly respectful. Glad you like it 😊. Can you have more customers for me? We are also available on next week for the services in the area. I\'ll ask around ❤️. Thank you!',
  },
  {
    id: 6,
    platform: 'Instagram',
    imageWebp: '/assets/reviews/review_6.webp',
    imagePng: '/assets/reviews/review_6.png',
    highlight: 'It had not been done before so needed the extra clean. Thanks again!',
    fullText: 'How was the service? Hi Jeff, thank you for the services. It had nit been done before so needed the extra clean. Thanks again! ❤️',
  },
  {
    id: 7,
    platform: 'Instagram',
    imageWebp: '/assets/reviews/review_7.webp',
    imagePng: '/assets/reviews/review_7.png',
    highlight: 'It was great! Yes they did, thank you very much',
    fullText: 'Yes they did, thank you very much. How was the service? It was great! You can let me know if any of your friends neighbors and relatives wants the service too 😊.',
  },
  {
    id: 8,
    platform: 'Instagram',
    imageWebp: '/assets/reviews/review_8.webp',
    imagePng: '/assets/reviews/review_8.png',
    highlight: 'It was good he was super nice. It was a lot more than I had planned but it is what it is!',
    fullText: 'Ya he came yesterday. How\'s the service? It was good he was super nice. It was a lot more than I had planned but it is what it is! ❤️',
  },
  {
    id: 9,
    platform: 'Messages',
    imageWebp: '/assets/reviews/review_9.webp',
    imagePng: '/assets/reviews/review_9.png',
    highlight: 'They just left; did a wonderful job; thank you!',
    fullText: 'Hi have you done by the service? They just left; did a wonderful job; thank you!',
  },
  {
    id: 10,
    platform: 'Instagram',
    imageWebp: '/assets/reviews/review_10.webp',
    imagePng: '/assets/reviews/review_10.png',
    highlight: 'It was done ❤️',
    fullText: 'Hi have you done by the service? ❤️ It was done',
  },
];
