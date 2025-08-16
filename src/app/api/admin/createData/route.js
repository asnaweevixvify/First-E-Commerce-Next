import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function POST(req){
    const data = await req.json()
    const prisma = new PrismaClient()

    try {
        await prisma.product.create({ data })
        return NextResponse.json({msg:"บันทึกสินค้าสำเร็จ"},{status:201})
    }
    catch(err) {
        return NextResponse.json({
            error:err,
        },{status:500})
    }
}