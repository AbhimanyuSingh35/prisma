// we will be using this as a server component because all the function that are exported from here must run on the server side 


"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData){
  await prisma.post.create({
     data:{
         title: formData.get("title") as string,
         slug: (formData.get("title") as string)
         .replace(/\s+/g,"-")
         .toLowerCase(),
         content:formData.get("content") as string 

     }
  })
  // using this function any time this function is called the /posts route will re-render 
  revalidatePath("/posts");
}

export async function editPost(formData : FormData , id:string){
  await prisma.post.update({
    where: {id},
    data:{
      title:formData.get("title") as string,
      slug:(formData.get("title") as string)
      .replace(/\s+/g,"-")
      .toLowerCase(),
      content : formData.get("content") as string,
    },
  })
}

