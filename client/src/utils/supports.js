import { v4 as uuidv4 } from 'uuid';

export const mainMenu = [
    { id: uuidv4(), name: "My Media", slug: "my-media" },
    { id: uuidv4(), name: "Upload", slug: "upload" },
    { id: uuidv4(), name: "Statistics", slug: "statistics" },
    { id: uuidv4(), name: "Collections", slug: "collections" },
    { id: uuidv4(), name: "Profile", slug: "profile" },
];

export const subMenu = [
    { id: uuidv4(), name: "My Media", slug: "my-media" },
    { id: uuidv4(), name: "Upload", slug: "upload" },
    { id: uuidv4(), name: "Statistics", slug: "statistics" },
    { id: uuidv4(), name: "Collections", slug: "collections" },
    { id: uuidv4(), name: "Following", slug: "following" },
    { id: uuidv4(), name: "Messages", slug: "messages" },
];

export const categoriesList = [
    { id: uuidv4(), name: "nature" },
    { id: uuidv4(), name: "girl" },
    { id: uuidv4(), name: "happy" },
    { id: uuidv4(), name: "photo" },
    { id: uuidv4(), name: "illustration" },
    { id: uuidv4(), name: "music" },
    { id: uuidv4(), name: "video" },
    { id: uuidv4(), name: "gif" },
    { id: uuidv4(), name: "anime" },
    { id: uuidv4(), name: "background" },
    { id: uuidv4(), name: "sky" },
    { id: uuidv4(), name: "money" },
    { id: uuidv4(), name: "water" },
    { id: uuidv4(), name: "cat" },
    { id: uuidv4(), name: "baby" },
    { id: uuidv4(), name: "dog" },
    { id: uuidv4(), name: "food" },
    { id: uuidv4(), name: "car" },
    { id: uuidv4(), name: "flower" },
    { id: uuidv4(), name: "artifact" },
    { id: uuidv4(), name: "wallpaper" },
    { id: uuidv4(), name: "travel" },
];

export const fetchQuery = `
*[_type == 'post'] | order(_createdAt desc) {
    _id,
    title,
    keywords,
    categories,
    otherMedia {
        asset -> {
            url
        }
    },
    mainImage {
        asset -> {
            url
        }
    },
    description,
    _createdAt,
    users -> {
        _id,
        displayName,
        photoURL,
    },
    collections[] -> {
        _id,
        displayName,
        photoURL,
    },
    comments[] -> {
        _id,
        comment,
        _createdAt,
        users -> {
            _id,
            displayName,
            photoURL,
        },
    }
}
`;

export const fetchDetailQuery = (feedId) => {
    const query = `
    *[_type == 'post' && _id == '${feedId}'] {
        _id,
        title,
        keywords,
        categories,
        otherMedia {
            asset -> {
                url
            }
        },
        mainImage {
            asset -> {
                url
            }
        },
        description,
        _createdAt,
        users -> {
            _id,
            displayName,
            photoURL,
        },
        collections[] -> {
            _id,
            displayName,
            photoURL,
        },
        comments[] -> {
            _id,
            comment,
            _createdAt,
            users -> {
                _id,
                displayName,
                photoURL,
            },
        }
    }`;

    return query;
}
