import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function GET(req,{ params }){
    const { id } = await params
    const prisma = new PrismaClient()

    try {
        const data = await prisma.product.findUnique({where:{id}})
        return NextResponse.json(data,{status:201})
    }
    catch(err) {
        return NextResponse.json({
            error:err,
        },{status:500})
    }
}