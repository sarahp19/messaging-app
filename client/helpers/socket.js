import { io } from 'socket.io-client';

const isDev = process.env.NODE_ENV === 'development';
const origin = isDev ? 'http://localhost:8000' : '/';

export default io(origin);
