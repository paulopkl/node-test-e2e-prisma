import request from "supertest";
import { app } from "./app";

test("[E2E] Create Lesson", async () => {
    const response = await request(app)
        .get("/lessons")
        .send({ title: "New Class" });

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
});