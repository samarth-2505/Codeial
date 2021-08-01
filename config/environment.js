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
    name : 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKEY_KEY,
    db : process.env.CODEIAL_DB,
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : process.env.CODEIAL_GMAIL_USERNAME ,
            pass : process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET
};

//if process.env.CODEIAL_ENVIRONMENT is undefined then export development else export the value of process.env.CODEIAL_ENVIRONMENT 
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT); 