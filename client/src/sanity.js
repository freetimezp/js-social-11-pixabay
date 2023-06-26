import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
    projectId: 'twzeg5g3',
    dataset: 'production',
    apiVersion: '2023-05-23',
    //useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const createNewUser = async (data) => {
    const _doc = {
        _id: data.uid,
        _type: 'users',
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        photoURL: data.photoUrl
    };

    await client.createIfNotExists(_doc).then(result => {
        return result;
    });
}

export const uploadAsset = async (asset) => {
    let data;

    if (["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(asset.type)) {
        data = await client.assets.upload("image", asset, {
            contentType: asset.Type,
            filename: asset.name,
        });

        return data;
    } else {
        data = await client.assets.upload("file", asset, {
            contentType: asset.Type,
            filename: asset.name,
        });

        return data;
    }
}

export const deleteUploadedAsset = async (id) => {
    let data = await client.delete(id);

    return data;
}