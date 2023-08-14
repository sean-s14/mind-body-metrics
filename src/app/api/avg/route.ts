import { NextResponse } from "next/server";
import mongooseConnect from "@/config/mongooseConnect";
import Metrics from "@/schemas/metrics";
import { GENERAL_AGGREGATION_STAGES } from "@/constants/schemas/general";
import { HYGIENE_AGGREGATION_STAGES } from "@/constants/schemas/hygiene";
import { CHORES_AGGREGATION_STAGES } from "@/constants/schemas/chores";
import { NUTRITION_AGGREGATION_STAGES } from "@/constants/schemas/nutrition";
import { SLEEP_AGGREGATION_STAGES } from "@/constants/schemas/sleep";
import { READING_AGGREGATION_STAGES } from "@/constants/schemas/reading";

export async function GET(req: Request) {
  try {
    await mongooseConnect();

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    type Query = {
      _id?: string;
    };
    const query: Query = {};

    const projection = "-_id";
    const options = { lean: true };

    const general = await Metrics.aggregate(GENERAL_AGGREGATION_STAGES);
    const { _idGeneral, ...restGeneral } = general[0] || {};
    const hygiene = await Metrics.aggregate(HYGIENE_AGGREGATION_STAGES);
    const { _idHygiene, ...restHygiene } = hygiene[0] || {};
    const chores = await Metrics.aggregate(CHORES_AGGREGATION_STAGES);
    const { _idChores, ...restChores } = chores[0] || {};
    const nutrition = await Metrics.aggregate(NUTRITION_AGGREGATION_STAGES);
    const { _idNutrition, ...restNutrition } = nutrition[0] || {};
    const sleep = await Metrics.aggregate(SLEEP_AGGREGATION_STAGES);
    const { _idSleep, ...restSleep } = sleep[0] || {};
    const reading = await Metrics.aggregate(READING_AGGREGATION_STAGES);
    const { _idReading, ...restReading } = reading[0] || {};

    const metrics = {
      general: restGeneral,
      hygiene: restHygiene,
      chores: restChores,
      nutrition: restNutrition,
      sleep: restSleep,
      reading: restReading,
    };

    // const metrics = await Metrics.find(query, projection, options);

    return NextResponse.json({ metrics }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
