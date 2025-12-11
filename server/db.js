export const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  },
  {
    id: '3',
    name: 'Mike Smith',
    email: 'mike.smith@example.com',
  },
  {
    id: '4',
    name: 'Kate Smith',
    email: 'kate.smith@example.com',
  },
];

export const chats = [
  {
    id: '1',
    name: 'Chat 1',
  },
  {
    id: '2',
    name: 'Chat 2',
  },
];

export const messages = [
  {
    chatId: '1',
    id: '1',
    content: 'Hello, Jane!',
    userId: '1',
    userName: 'John Doe',
    createdAt: new Date(),
  },
  {
    chatId: '1',
    id: '2',
    content: 'Hi, John!',
    userId: '2',
    userName: 'Jane Doe',
    createdAt: new Date(),
  },
  {
    chatId: '2',
    id: '3',
    content: 'Hello, world!',
    userId: '1',
    createdAt: new Date(),
  },
  {
    chatId: '2',
    id: '4',
    content: 'Hi, world!',
    userId: '2',
    createdAt: new Date(),
  },
];
