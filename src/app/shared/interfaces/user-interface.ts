export interface UserInterface {
id?: string;
name?: string;
lastName?: string;
email?: string;
password?: string;
desk?: any;

}




// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Name required"]
//     },

//     last_name: {
//         type: String,
//         required: [true, "Last name required"]
//     },

//     email: {
//         type: String,
//         required: [true, "Email required"],
//         unique: [true, "This email is already in use"]
//     },
//     password: {
//         type: String,
//         required: [true, "Password required"],
//     },

//     desk: [{
//         idFont: String,
//         font: String,
//         title: String,
//         description: String,
//         authorName: String,
//         authorimage: String,
//         categories: String,
//         tags: String,
//         imageThumb: String,
//         imageSmall: String,
//         imageMedium: String,
//         imageLarge: String
//     }]
// });

// export default userSchema;
