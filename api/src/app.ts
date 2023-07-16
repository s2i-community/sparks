import express, { Application, Request, Response } from 'express';

const app: Application = express();

const PORT: number = 9000;

app.use('/', (req: Request, res: Response): void => {
  res.status(200).json({ title: 'Hello API!' });
});

app.listen(PORT, (): void => {
  console.log('SERVER IS UP ON PORT:', PORT);
});