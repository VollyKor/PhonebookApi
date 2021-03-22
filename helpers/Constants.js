const path = require('path')

const SUBSCRIPTION = {
    FREE: 'free',
    PRO: 'pro',
    PREMIUM: 'premium',
}

const HttpCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
}

const PUBLIC_FOLDER = 'public'
const PUBLIC_IMAGES_FOLDER = 'images'
const AVATARS_OF_USERS = path.join(
    process.cwd(),
    PUBLIC_FOLDER,
    PUBLIC_IMAGES_FOLDER,
)
const UPLOAD_FOLDER = 'uploads'

module.exports = {
    SUBSCRIPTION,
    HttpCode,
    AVATARS_OF_USERS,
    UPLOAD_FOLDER,
    PUBLIC_FOLDER,
    PUBLIC_IMAGES_FOLDER,
}
