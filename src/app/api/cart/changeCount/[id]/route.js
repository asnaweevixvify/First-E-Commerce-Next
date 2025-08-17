import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function PATCH(req,{ params }){
    const data = await req.json()
    const { id } = params
    const prisma = new PrismaClient()

    try {
        await prisma.cart.update({where:{id},data})
        return NextResponse.json({status:201})
    }   
    catch(err) {
        return NextResponse.json({
            error:err,
        },{status:500})
    }   
}