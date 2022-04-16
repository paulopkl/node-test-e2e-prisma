import { PrismaLessonsRepository } from './repositories/prisma/PrismaLessonsRepository';
import express from "express";
import { CreateLesson } from './services/CreateLesson';

export const app = express();

app.use(express.json());

app.get('/lessons', async (req, res) => {
    const { title, description } = req.body;
    
    const prismaLessonsRepository = new PrismaLessonsRepository();
    const createLesson = new CreateLesson(prismaLessonsRepository);

    try {
        await createLesson.execute({ title, description });

        return res.status(201).send();
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
});