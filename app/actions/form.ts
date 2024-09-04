"use server"

import {currentUser} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";
import {formSchema, formSchemaType} from "@/schemas/form";

class UserNotFoundErr extends Error {}

export async function GetFromStats() {
    const user = await currentUser()
if  (!user) {
    throw new UserNotFoundErr("User not found")
}
const stats = await prisma.form.aggregate({
    where: {
        userId: user.id,
    },
    _sum: {
        visits: true,
        submisson: true
    }
})
    const visits = stats._sum.visits || 0;
    const submisson = stats._sum.submisson || 0;

    let submissionRate =  0;

    if (visits > 0) {
        submissionRate = (submisson / visits) *  100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,submisson, submissionRate,bounceRate
    }
}

export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data)
if (!validation.success) {
    throw  new Error("Validation failed")
}
    const user = await currentUser()
if  (!user) {
    throw new UserNotFoundErr("User not found")
}
    const {name,description} = data;

    const form = await prisma.form.create({
        data:{
            userId: user.id,
            name,
            description,
        }
    })
if (!form) {
    throw  new Error("something went wrong")
}
return form.id
 }


