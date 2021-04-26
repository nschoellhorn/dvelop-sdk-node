import axios from "axios";
import { updateTask } from "./update-task";
import { Task } from "../task";

jest.mock("axios");

describe("updateTask", () => {

  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios.patch.mockReset();
  });

  [
    "", null, undefined
  ].forEach(testCase => {
    it("should throw on missing location in task", async () => {

      const systemBaseUri = "HiItsMeSystemBaseUri";
      const authessionId = "HiItsMeAuthsessionId";
      const task: Task = {
        location: testCase,
        subject: "Nice Subject",
        description: "a description",
      };

      await expect(updateTask(systemBaseUri, authessionId, task)).rejects.toThrowError("Failed to update Task.\nNo Location");
    });
  });

  it("should make PATCH with correct URI", async () => {

    const systemBaseUri = "HiItsMeSystemBaseUri";
    let task: Task = {
      location: "/it/is/a/location/1234567890",
      subject: "Let us change the subject",
      description: "My nice updated description"
    };

    await updateTask(systemBaseUri, "HiItsMeAuthSessionId", task);

    expect(mockedAxios.patch).toBeCalledWith(`${systemBaseUri}${task.location}`, expect.any(Object), expect.any(Object));
  });

  it("should make PATCH with correct headers", async () => {

    const authessionId = "HiItsMeAuthsessionId";
    const systemBaseUri = "HiItsMeSystemBaseUri";
    let task: Task = {
      location: "/it/is/a/location/1234567890",
      subject: "Let us change the subject",
      description: "My nice updated description"
    };

    await updateTask(systemBaseUri, authessionId, task);

    expect(mockedAxios.patch).toBeCalledWith(expect.any(String), expect.any(Object), { headers: { "Authorization": `Bearer ${authessionId}`, "Origin": systemBaseUri } });
  });

  it("should make PATCH with correct body", async () => {

    const authessionId = "HiItsMeAuthsessionId";
    const systemBaseUri = "HiItsMeSystemBaseUri";
    let task: Task = {
      location: "/it/is/a/location/1234567890",
      subject: "Let us change the subject",
      description: "My nice updated description"
    };

    await updateTask(systemBaseUri, authessionId, task);

    expect(mockedAxios.patch).toBeCalledWith(expect.any(String), task, expect.any(Object));
  });
});