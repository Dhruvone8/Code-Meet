import { Inngest } from "inngest";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "code-meet" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event, step }) => {
        await connectDB()

        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            profilePic: image_url
        }

        await User.create(newUser)

        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.profilePic
        })
    }
)

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" },
    async ({ event, step }) => {
        await connectDB()

        const { id } = event.data;

        await User.deleteOne({ clerkId: id })
        
        await deleteStreamUser(id.toString())
    }
)

export const inngestFunctions = [syncUser, deleteUserFromDB]
