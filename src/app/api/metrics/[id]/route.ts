import { NextResponse } from "next/server";
import mongooseConnect from "@/config/mongooseConnect";
import Metrics from "@/schemas/metrics";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await mongooseConnect();

    const metrics = await Metrics.findById({ _id: id }, null, { lean: true });

    return NextResponse.json({ metrics }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await mongooseConnect();

    const body = await req.json();

    const metrics = await Metrics.findOneAndUpdate({ _id: id }, body, {
      new: true,
      lean: true,
    });

    return NextResponse.json({ metrics }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await mongooseConnect();

    await Metrics.findOneAndDelete({ _id: id });

    return NextResponse.json({ msg: "Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
