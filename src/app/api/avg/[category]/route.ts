import { NextResponse } from "next/server";
import mongooseConnect from "@/config/mongooseConnect";
import Metrics from "@/schemas/metrics";
import { GENERAL_AGGREGATION_STAGES } from "@/constants/schemas/general";
import { HYGIENE_AGGREGATION_STAGES } from "@/constants/schemas/hygiene";
import { CHORES_AGGREGATION_STAGES } from "@/constants/schemas/chores";
import { NUTRITION_AGGREGATION_STAGES } from "@/constants/schemas/nutrition";
import { SLEEP_AGGREGATION_STAGES } from "@/constants/schemas/sleep";
import { READING_AGGREGATION_STAGES } from "@/constants/schemas/reading";

export async function GET(
  req: Request,
  { params: { category } }: { params: { category: string } }
) {
  try {
    await mongooseConnect();

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    let aggregationStages: any[] = [];
    if (category === "hygiene") {
      aggregationStages = HYGIENE_AGGREGATION_STAGES;
    } else if (category === "general") {
      aggregationStages = GENERAL_AGGREGATION_STAGES;
    } else if (category === "chores") {
      aggregationStages = CHORES_AGGREGATION_STAGES;
    } else if (category === "nutrition") {
      aggregationStages = NUTRITION_AGGREGATION_STAGES;
    } else if (category === "sleep") {
      aggregationStages = SLEEP_AGGREGATION_STAGES;
    } else if (category === "reading") {
      aggregationStages = READING_AGGREGATION_STAGES;
    }

    const metrics = await Metrics.aggregate(aggregationStages);

    const { _id, ...rest } = metrics[0] || {};

    return NextResponse.json({ metrics: rest }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
