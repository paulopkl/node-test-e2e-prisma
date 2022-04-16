import { InMemoryLessonsRepository } from "../../test/repositories/InMemoryLessonRepository";
import { CreateLesson } from "./CreateLesson";

describe('Create Lesson service', () => {
    it("Should be able to create a new lesson", async () => {
        const inMemoryLessonsRepository = new InMemoryLessonsRepository();
        const createLesson = new CreateLesson(inMemoryLessonsRepository);

        await expect(createLesson.execute({ title: "New Class" }))
            .resolves
            .not
            .toThrow();

        expect(inMemoryLessonsRepository.items).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: "New Class",
                }),
            ])
        );
    });
    
    it("Should NOT be able to create a new lesson with invalid title", async () => {
        const inMemoryLessonsRepository = new InMemoryLessonsRepository();
        const createLesson = new CreateLesson(inMemoryLessonsRepository);

        await expect(createLesson.execute({ title: "" }))
            .rejects
            .toThrow();

        expect(inMemoryLessonsRepository.items).toEqual([]);
    });
});