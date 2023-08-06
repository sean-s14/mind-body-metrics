import { NextResponse } from "next/server";
import mongooseConnect from "@/config/mongooseConnect";
import Metrics from "@/schemas/metrics";

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

    // Loop through each key in body and check if it has another object to loop through
    // If it does, loop through that object and check if any of its values are falsy
    // If any of its values are falsy, set them to undefined
    // If any of its values are truthy, set them to the value
    for (const key in body) {
      if (typeof body[key] === "object") {
        for (const subKey in body[key]) {
          if (!body[key][subKey]) {
            body[key][subKey] = undefined;
          }
        }
      } else if (!body[key]) {
        body[key] = undefined;
      }
    }

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
