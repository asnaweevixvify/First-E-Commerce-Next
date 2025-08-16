import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function PUT(req,{ params }){
    const { id } = params
    const prisma = new PrismaClient()
    const data = await req.json()

    try {
        await prisma.product.update({where:{id},data})
        return NextResponse.json({msg:"อัพเดตข้อมูลสำเร็จ"},{status:201})
    }
    catch(err) {
        return NextResponse.json({
            error:err,
        },{status:500})
    }
}