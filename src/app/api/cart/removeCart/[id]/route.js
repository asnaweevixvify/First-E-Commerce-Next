import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function DELETE(req,{ params }){
    const { id } = params
    const prisma = new PrismaClient()
    
    try {
        await prisma.cart.delete({where:{id}})
        return NextResponse.json({status:201})
    }
    catch(err) {
        return NextResponse.json({
            error:err,
        },{status:500})
    }
}