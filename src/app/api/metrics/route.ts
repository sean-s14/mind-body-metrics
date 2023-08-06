import { NextResponse } from "next/server";
import mongooseConnect from "@/config/mongooseConnect";
import Metrics from "@/schemas/metrics";

export async function GET(req: Request) {
  try {
    await mongooseConnect();

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    type Query = {
      createdAt?: {
        $gte?: Date;
        $lt?: Date;
      };
    };
    const query: Query = {};
    const projection = "_id createdAt updatedAt";
    const options = { lean: true };

    const year: string = params?.year || "";
    const month: string = params?.month || "";

    if (year && month) {
      if (Number(month) < 1 || Number(month) > 12) {
        return NextResponse.json(
          { error: "Month must be between 1 and 12" },
          { status: 400 }
        );
      }

      const lt_year = Number(month) === 12 ? Number(year) + 1 : Number(year);
      const lt_month = Number(month) === 12 ? 1 : Number(month) + 1;

      query.createdAt = {
        $gte: new Date(`${year}-${month}`),
        $lt: new Date(`${lt_year}-${lt_month}`),
      };
    }

    const metrics = await Metrics.find(query, projection, options);

    return NextResponse.json({ metrics }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await mongooseConnect();

    const body = await req.json();
    const metrics = await Metrics.create(body);

    return NextResponse.json({ metrics }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
