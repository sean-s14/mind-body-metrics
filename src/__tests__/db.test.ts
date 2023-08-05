import mongooseConnect from "@/config/mongooseConnect";
import Metrics from "@/schemas/metrics";
import { IMetrics } from "@/types/metrics";
import { createDateString, isoRegex } from "@/utils/date";

let metricsIds: string[] = [];

describe("Metrics API", () => {
  beforeAll(async () => {
    await mongooseConnect();
  });

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
      const metric: IMetrics = await Metrics.create(body);

      expect(metric?.chores?.dishWashing).toEqual(10);
      expect(Array.isArray(metric?.general?.timeOfUrination)).toEqual(true);
      expect(Array.isArray(metric?.general?.timeOfDefecation)).toEqual(true);
      metric?.general?.timeOfUrination?.forEach((element) => {
        expect(isoRegex.test(element.toISOString())).toEqual(true);
      });
      metric?.general?.timeOfDefecation?.forEach((element) => {
        expect(isoRegex.test(element.toISOString())).toEqual(true);
      });
      metricsIds.push(metric?._id?.toString() ?? "");
    });

    it("should create another item", async () => {
      const body = {
        chores: { dishWashing: 20 },
        hygiene: {
          shaved: true,
          showered: true,
        },
        nutrition: {
          calories: 2000,
        },
      };
      const metric: IMetrics = await Metrics.create(body);

      expect(metric?.chores?.dishWashing).toEqual(20);
      expect(metric?.hygiene?.shaved).toEqual(true);
      expect(metric?.hygiene?.showered).toEqual(true);
      expect(metric?.nutrition?.calories).toEqual(2000);
      metricsIds.push(metric?._id?.toString() ?? "");
    });
  });

  describe("PATCH", () => {
    it("should update an item", async () => {
      const metrics: IMetrics | null = await Metrics.findOneAndUpdate(
        { _id: metricsIds[0] },
        { "chores.dishWashing": 15 },
        { new: true, lean: true }
      );

      expect(metrics?.chores?.dishWashing).toEqual(15);
    });
  });

  describe("GET", () => {
    it("should return all items", async () => {
      const metrics: IMetrics[] = await Metrics.find({}, null, { lean: true });
      expect(metrics.length).toEqual(2);
    });
  });

  afterAll(async () => {
    await Metrics.deleteMany({});
  });
});
