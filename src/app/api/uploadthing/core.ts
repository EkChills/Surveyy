import { baseUrl } from "@/lib/utils";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { api } from "@/trpc/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(() => {
      // This code runs on your server before upload
      const {getUser} = getKindeServerSession()
      const user = getUser()
 
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      // const updatedUser = await db.update(user)
      // .set({ picture: file.url })
      // .where(eq(user.id, metadata.userId!));
      // console.log(updatedUser);
      
 
      console.log("file url", file.url);
      try {
        await axios.post(`${baseUrl}/api/updateUserImg`, {imageUrl:file.url, userId:metadata.userId})
      } catch (error) {
        console.log(error);
        
      }
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;