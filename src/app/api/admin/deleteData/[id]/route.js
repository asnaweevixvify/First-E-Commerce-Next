import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function DELETE(req,{ params }){
    const { id } = await params
    const prisma = new PrismaClient()

    try {
        await prisma.product.delete({where:{ id }})
        return NextResponse.json({msg:"ลบสำเร็จ"},{status:201})
    }
    catch(err) {
        return NextResponse.json({
            error:err,
        },{status:500})
    }
}