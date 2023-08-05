import { GET, POST } from "./route";
import { GET as GET_ONE, PATCH, DELETE } from "./[id]/route";
import Metrics from "@/schemas/metrics";
import { IMetrics } from "@/types/metrics";
import { createDateString } from "@/utils/date";

let metricsId1: string;
let metricsId2: string;

describe("Metrics API", () => {
  describe("POST", () => {
    it("should create an item", async () => {
      const timeOfUrination: string = createDateString(10, 10);
      const timeOfDefecation: string = createDateString(11, 35);

      const body = {
        chores: { dishWashing: 10 },
        general: {
          timeOfUrination: [timeOfUrination],
          timeOfDefecation: [timeOfDefecation],
        },
      };

      const response = await POST({
        json: () => body,
      } as any);

      const expecetedResponseBody = {
        metrics: {
          _id: expect.any(String),
          chores: { dishWashing: 10 },
          general: {
            timeOfUrination: [timeOfUrination],
            timeOfDefecation: [timeOfDefecation],
          },
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      };

      expect(response.status).toEqual(200);
      expect(response.headers.get("content-type")).toEqual("application/json");
      const responseBody = await response.json();
      expect(responseBody).toEqual(expecetedResponseBody);
      metricsId1 = responseBody.metrics._id;
    });

    it("should create another item", async () => {
      const timeOfUrination: string = createDateString(9, 40);
      const timeOfDefecation: string = createDateString(12, 5);

      const body = {
        chores: { dishWashing: 5 },
        general: {
          timeOfUrination: [timeOfUrination],
          timeOfDefecation: [timeOfDefecation],
        },
      };

      const response = await POST({
        json: () => body,
      } as any);

      const expecetedResponseBody = {
        metrics: {
          _id: expect.any(String),
          chores: { dishWashing: 5 },
          general: {
            timeOfUrination: [timeOfUrination],
            timeOfDefecation: [timeOfDefecation],
          },
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      };

      expect(response.status).toEqual(200);
      expect(response.headers.get("content-type")).toEqual("application/json");
      const responseBody = await response.json();
      expect(responseBody).toEqual(expecetedResponseBody);
      metricsId2 = responseBody.metrics._id;
    });
  });

  describe("PATCH", () => {
    it("should update an item", async () => {
      const timeOfUrination1: string = createDateString(10, 10);
      const timeOfUrination2: string = createDateString(13, 50);
      const timeOfDefecation: string = createDateString(11, 35);

      const body = {
        chores: { dishWashing: 15 },
        general: {
          timeOfUrination: [timeOfUrination1, timeOfUrination2],
          timeOfDefecation: [timeOfDefecation],
        },
      };

      const response = await PATCH(
        {
          json: () => body,
        } as any,
        { params: { id: metricsId1 } } as any
      );

      const expecetedResponseBody = {
        metrics: {
          _id: expect.any(String),
          chores: { dishWashing: 15 },
          general: {
            timeOfUrination: [timeOfUrination1, timeOfUrination2],
            timeOfDefecation: [timeOfDefecation],
          },
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      };

      expect(response.status).toEqual(200);
      expect(response.headers.get("content-type")).toEqual("application/json");
      expect(await response.json()).toEqual(expecetedResponseBody);
    });
  });

  describe("GET", () => {
    it("should return all items", async () => {
      const response = await GET({} as any);
      const body = await response.json();

      expect(response.status).toEqual(200);
      expect(response.headers.get("content-type")).toEqual("application/json");
      expect(body).toHaveProperty("metrics");
      expect(Array.isArray(body.metrics)).toEqual(true);
      expect(body.metrics.length).toEqual(2);
      body.metrics.forEach((item: IMetrics) => {
        expect(item._id).toEqual(expect.any(String));
        expect(item?.chores).toEqual({ dishWashing: expect.any(Number) });
        expect(Array.isArray(item?.general?.timeOfUrination)).toEqual(true);
        expect(Array.isArray(item?.general?.timeOfDefecation)).toEqual(true);
        expect(item.createdAt).toEqual(expect.any(String));
        expect(item.updatedAt).toEqual(expect.any(String));
        // @ts-ignore
        expect(item.__v).toEqual(0);
      });
    });
  });

  describe("DELETE", () => {
    it("should delete an item", async () => {
      const response = await DELETE(
        {} as any,
        { params: { id: metricsId1 } } as any
      );
      expect(response.status).toEqual(200);
      expect(response.headers.get("content-type")).toEqual("application/json");
      expect(await response.json()).toEqual({ msg: "Deleted" });
    });
  });

  describe("GET_ONE", () => {
    it("should return an item", async () => {
      const response = await GET_ONE(
        {} as any,
        { params: { id: metricsId2 } } as any
      );
      const body = await response.json();

      expect(response.status).toEqual(200);
      expect(response.headers.get("content-type")).toEqual("application/json");
      expect(body).toHaveProperty("metrics");
      expect(body.metrics._id).toEqual(expect.any(String));
      expect(body?.metrics?.chores).toEqual({ dishWashing: 5 });
      expect(Array.isArray(body?.metrics?.general?.timeOfUrination)).toEqual(
        true
      );
      expect(Array.isArray(body?.metrics?.general?.timeOfDefecation)).toEqual(
        true
      );
      expect(body.metrics.createdAt).toEqual(expect.any(String));
      expect(body.metrics.updatedAt).toEqual(expect.any(String));
      // @ts-ignore
      expect(body.metrics.__v).toEqual(0);
    });
  });

  afterAll(async () => {
    await Metrics.deleteMany({});
  });
});
