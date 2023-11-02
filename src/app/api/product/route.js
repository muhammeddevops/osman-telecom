import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const prodData = await req.formData();
    console.log(prodData);
  } catch (err) {
    console.log(err);
  }
}

export async function GET() {
  try {
    return NextResponse.json({ id: 1, name: "Muhammed" });
  } catch (err) {
    console.log(err);
  }
}
