import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function GET(){
    const prisma = new PrismaClient()

    try {
        const data = await prisma.product.findMany()
        return NextResponse.json(data,{status:201})
    }
    catch(err) {
        return NextResponse.json({
            error:err,
        },{status:500})
    }
}