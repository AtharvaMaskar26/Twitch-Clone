"use server"

import {
    IngressAudioEncodingOptions, 
    IngressInput, 
    IngressClient, 
    IngressVideoEncodingPreset, 
    RoomServiceClient, 
    CreateIngressOptions,
    IngressAudioEncodingPreset
} from "livekit-server-sdk"

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import { db } from "@/lib/db"
import { getSelf } from "@/lib/auth-service"
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngress =async (hostIdentity:string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity,
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    for (const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }
}

export const createIngress = async(ingressType: IngressInput) => {
    const self = await getSelf();

    // ToDo: Reset previoud ingress
    // Whenever a user tries to create a new ingress we make sure that we delete the old ingress. 
    await resetIngress(self.id);

    const options: CreateIngressOptions = {
        name: self.username, 
        roomName: self.id, 
        participantName: self.username, 
        participantIdentity: self.id
    }

    if (ingressType === IngressInput.WHIP_INPUT) {
        options.bypassTranscoding = true
    } else {
        options.video = {
            source: TrackSource.CAMERA, 
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        };
        options.audio = {
            source: TrackSource.MICROPHONE, 
            preset: IngressAudioEncodingPreset.OPUS_MONO_64KBS
        };
    };

    const ingress = ingressClient.createIngress(
        ingressType, 
        options
    )

    if (!ingress || !(await ingress).url || !(await ingress).streamKey) {
        throw new Error("Failed to create ingress");
    }

    await db.stream.update({
        where: {
            userId: self.id
        }, 
        data: {
            ingressId: (await ingress).ingressId, 
            serverUrl: (await ingress).url,  
            streamKey: (await ingress).streamKey
        },
    });

    revalidatePath(`/u/${self.username}/keys`);

    return ingress
}