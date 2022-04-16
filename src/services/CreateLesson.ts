// Inversão de dependências

import { LessonsRepository } from './../repositories/LessonsRepository';

interface CreateLessonRequest {
    title: string;
    description?: string;
}

// Command/Query Segregation
// Escrita/Update/Delete SEM RETORNO (Comandos)
// Query

export class CreateLesson {
    constructor(private lessonsRepository: LessonsRepository) {}

    async execute({ title, description }: CreateLessonRequest): Promise<void> {
        // Verificar se já existe uma lesson com o mesmo titulo

        if (!title) throw new Error('Title is required!');

        await this.lessonsRepository.create({ title, description });
    }
}