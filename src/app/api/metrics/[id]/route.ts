import { NextResponse } from "next/server";
import mongooseConnect from "@/config/mongooseConnect";
import Metrics from "@/schemas/metrics";
import { cleanObject } from "@sean14/utils";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await mongooseConnect();

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    type Query = {
      _id?: string;
    };
    const query: Query = {};
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    query._id = id;

    const category: string = params?.category || "";
    const projection = `_id createdAt updatedAt ` + category;
    const options = { lean: true };

    const metrics = await Metrics.findById(query, projection, options);

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
    const cleanBody = cleanObject(body);

    const metrics = await Metrics.findOneAndUpdate({ _id: id }, cleanBody, {
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
