const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'blahblah',
    db : 'codeial-dev',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : 'codeial.web@gmail.com',
            pass : 'samarth123'
        }
    },
    google_client_id : "295628776930-sa26hgl1l4sk2sitisg4t7sagcu8s3ft.apps.googleusercontent.com",
    google_client_secret : "4jMC4-y3DLbwXuKiigwxF-Cs",
    google_callback_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial'
};

const production = {
    name : 'production'
};

module.exports = development;